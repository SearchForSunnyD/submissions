from boggle import Boggle
from flask import Flask, render_template, redirect, request, session, jsonify

app = Flask(__name__)
app.secret_key = "super_secret"

boggle_game = Boggle()

@app.route("/")
def show_home():
    """
    Display the home page.
    """
    return render_template("home.html")

@app.route("/board-select")
def make_board():
    """
    Create a Boggle board and store it in the session based on user preferences.

    - If the game type is 'custom', the board size is determined by the 'board-size' parameter.
    - If the game type is not 'custom', a standard Boggle board is generated.

    Redirects the user to the '/board' route to display the Boggle board.
    """
    if request.args.get("game-type") == 'custom':
        size = int(request.args.get("board-size"))
        boggle_board = boggle_game.make_board(size)
    else:
        boggle_board = boggle_game.make_board()
    session["boggle_board"] = boggle_board
    return redirect("/board")

@app.route("/board")
def show_board():
    """
    Display the Boggle board to the user.
    """
    return render_template("board.html")

@app.route("/board-guess")
def process_guess():
    """
    Check the validity of a word guess on the Boggle board.

    Extracts the 'guess' parameter from the request and checks if it's a valid word on the current Boggle board.

    Returns a JSON response indicating the result of the word validity check.
    """
    guess = request.args.get("guess")
    validity = boggle_game.check_valid_word(session["boggle_board"], guess.lower())
    return jsonify({"result": validity})

@app.route("/post-score", methods=["POST"])
def process_score():
    """
    Process and update the user's Boggle game score and high score.

    Extracts the 'score' from the JSON request data. It updates the user's games played count and high score, and checks if the new score is a new record.

    Returns a JSON response indicating whether the user has set a new high score.
    """
    score = request.json["score"]

    games_played = session.get("games_played", 0)
    session["games_played"] = 1 + games_played

    high_score = session.get("high_score", 0)
    session["high_score"] = max(score, high_score)

    return jsonify(new_record=score > high_score)

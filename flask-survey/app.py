import surveys
from flask import Flask, request, render_template, redirect, flash

app = Flask(__name__)
app.secret_key = "asdfgvgjhkgbedesgfauiohggfqerwuihp"

responses = []


@app.route("/")
def show_home():
    return render_template("home.html")


@app.route("/question/<q_id>")
def show_question(q_id):
    q_id = int(q_id)
    answer = request.args.get("answer")
    text = request.args.get("text-portion")

    if q_id - 1 == len(responses):
        if answer:
            if text:
                responses.append((answer, text))
            else:
                responses.append(answer)
    if not q_id == len(responses):
        flash("Oops let;s take you back to where you belong!")
        return redirect(f"/question/{len(responses)}")
    try:
        return render_template(
            "question.html",
            q_id=q_id + 1,
            survey=surveys.personality_quiz,
            question=surveys.personality_quiz.questions[q_id],
        )
    except:
        return redirect("/thanks")


@app.route("/thanks")
def show_thanks():
    return render_template("thanks.html")

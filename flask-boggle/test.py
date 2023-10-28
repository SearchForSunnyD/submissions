from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

class FlaskTests(TestCase):
    """
    A class for testing the Flask application.
    """

    def setUp(self):
        """
        Set up the test environment for Flask.

        Initializes the test client and configures testing mode.
        """
        self.client = app.test_client()
        app.config["TESTING"] = True

    def test_home(self):
        """
        Test the home route of the Flask application.

        Sends a GET request to the home route and checks for specific HTML elements.
        """
        with self.client as client:
            with client.get("/") as response:
                html = response.get_data(as_text=True)
                self.assertEqual(response.status_code, 200)
                self.assertIn('<title>Home</title>', html)
                self.assertIn('<form action="/board-select">', html)
                self.assertIn('<input type="number" name="board-size" value="5" min="5" max="10" />', html)

    def test_board_select_standard(self):
        """
        Test the board selection route for standard game type.

        Sends a GET request to the board selection route with the standard game type.
        """
        with self.client as client:
            with client.get("/board-select?game-type=standard") as response:
                self.assertEqual(response.status_code, 302)
                with self.client.session_transaction() as session:
                    self.assertTrue(session["boggle_board"])

    def test_board_select_custom(self):
        """
        Test the board selection route for custom game type.

        Sends GET requests with different board sizes to the board selection route.
        """
        with self.client as client:
            for x in range(5, 10):
                with self.subTest(f"Board size: {x}", x=x):
                    with client.get(
                        f"/board-select?game-type=custom&board-size={x}"
                    ) as response:
                        self.assertEqual(response.status_code, 302)
                        with client.session_transaction() as session:
                            self.assertTrue(session["boggle_board"])
                            self.assertEqual(len(session["boggle_board"], x))

    def test_board(self):
        """
        Test the Boggle board route.

        Sends a GET request to the Boggle board route and checks for specific HTML elements.
        """
        with self.client as client:
            with client.get("/board") as response:
                html = response.get_data(as_text=True)
                self.assertEqual(response.status_code, 200)
                self.assertIn('<title>Boggle Board</title>', html)
                self.assertIn('<div id="board">', html)
                self.assertIn('<div id="not-board">', html)

    def test_board_guess(self):
        """
        Test guessing words on the Boggle board.

        Tests various scenarios for word guessing on the Boggle board.
        """
        possible_returns = {
            "ok": "apple",
            "not-on-board": "tact",
            "not-word": "agdfsvjkhlb",
        }
        boggle_board = [
            ["A", "A", "A", "A", "A"],
            ["P", "P", "P", "P", "P"],
            ["P", "P", "P", "P", "P"],
            ["L", "L", "L", "L", "L"],
            ["E", "E", "E", "E", "E"],
        ]
        with self.client as client:
            with client.session_transaction() as session:
                session["boggle_board"] = boggle_board
            for string in possible_returns:
                with self.subTest(f"Expected return: {string}"):
                    with client.get(
                        f"/board-guess?guess={possible_returns[string]}"
                    ) as response:
                        self.assertEqual(response.status_code, 200)
                        self.assertEqual(response.json["result"], string)

    def test_post_score(self):
        """
        Test posting a new score.

        Tests the posting of a new score and checks if it's a new high score.
        """
        with self.client as client:
            with client.session_transaction() as session:
                session["high_score"] = 5
            with client.session_transaction() as session:
                for score in range(0,10):
                    with self.subTest(f"Expected return: {session["high_score"] < score}"):
                        with client.post("/post-score", json = {'score': score}) as response:
                            self.assertEqual(response.status_code, 200)
                            self.assertEqual(response.json["new_record"], session["high_score"] < score)

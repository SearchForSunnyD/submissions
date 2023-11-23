from unittest import TestCase
from app import app


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
        """
        with self.client as client:
            with client.get("/") as response:
                html = response.get_data(as_text=True)
                self.assertEqual(response.status_code, 200)
                self.assertIn("<title>Home</title>", html)
                self.assertIn(
                    '<a href="\\add_user" class="btn btn-secondary">Add User</a>', html
                )

    def test_add_user(self):
        """
        Test the home route of the Flask application.
        """
        with self.client as client:
            with client.get("/add_user") as response:
                html = response.get_data(as_text=True)
                self.assertEqual(response.status_code, 200)
                self.assertIn("<title>Add User</title>", html)
                self.assertIn('<form action="/add_user" method="POST">', html)

    def test_add_user(self):
        """
        Test the home route of the Flask application.
        """
        with self.client as client:
            with client.get("/add_user") as response:
                html = response.get_data(as_text=True)
                self.assertEqual(response.status_code, 200)
                self.assertIn("<title>Add User</title>", html)
                self.assertIn('<form action="/add_user" method="POST">', html)

    def test_user(self):
        """
        Test the home route of the Flask application.
        """
        with self.client as client:
            with client.get("/user/1") as response:
                html = response.get_data(as_text=True)
                self.assertEqual(response.status_code, 200)
                self.assertIn("<title>User</title>", html)
                self.assertIn('<div class="container d-inline-flex p-2">', html)

    def test_user_edit(self):
        """
        Test the user edit route of the Flask application.
        """
        with self.client as client:
            with client.get("/user/1/edit") as response:
                html = response.get_data(as_text=True)
                self.assertEqual(response.status_code, 200)
                self.assertIn("<title>Edit User</title>", html)
                self.assertIn(
                    '<form action="/user/1/edit" method="POST">', html
                )

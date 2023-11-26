import unittest
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import app, db, User, Post, Tag, PostTag


class FlaskAppTestCase(unittest.TestCase):
    def setUp(self):
        app.config["TESTING"] = True
        app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://blogly"
        app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        app.config["SQLALCHEMY_ECHO"] = False

        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def make_test_user(self):
        with app.app_context():
            test_user = User(
                first_name="Test", last_name="User", img_url="test_image.jpg"
            )
            db.session.add(test_user)
            db.session.commit()

    def make_test_post(self):
        self.make_test_user()
        with app.app_context():
            tag1 = Tag(tag_name="Tag 1")
            tag2 = Tag(tag_name="Tag 2")
            tag3 = Tag(tag_name="Tag 3")
            tag4 = Tag(tag_name="Tag 4")
            db.session.add_all([tag1, tag2, tag3, tag4])

            test_post = Post(
                post_owner=1,
                post_title="New Post Title",
                post_text="New Post Text",
            )
            db.session.add(test_post)
            db.session.commit()

    def test_show_home_route(self):
        client = app.test_client()
        response = client.get("/")
        self.assertEqual(response.status_code, 200)

    def test_show_new_user_form_route(self):
        client = app.test_client()
        response = client.get("/add_user")
        self.assertEqual(response.status_code, 200)

    def test_submit_new_user_route(self):
        client = app.test_client()
        response = client.post(
            "/add_user",
            data=dict(
                first_name="John",
                middle_name="Doe",
                last_name="Smith",
                img_url="https://example.com/image.jpg",
            ),
            follow_redirects=True,
        )
        self.assertEqual(response.status_code, 200)

    def test_show_users_route(self):
        client = app.test_client()
        response = client.get("/users")
        self.assertEqual(response.status_code, 200)

    def test_show_user_route(self):
        client = app.test_client()
        self.make_test_user()
        response = client.get("/user/1")
        self.assertEqual(response.status_code, 200)

    def test_edit_user_route(self):
        client = app.test_client()
        self.make_test_user()
        response = client.get("/user/1/edit")
        self.assertEqual(response.status_code, 200)

    def test_edit_user_submit_route(self):
        client = app.test_client()
        self.make_test_user()
        response = client.post(
            "/user/1/edit",
            data=dict(
                first_name="UpdatedFirst",
                middle_name="UpdatedMiddle",
                last_name="UpdatedLast",
                img_url="https://example.com/updated_image.jpg",
            ),
            follow_redirects=True,
        )
        self.assertEqual(response.status_code, 200)

    def test_delete_user_route(self):
        client = app.test_client()
        self.make_test_user()
        response = client.get("/user/1/delete", follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_add_post_route(self):
        client = app.test_client()
        self.make_test_user()
        response = client.get("/user/1/post/new")
        self.assertEqual(response.status_code, 200)

    def test_add_post_submit_route(self):
        client = app.test_client()
        self.make_test_user()
        response = client.post(
            "/user/1/post/new",
            data=dict(
                f_title="New Post Title",
                f_text="New Post Text",
                tags=["1", "2"],
            ),
            follow_redirects=True,
        )
        self.assertEqual(response.status_code, 200)

    def test_show_post_route(self):
        client = app.test_client()
        self.make_test_post()
        response = client.get("/post/1")
        self.assertEqual(response.status_code, 200)

    def test_edit_post_route(self):
        client = app.test_client()
        self.make_test_post()
        response = client.get("/post/1/edit")
        self.assertEqual(response.status_code, 200)

    def test_edit_post_submit_route(self):
        client = app.test_client()
        self.make_test_post()
        response = client.post(
            "/post/1/edit",
            data=dict(
                f_title="Updated Post Title",
                f_text="Updated Post Text",
                tags=["3", "4"],
            ),
            follow_redirects=True,
        )
        self.assertEqual(response.status_code, 200)

    def test_delete_post_route(self):
        client = app.test_client()
        self.make_test_post()
        response = client.get("/post/1/delete", follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_show_tags_route(self):
        client = app.test_client()
        response = client.get("/tags")
        self.assertEqual(response.status_code, 200)

    def test_show_add_tag_route(self):
        client = app.test_client()
        response = client.get("/tag/new")
        self.assertEqual(response.status_code, 200)

    def test_submit_add_tag_route(self):
        client = app.test_client()
        response = client.post(
            "/tag/new", data=dict(tag_name="New Tag"), follow_redirects=True
        )
        self.assertEqual(response.status_code, 200)

    def test_show_tag_route(self):
        client = app.test_client()
        self.make_test_post()
        response = client.get("/tag/1")
        self.assertEqual(response.status_code, 200)

    def test_show_edit_tag_route(self):
        client = app.test_client()
        self.make_test_post()
        response = client.get("/tag/1/edit")
        self.assertEqual(response.status_code, 200)

    def test_edit_tag_submit_route(self):
        client = app.test_client()
        self.make_test_post()
        response = client.post(
            "/tag/1/edit", data=dict(tag_name="Updated Tag"), follow_redirects=True
        )
        self.assertEqual(response.status_code, 200)

"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime as curr_time

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


default_img = "https://www.detroitnews.com/gcdn/presto/2022/09/13/PDTN/41e554ae-5609-4660-8080-a24decd399b7-IMG_1593.jpeg?crop=1134,1512,x604,y0"


class User(db.Model):
    """User."""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.Text, nullable=False)
    middle_name = db.Column(db.Text)
    last_name = db.Column(db.Text, nullable=False)
    img_url = db.Column(db.Text, nullable=False, default=default_img)

    posts = db.relationship("Post", backref="users", cascade="all, delete-orphan")

    @property
    def full_name(self):
        name = self.first_name
        if self.middle_name:
            name += f" {self.middle_name}"
        name += f" {self.last_name}"

        return name

    def __repr__(self):
        """Show info about user."""

        u = self
        return f"<User {u.id} {u.first_name} {u.middle_name} {u.last_name} {u.img_url}>"


class Post(db.Model):
    """Post."""

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    post_owner = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_date = db.Column(
        db.Text, default=f'{curr_time.now().strftime("%a %b %d %Y, %I:%M:%S %p")}'
    )
    post_title = db.Column(db.Text, nullable=False)
    post_text = db.Column(db.Text, nullable=False)

    owner = db.relationship("User", back_populates="posts")
    tags = db.relationship("Tag", secondary="post_tags", backref="posts")

    def __repr__(self):
        """Show info about post."""

        p = self
        return (
            f"<Post {p.id} {p.post_owner} {p.post_date} {p.post_title} {p.post_text}>"
        )


class Tag(db.Model):
    """Tags."""

    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tag_name = db.Column(db.Text, nullable=False, unique=True)

    def __repr__(self):
        """Show info about post."""

        t = self
        return f"<Tag {t.id} {t.tag_name}>"


class PostTag(db.Model):
    """Post Tag link."""

    __tablename__ = "post_tags"

    post_id = db.Column(
        db.Integer, db.ForeignKey("posts.id"), primary_key=True, nullable=False
    )
    tag_id = db.Column(
        db.Integer, db.ForeignKey("tags.id"), primary_key=True, nullable=False
    )

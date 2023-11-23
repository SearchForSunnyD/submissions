"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy

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

    @property
    def full_name(self):
        name = self.first_name
        if self.middle_name:
            name += f" {self.middle_name}"
        name += f" {self.last_name}"

        return name

    def __repr__(self):
        """Show info about user."""

        p = self
        return f"<User {p.id} {p.first_name} {p.middle_name} {p.last_name} {p.img_url}>"

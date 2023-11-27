"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    """Connect the database to the Flask app."""
    db.app = app
    db.init_app(app)


default_img = "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00ODNiYXRjaDItZWxlbWVudC1zLTA0MC14LmpwZw.jpg"


class Pet(db.Model):
    """Pet model representing pets available for adoption."""

    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pet_name = db.Column(db.Text, nullable=False, doc="Name of the pet.")
    species = db.Column(db.Text, nullable=False, doc="Species of the pet.")
    img_url = db.Column(
        db.Text, nullable=True, default=default_img, doc="URL of the pet's photo."
    )
    age = db.Column(db.Integer, nullable=True, doc="Age of the pet in years.")
    notes = db.Column(db.Text, nullable=True, doc="Additional notes about the pet.")
    available = db.Column(
        db.Boolean, nullable=False, default=True, doc="Availability status of the pet."
    )

    def __repr__(self):
        """Show information about the pet."""
        return f"<Pet {self.id} {self.pet_name} {self.species} {self.age} {self.notes} {self.img_url}>"

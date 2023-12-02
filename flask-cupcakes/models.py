"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    """Connect the database to the Flask app."""
    db.app = app
    db.init_app(app)


default_img = "https://www.svgheart.com/wp-content/uploads/2020/06/cupcake-silhouette-free-svg-cut-file.png"


class Cupcake(db.Model):
    """Cupcake model representing cupcakes available for adoption."""

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.Text, nullable=False, doc="Falvor of the cupcake.")
    size = db.Column(db.Text, nullable=False, doc="Species of the cupcake.")
    rating = db.Column(db.Float, nullable=False, doc="Rating of the cupcake.")
    image = db.Column(
        db.Text, nullable=False, default=default_img, doc="URL of the cupcake's image."
    )

    def __repr__(self):
        """Show information about the cupcake."""
        return f"<Cupcake Id: {self.id} Flavor: {self.flavor} Size: {self.size} Rating: {self.rating} Image: {self.image}>"

    def serialize(cupcake):
        """Serialize this objects data into a JSON readable format"""
        return {
            "id": cupcake.id,
            "flavor": cupcake.flavor,
            "size": cupcake.size,
            "rating": cupcake.rating,
            "image": cupcake.image,
        }

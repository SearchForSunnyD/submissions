from flask_wtf import FlaskForm

from wtforms import StringField, URLField, SelectField, FloatField

from wtforms.validators import (
    InputRequired,
    Optional,
    URL,
    AnyOf,
)

sizes = [("small", "small"), ("medium", "medium"), ("large", "large")]


class CupcakeForm(FlaskForm):
    """A form for adding/editing a new cupcake."""

    flavor = StringField("Flavor", validators=[InputRequired()])
    size = SelectField(
        "Sizes",
        choices=sizes,
        validators=[
            InputRequired(),
            AnyOf([choice[0] for choice in sizes], message="Invalid size."),
        ],
        description="Select the size of the cupcake.",
    )
    rating = FloatField(
        "Rating",
        validators=[InputRequired()],
        description="Set the rating of the cupcake.",
    )
    image = URLField(
        "Photo URL",
        validators=[Optional(), URL()],
        description="Provide a URL for the cupcake's photo (optional).",
    )

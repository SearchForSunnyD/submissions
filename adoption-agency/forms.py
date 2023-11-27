from flask_wtf import FlaskForm

from wtforms import (
    StringField,
    URLField,
    IntegerField,
    TextAreaField,
    SelectField,
    BooleanField,
)

from wtforms.validators import (
    InputRequired,
    Optional,
    URL,
    AnyOf,
    NumberRange,
)

pet_types = [
    ("Dog", "Dog"),
    ("Cat", "Cat"),
    ("Fish", "Fish"),
    ("Bird", "Bird"),
    ("Hamster", "Hamster"),
    ("Guinea Pig", "Guinea Pig"),
    ("Rabbit", "Rabbit"),
    ("Turtle", "Turtle"),
    ("Snake", "Snake"),
    ("Lizard", "Lizard"),
    ("Ferret", "Ferret"),
    ("Horse", "Horse"),
    ("Gerbil", "Gerbil"),
    ("Chinchilla", "Chinchilla"),
    ("Parrot", "Parrot"),
    ("Mouse", "Mouse"),
    ("Rat", "Rat"),
    ("Hedgehog", "Hedgehog"),
    ("Tarantula", "Tarantula"),
    ("Frog", "Frog"),
    ("Porcupine", "Porcupine"),
    ("Sugar Glider", "Sugar Glider"),
    ("Sloth", "Sloth"),
    ("Serval", "Serval"),
    ("Fennec Fox", "Fennec Fox"),
    ("Axolotl", "Axolotl"),
    ("Kangaroo", "Kangaroo"),
    ("Coati", "Coati"),
    ("Meerkat", "Meerkat"),
    ("Capuchin Monkey", "Capuchin Monkey"),
    ("Armadillo", "Armadillo"),
    ("Skunk", "Skunk"),
]


class AddPetForm(FlaskForm):
    """A form for adding a new pet to the adoption page."""

    pet_name = StringField("Name", validators=[InputRequired()])
    species = SelectField(
        "Species",
        choices=pet_types,
        validators=[
            InputRequired(),
            AnyOf([choice[0] for choice in pet_types], message="Invalid species."),
        ],
        description="Select the species of the pet.",
    )
    img_url = URLField(
        "Photo URL",
        validators=[Optional(), URL()],
        description="Provide a URL for the pet's photo (optional).",
    )
    age = IntegerField(
        "Age",
        validators=[InputRequired(), NumberRange(min=0)],
        description="Enter the age of the pet in years.",
    )
    notes = TextAreaField(
        "Notes",
        validators=[Optional()],
        description="Add any additional notes about the pet (optional).",
    )


class EditPetForm(FlaskForm):
    """A form to edit an existing pet's information."""

    pet_name = StringField("Name", validators=[InputRequired()])
    img_url = URLField(
        "Photo URL",
        validators=[Optional(), URL()],
        description="Update the URL for the pet's photo (optional).",
    )
    age = IntegerField(
        "Age",
        validators=[InputRequired(), NumberRange(min=0)],
        description="Update the age of the pet in years.",
    )

    notes = TextAreaField(
        "Notes",
        validators=[Optional()],
        description="Update any additional notes about the pet (optional).",
    )
    available = BooleanField(
        "Availability",
        description="Update the pet's availabilty.",
    )

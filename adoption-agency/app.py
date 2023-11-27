from flask import Flask, render_template, redirect, flash
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///adoption_agency"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = False

app.secret_key = "super_secret"


connect_db(app)
with app.app_context():
    db.create_all()


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 page."""
    return render_template("404.html"), 404


@app.route("/")
def show_home():
    """
    Display the home page.
    """
    pets = Pet.query.all()
    return render_template("home.html", pets=pets)


@app.route("/pet/<int:id>")
def show_pet_page(id):
    """
    Display a pet's page.
    """
    pet = Pet.query.get_or_404(id)
    return render_template("pet_page.html", pet=pet)


@app.route("/pet/<int:id>/adopt")
def adopt_pet(id):
    """
    Update a pet's page.
    """
    pet = Pet.query.get_or_404(id)
    pet.available = False
    db.session.commit()
    flash(f"{pet.pet_name} has been Adopted")
    return redirect("/")


@app.route("/add", methods=["GET", "POST"])
def add_pet():
    """
    Display or submit the add pet form.
    """

    form = AddPetForm()
    if form.validate_on_submit():
        new_pet = Pet()
        for field in form:
            setattr(new_pet, field.name, field.data)
        db.session.add(new_pet)
        db.session.commit()

        flash(f"Added {new_pet.pet_name} to listings")
        return redirect("/")

    else:
        return render_template("add_form.html", form=form)


@app.route("/pet/<int:id>/edit", methods=["GET", "POST"])
def edit_pet(id):
    """
    Display or submit the edit pet form.
    """
    pet = Pet.query.get_or_404(id)

    form = EditPetForm(obj=pet)
    data = form.data
    data.pop("csrf_token")

    if form.validate_on_submit():
        for field in form:
            setattr(pet, field.name, field.data)
        db.session.commit()

        flash(f"Updated {pet.pet_name}")
        return redirect(f"/pet/{pet.id}")

    else:
        return render_template("edit_form.html", form=form, pet=pet)

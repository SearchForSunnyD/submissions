"""Flask app for Cupcakes"""
from flask import Flask, render_template, jsonify, request, make_response
from models import db, connect_db, Cupcake
from forms import CupcakeForm

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///cupcake_bakery"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = False

app.secret_key = "super_secret"


connect_db(app)
with app.app_context():
    db.create_all()


@app.route("/")
def show_home():
    """
    Display the home page.
    """
    form = CupcakeForm()
    return render_template("home.html", form=form)


@app.route("/api/cupcakes", methods=["GET"])
def return_cupcakes():
    """
    Return all cupcakes that can be edited
    """
    cupcakes = Cupcake.query.all()
    response = jsonify(cupcakes=[obj.serialize() for obj in cupcakes])
    return response


@app.route("/api/cupcakes", methods=["POST"])
def add_cupcakes():
    """
    Add a cupcake
    """

    new_cupcake = Cupcake(**request.json)

    db.session.add(new_cupcake)
    db.session.commit()

    response = make_response(jsonify(cupcake=new_cupcake.serialize()), 201)
    response.headers["Location"] = f"/api/cupcakes/{new_cupcake.id}"

    return response


@app.route("/api/cupcakes/<int:id>", methods=["GET"])
def respond_cupcake(id):
    """
    Send a cupcakes data as Json
    """
    cupcake = Cupcake.query.get_or_404(id)

    response = jsonify(cupcake=cupcake.serialize())
    return response


@app.route("/api/cupcakes/<int:id>", methods=["PATCH"])
def edit_cupcake(id):
    """
    Send a cupcakes data as Json
    """
    cupcake = Cupcake.query.get_or_404(id)

    for field in request.json:
        setattr(cupcake, field, request.json[field])

    db.session.commit()

    response = make_response("", 204)

    return response


@app.route("/api/cupcakes/<int:id>", methods=["DELETE"])
def delete_cupcake(id):
    """
    Send a cupcakes data as Json
    """
    cupcake = Cupcake.query.get_or_404(id)

    db.session.delete(cupcake)
    db.session.commit()

    response = make_response(jsonify(message="Deleted"), 204)

    return response

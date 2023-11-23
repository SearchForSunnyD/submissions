"""Blogly application."""

from flask import Flask, render_template, redirect, request

from models import db, connect_db, User

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///blogly"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True


connect_db(app)
with app.app_context():
    db.create_all()


@app.route("/")
def show_home():
    """
    Display the home page.
    """
    return redirect("/users")


@app.route("/users")
def show_users():
    """
    Display the current list of users.
    """
    users = User.query.order_by("last_name", "first_name")
    return render_template("users.html", users=users)


@app.route("/user/<int:user_id>")
def show_user(user_id):
    """
    Display the home page.
    """
    user = User.query.get_or_404(user_id)
    return render_template("user.html", user=user)


@app.route("/user/<int:user_id>/edit")
def edit_user(user_id):
    """
    Display the home page.
    """
    user = User.query.get_or_404(user_id)
    return render_template("edit_user.html", user=user, user_id=user_id)


@app.route("/user/<int:user_id>/edit", methods=["POST"])
def edit_user_submit(user_id):
    """
    Display the home page.
    """
    user = User.query.get_or_404(user_id)

    user.first_name = request.form["first_name"]
    user.middle_name = request.form["middle_name"]
    user.last_name = request.form["last_name"]
    user.img_url = request.form["img_url"]

    db.session.commit()

    return redirect(f"/user/{user_id}")


@app.route("/user/<int:user_id>/delete")
def delete_user(user_id):
    """
    Display the home page.
    """
    user = User.query.get_or_404(user_id)

    db.session.delete(user)
    db.session.commit()

    return redirect("/users")


@app.route("/add_user")
def show_new_user_form():
    """
    Display the add user page.
    """
    return render_template("add_user.html")


@app.route("/add_user", methods=["POST"])
def submit_new_user():
    """
    Add user to DB.
    """
    new_user = User(
        first_name=request.form["first_name"],
        middle_name=request.form["middle_name"],
        last_name=request.form["last_name"],
        img_url=request.form["img_url"] or None,
    )

    db.session.add(new_user)
    db.session.commit()

    return redirect("/users")

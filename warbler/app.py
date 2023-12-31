import os

from flask import Flask, render_template, request, flash, redirect, session, g, url_for

# from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy.exc import IntegrityError

from forms import UserAddForm, LoginForm, MessageForm, UserEditForm
from models import db, connect_db, User, Message

CURR_USER_KEY = "curr_user"

app = Flask(__name__)

# Get DB_URI from environ variable (useful for production/testing) or,
# if not set there, use development local db.
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "postgresql:///warbler"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = False
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = True
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "it's a secret")
# toolbar = DebugToolbarExtension(app)

connect_db(app)


##############################################################################
# User signup/login/logout


@app.before_request
def add_user_to_g():
    """If we're logged in, add curr user to Flask global."""

    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])

    else:
        g.user = None


def login_required(view):
    def wrapped_view(*args, **kwargs):
        if g.user is None:
            flash("Access unauthorized.", "danger")
            return redirect(url_for("homepage"))
        return view(*args, **kwargs)

    return wrapped_view


def do_login(user):
    """Log in user."""

    session[CURR_USER_KEY] = user.id


def do_logout():
    """Logout user."""

    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]


def toggle_like(message):
    if message in g.user.likes:
        g.user.likes.remove(message)
    else:
        g.user.likes.append(message)
    db.session.commit()


@app.route("/signup", methods=["GET", "POST"])
def signup():
    """Handle user signup.

    Create new user and add to DB. Redirect to home page.

    If form not valid, present form.

    If the there already is a user with that username: flash message
    and re-present form.
    """

    form = UserAddForm()

    if form.validate_on_submit():
        try:
            user = User.signup(
                username=form.username.data,
                password=form.password.data,
                email=form.email.data,
                image_url=form.image_url.data or User.image_url.default.arg,
            )
            db.session.commit()

        except IntegrityError:
            flash("Username already taken", "danger")
            return render_template("users/signup.html", form=form)

        do_login(user)

        return redirect(url_for("homepage"))

    else:
        return render_template("users/signup.html", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Handle user login."""

    form = LoginForm()

    if form.validate_on_submit():
        user = User.authenticate(form.username.data, form.password.data)

        if user:
            do_login(user)
            flash(f"Hello, {user.username}!", "success")
            return redirect(url_for("homepage"))

        flash("Invalid credentials.", "danger")

    return render_template("users/login.html", form=form)

@login_required
@app.route("/logout")
def logout():
    """Handle logout of user."""

    do_logout()
    flash(f"Goodbye!", "success")
    return redirect(url_for("login"))


##############################################################################
# General user routes:

@login_required
@app.route("/users")
def list_users():
    """Page with listing of users.

    Can take a 'q' param in querystring to search by that username.
    """

    search = request.args.get("q")

    if not search:
        users = User.query.all()
    else:
        users = User.query.filter(User.username.like(f"%{search}%")).all()

    return render_template("users/index.html", users=users)

@login_required
@app.route("/users/<int:user_id>")
def users_show(user_id):
    """Show user profile."""

    user = User.query.get_or_404(user_id)

    # snagging messages in order from the database;
    # user.messages won't be in order by default
    messages = (
        Message.query.filter(Message.user_id == user_id)
        .order_by(Message.timestamp.desc())
        .limit(100)
        .all()
    )
    return render_template("users/show.html", user=user, messages=messages)

@login_required
@app.route("/users/<int:user_id>/following")
def show_following(user_id):
    """Show list of people this user is following."""

    user = User.query.get_or_404(user_id)
    return render_template("users/following.html", user=user)

@login_required
@app.route("/users/<int:user_id>/followers")
def users_followers(user_id):
    """Show list of followers of this user."""

    user = User.query.get_or_404(user_id)
    return render_template("users/followers.html", user=user)

@login_required
@app.route("/users/follow/<int:follow_id>", methods=["POST"])
def add_follow(follow_id):
    """Add a follow for the currently-logged-in user."""

    followed_user = User.query.get_or_404(follow_id)
    g.user.following.append(followed_user)
    db.session.commit()

    return redirect(url_for("show_following", user_id=g.user.id))

@login_required
@app.route("/users/stop-following/<int:follow_id>", methods=["POST"])
def stop_following(follow_id):
    """Have currently-logged-in-user stop following this user."""

    followed_user = User.query.get(follow_id)
    g.user.following.remove(followed_user)
    db.session.commit()

    return redirect(url_for("show_following", user_id=g.user.id))

@login_required
@app.route("/users/<int:user_id>/liked")
def show_liked(user_id):
    """Show list of people this user is following."""

    user = User.query.get_or_404(user_id)

    if user.likes == []:
        flash("User has no liked messages.", "warning")
        redirect(url_for("users_show", user_id=user_id))

    return render_template("users/liked.html", user=user)

@login_required
@app.route("/users/toggle_like/<int:message_id>", methods=["POST"])
def toggle_liked_post(message_id):
    message = Message.query.get_or_404(message_id)
    if message.user_id == g.user.id:
        flash("You cant like your own messages.", "warning")
        return redirect(url_for("homepage"))
    else:
        toggle_like(message)

    return redirect(url_for("homepage"))

@login_required
@app.route("/users/profile", methods=["GET", "POST"])
def profile():
    """Update profile for current user."""

    user = User.query.get_or_404(g.user.id)
    form = UserEditForm(obj=user)

    if form.validate_on_submit():
        if not User.authenticate(user.username, form.password.data):
            flash("Wrong password.", "danger")
            return redirect(url_for("homepage"))

        for field in form:
            if field.name != "password" and field.data != "":
                setattr(user, field.name, field.data)
        db.session.commit()

        return redirect(url_for("users_show", user_id=g.user.id))

    return render_template("users/edit.html", form=form)

@login_required
@app.route("/users/delete", methods=["POST"])
def delete_user():
    """Delete user."""

    do_logout()

    db.session.delete(g.user)
    db.session.commit()

    return redirect(url_for("signup"))


##############################################################################
# Messages routes:

@login_required
@app.route("/messages/new", methods=["GET", "POST"])
def messages_add():
    """Add a message:

    Show form if GET. If valid, update message and redirect to user page.
    """

    form = MessageForm()

    if form.validate_on_submit():
        msg = Message(text=form.text.data)
        g.user.messages.append(msg)
        db.session.commit()

        return redirect(url_for("users_show", user_id=g.user.id))

    return render_template("messages/new.html", form=form)

@login_required
@app.route("/messages/<int:message_id>", methods=["GET"])
def messages_show(message_id):
    """Show a message."""

    msg = Message.query.get(message_id)
    return render_template("messages/show.html", message=msg)

@login_required
@app.route("/messages/<int:message_id>/delete", methods=["POST"])
def messages_destroy(message_id):
    """Delete a message."""

    msg = Message.query.get(message_id)
    db.session.delete(msg)
    db.session.commit()

    return redirect(url_for("users_show", user_id=g.user.id))


##############################################################################
# Homepage and error pages


@app.route("/")
def homepage():
    """Show homepage:

    - anon users: no messages
    - logged in: 100 most recent messages of followed_users
    """

    if g.user:
        user_ids_to_query = [user.id for user in g.user.following] + [g.user.id]

        messages = (
            Message.query.filter(Message.user_id.in_(user_ids_to_query))
            .order_by(Message.timestamp.desc())
            .limit(100)
            .all()
        )

        likes = [like.id for like in g.user.likes]

        return render_template("home.html", messages=messages, likes=likes)

    else:
        return render_template("home-anon.html")


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 page."""
    return render_template("404.html"), 404


##############################################################################
# Turn off all caching in Flask
#   (useful for dev; in production, this kind of stuff is typically
#   handled elsewhere)
#
# https://stackoverflow.com/questions/34066804/disabling-caching-in-flask


@app.after_request
def add_header(req):
    """Add non-caching headers on every request."""

    req.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    req.headers["Pragma"] = "no-cache"
    req.headers["Expires"] = "0"
    req.headers["Cache-Control"] = "public, max-age=0"
    return req

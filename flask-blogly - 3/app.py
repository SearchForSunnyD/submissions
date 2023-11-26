"""Blogly application."""

from flask import Flask, render_template, redirect, request

from sqlalchemy import desc

from models import db, connect_db, User, Post, Tag, PostTag

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///blogly"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = False


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
    posts = Post.query.order_by(desc("post_date")).limit(5)
    return render_template("home.html", posts=posts)


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
    Display the users page.
    """
    user = User.query.get_or_404(user_id)
    posts = Post.query.filter_by(post_owner=user_id)
    return render_template("user.html", user=user, posts=posts)


@app.route("/user/<int:user_id>/edit")
def edit_user(user_id):
    """
    Display the user edit page.
    """
    user = User.query.get_or_404(user_id)
    return render_template("edit_user.html", user=user)


@app.route("/user/<int:user_id>/edit", methods=["POST"])
def edit_user_submit(user_id):
    """
    Edit user.
    """
    user = User.query.get_or_404(user_id)

    user.first_name = request.form["first_name"]
    user.middle_name = request.form["middle_name"]
    user.last_name = request.form["last_name"]
    user.img_url = request.form["img_url"]

    db.session.commit()

    return redirect(f"/user/{user.id}")


@app.route("/user/<int:user_id>/delete")
def delete_user(user_id):
    """
    Delete User.
    """
    user = User.query.get_or_404(user_id)

    db.session.delete(user)
    db.session.commit()

    return redirect("/users")


@app.route("/user/<int:user_id>/post/new")
def add_post(user_id):
    """
    Display the new post form page.
    """
    user = User.query.get_or_404(user_id)
    tags = Tag.query.order_by("id")
    return render_template("add_post.html", user=user, tags=tags)


@app.route("/user/<int:user_id>/post/new", methods=["POST"])
def add_post_submit(user_id):
    """
    Post post.
    """
    new_post = Post(
        post_owner=user_id,
        post_title=request.form["f_title"],
        post_text=request.form["f_text"],
    )
    db.session.add(new_post)
    db.session.commit()

    for tag in request.form.getlist("tags"):
        add_tag = PostTag(post_id=new_post.id, tag_id=tag)
        db.session.add(add_tag)

    return redirect(f"/user/{user_id}")


@app.route("/post/<int:post_id>")
def show_post(post_id):
    """
    Display the selected post.
    """
    post = Post.query.get_or_404(post_id)
    return render_template("post.html", post=post)


@app.route("/post/<int:post_id>/edit")
def edit_post(post_id):
    """
    Display the post edit page.
    """
    post = Post.query.get_or_404(post_id)
    tags = Tag.query.order_by("id")
    return render_template("edit_post.html", post=post, tags=tags)


@app.route("/post/<int:post_id>/edit", methods=["POST"])
def edit_post_submit(post_id):
    """
    Edit the post.
    """
    post = Post.query.get_or_404(post_id)

    post.post_title = request.form["f_title"]
    post.post_text = request.form["f_text"]

    PostTag.query.filter_by(post_id=post_id).delete()

    for tag in request.form.getlist("tags"):
        add_tag = PostTag(post_id=post_id, tag_id=tag)
        db.session.add(add_tag)

    db.session.commit()

    return redirect(f"/post/{post.id}")


@app.route("/post/<int:post_id>/delete")
def delete_post(post_id):
    """
    Delete Post.
    """
    post = Post.query.get_or_404(post_id)

    db.session.delete(post)
    db.session.commit()

    return redirect("/")


@app.route("/tags")
def show_tags():
    """
    Display the current list of tags.
    """
    tags = Tag.query.order_by("tag_name")
    return render_template("tags.html", tags=tags)


@app.route("/tag/new")
def show_add_tag():
    """
    Add a tag.
    """
    return render_template("add_tag.html")


@app.route("/tag/new", methods=["POST"])
def submit_add_tag():
    """
    Submit added tag.
    """

    new_tag = Tag(
        tag_name=request.form["tag_name"],
    )

    db.session.add(new_tag)
    db.session.commit()

    return redirect("/tags")


@app.route("/tag/<int:tag_id>")
def show_tag(tag_id):
    """
    Add a tag.
    """
    tag = Tag.query.get_or_404(tag_id)

    return render_template("tag.html", tag=tag)


@app.route("/tag/<int:tag_id>/edit")
def show_edit_tag(tag_id):
    """
    Show tag details.
    """
    tag = Tag.query.get_or_404(tag_id)

    return render_template("edit_tag.html", tag=tag)


@app.route("/tag/<int:tag_id>/edit", methods=["POST"])
def edit_tag_submit(tag_id):
    """
    Edit the Tag.
    """
    tag = Tag.query.get_or_404(tag_id)

    tag.tag_name = request.form["tag_name"]

    db.session.commit()

    return redirect(f"/tag/{tag.id}")


@app.route("/tag/<int:tag_id>/delete")
def delete_tag(tag_id):
    """
    Delete the Tag.
    """
    tag = Tag.query.get_or_404(tag_id)

    db.session.delete(tag)
    db.session.commit()

    return redirect("/")

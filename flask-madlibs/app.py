from flask import Flask, request, render_template
from handler import Interface
from stories import Story

app = Flask(__name__)
database = Interface("mad_libs")

@app.route("/")
def show_home():
    stories = database.getStoryIDs()
    return render_template("home.html", stories = stories)

@app.route("/story-form/<story>")
def show_form(story):
    form_data = database.retrieveStory(story)
    return render_template("story-form.html", form_data = form_data, id = story)

@app.route("/story")
def show_story():
    text = database.retrieveStory(request.args.get("id")).generate(request.args)
    return render_template("story.html", text = text)

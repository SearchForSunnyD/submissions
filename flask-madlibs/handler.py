from stories import Story
from false_db import Totally_a_database

class Interface:
    """A simple interface for managing stories using Totally_a_database."""

    def __init__(self, string):
        """
        Initialize the interface.

        Args:
            string (str): The name of the JSON file used for data storage.
        """
        self.db = Totally_a_database(string)

    def getStoryIDs(self):
        """
        Get the IDs of all stories in the database.

        Returns:
            list: A list of story IDs.
        """
        return list(self.db.data.keys())

    def addStory(self, id, story):
        """
        Add a story to the database.

        Args:
            id (str): The unique identifier for the story.
            story (Story): The story to add to the database.
        """
        self.db.add(id, self.storyPacker(story))

    def retrieveStory(self, id):
        """
        Retrieve a story from the database.

        Args:
            id (str): The unique identifier of the story to retrieve.

        Returns:
            Story: The retrieved story.
        """
        return self.storyUnpacker(id)

    def storyPacker(self, story):
        """
        Pack a Story object into a dictionary.

        Args:
            story (Story): The Story object to pack.

        Returns:
            dict: A dictionary containing story prompts and template.
        """
        return {'prompts': story.prompts, 'template': story.template}

    def storyUnpacker(self, id):
        """
        Unpack a story from a dictionary and create a Story object.

        Args:
            id (str): The unique identifier of the story to unpack.

        Returns:
            Story: The unpacked Story object.
        """
        return Story(self.db.data[id]['prompts'], self.db.data[id]['template'])

from json import load, dump
from os import path

class Totally_a_database:
    """
    Simulate the existence of a server-based database.

    Attributes:
        file_name (str): The name of the JSON file used for data storage.
        data (dict): The data stored in the database as a dictionary.
    """

    def __init__(self, file_name):
        """
        Initialize the database.

        Args:
            file_name (str): The name of the JSON file to be used for data storage.
        """
        self.file_name = f'{file_name}.json'
        if path.exists(self.file_name):
            """If the file exists, open and retrieve data"""
            with open(self.file_name, "r") as file:
                self.data = load(file)
            print("Data loaded from file.json:", self.data)
        else:
            """If the file doesn't exist, create a new JSON file"""
            open(self.file_name, "w")
            print("New file.json created")
            self.data = {}

    def contains(self, id):
        """
        Check if a key exists in the database.

        Args:
            id: The key to check.

        Returns:
            bool: True if the key exists in the database, False otherwise.
        """
        return id in self.data

    def add(self, id, data):
        """
        Add an item to the database if the key does not already exist.

        Args:
            id: The key to add.
            data: The data associated with the key.
        """
        if self.contains(id):
            print("This key is already taken", id)
        else:
            self.data[id] = data
        self.save()

    def overwrite(self, id, data):
        """
        Overwrite an item in the database if the key already exists.

        Args:
            id: The key to overwrite.
            data: The new data to associate with the key.
        """
        if not self.contains(id):
            print("This key is not taken", id)
        else:
            self.data[id] = data
        self.save()

    def remove(self, id):
        """
        Remove a key and its associated data from the database.

        Args:
            id: The key to remove.
        """
        if self.contains(id):
            print(self.data.pop(id))
        else:
            print(f"The key '{id}' is not in the database.")
        self.save()

    def save(self):
        """
        Save the database data to the JSON file.
        """
        with open(self.file_name, "w") as file:
            dump(self.data, file)

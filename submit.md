# Recipe Sharing Platform Documentation

## Overview

This web application is a recipe sharing platform built using Flask, a Python web framework. It allows users to sign up, log in, search for recipes, and view recipe details.

## Tools Used

- **Flask**: Flask is a lightweight web framework for Python. It provides the necessary tools to create web applications quickly and easily.

- **Flask-WTF**: Flask-WTF is an extension for Flask that integrates WTForms, a flexible form rendering and validation library, with Flask.

- **SQLAlchemy**: SQLAlchemy is a Python SQL toolkit and Object-Relational Mapping (ORM) library. It provides a high-level interface for interacting with relational databases.

- **Flask-SQLAlchemy**: Flask-SQLAlchemy is an extension for Flask that simplifies database integration by providing SQLAlchemy support.

- **Flask-Bcrypt**: Flask-Bcrypt is an extension for Flask that provides bcrypt hashing utilities for password hashing.

## Code Overview

### Database Models

- The `User`, `Recipe`, `Filter`, and `FilterType` classes define the database models for users, recipes, filters, and filter types, respectively.

- SQLAlchemy is used for database management, and relationships between models are defined using foreign keys and back references.

### Forms

- Flask-WTF is used to define forms for user registration, login, and query filtering.

- The `UserAddForm`, `LoginForm`, and `FilterForm` classes represent forms for adding users, logging in, and filtering search queries, respectively.

  - **Note**: The `FilterForm` cleverly includes dynamically generated filter fields based on database values using the `build_filters` function.

### API Integration

- The `Handler` class handles API queries for recipe information.

- It interacts with an external API (Edamam) to fetch recipe data based on user queries.

- The `api_query` method queries the API based on search criteria and updates the list of recipes.

### Miscellaneous

- The code includes error handling for 404 (page not found) errors.

## Usage

1. Users can sign up for an account using the provided form.

2. Once logged in, users can search for recipes using the search form.

3. The search results are displayed along with filter options for refining the search.

4. Users can click on a recipe to view its details.

5. Users can log out of their account using the provided logout functionality.

## Conclusion

This Flask-based recipe sharing platform provides users with an intuitive interface for discovering and sharing recipes. With its integration of Flask, SQLAlchemy, and Flask-WTF, it offers a robust and efficient solution for searching for recipes, and accessing recipe details. The dynamic creation of filter fields in the `FilterForm` enhances the user experience by allowing flexible and interactive recipe searches. The application is live and can be accessed [here](https://recipe-site-yveh.onrender.com).

---

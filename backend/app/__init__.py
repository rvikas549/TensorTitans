# app/__init__.py
from flask import Flask

def create_app():
    app = Flask(__name__)

    with app.app_context():
        # Import and register the routes (API endpoints)
        from . import routes

    return app
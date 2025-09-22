# app/__init__.py
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    with app.app_context():
        # Import and register the routes (API endpoints)
        from . import routes

    return app
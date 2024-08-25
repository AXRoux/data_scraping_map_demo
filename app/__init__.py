from flask import Flask
from config import Config
import sqlite3

def get_db():
    db = sqlite3.connect('app.db')
    db.row_factory = sqlite3.Row
    return db

def create_app():
    app = Flask(__name__, static_folder='static', static_url_path='/static')
    app.config.from_object(Config)

    from app import routes
    app.register_blueprint(routes.main)

    return app
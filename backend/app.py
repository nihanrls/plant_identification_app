from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

from config import Config

load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    from upload import upload_bp
    app.register_blueprint(upload_bp)

    @app.route("/")
    def home():
        return "Welcome to the Plant Recognition Application"

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)

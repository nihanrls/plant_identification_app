from flask import Flask
from dotenv import load_dotenv
import os
from extensions import db
from config import Config
from flask_cors import CORS
from flask_migrate import Migrate
from upload import upload_bp
from plant import Plant

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['DEBUG'] = True
    CORS(app)

    db.init_app(app)
    migrate = Migrate(app, db)

    from upload import upload_bp
    app.register_blueprint(upload_bp)

    @app.route("/")
    def home():
        return "Welcome to the Plant Recognition Application"

    return app

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

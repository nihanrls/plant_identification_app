from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv
import os
from extensions import db
from config import Config
from flask_cors import CORS
from flask_migrate import Migrate
from plant import Plant
from werkzeug.utils import secure_filename
import time

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['DEBUG'] = True
    CORS(app, resources={
        r"/*": {
            "origins": ["http://localhost:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE"],
            "allow_headers": ["Content-Type"]
        }
    })

    db.init_app(app)
    migrate = Migrate(app, db)

    from upload import upload_bp
    app.register_blueprint(upload_bp)

    @app.route("/")
    def home():
        return "Welcome to the Plant Recognition Application"

    @app.route('/api/plants/', methods=['GET'])
    def get_plants():
        try:
            plants = Plant.query.order_by(Plant.id.desc()).all()
            
            plant_list = []
            for plant in plants:
                plant_list.append({
                    'id': plant.id,
                    'name': plant.common_name,
                    'scientific_name': plant.scientific_name,
                    'image_filename': plant.image_filename,
                    'care_instructions': plant.care_instructions
                })
            
            return jsonify(plant_list)
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @app.route('/api/plants/', methods=['POST'])
    def add_plant():
        data = request.json
        return jsonify({"message": "Plant added successfully", "data": data}), 201

    @app.route('/api/uploads/', methods=['POST'])
    def upload_image():
        if 'image' not in request.files:
            return jsonify({"error": "No image found"}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        upload_folder = 'uploads'
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)

        filename = f"{int(time.time())}_{secure_filename(file.filename)}"
        file.save(os.path.join(upload_folder, filename))
        
        return jsonify({
            "message": "Image uploaded successfully",
            "filename": filename
        }), 201

    @app.route('/uploads/<filename>')
    def uploaded_file(filename):
        return send_from_directory('uploads', filename)

    return app

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)

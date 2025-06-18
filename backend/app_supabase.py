from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv
import os
from extensions import db
from config import Config
from flask_cors import CORS
from flask_migrate import Migrate
from plant import Plant
from werkzeug.utils import secure_filename
from supabase_client import supabase_client
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
        return "Welcome to the Plant Recognition Application (Supabase)"

    @app.route('/api/plants/', methods=['GET'])
    def get_plants():
        try:
            # Supabase'den bitkileri getir
            plants = supabase_client.get_plants()
            return jsonify(plants)
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @app.route('/api/plants/', methods=['POST'])
    def add_plant():
        try:
            data = request.json
            # Supabase'e bitki ekle
            plant = supabase_client.add_plant(data)
            if plant:
                return jsonify({"message": "Plant added successfully", "data": plant}), 201
            else:
                return jsonify({"error": "Failed to add plant"}), 500
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @app.route('/api/plants/<int:plant_id>', methods=['DELETE'])
    def delete_plant(plant_id):
        try:
            # Supabase'den bitkiyi sil
            result = supabase_client.delete_plant(plant_id)
            if result is not None:
                return jsonify({"message": "Plant deleted successfully"}), 200
            else:
                return jsonify({"error": "Failed to delete plant"}), 500
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @app.route('/api/uploads/', methods=['POST'])
    def upload_image():
        if 'image' not in request.files:
            return jsonify({"error": "No image found"}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        try:
            # Geçici dosya olarak kaydet
            upload_folder = 'uploads'
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)

            filename = f"{int(time.time())}_{secure_filename(file.filename)}"
            temp_path = os.path.join(upload_folder, filename)
            file.save(temp_path)

            # Supabase Storage'a yükle
            upload_result = supabase_client.upload_image(temp_path, filename)
            
            if upload_result:
                # Geçici dosyayı sil
                os.remove(temp_path)
                
                # Public URL al
                image_url = supabase_client.get_image_url(filename)
                
                return jsonify({
                    "message": "Image uploaded successfully",
                    "filename": filename,
                    "url": image_url
                }), 201
            else:
                return jsonify({"error": "Failed to upload image to cloud"}), 500

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @app.route('/api/images/<filename>')
    def get_image_url(filename):
        try:
            # Supabase'den resim URL'ini al
            image_url = supabase_client.get_image_url(filename)
            return jsonify({"url": image_url})
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return app

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000) 
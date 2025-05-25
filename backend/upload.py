from plant import Plant
from extensions import db
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import time
import requests
from dotenv import load_dotenv
from file_handler import allowed_file, save_uploaded_file
from plant_identifier import identify_plant
from care_generator import generate_plant_care

load_dotenv()

upload_bp = Blueprint("upload", __name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@upload_bp.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "File not send"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if file and allowed_file(file.filename):
        save_path, filename = save_uploaded_file(file, UPLOAD_FOLDER)

        plant_data = identify_plant(save_path)

        if plant_data and plant_data.get("results"):
            result = plant_data["results"][0]
            species = result["species"]
            
            scientific_name = species["scientificNameWithoutAuthor"]
            common_name = species.get("commonNames", [None])[0] or "Common Name Unknown"

            new_common_name, watering, environment = generate_plant_care(scientific_name, common_name)
            
            # Hastalık bilgisini al
            disease_info = result.get("disease", {})
            disease_name = disease_info.get("name") if disease_info else None
            disease_probability = disease_info.get("probability") if disease_info else None
            disease_details = disease_info.get("details") if disease_info else None
            
            new_plant = Plant(
                scientific_name=scientific_name,
                common_name=new_common_name or common_name,
                watering=watering,
                environment=environment,
                image_filename=filename,
                disease_name=disease_name,
                disease_probability=disease_probability,
                disease_details=disease_details
            )

            db.session.add(new_plant)
            db.session.commit()
            
            return jsonify({
                "message": "Image uploaded and recognized successfully",
                "filename": filename,
                "plant_name": scientific_name,
                "common_name": new_common_name or common_name,
                "watering": watering,
                "environment": environment,
                "disease": {
                    "name": disease_name,
                    "probability": disease_probability,
                    "details": disease_details
                } if disease_name else None
            }), 200
        else:
            return jsonify({
                "message": "Image uploaded but no plant recognized",
                "filename": filename
            }), 200

    return jsonify({"error": "Invalid file type. Only PNG/JPG/JPEG formats are allowed"}), 400
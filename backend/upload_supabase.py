from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import time
from dotenv import load_dotenv
from file_handler import allowed_file, save_uploaded_file
from plant_identifier import identify_plant
from care_generator import generate_plant_care
from supabase_client import supabase_client

load_dotenv()

upload_bp = Blueprint("upload", __name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@upload_bp.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "File not sent"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if file and allowed_file(file.filename):
        try:
            save_path, filename = save_uploaded_file(file, UPLOAD_FOLDER)

            plant_data = identify_plant(save_path)

            if plant_data and plant_data.get("results"):
                result = plant_data["results"][0]
                species = result["species"]
                
                scientific_name = species["scientificNameWithoutAuthor"]
                common_name = species.get("commonNames", [None])[0] or "Common Name Unknown"

                new_common_name, care_instructions = generate_plant_care(scientific_name, common_name)
                
                upload_result = supabase_client.upload_image(save_path, filename)
                
                if upload_result:
                    os.remove(save_path)
                    
                    plant_data = {
                        "scientific_name": scientific_name,
                        "common_name": new_common_name or common_name,
                        "care_instructions": care_instructions,
                        "image_filename": filename
                    }
                    
                    new_plant = supabase_client.add_plant(plant_data)
                    
                    if new_plant:
                        return jsonify({
                            "message": "Image uploaded and recognized successfully",
                            "filename": filename,
                            "plant_name": scientific_name,
                            "common_name": new_common_name or common_name,
                            "care_instructions": care_instructions,
                            "plant_id": new_plant.get("id")
                        }), 200
                    else:
                        return jsonify({"error": "Failed to save plant to database"}), 500
                else:
                    return jsonify({"error": "Failed to upload image to cloud storage"}), 500
            else:
                os.remove(save_path)
                return jsonify({
                    "error": "No plant could be identified in the image. Please upload a different image."
                }), 400

        except Exception as e:
            return jsonify({"error": f"Upload failed: {str(e)}"}), 500

    return jsonify({
        "error": "Invalid file type. Only PNG, JPG, JPEG, and GIF formats are supported.",
        "allowed_formats": ["png", "jpg", "jpeg", "gif"]
    }), 400 
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import time
import requests
from dotenv import load_dotenv
from utils.file_handler import allowed_file, save_uploaded_file
from services.plant_identifier import identify_plant

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

        plant_name = identify_plant(save_path)

        if plant_name:
            return jsonify({
                "message": "Image uploaded and recognized successfully",
                "filename": filename,
                "plant_name": plant_name
            }), 200
        else:
            return jsonify({
                "message": "Image uploaded but no plant recognized",
                "filename": filename
            }), 200

    return jsonify({"error": "Invalid file type. Only PNG/JPG/JPEG formats are allowed"}), 400
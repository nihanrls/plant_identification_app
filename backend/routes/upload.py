from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import time
import requests
from dotenv import load_dotenv

load_dotenv()

upload_bp = Blueprint("upload", __name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}


#Extension control
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

PLANETNET_API_KEY = os.getenv("PLANTNET_API_KEY")
PLANETNET_API_URL = "https://my-api.plantnet.org/v2/identify/all"

@upload_bp.route("/upload", methods = ["POST"])

def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "Dosya gönderilmedi"}), 400
    
    file = request.files["file"]
    
    if file.filename == "":
        return jsonify({"error": "Dosya seçilmedi"}), 400
    
    if file and allowed_file(file.filename):
        original_filename = secure_filename(file.filename)
        timestamp = int(time.time())
        filename = f"{timestamp}_{original_filename}"
        save_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(save_path)
        
        with open(save_path, "rb") as img:
            files = {"images": img}
            data = {
                "organs": "leaf",
            }
            response = requests.post(
                f"{PLANETNET_API_URL}?api-key={PLANETNET_API_KEY}",
                files = files,
                data = data
            )
        
        if response.status_code == 200:
            result = response.json()
            if result.get("results"):
                best_match = result["results"][0]["species"]["scientificNameWithoutAuthor"]
                return jsonify({
                    "message": "Görsel yüklendi ve tanındı",
                    "filename": filename,
                    "plant_name": best_match
                }), 200
            else:
                return jsonify({
                    "message": "Görsel yüklendi fakat tanıma yapılamadı",
                    "filename": filename
                }), 200
        else:
            return jsonify({
                "error": "PlantNet API isteği başarısız",
                "status": response.status_code
            }), 500
        
    return jsonify({"error": "Geçersiz dosya türü. Sadece PNG/JPG/JPEG destekleniyor."}), 400

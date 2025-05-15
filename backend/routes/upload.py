from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os

upload_bp = Blueprint("upload", __name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}


#Extension control
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route("/upload", methods = ["POST"])

def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "Dosya gönderilmedi"}), 400
    
    file = request.files["file"]
    
    if file.filename == "":
        return jsonify({"error": "Dosya seçilmedi"}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        save_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(save_path)
        
        return jsonify({
            "message": "Görsel başarıyla yüklendi",
            "filename": filename,
            "path": save_path
        }), 200
        
    return jsonify({"error": "Geçersiz dosya türü. Sadece PNG/JPG/JPEG destekleniyor."}), 400

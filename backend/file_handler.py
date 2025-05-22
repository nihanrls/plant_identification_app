import os
import time
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def save_uploaded_file(file, upload_folder):
    original_filename = secure_filename(file.filename)
    timestamp = int(time.time())
    filename = f"{timestamp}_{original_filename}"
    save_path = os.path.join(upload_folder, filename)
    file.save(save_path)
    return save_path, filename
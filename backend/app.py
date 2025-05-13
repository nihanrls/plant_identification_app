from flask import Flask
from backend.routes.upload import upload_bp

app = Flask(__name__)
app.register_blueprint(upload_bp)

@app.route("/")
def home():
    return "Bitki tanıma uygulamasına hoş geldiniz."

if __name__ == "__main__":
    app.run(debug = True)
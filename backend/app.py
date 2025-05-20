from flask import Flask
from routes.upload import upload_bp

app = Flask(__name__)
app.register_blueprint(upload_bp)

@app.route("/")
def home():
    return "Welcome to the Plant Recognition Application"

if __name__ == "__main__":
    app.run(debug = True)
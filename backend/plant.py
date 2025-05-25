from extensions import db

class Plant(db.Model):
    __tablename__ = "plants"
    
    id = db.Column(db.Integer, primary_key=True)
    scientific_name = db.Column(db.String(256), nullable=False)
    common_name = db.Column(db.String(256))
    watering = db.Column(db.String(512))
    environment = db.Column(db.String(512))
    image_filename = db.Column(db.String(256))
    disease_name = db.Column(db.String(256))
    disease_probability = db.Column(db.Float)
    disease_details = db.Column(db.String(1024))
    
    def __init__(self, scientific_name, common_name=None, watering=None, environment=None, image_filename=None, disease_name=None, disease_probability=None, disease_details=None):
        self.scientific_name = scientific_name.strip()
        self.common_name = common_name.strip().title() if common_name else "Common Name Unknown"
        self.watering = watering.strip() if watering else "Could not reach watering information"
        self.environment = environment.strip() if environment else "Could not reach environment information"
        self.image_filename = image_filename if image_filename else "unknown image"
        self.disease_name = disease_name
        self.disease_probability = disease_probability
        self.disease_details = disease_details
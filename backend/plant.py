from extensions import db

class Plant(db.Model):
    __tablename__ = "plants"
    
    id = db.Column(db.Integer, primary_key=True)
    scientific_name = db.Column(db.String(256), nullable=False)
    common_name = db.Column(db.String(256))
    image_filename = db.Column(db.String(256))
    care_instructions = db.Column(db.Text)
    
    def __init__(self, scientific_name, common_name=None, image_filename=None, care_instructions=None):
        self.scientific_name = scientific_name.strip()
        self.common_name = common_name.strip().title() if common_name else "Common Name Unknown"
        self.image_filename = image_filename if image_filename else "unknown image"
        self.care_instructions = care_instructions.strip() if care_instructions else None
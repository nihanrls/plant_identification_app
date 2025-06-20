from supabase import create_client
from config import Config
import os

class SupabaseClient:
    def __init__(self):
        self.supabase = create_client(
            Config.SUPABASE_URL,
            Config.SUPABASE_SERVICE_ROLE_KEY
        )
    
    def get_plants(self):
        try:
            response = self.supabase.table('plants').select('*').order('id', desc=True).execute()
            plants = response.data
            for plant in plants:
                image_filename = plant.get('image_filename')
                if image_filename:
                    image_url = self.get_image_url(image_filename)
                    plant['image_url'] = image_url
                else:
                    plant['image_url'] = None
            return plants
        except Exception as e:
            print(f"Error fetching plants: {e}")
            return []
    
    def add_plant(self, plant_data):
        try:
            response = self.supabase.table('plants').insert(plant_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error adding plant: {e}")
            return None
    
    def upload_image(self, file_path, file_name):
        try:
            with open(file_path, 'rb') as f:
                response = self.supabase.storage.from_('plant-images').upload(
                    path=file_name,
                    file=f,
                    file_options={"content-type": "image/jpeg"}
                )
            return response
        except Exception as e:
            print(f"Error uploading image: {e}")
            return None
    
    def get_image_url(self, file_name):
        try:
            response = self.supabase.storage.from_('plant-images').get_public_url(file_name)
            if isinstance(response, dict) and 'publicUrl' in response:
                return response['publicUrl']
            return response
        except Exception as e:
            print(f"Error getting image URL: {e}")
            return None
    
    def delete_plant(self, plant_id):
        try:
            response = self.supabase.table('plants').delete().eq('id', plant_id).execute()
            return response.data
        except Exception as e:
            print(f"Error deleting plant: {e}")
            return None

supabase_client = SupabaseClient() 
import os
import requests
from dotenv import load_dotenv

load_dotenv()

PLANT_ID_API_KEY = os.getenv("PLANT_ID_API_KEY")
PLANT_ID_API_URL = "https://plant.id/api/v3/identification"

def identify_plant(image_path):
    try:
        print(f"Starting plant identification for image: {image_path}")
        
        with open(image_path, "rb") as image_file:
            content = image_file.read()
            import base64
            image_content = base64.b64encode(content).decode('utf-8')
            print(f"Image converted to base64, length: {len(image_content)}")

        request_data = {
            "images": [image_content],
            "latitude": 49.1951239,
            "longitude": 16.6077111,
            "similar_images": True
        }

        print(f"Sending request to Plant.id API...")
        response = requests.post(
            PLANT_ID_API_URL,
            json=request_data,
            headers={
                "Api-Key": PLANT_ID_API_KEY,
                "Content-Type": "application/json"
            }
        )

        print(f"API Response Status Code: {response.status_code}")
        print(f"API Response Headers: {response.headers}")
        print(f"API Response Body: {response.text}")

        if response.status_code in [200, 201]:
            result = response.json()
            if result.get("result") and result["result"].get("classification"):
                best_match = result["result"]["classification"]["suggestions"][0]
                print(f"Best match found: {best_match}")
                
                return {
                    "results": [{
                        "species": {
                            "scientificNameWithoutAuthor": best_match["name"],
                            "commonNames": [best_match.get("common_names", [best_match["name"]])[0]]
                        },
                        "score": best_match["probability"]
                    }]
                }
            else:
                print("No classification results found in API response")
        else:
            print(f"API request failed with status code: {response.status_code}")
        
        return None

    except Exception as e:
        print(f"Error in plant identification: {str(e)}")
        return None
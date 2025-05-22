import os
import requests
from dotenv import load_dotenv

load_dotenv()

PLANETNET_API_KEY = os.getenv("PLANTNET_API_KEY")
PLANETNET_API_URL = "https://my-api.plantnet.org/v2/identify/all"

def identify_plant(image_path):
    with open(image_path, "rb") as img:
        files = {"images": img}
        data = {
            "organs": "leaf",
        }
        response = requests.post(
            f"{PLANETNET_API_URL}?api-key={PLANETNET_API_KEY}",
            files=files,
            data=data
        )

    if response.status_code == 200:
        result = response.json()
        if result.get("results"):
            return result
    return None
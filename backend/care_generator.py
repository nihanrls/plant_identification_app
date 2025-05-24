import openai
import os
from dotenv import load_dotenv

load_dotenv()

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_plant_care(scientific_name, common_name):
    prompt = (
        f"Plant name: {scientific_name}, common name: {common_name}. "
        "Generate short and informative explanations for watering frequency and ideal environmental conditions for this plant. "
        "Please write in two sentences and return only the content: first sentence for watering, second sentence for environmental conditions."
    )

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a plant care expert."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
            temperature=0.7,
        )

        text = response.choices[0].message.content
        parts = text.strip().split(". ")
        watering = parts[0].strip() + "." if parts else "No information."
        environment = parts[1].strip() + "." if len(parts) > 1 else "No information."
        return watering, environment

    except Exception as e:
        print(f"OpenAI API Error: {str(e)}")
        if "api_key" in str(e).lower():
            print("Error: OpenAI API key is not properly configured. Please check your .env file.")
        return "Could not retrieve watering information.", "Could not retrieve environment information."

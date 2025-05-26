import os
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_plant_care(scientific_name, common_name):
    prompt = (
        f"Plant scientific name: {scientific_name}, common name: {common_name}. "
        "Please provide the following information in a structured format:\n"
        "1. A common name for this plant (if the provided common name is the same as scientific name, provide a more user-friendly common name)\n"
        "2. Watering instructions (one sentence)\n"
        "3. Environmental conditions (one sentence)\n"
        "Format your response exactly like this:\n"
        "Common Name: [name]\n"
        "Watering: [instructions]\n"
        "Environment: [conditions]"
    )

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a plant care expert. Provide clear, concise information."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200,
            temperature=0.7,
        )

        text = response.choices[0].message.content
        
        # Parse the response
        lines = text.strip().split('\n')
        common_name = ""
        watering = ""
        environment = ""
        
        for line in lines:
            if line.startswith("Common Name:"):
                common_name = line.replace("Common Name:", "").strip()
            elif line.startswith("Watering:"):
                watering = line.replace("Watering:", "").strip()
            elif line.startswith("Environment:"):
                environment = line.replace("Environment:", "").strip()
        
        return common_name, watering, environment

    except Exception as e:
        print(f"OpenAI API Error: {str(e)}")
        if "api_key" in str(e).lower():
            print("Error: OpenAI API key is not properly configured. Please check your .env file.")
        return common_name, "Could not retrieve watering information.", "Could not retrieve environment information."

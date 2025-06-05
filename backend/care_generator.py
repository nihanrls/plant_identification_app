import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
print(f"OpenAI API Key loaded: {'Yes' if os.getenv('OPENAI_API_KEY') else 'No'}")

def generate_plant_care(scientific_name, common_name):
    print(f"\n=== Starting plant care generation ===")
    print(f"Scientific Name: {scientific_name}")
    print(f"Common Name: {common_name}")

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
        print("\nSending request to OpenAI API...")
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a plant care expert. Always answer in English."},
                {"role": "user", "content": f"Give a short and concise care guide for the plant {scientific_name} ({common_name}). Summarize the most important watering, light, and soil instructions in 1-2 sentences. Answer in English."}
            ],
            temperature=0.7,
            max_tokens=200
        )
        text = response.choices[0].message.content
        print(f"\nOpenAI Response received: {text}")
        
        # Parse the response
        lines = text.strip().split('\n')
        common_name = ""
        watering = ""
        environment = ""
        
        for line in lines:
            if line.startswith("Common Name:"):
                common_name = line.replace("Common Name:", "").strip()
            elif line.startswith("Watering:") or line.startswith("Sulama:"):
                watering = line.replace("Watering:", "").replace("Sulama:", "").strip()
            elif line.startswith("Environment:") or line.startswith("Güneş Işığı:"):
                environment = line.replace("Environment:", "").replace("Güneş Işığı:", "").strip()
        
        print("\nParsed results:")
        print(f"Common Name: {common_name}")
        print(f"Watering: {watering}")
        print(f"Environment: {environment}")
        
        return common_name, watering, environment, text

    except Exception as e:
        print(f"\n=== ERROR OCCURRED ===")
        print(f"Error type: {type(e).__name__}")
        print(f"Error message: {str(e)}")
        print(f"Error details: {e.__dict__ if hasattr(e, '__dict__') else 'No additional details'}")
        
        if "api_key" in str(e).lower():
            print("\nAPI Key Error Details:")
            print(f"API Key exists: {'Yes' if os.getenv('OPENAI_API_KEY') else 'No'}")
            print(f"API Key length: {len(os.getenv('OPENAI_API_KEY', ''))}")
            print(f"API Key starts with: {os.getenv('OPENAI_API_KEY', '')[:8] + '...' if os.getenv('OPENAI_API_KEY') else 'None'}")
        
        return common_name, "", "", "Could not retrieve care instructions."

import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
print(f"OpenAI API Key loaded: {'Yes' if os.getenv('OPENAI_API_KEY') else 'No'}")

def generate_plant_care(scientific_name, common_name):
    print(f"\n=== Starting plant care generation ===")
    print(f"Scientific Name: {scientific_name}")

    prompt = (
        f"For the plant {scientific_name}, provide the most common English name that is used by the general public (not the scientific name). If there is no widely used common name, say 'No common name'. Then, give a short and concise care guide in 3-4 sentences. Format: Common Name: ... Care: ..."
    )

    try:
        print("\nSending request to OpenAI API...")
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a plant care expert. Always answer in English."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=200
        )
        text = response.choices[0].message.content
        print(f"\nOpenAI Response received: {text}")
        
        # Parse the response
        lines = text.strip().split('\n')
        common_name_parsed = ""
        care_instructions = ""
        
        for line in lines:
            if line.lower().startswith("common name:"):
                common_name_parsed = line.split(":", 1)[1].strip()
            elif line.lower().startswith("care:"):
                care_instructions = line.split(":", 1)[1].strip()
        
        if not care_instructions:
            care_instructions = text.strip()
        
        # Eğer common name scientific name ile aynıysa:
        if common_name_parsed.lower() == scientific_name.lower():
            common_name_parsed = ""
        
        print("\nParsed results:")
        print(f"Common Name: {common_name_parsed}")
        print(f"Care Instructions: {care_instructions}")
        
        return common_name_parsed, care_instructions

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
        
        return common_name_parsed, "Could not retrieve care instructions."

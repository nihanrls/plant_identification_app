# 🌿 Plant Identification App

A full-stack web application that allows users to identify plants from images and receive AI-powered care suggestions. Upload a photo, discover the plant species, and manage your own digital garden with personalized care tips.

Make sure your that plant images are high quality.

There are test images if you want. (They are my plants.)

## 🚀 Features

- 📸 Upload plant photos to identify species
- 🌱 Retrieve information about identified plants
- 🤖 Get personalized plant care advice via OpenAI-powered chatbot
- 📅 Manage plant care tasks and watering reminders
- 🔐 API integration for image recognition and chatbot responses
- 💾 Store plant data in cloud

## 🚀 Installation Guide

### Requirements
- Python 3.8+
- Node.js 16+
- npm or yarn
- Supabase account
- OpenAI API key
- Plant.id API key

### 1. Download the Project
```bash
git clone <repository-url>
cd PlantIdentificationApp
```

### 2. Backend Setup

#### 2.1 Create Python Virtual Environment
```bash
# In the main directory
python3 -m venv .venv

# Activate the virtual environment
# macOS/Linux:
source .venv/bin/activate
# Windows:
# .venv\Scripts\activate
```

#### 2.2 Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### 2.3 Set Environment Variables
```bash
# Copy the env.example file
cp env.example .env

# Edit the .env file and add your API keys
nano .env  # or your preferred editor
```

**Required API Keys:**
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `OPENAI_API_KEY`: Your OpenAI API key
- `PLANT_ID_API_KEY`: Your Plant.id API key

#### 2.4 Prepare Supabase Database
```bash
# Run the supabase_schema.sql file in your Supabase project's SQL editor
# This file is located at backend/supabase_schema.sql
```

#### 2.5 Start the Backend
```bash
# In the backend directory
flask run --port=5001
```
The backend will run at http://127.0.0.1:5001.

### 3. Frontend Setup

#### 3.1 Install Dependencies
```bash
# Open a new terminal (while backend is running)
cd frontend
npm install
```

#### 3.2 Start the Frontend
```bash
npm run dev
```
The frontend will run at http://localhost:3000.

### 4. API Key Acquisition Guide

#### 4.1 Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get URL and keys from Settings > API section
4. Create "plant-images" bucket in Storage > Buckets section

#### 4.2 OpenAI
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create a new API key from API Keys section

#### 4.3 Plant.id
1. Go to [web.plant.id](https://web.plant.id)
2. Create a free account
3. Get your API key

### 5. Test the Application

1. Go to http://localhost:3000 in your browser
2. Navigate to the "Identify Plant" page
3. Upload a plant photo (You can use plants from the test plants file.)
4. Check the identification result

### 6. Development Tips

#### Backend Development
- Make sure the virtual environment is active
- Check that the `.env` file is in the correct location
- Test that API keys are valid

#### Frontend Development
- Make sure the backend is running
- Check that the API URL is correct (src/services/api.ts)

### 7. Troubleshooting

#### Backend Issues
- Check that port 5001 is available
- Verify that API keys are correct
- Test Supabase connection

#### Frontend Issues
- Check that the backend is running
- Check CORS settings
- Check for errors in the Network tab


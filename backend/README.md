# Interview Prep - Python Backend

A Python FastAPI backend for the AI-powered interview preparation platform.

## Features

- 🤖 **AI Feedback Generation** - Uses Google Gemini AI to analyze interview transcripts and provide detailed feedback
- 📝 **Question Generation** - Automatically generates interview questions based on role, level, and tech stack
- 🔥 **Firebase Integration** - Stores interviews and feedback in Firestore
- 🚀 **FastAPI** - High-performance async API framework
- 📊 **Structured Data** - Pydantic models for data validation

## Tech Stack

- **FastAPI** - Modern web framework
- **Google Generative AI (Gemini)** - AI model for feedback and question generation
- **Firebase Admin SDK** - Firestore database integration
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── __init__.py
│   │   └── interview.py        # Interview endpoints
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py          # Pydantic models
│   ├── services/
│   │   ├── __init__.py
│   │   ├── ai_service.py       # Google AI integration
│   │   └── firebase_service.py # Firebase integration
│   ├── __init__.py
│   ├── config.py               # Configuration settings
│   └── main.py                 # FastAPI application
├── .env.example                # Environment variables template
├── requirements.txt            # Python dependencies
├── run.py                      # Server startup script
└── README.md
```

## Installation

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Setup

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Update the `.env` file with your credentials:

```env
# Google Generative AI
GOOGLE_API_KEY=your_google_api_key_here

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id

# Server Configuration
HOST=0.0.0.0
PORT=8000
RELOAD=True

# CORS Origins
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### 3. Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings → Service Accounts
4. Click "Generate New Private Key"
5. Copy the values from the downloaded JSON file to your `.env`

### 4. Get Google AI API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy it to your `.env` file

## Running the Server

### Development Mode

```bash
cd backend
python run.py
```

The server will start at `http://localhost:8000`

### Using Uvicorn Directly

```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### Health Check

```
GET /health
```

Returns server health status.

### Generate Interview Questions

```
POST /api/interview/generate
```

**Request Body:**
```json
{
  "role": "Frontend Developer",
  "level": "Senior",
  "techstack": "React, TypeScript, Next.js",
  "type": "Technical",
  "amount": 10,
  "user_id": "user123"
}
```

**Response:**
```json
{
  "success": true,
  "interview_id": "abc123",
  "questions": ["Question 1", "Question 2", ...]
}
```

### Create Feedback

```
POST /api/interview/feedback
```

**Request Body:**
```json
{
  "interview_id": "abc123",
  "user_id": "user123",
  "transcript": [
    {"role": "assistant", "content": "Hello, let's begin..."},
    {"role": "user", "content": "My answer is..."}
  ],
  "feedback_id": null
}
```

**Response:**
```json
{
  "success": true,
  "feedback_id": "feedback123"
}
```

## API Documentation

Once the server is running, visit:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Development

### Code Structure

- **`app/main.py`** - FastAPI application setup and middleware
- **`app/api/interview.py`** - Interview-related endpoints
- **`app/services/ai_service.py`** - Google Gemini AI integration
- **`app/services/firebase_service.py`** - Firebase Firestore operations
- **`app/models/schemas.py`** - Pydantic data models
- **`app/config.py`** - Configuration management

### Adding New Endpoints

1. Create a new router in `app/api/`
2. Define Pydantic models in `app/models/schemas.py`
3. Add business logic in `app/services/`
4. Include the router in `app/main.py`

## Connecting Frontend

Update your Next.js frontend to call the Python backend:

1. Update environment variables in frontend `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

2. Replace API calls in your frontend code to use the new backend endpoints

## Production Deployment

### Using Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables

Make sure to set all environment variables in your production environment.

## Troubleshooting

### Firebase Connection Issues

- Ensure your Firebase credentials are correct
- Check that the private key has proper line breaks (`\n`)
- Verify your Firebase project has Firestore enabled

### Google AI API Issues

- Verify your API key is valid
- Check your API quota limits
- Ensure the Gemini API is enabled for your project

## License

MIT License - See LICENSE file for details

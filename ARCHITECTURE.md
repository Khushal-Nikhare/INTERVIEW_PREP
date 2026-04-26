# Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                          USER BROWSER                               │
│                                                                     │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │
┌────────────────────────────▼────────────────────────────────────────┐
│                                                                     │
│                    FRONTEND (Next.js)                               │
│                   Port: 3000 / 3001                                 │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                                                             │  │
│  │  • User Interface (React Components)                       │  │
│  │  • Authentication (Firebase Auth)                          │  │
│  │  • Voice Interview (VAPI SDK)                              │  │
│  │  • Real-time Transcription Display                         │  │
│  │  • Routing & Navigation                                    │  │
│  │                                                             │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ HTTP REST API
                             │ (JSON)
                             │
┌────────────────────────────▼────────────────────────────────────────┐
│                                                                     │
│                   BACKEND (Python FastAPI)                          │
│                       Port: 8000                                    │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  API LAYER                                                  │  │
│  │  • POST /api/interview/generate                            │  │
│  │  • POST /api/interview/feedback                            │  │
│  │  • GET /health                                             │  │
│  └────────────────────┬────────────────────────────────────────┘  │
│                       │                                             │
│  ┌────────────────────▼────────────────────────────────────────┐  │
│  │  SERVICES LAYER                                             │  │
│  │  • AI Service (Google Gemini)                              │  │
│  │    - Question Generation                                    │  │
│  │    - Feedback Analysis                                      │  │
│  │  • Firebase Service (Firestore)                            │  │
│  │    - Data Storage & Retrieval                              │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└──────────────┬─────────────────────────┬────────────────────────────┘
               │                         │
               │                         │
               │                         │
     ┌─────────▼────────┐      ┌────────▼─────────┐
     │                  │      │                  │
     │  Google Gemini   │      │  Firebase        │
     │  AI API          │      │  Firestore       │
     │                  │      │                  │
     │  - Question Gen  │      │  - Interviews    │
     │  - Feedback Gen  │      │  - Feedback      │
     │                  │      │  - Users         │
     │                  │      │                  │
     └──────────────────┘      └──────────────────┘
```

## Data Flow

### 1. Question Generation Flow

```
User (Browser)
    │
    ├─→ Frontend: Click "Generate Interview"
    │
    ├─→ Frontend: Fill form (role, level, tech stack)
    │
    ├─→ Frontend: Submit form
    │
    └─→ POST /api/interview/generate
            │
            ├─→ Backend: Validate request
            │
            ├─→ Backend: Call AI Service
            │
            ├─→ Google Gemini: Generate questions
            │
            ├─→ Backend: Receive questions
            │
            ├─→ Backend: Save to Firestore
            │
            └─→ Frontend: Return interview ID
                    │
                    └─→ Browser: Redirect to interview page
```

### 2. Feedback Generation Flow

```
User (Browser)
    │
    ├─→ Frontend: Complete voice interview
    │
    ├─→ Frontend: Collect transcript
    │
    └─→ POST /api/interview/feedback
            │
            ├─→ Backend: Receive transcript
            │
            ├─→ Backend: Format data
            │
            ├─→ Google Gemini: Analyze transcript
            │
            ├─→ Backend: Parse AI response
            │
            ├─→ Backend: Structure feedback
            │
            ├─→ Backend: Save to Firestore
            │
            └─→ Frontend: Return feedback ID
                    │
                    └─→ Browser: Display feedback page
```

## Technology Stack

### Frontend Layer
```
┌─────────────────────────────────────┐
│  Next.js 15 (React 19)              │
├─────────────────────────────────────┤
│  TypeScript                         │
│  Tailwind CSS                       │
│  Radix UI Components                │
│  React Hook Form + Zod              │
│  Firebase Auth SDK                  │
│  VAPI SDK                           │
└─────────────────────────────────────┘
```

### Backend Layer
```
┌─────────────────────────────────────┐
│  FastAPI                            │
├─────────────────────────────────────┤
│  Python 3.10+                       │
│  Pydantic (Data Validation)         │
│  Google Generative AI SDK           │
│  Firebase Admin SDK                 │
│  Uvicorn (ASGI Server)              │
└─────────────────────────────────────┘
```

### External Services
```
┌─────────────────────────────────────┐
│  Google Gemini AI                   │
│  • gemini-2.5-flash                 │
│  • Question generation              │
│  • Feedback analysis                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Firebase                           │
│  • Authentication                   │
│  • Firestore Database               │
│  • User management                  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  VAPI                               │
│  • Voice-to-voice AI                │
│  • Real-time transcription          │
│  • Interview conversation           │
└─────────────────────────────────────┘
```

## Request/Response Flow

### API Request Example

**Request:**
```http
POST http://localhost:8000/api/interview/generate
Content-Type: application/json

{
  "role": "Frontend Developer",
  "level": "Senior",
  "techstack": "React, TypeScript, Next.js",
  "type": "Technical",
  "amount": 10,
  "user_id": "user123"
}
```

**Processing:**
1. FastAPI receives request
2. Pydantic validates data
3. AI Service calls Google Gemini
4. Questions generated
5. Firebase Service saves to Firestore
6. Response sent back

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "interview_id": "abc123xyz",
  "questions": [
    "What is your experience with React hooks?",
    "How do you handle state management in Next.js?",
    ...
  ]
}
```

## Deployment Architecture

### Development
```
Local Machine
├── Frontend: localhost:3000
├── Backend: localhost:8000
├── Firestore: Cloud
└── Google AI: Cloud
```

### Production
```
┌─────────────────────┐    ┌─────────────────────┐
│  Frontend           │    │  Backend            │
│  (Vercel)           │◄───┤  (Railway/Render)   │
│  your-app.vercel.app│    │  api.your-app.com   │
└─────────────────────┘    └──────────┬──────────┘
                                      │
                          ┌───────────┴───────────┐
                          │                       │
                    ┌─────▼────┐          ┌──────▼──────┐
                    │ Firebase │          │ Google AI   │
                    │ (Cloud)  │          │ (Cloud)     │
                    └──────────┘          └─────────────┘
```

## Security Flow

```
Browser
  │
  ├─→ Firebase Auth (JWT Token)
  │
  ├─→ Frontend (Token in headers)
  │
  ├─→ Backend API (Validates token)
  │
  ├─→ Firebase Admin SDK (Verifies token)
  │
  └─→ Process request if valid
```

## File Organization

```
INTERVIEW_PREP/
│
├── frontend/                    # Next.js App
│   ├── app/
│   │   ├── (auth)/             # Auth pages
│   │   ├── (root)/             # Main app
│   │   └── api/                # API routes (VAPI)
│   ├── components/             # UI components
│   ├── lib/                    # Utils & actions
│   └── types/                  # TypeScript types
│
└── backend/                     # Python API
    ├── app/
    │   ├── api/                # API endpoints
    │   │   └── interview.py
    │   ├── services/           # Business logic
    │   │   ├── ai_service.py
    │   │   └── firebase_service.py
    │   ├── models/             # Data models
    │   │   └── schemas.py
    │   ├── config.py           # Settings
    │   └── main.py             # FastAPI app
    └── requirements.txt        # Dependencies
```

## Communication Protocol

All communication between frontend and backend uses:
- **Protocol**: HTTP/HTTPS
- **Format**: JSON
- **Method**: REST API
- **CORS**: Enabled for frontend domains
- **Content-Type**: application/json
- **Status Codes**: Standard HTTP codes (200, 400, 500, etc.)

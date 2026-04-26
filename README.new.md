# 🎯 AI Interview Prep Platform

An intelligent interview preparation platform with **separated frontend and backend architecture**.

## 📁 Project Structure

```
INTERVIEW_PREP/
├── frontend/                 # Next.js Frontend Application
│   ├── app/                 # Next.js App Router
│   ├── components/          # React Components
│   ├── lib/                 # Utilities & Actions
│   ├── types/               # TypeScript Types
│   └── ...
│
├── backend/                 # Python FastAPI Backend
│   ├── app/
│   │   ├── api/            # API Routes
│   │   ├── services/       # Business Logic
│   │   ├── models/         # Data Models
│   │   └── main.py         # FastAPI App
│   ├── requirements.txt
│   └── README.md
│
├── MIGRATION_GUIDE.md       # How to use the separated architecture
└── README.md               # This file
```

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: Firebase Authentication
- **Voice AI**: VAPI SDK
- **UI Components**: Radix UI

**Responsibilities**:
- User interface and experience
- Authentication management
- Voice interview integration
- Real-time transcription display
- Routing and navigation

### Backend (Python FastAPI)
- **Framework**: FastAPI
- **AI**: Google Generative AI (Gemini)
- **Database**: Firebase Firestore
- **Language**: Python 3.10+

**Responsibilities**:
- AI feedback generation
- Interview question generation
- Data processing and validation
- Firebase Firestore operations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- Firebase Account
- Google AI API Key
- VAPI Account

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Start backend server
python run.py
```

Backend runs on: http://localhost:8000

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Configure environment
# Create .env.local with:
# - Firebase credentials
# - VAPI keys
# - Backend URL: NEXT_PUBLIC_API_URL=http://localhost:8000

# Start frontend server
npm run dev
```

Frontend runs on: http://localhost:3000 or http://localhost:3001

## 📋 Features

### ✅ Implemented Features

1. **AI-Powered Interviews**
   - Real-time voice interaction
   - Multiple interview types (Technical/Behavioral/Mixed)
   - 50+ technology stack support

2. **Custom Interview Creation**
   - Define your own questions
   - Set role, level, and tech stack
   - Up to 20 custom questions

3. **AI Feedback Generation**
   - Comprehensive scoring (0-100)
   - 5 evaluation categories
   - Strengths and improvement areas
   - Detailed recommendations

4. **User Management**
   - Firebase authentication
   - Interview history tracking
   - Personal progress monitoring

### 🔄 API Endpoints

#### Backend (Python)

**Generate Questions**
```
POST http://localhost:8000/api/interview/generate
```

**Generate Feedback**
```
POST http://localhost:8000/api/interview/feedback
```

**Health Check**
```
GET http://localhost:8000/health
```

**API Documentation**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🔧 Configuration

### Backend Environment Variables (.env)
```env
GOOGLE_API_KEY=your_google_api_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
HOST=0.0.0.0
PORT=8000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Frontend Environment Variables (.env.local)
```env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# VAPI Config
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
VAPI_PRIVATE_KEY=your_vapi_private_key
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_workflow_id

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📚 Documentation

- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Detailed migration and setup guide
- **[backend/README.md](./backend/README.md)** - Backend-specific documentation
- **API Docs**: http://localhost:8000/docs (when backend is running)

## 🛠️ Development

### Run Both Servers

**Terminal 1 - Backend**
```bash
cd backend
python run.py
```

**Terminal 2 - Frontend**
```bash
npm run dev
```

### Code Structure

**Frontend**:
- `app/(root)/` - Main application pages
- `app/(auth)/` - Authentication pages
- `components/` - Reusable UI components
- `lib/actions/` - Server actions
- `lib/utils.ts` - Utility functions

**Backend**:
- `app/api/` - API route handlers
- `app/services/` - Business logic
- `app/models/` - Pydantic models
- `app/config.py` - Configuration

## 🚢 Deployment

### Backend Deployment

**Option 1: Railway**
```bash
railway init
railway up
```

**Option 2: Render**
- Connect GitHub repository
- Select Python environment
- Set environment variables
- Deploy

**Option 3: Docker**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Frontend Deployment

**Vercel (Recommended)**
```bash
vercel deploy
```

Update environment variables:
- Set `NEXT_PUBLIC_API_URL` to your backend URL

## 🧪 Testing

### Test Backend
```bash
cd backend

# Health check
curl http://localhost:8000/health

# Test question generation
curl -X POST http://localhost:8000/api/interview/generate \
  -H "Content-Type: application/json" \
  -d '{"role":"Developer","level":"Senior","techstack":"Python","type":"Technical","amount":5,"user_id":"test"}'
```

### Test Frontend
1. Start both servers
2. Navigate to http://localhost:3000
3. Sign up/Login
4. Create a custom interview
5. Start an interview
6. Complete and check feedback

## 📊 Benefits of Separation

✅ **Better Performance** - Python excels at AI operations  
✅ **Scalability** - Independent scaling of frontend and backend  
✅ **Technology Fit** - Use each language's strengths  
✅ **Easier Maintenance** - Clear separation of concerns  
✅ **Flexible Deployment** - Deploy services independently  
✅ **Better Testing** - Test AI logic separately  

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support

- Backend Issues: Check `backend/README.md`
- Frontend Issues: Check original README
- Migration Help: Check `MIGRATION_GUIDE.md`
- API Documentation: http://localhost:8000/docs

## 🎓 Tech Stack Summary

| Component | Technology |
|-----------|-----------|
| Frontend Framework | Next.js 15 |
| Frontend Language | TypeScript |
| Backend Framework | FastAPI |
| Backend Language | Python 3.10+ |
| AI Model | Google Gemini 2.5 Flash |
| Database | Firebase Firestore |
| Authentication | Firebase Auth |
| Voice AI | VAPI |
| Styling | Tailwind CSS |
| UI Components | Radix UI |

---

**Made with ❤️ for better interview preparation**

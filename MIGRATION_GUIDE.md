# Migration Guide: Frontend to Backend Separation

This guide explains how the project has been separated into frontend (Next.js) and backend (Python FastAPI).

## Overview

The project is now divided into two parts:
- **Frontend**: Next.js application (existing structure)
- **Backend**: Python FastAPI server (new `/backend` directory)

## What Moved to Backend?

The following AI operations have been moved from Next.js to Python backend:

### 1. **Feedback Generation**
- **Before**: `lib/actions/interview.action.ts` → `createFeedback()`
- **After**: Python backend → `POST /api/interview/feedback`
- **Service**: `backend/app/services/ai_service.py` → `generate_feedback()`

### 2. **Question Generation**
- **Before**: `app/api/vapi/generate/route.ts`
- **After**: Python backend → `POST /api/interview/generate`
- **Service**: `backend/app/services/ai_service.py` → `generate_questions()`

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                       │
│  - User Interface                                            │
│  - VAPI Voice Integration                                    │
│  - Firebase Auth                                             │
│  - Routing & Pages                                           │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ HTTP Requests
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                  Backend (Python FastAPI)                    │
│  - AI Feedback Generation (Google Gemini)                   │
│  - Question Generation (Google Gemini)                       │
│  - Firebase Firestore Operations                             │
│  - Data Processing                                           │
└─────────────────────────────────────────────────────────────┘
```

## Setup Instructions

### Backend Setup

1. **Install Python Dependencies**
```bash
cd backend
pip install -r requirements.txt
```

2. **Configure Environment Variables**
```bash
cd backend
cp .env.example .env
# Edit .env with your credentials
```

3. **Start Backend Server**
```bash
cd backend
python run.py
# Server runs on http://localhost:8000
```

### Frontend Setup

1. **Update Environment Variables**

Add to your `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

2. **Update Code Files**

Replace these files:
- `lib/actions/interview.action.ts` → Use `interview.action.new.ts`
- `app/api/vapi/generate/route.ts` → Use `route.new.ts`

**Option A: Manual replacement**
```bash
# Backup old files
mv lib/actions/interview.action.ts lib/actions/interview.action.old.ts
mv app/api/vapi/generate/route.ts app/api/vapi/generate/route.old.ts

# Use new files
mv lib/actions/interview.action.new.ts lib/actions/interview.action.ts
mv app/api/vapi/generate/route.new.ts app/api/vapi/generate/route.ts
```

**Option B: Keep both (recommended for testing)**
- Test the Python backend first
- Once confirmed working, replace the files

3. **Start Frontend**
```bash
npm run dev
# Frontend runs on http://localhost:3000 or 3001
```

## API Changes

### Feedback Generation

**Old (Next.js Server Action):**
```typescript
const result = await createFeedback({
  interviewId,
  userId,
  transcript,
  feedbackId
});
```

**New (Python Backend):**
The function signature remains the same, but internally it calls:
```
POST http://localhost:8000/api/interview/feedback
```

### Question Generation

**Old (Next.js API Route):**
```
POST /api/vapi/generate
```

**New (Python Backend):**
```
POST http://localhost:8000/api/interview/generate
```

## Testing

### 1. Test Backend Independently

```bash
# Start backend
cd backend
python run.py

# Test health endpoint
curl http://localhost:8000/health

# Test API docs
# Visit http://localhost:8000/docs
```

### 2. Test Full Stack

1. Start backend: `cd backend && python run.py`
2. Start frontend: `npm run dev`
3. Create a new interview
4. Complete the interview
5. Verify feedback generation works

## Environment Variables

### Backend (.env)
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

### Frontend (.env.local)
```env
# Keep existing Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
# ... other Firebase vars

# Add backend URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Benefits of Separation

1. **Better Performance**: Python excels at AI/ML operations
2. **Scalability**: Backend can scale independently
3. **Language Strength**: Use Python's rich AI/ML ecosystem
4. **Separation of Concerns**: Clear boundaries between frontend and backend
5. **Easier Testing**: Test AI logic independently
6. **Future Extensions**: Easy to add more AI features

## Troubleshooting

### Backend won't start
- Check Python version (3.10+)
- Verify all dependencies installed: `pip install -r requirements.txt`
- Check `.env` file exists and has all required variables

### CORS errors
- Verify `ALLOWED_ORIGINS` in backend `.env` includes your frontend URL
- Check frontend is running on the allowed origin

### Firebase connection issues
- Ensure Firebase credentials are identical in both frontend and backend
- Check private key format (should have `\n` for line breaks)

### AI generation fails
- Verify Google API key is valid
- Check API quota limits
- Review backend logs: `python run.py` shows errors

## Rollback Plan

If you need to rollback to the old architecture:

1. Stop using the Python backend
2. Restore old files:
```bash
mv lib/actions/interview.action.old.ts lib/actions/interview.action.ts
mv app/api/vapi/generate/route.old.ts app/api/vapi/generate/route.ts
```
3. Remove `NEXT_PUBLIC_API_URL` from `.env.local`
4. Restart Next.js dev server

## Next Steps

1. Set up backend in production (Railway, Render, etc.)
2. Update `NEXT_PUBLIC_API_URL` to production URL
3. Add monitoring and logging
4. Implement rate limiting
5. Add authentication between frontend and backend
6. Set up CI/CD for backend

## Support

For issues:
- Check backend logs: `python run.py`
- Check frontend console
- Review API documentation: `http://localhost:8000/docs`

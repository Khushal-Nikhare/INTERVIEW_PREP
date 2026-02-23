@echo off
echo ========================================
echo  Interview Prep System - Full Stack
echo ========================================
echo.
echo Starting Python Backend...
start cmd /k "cd backend && uvicorn main:app --reload --port 8000"
timeout /t 3 /nobreak >nul
echo.
echo Starting Next.js Frontend...
cd INTERVIEW_PREP
start cmd /k "npm run dev"
echo.
echo ========================================
echo Both servers are starting...
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:3000
echo Backend API Docs: http://127.0.0.1:8000/docs
echo ========================================

@echo off
echo Starting Interview Analysis Backend...
cd backend
echo.
echo Backend server starting on http://127.0.0.1:8000
echo Press Ctrl+C to stop the server
echo.
uvicorn main:app --reload --port 8000

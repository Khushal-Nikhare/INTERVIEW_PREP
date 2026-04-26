@echo off
echo ======================================
echo Interview Prep - Backend Setup
echo ======================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.10 or higher
    pause
    exit /b 1
)

echo [1/4] Checking Python version...
python --version

echo.
echo [2/4] Installing dependencies...
pip install -r requirements.txt

if not exist ".env" (
    echo.
    echo [3/4] Creating .env file...
    copy .env.example .env
    echo.
    echo ⚠️  Please edit .env file with your credentials before running the server
    echo.
) else (
    echo.
    echo [3/4] .env file already exists
)

echo.
echo [4/4] Setup complete!
echo.
echo ======================================
echo To start the backend server, run:
echo   python run.py
echo.
echo API will be available at:
echo   http://localhost:8000
echo.
echo API Documentation:
echo   http://localhost:8000/docs
echo ======================================
echo.
pause

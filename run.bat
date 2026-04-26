@echo off
setlocal

set "ROOT_DIR=%~dp0"
set "BACKEND_DIR=%ROOT_DIR%backend"

echo ======================================
echo Interview Prep - Project Launcher
echo ======================================
echo.

if not exist "%BACKEND_DIR%" (
    echo Error: backend folder not found.
    pause
    exit /b 1
)

if not exist "%ROOT_DIR%package.json" (
    echo Error: package.json not found in project root.
    pause
    exit /b 1
)

python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not available in PATH.
    pause
    exit /b 1
)

node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed or not available in PATH.
    pause
    exit /b 1
)

echo Starting backend on http://localhost:8000 ...
start "Interview Prep Backend" cmd /k "cd /d "%BACKEND_DIR%" && python run.py"

echo Starting frontend on http://localhost:3000 ...
start "Interview Prep Frontend" cmd /k "cd /d "%ROOT_DIR%" && npm run dev"

echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo If the frontend cannot reach the backend, set NEXT_PUBLIC_API_URL=http://localhost:8000 in .env.local.
echo.
pause
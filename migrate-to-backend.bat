@echo off
echo ╔══════════════════════════════════════════════════════════════════╗
echo ║                                                                  ║
echo ║         🔧 QUICK FIX: Switch to Python Backend                   ║
echo ║                                                                  ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.

echo [Step 1/4] Checking files...
if not exist "lib\actions\interview.action.new.ts" (
    echo ❌ Error: interview.action.new.ts not found!
    echo Please run the full migration first.
    pause
    exit /b 1
)
echo ✓ Files found

echo.
echo [Step 2/4] Backing up old files...
if exist "lib\actions\interview.action.ts" (
    copy "lib\actions\interview.action.ts" "lib\actions\interview.action.old.ts" >nul
    echo ✓ Backed up interview.action.ts
)

if exist "app\api\vapi\generate\route.ts" (
    copy "app\api\vapi\generate\route.ts" "app\api\vapi\generate\route.old.ts" >nul
    echo ✓ Backed up route.ts
)

echo.
echo [Step 3/4] Replacing with new files...
copy "lib\actions\interview.action.new.ts" "lib\actions\interview.action.ts" >nul
echo ✓ Updated interview.action.ts

if exist "app\api\vapi\generate\route.new.ts" (
    copy "app\api\vapi\generate\route.new.ts" "app\api\vapi\generate\route.ts" >nul
    echo ✓ Updated route.ts
)

echo.
echo [Step 4/4] Checking .env.local...
if not exist ".env.local" (
    echo ⚠️  .env.local not found, creating template...
    echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local
    echo ✓ Created .env.local
) else (
    findstr /C:"NEXT_PUBLIC_API_URL" .env.local >nul
    if errorlevel 1 (
        echo.
        echo ⚠️  Please add this line to your .env.local:
        echo    NEXT_PUBLIC_API_URL=http://localhost:8000
        echo.
    ) else (
        echo ✓ NEXT_PUBLIC_API_URL already configured
    )
)

echo.
echo ╔══════════════════════════════════════════════════════════════════╗
echo ║                    ✅ MIGRATION COMPLETE!                        ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.
echo Next steps:
echo   1. Ensure backend is running:
echo      cd backend
echo      python run.py
echo.
echo   2. Restart frontend:
echo      npm run dev
echo.
echo   3. Test the application
echo.
echo Your app will now use Python backend with gemini-2.5-flash!
echo This gives you better quota limits and performance.
echo.
pause

#!/bin/bash

echo "======================================"
echo "Interview Prep - Backend Setup"
echo "======================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    echo "Please install Python 3.10 or higher"
    exit 1
fi

echo "[1/4] Checking Python version..."
python3 --version

echo ""
echo "[2/4] Installing dependencies..."
pip3 install -r requirements.txt

if [ ! -f ".env" ]; then
    echo ""
    echo "[3/4] Creating .env file..."
    cp .env.example .env
    echo ""
    echo "⚠️  Please edit .env file with your credentials before running the server"
    echo ""
else
    echo ""
    echo "[3/4] .env file already exists"
fi

echo ""
echo "[4/4] Setup complete!"
echo ""
echo "======================================"
echo "To start the backend server, run:"
echo "  python3 run.py"
echo ""
echo "API will be available at:"
echo "  http://localhost:8000"
echo ""
echo "API Documentation:"
echo "  http://localhost:8000/docs"
echo "======================================"
echo ""

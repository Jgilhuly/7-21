#!/bin/bash

# Sweet Dreams Bakery - Backend Startup Script
echo "=========================================="
echo "Sweet Dreams Bakery - Starting Backend"
echo "=========================================="

# Check if virtual environment exists
if [ ! -d "bakery_env" ]; then
    echo "Virtual environment not found. Creating one..."
    python3 -m venv bakery_env
    echo "✓ Virtual environment created"
fi

# Activate virtual environment
echo "Activating virtual environment..."
source bakery_env/bin/activate

# Check if dependencies are installed
if ! python -c "import flask, flask_cors" 2>/dev/null; then
    echo "Installing Python dependencies..."
    pip install -r requirements.txt
    echo "✓ Dependencies installed"
fi

# Start the server
echo "Starting Flask server..."
echo "Visit http://localhost:5000 to view the website"
echo "Press Ctrl+C to stop the server"
echo "------------------------------------------"

python run_server.py
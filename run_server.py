#!/usr/bin/env python3
"""
Sweet Dreams Bakery Backend Server
Run this script to start the Python backend for the bakery website.
"""

import os
import sys

def check_dependencies():
    """Check if required dependencies are installed"""
    try:
        import flask
        import flask_cors
        print("✓ All dependencies are installed")
        return True
    except ImportError as e:
        print(f"✗ Missing dependency: {e}")
        print("\nTo install dependencies, run:")
        print("pip install -r requirements.txt")
        return False

def main():
    print("=" * 50)
    print("Sweet Dreams Bakery - Backend Server")
    print("=" * 50)
    
    if not check_dependencies():
        sys.exit(1)
    
    print("\nStarting server...")
    print("Once running, you can access:")
    print("  • Website: http://localhost:5000")
    print("  • Contact API: http://localhost:5000/api/contact")
    print("  • Menu API: http://localhost:5000/api/menu")
    print("  • Hours API: http://localhost:5000/api/hours")
    print("  • Admin Panel: http://localhost:5000/admin/contacts")
    print("\nPress Ctrl+C to stop the server")
    print("-" * 50)
    
    # Import and run the Flask app
    from app import app
    app.run(debug=True, host='0.0.0.0', port=5000)

if __name__ == '__main__':
    main()
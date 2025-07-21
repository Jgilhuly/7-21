from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import datetime
import os
import json

app = Flask(__name__, static_folder='.', template_folder='.')
CORS(app)

# Database setup
def init_db():
    conn = sqlite3.connect('bakery.db')
    cursor = conn.cursor()
    
    # Create contacts table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create orders table for future use
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            order_type TEXT NOT NULL,
            details TEXT,
            order_date DATE,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files (HTML, CSS, JS, images)"""
    return send_from_directory('.', filename)

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Save to database
        conn = sqlite3.connect('bakery.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO contacts (name, email, phone, subject, message)
            VALUES (?, ?, ?, ?, ?)
        ''', (data['name'], data['email'], data.get('phone', ''), data['subject'], data['message']))
        
        conn.commit()
        conn.close()
        
        # In a real app, you might send an email here
        print(f"New contact form submission from {data['name']} ({data['email']})")
        
        return jsonify({
            'success': True,
            'message': f"Thank you, {data['name']}! We've received your message and will get back to you within 24 hours."
        })
        
    except Exception as e:
        print(f"Error handling contact form: {e}")
        return jsonify({'error': 'Something went wrong. Please try again.'}), 500

@app.route('/api/menu')
def get_menu():
    """API endpoint to get menu items (for future enhancement)"""
    menu_items = {
        'breads': [
            {'name': 'Artisan Sourdough', 'price': 6.50, 'description': 'Classic sourdough with a perfect crust'},
            {'name': 'Whole Wheat', 'price': 5.50, 'description': 'Hearty whole grain bread'},
            {'name': 'French Baguette', 'price': 4.00, 'description': 'Traditional crispy French baguette'}
        ],
        'pastries': [
            {'name': 'Croissant', 'price': 3.50, 'description': 'Buttery, flaky pastry'},
            {'name': 'Pain au Chocolat', 'price': 4.00, 'description': 'Croissant with dark chocolate'},
            {'name': 'Almond Danish', 'price': 4.50, 'description': 'Sweet pastry with almond filling'}
        ],
        'cakes': [
            {'name': 'Chocolate Layer Cake', 'price': 45.00, 'description': 'Rich chocolate cake with frosting'},
            {'name': 'Vanilla Birthday Cake', 'price': 40.00, 'description': 'Classic vanilla with buttercream'},
            {'name': 'Red Velvet Cake', 'price': 50.00, 'description': 'Moist red velvet with cream cheese frosting'}
        ]
    }
    return jsonify(menu_items)

@app.route('/api/hours')
def get_hours():
    """API endpoint to get current hours and status"""
    current_time = datetime.datetime.now()
    current_hour = current_time.hour
    current_day = current_time.weekday()  # 0 = Monday, 6 = Sunday
    
    # Define hours (24-hour format)
    hours = {
        'monday': {'open': 6, 'close': 20},
        'tuesday': {'open': 6, 'close': 20},
        'wednesday': {'open': 6, 'close': 20},
        'thursday': {'open': 6, 'close': 20},
        'friday': {'open': 6, 'close': 20},
        'saturday': {'open': 6, 'close': 21},
        'sunday': {'open': 7, 'close': 19}
    }
    
    days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    today = days[current_day]
    today_hours = hours[today]
    
    is_open = today_hours['open'] <= current_hour < today_hours['close']
    
    return jsonify({
        'is_open': is_open,
        'today': today,
        'hours': hours,
        'current_time': current_time.strftime('%Y-%m-%d %H:%M:%S')
    })

@app.route('/admin/contacts')
def admin_contacts():
    """Simple admin view to see contact form submissions"""
    conn = sqlite3.connect('bakery.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM contacts ORDER BY created_at DESC')
    contacts = cursor.fetchall()
    conn.close()
    
    # Convert to list of dictionaries for easier templating
    contact_list = []
    for contact in contacts:
        contact_list.append({
            'id': contact[0],
            'name': contact[1],
            'email': contact[2],
            'phone': contact[3],
            'subject': contact[4],
            'message': contact[5],
            'created_at': contact[6]
        })
    
    return jsonify(contact_list)

if __name__ == '__main__':
    print("Starting Sweet Dreams Bakery Backend Server...")
    print("Visit http://localhost:5000 to view the website")
    print("API endpoints available:")
    print("  - POST /api/contact - Submit contact form")
    print("  - GET /api/menu - Get menu items")
    print("  - GET /api/hours - Get current hours and status")
    print("  - GET /admin/contacts - View contact submissions")
    app.run(debug=True, host='0.0.0.0', port=5000)
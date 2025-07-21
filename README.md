# Sweet Dreams Bakery - Website with Python Backend

A beautiful, responsive website for Sweet Dreams Bakery featuring a modern frontend and a Python Flask backend.

## Features

### Frontend
- Responsive design that works on all devices
- Beautiful hero section with call-to-action
- Interactive navigation with mobile hamburger menu
- Contact form with real-time validation
- Animated elements with scroll effects
- Real-time bakery open/closed status indicator

### Backend (Python Flask)
- RESTful API endpoints
- SQLite database for storing contact form submissions
- Contact form processing and validation
- Dynamic bakery hours and status API
- Menu items API (ready for future expansion)
- Admin panel to view contact submissions
- CORS enabled for frontend-backend communication

## Setup and Installation

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. **Clone or download the project files**

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the backend server**
   ```bash
   ./start_backend.sh
   ```
   
   Or manually:
   ```bash
   source bakery_env/bin/activate
   python run_server.py
   ```
   
   Or alternatively:
   ```bash
   python app.py
   ```

4. **Access the website**
   Open your browser and go to: `http://localhost:5000`

## API Endpoints

The backend provides several API endpoints:

### Contact Form
- **POST** `/api/contact`
  - Submit contact form data
  - Validates required fields
  - Stores submissions in SQLite database
  - Returns success/error messages

### Menu Items
- **GET** `/api/menu`
  - Returns menu items organized by category
  - Includes prices and descriptions
  - Ready for dynamic menu display

### Bakery Hours
- **GET** `/api/hours`
  - Returns current open/closed status
  - Provides weekly hours schedule
  - Shows current time

### Admin Panel
- **GET** `/admin/contacts`
  - View all contact form submissions
  - JSON format for easy integration
  - Ordered by most recent first

## File Structure

```
├── app.py                 # Main Flask application
├── run_server.py         # Server startup script
├── start_backend.sh      # Easy startup script (run with ./start_backend.sh)
├── requirements.txt      # Python dependencies
├── bakery_env/           # Python virtual environment
├── bakery.db            # SQLite database (created automatically)
├── index.html           # Homepage
├── about.html           # About page
├── menu.html            # Menu page
├── contact.html         # Contact page
├── styles.css           # Main stylesheet
├── script.js            # Frontend JavaScript
└── README.md            # This file
```

## Database Schema

The backend automatically creates SQLite tables:

### Contacts Table
- `id` - Primary key
- `name` - Customer name
- `email` - Email address
- `phone` - Phone number (optional)
- `subject` - Message subject
- `message` - Message content
- `created_at` - Timestamp

### Orders Table (Future Use)
- `id` - Primary key
- `customer_name` - Customer name
- `email` - Email address
- `phone` - Phone number
- `order_type` - Type of order
- `details` - Order details
- `order_date` - Requested date
- `status` - Order status
- `created_at` - Timestamp

## Customization

### Updating Bakery Hours
Edit the `hours` dictionary in `app.py` in the `/api/hours` endpoint:

```python
hours = {
    'monday': {'open': 6, 'close': 20},
    'tuesday': {'open': 6, 'close': 20},
    # ... etc
}
```

### Adding Menu Items
Update the `menu_items` dictionary in the `/api/menu` endpoint in `app.py`.

### Styling
Modify `styles.css` for visual changes or add custom CSS in `script.js`.

## Development

The server runs in debug mode by default, which means:
- Automatic reloading when files change
- Detailed error messages
- Debug toolbar available

For production deployment, set `debug=False` in `app.py`.

## Future Enhancements

The backend is designed to easily support:
- Email notifications for contact form submissions
- Online ordering system
- Customer accounts and authentication
- Inventory management
- Staff scheduling
- Analytics and reporting

## Troubleshooting

### Common Issues

1. **Port 5000 already in use**
   - Change the port in `app.py`: `app.run(port=8000)`

2. **Dependencies not installed**
   - Run: `pip install -r requirements.txt`

3. **Database errors**
   - Delete `bakery.db` file to reset the database

4. **CORS errors**
   - Ensure Flask-CORS is installed and properly configured

## Support

For issues or questions about the backend implementation, check the console output when running the server for detailed error messages.
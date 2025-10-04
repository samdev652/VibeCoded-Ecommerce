# Quick Start Guide

Get the e-commerce platform running in 5 minutes!

## Prerequisites Check

Ensure you have:
- ✅ Python 3.8+ installed
- ✅ Node.js 14+ installed
- ✅ MongoDB installed and running

## Automated Setup (Recommended)

```bash
# Make setup script executable
chmod +x setup.sh

# Run setup script
./setup.sh
```

The script will:
1. Create Python virtual environment
2. Install backend dependencies
3. Run database migrations
4. Install frontend dependencies
5. Create .env file

## Manual Setup

### 1. Backend Setup (5 steps)

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env

# Run migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser
```

### 2. Frontend Setup (2 steps)

```bash
cd frontend

# Install dependencies
npm install
```

## Running the Application

### Terminal 1 - Backend
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

## Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin

## Create Sample Data

```bash
cd backend
source venv/bin/activate
python manage.py shell < create_sample_data.py
```

This creates:
- 5 product categories
- 12 sample products
- Ready-to-use test data

## Test the Application

1. **Browse Products**: Visit http://localhost:3000
2. **Register Account**: Click "Register" in navbar
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Checkout**: Go to cart and proceed to checkout
5. **View Orders**: Check your order history

## Default Admin Credentials

After running `createsuperuser`, use your credentials at:
http://localhost:8000/admin

## API Testing

### Register User
```bash
curl -X POST http://localhost:8000/api/users/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "password2": "testpass123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/users/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'
```

### Get Products
```bash
curl http://localhost:8000/api/products/
```

## Common Issues

### MongoDB not running
```bash
# Linux
sudo systemctl start mongodb

# macOS
brew services start mongodb-community
```

### Port already in use
```bash
# Backend (change port)
python manage.py runserver 8001

# Frontend (change port)
PORT=3001 npm start
```

### Module not found
```bash
# Backend
cd backend
source venv/bin/activate
pip install -r requirements.txt

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Customize**: Modify colors, branding, and content
2. **Add Products**: Use admin panel to add real products
3. **Configure**: Update .env with your settings
4. **Deploy**: Follow DEPLOYMENT.md for production setup

## Project Structure

```
demoproj/
├── backend/           # Django REST API
│   ├── ecommerce/    # Project settings
│   ├── products/     # Products app
│   ├── orders/       # Orders & cart app
│   └── users/        # Authentication app
├── frontend/         # React application
│   └── src/
│       ├── pages/    # Page components
│       ├── components/ # Reusable components
│       └── context/  # State management
└── README.md         # Full documentation
```

## Support

- 📖 Full documentation: See README.md
- 🚀 Deployment guide: See DEPLOYMENT.md
- 🐛 Issues: Check troubleshooting section in README.md

## Features Overview

### User Features
- ✅ User registration and authentication
- ✅ Browse products with search and filters
- ✅ View product details and reviews
- ✅ Add products to cart
- ✅ Place orders with shipping info
- ✅ View order history
- ✅ Manage user profile

### Admin Features
- ✅ Manage products and categories
- ✅ View and update orders
- ✅ Manage users
- ✅ View product reviews

### Technical Features
- ✅ JWT authentication
- ✅ MongoDB database
- ✅ RESTful API
- ✅ Responsive design
- ✅ Modern React with hooks
- ✅ Context API for state management

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Backend: Changes auto-reload with Django dev server
- Frontend: Changes auto-reload with React dev server

### Debug Mode
Backend debug mode is enabled by default in development.
Check `.env` file: `DEBUG=True`

### API Documentation
Visit http://localhost:8000/api/ for browsable API interface

---

**Happy Coding! 🚀**

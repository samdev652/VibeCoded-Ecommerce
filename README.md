# VibeCoded E-Commerce Platform

A full-stack e-commerce platform built with React and Django.

## Project Structure

```
VibeCoded-Ecommerce/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React Context for state management
│   │   └── api/        # API client configuration
│   └── package.json
│
└── backend/            # Django REST API
    ├── users/          # User authentication
    ├── products/       # Product management
    ├── orders/         # Order and cart management
    ├── payments/       # Payment processing
    └── manage.py
```

## Features

### Frontend

- 🛒 Shopping cart with real-time updates
- 🔍 Product search and filtering
- ⭐ Product reviews and ratings
- 👤 User authentication and profiles
- 💳 Secure checkout process
- 📱 M-Pesa mobile payment integration
- 📦 Order tracking and history

### Backend

- 🔐 JWT-based authentication
- 🗄️ MongoDB database
- 📊 RESTful API
- 💰 PayHero M-Pesa integration
- 🛡️ CORS enabled
- 🔒 Secure password handling

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+
- MongoDB

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your settings
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data
python manage.py runserver 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000` and the backend API on `http://localhost:8000`.

## Environment Variables

### Backend (.env)

```
SECRET_KEY=your-secret-key
DEBUG=True
MONGODB_NAME=ecommerce_db
MONGODB_HOST=localhost
MONGODB_PORT=27017
CORS_ALLOWED_ORIGINS=http://localhost:3000
PAYHERO_API_KEY=your-payhero-key  # Optional
```

### Frontend

The frontend uses a proxy configured in `package.json` to connect to the backend at `http://localhost:8000`.

## API Documentation

See [backend/README.md](backend/README.md) for detailed API documentation.

## Tech Stack

### Frontend

- React 18
- React Router 6
- Axios
- Lucide React (icons)
- CSS3

### Backend

- Django 4.2
- Django REST Framework
- MongoDB (via Djongo)
- Simple JWT
- PayHero API

## Development

### Running Tests

```bash
# Frontend
cd frontend
npm test

# Backend
cd backend
python manage.py test
```

### Database Management

```bash
# Seed database with sample data
python manage.py seed_data

# Create admin user
python manage.py createsuperuser
```

## Deployment

### Frontend

```bash
cd frontend
npm run build
```

### Backend

```bash
cd backend
python manage.py collectstatic
# Use gunicorn or uwsgi for production
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.

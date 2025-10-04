# E-Commerce Platform

A modern, full-stack e-commerce application built with Django REST Framework, React.js, and MongoDB.

## 🚀 Features

### Backend (Django REST Framework + MongoDB)
- **User Authentication**: JWT-based authentication with registration and login
- **Product Management**: CRUD operations for products with categories
- **Shopping Cart**: Add, update, and remove items from cart
- **Order Management**: Place orders and track order history
- **Product Reviews**: Users can rate and review products
- **Search & Filter**: Search products by name and filter by category/price
- **Admin Panel**: Django admin interface for managing the store

### Frontend (React.js)
- **Modern UI**: Clean, responsive design with custom CSS
- **Product Catalog**: Browse products with search and category filters
- **Product Details**: View detailed product information and reviews
- **Shopping Cart**: Manage cart items with quantity controls
- **Checkout Process**: Complete order with shipping information
- **User Profile**: Manage personal information and addresses
- **Order History**: View past orders and their status
- **Authentication**: Login and registration with JWT tokens

## 📋 Prerequisites

- Python 3.8+
- Node.js 14+
- MongoDB 4.4+
- pip (Python package manager)
- npm or yarn (Node package manager)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
cd /home/soliditywizard/demoproj
```

### 2. Backend Setup

#### Install MongoDB
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb-community

# Start MongoDB service
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS
```

#### Setup Python Environment
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt
```

#### Configure Environment Variables
```bash
# Copy example env file
cp .env.example .env

# Edit .env file with your settings
nano .env
```

Update the `.env` file:
```env
SECRET_KEY=your-secret-key-here-change-this
DEBUG=True
MONGODB_NAME=ecommerce_db
MONGODB_HOST=localhost
MONGODB_PORT=27017
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

#### Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

#### Create Superuser
```bash
python manage.py createsuperuser
```

#### Create Sample Data (Optional)
```bash
python manage.py shell
```

Then run:
```python
from products.models import Category, Product
from django.contrib.auth.models import User

# Create categories
electronics = Category.objects.create(name="Electronics", description="Electronic devices and gadgets")
clothing = Category.objects.create(name="Clothing", description="Fashion and apparel")
books = Category.objects.create(name="Books", description="Books and literature")

# Create sample products
Product.objects.create(
    name="Wireless Headphones",
    description="High-quality wireless headphones with noise cancellation",
    price=99.99,
    category=electronics,
    stock=50,
    rating=4.5,
    num_reviews=120
)

Product.objects.create(
    name="Smart Watch",
    description="Feature-rich smartwatch with fitness tracking",
    price=199.99,
    category=electronics,
    stock=30,
    rating=4.7,
    num_reviews=85
)

Product.objects.create(
    name="Cotton T-Shirt",
    description="Comfortable cotton t-shirt in various colors",
    price=19.99,
    category=clothing,
    stock=100,
    rating=4.3,
    num_reviews=200
)

print("Sample data created successfully!")
exit()
```

#### Start Backend Server
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
demoproj/
├── backend/
│   ├── ecommerce/          # Django project settings
│   │   ├── settings.py     # Main settings
│   │   ├── urls.py         # URL routing
│   │   └── wsgi.py
│   ├── products/           # Products app
│   │   ├── models.py       # Product, Category, Review models
│   │   ├── serializers.py  # API serializers
│   │   ├── views.py        # API views
│   │   └── urls.py
│   ├── orders/             # Orders app
│   │   ├── models.py       # Order, Cart models
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── users/              # Users app
│   │   ├── models.py       # UserProfile model
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── api/
    │   │   └── axios.js        # API configuration
    │   ├── components/
    │   │   ├── Navbar.js       # Navigation bar
    │   │   ├── ProductCard.js  # Product card component
    │   │   └── PrivateRoute.js # Protected route wrapper
    │   ├── context/
    │   │   ├── AuthContext.js  # Authentication context
    │   │   └── CartContext.js  # Cart context
    │   ├── pages/
    │   │   ├── Home.js         # Home page
    │   │   ├── ProductDetail.js
    │   │   ├── Cart.js
    │   │   ├── Checkout.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Profile.js
    │   │   └── Orders.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/users/register/` - Register new user
- `POST /api/users/login/` - Login user
- `POST /api/users/token/refresh/` - Refresh JWT token
- `GET /api/users/me/` - Get current user info
- `GET /api/users/profile/` - Get user profile
- `PATCH /api/users/profile/` - Update user profile

### Products
- `GET /api/products/` - List all products (with pagination, search, filters)
- `GET /api/products/{id}/` - Get product details
- `POST /api/products/{id}/review/` - Add product review (authenticated)
- `GET /api/products/categories/` - List all categories

### Cart
- `GET /api/orders/cart/` - Get user's cart
- `POST /api/orders/cart/add_item/` - Add item to cart
- `PATCH /api/orders/cart/update_item/` - Update cart item quantity
- `DELETE /api/orders/cart/remove_item/` - Remove item from cart
- `DELETE /api/orders/cart/clear/` - Clear cart

### Orders
- `GET /api/orders/orders/` - List user's orders
- `POST /api/orders/orders/` - Create new order
- `GET /api/orders/orders/{id}/` - Get order details

## 🎨 Frontend Features

### State Management
- **AuthContext**: Manages user authentication state
- **CartContext**: Manages shopping cart state

### Routing
- `/` - Home page with product listing
- `/product/:id` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout page (protected)
- `/login` - Login page
- `/register` - Registration page
- `/profile` - User profile (protected)
- `/orders` - Order history (protected)

### Styling
- Custom CSS with utility classes
- Responsive design for mobile, tablet, and desktop
- Modern color scheme with gradient accents
- Smooth transitions and hover effects

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with Django's built-in system
- CORS protection
- CSRF protection
- Token refresh mechanism
- Protected routes on frontend
- Permission-based API access

## 🚀 Deployment

### Backend Deployment

1. Set `DEBUG=False` in production
2. Update `ALLOWED_HOSTS` with your domain
3. Use environment variables for sensitive data
4. Set up MongoDB Atlas for cloud database
5. Use Gunicorn or uWSGI as WSGI server
6. Set up Nginx as reverse proxy
7. Enable HTTPS with SSL certificate

### Frontend Deployment

1. Build production bundle:
```bash
npm run build
```

2. Deploy to hosting service (Netlify, Vercel, etc.)
3. Update API base URL to production backend

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Admin Panel

Access the Django admin panel at `http://localhost:8000/admin`

Features:
- Manage products and categories
- View and update orders
- Manage users and profiles
- View product reviews

## 🛠️ Technologies Used

### Backend
- Django 4.2.7
- Django REST Framework 3.14.0
- Djongo 1.3.6 (MongoDB connector)
- PyMongo 3.12.3
- djangorestframework-simplejwt 5.3.0
- django-cors-headers 4.3.1

### Frontend
- React 18.2.0
- React Router DOM 6.20.1
- Axios 1.6.2
- Lucide React 0.294.0 (icons)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using Django REST Framework and React.js

## 📞 Support

For issues and questions, please open an issue in the repository.

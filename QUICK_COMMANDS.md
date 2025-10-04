# ⚡ Quick Commands Reference

## 🚀 Setup (First Time Only)

```bash
# 1. Install frontend dependencies
cd frontend
npm install

# 2. Setup backend
cd ../backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env

# 3. Run migrations
python manage.py makemigrations
python manage.py migrate

# 4. Seed database with products
python seed_data.py
```

## 🏃 Daily Development

### Start Everything (2 terminals needed)

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## 🌱 Database Commands

### Seed Data
```bash
cd backend
source venv/bin/activate
python seed_data.py
```

### Create Admin User
```bash
python manage.py createsuperuser
```

### Reset Database
```bash
python manage.py flush
python seed_data.py
```

### Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

## 🔍 Testing & Verification

### Check Backend API
```bash
curl http://localhost:8000/api/products/
curl http://localhost:8000/api/products/categories/
```

### Check MongoDB
```bash
mongo
> use ecommerce_db
> db.products_product.count()
> db.products_category.find()
```

## 👤 Login Credentials

### Admin
```
URL: http://localhost:8000/admin
Username: admin
Password: admin123
```

### Test Users
```
Username: user1, user2, user3, user4, user5
Password: password123
```

## 🌐 Access URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin
- **API Docs**: http://localhost:8000/api/ (browsable)

## 🐛 Troubleshooting

### MongoDB Not Running
```bash
# Linux
sudo systemctl start mongodb
sudo systemctl status mongodb

# macOS
brew services start mongodb-community
brew services list
```

### Port Already in Use
```bash
# Backend (use different port)
python manage.py runserver 8001

# Frontend (use different port)
PORT=3001 npm start
```

### Clear Node Modules
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Python Dependencies Issue
```bash
cd backend
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

## 📦 Build for Production

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
python manage.py collectstatic
```

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
python manage.py test
```

## 📊 Useful Django Commands

### Shell
```bash
python manage.py shell
```

### Show Migrations
```bash
python manage.py showmigrations
```

### Create App
```bash
python manage.py startapp appname
```

## 🔄 Update Project

### Pull Latest Changes
```bash
git pull origin main
cd frontend && npm install
cd ../backend && pip install -r requirements.txt
python manage.py migrate
```

## 🗑️ Clean Up

### Remove All Data
```bash
python manage.py flush --no-input
```

### Remove Migrations
```bash
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete
```

## 📝 Quick Edits

### Add New Product (via shell)
```python
python manage.py shell
>>> from products.models import Product, Category
>>> cat = Category.objects.first()
>>> Product.objects.create(
...     name="New Product",
...     description="Description",
...     price=99.99,
...     category=cat,
...     stock=50
... )
```

### View All Products
```python
>>> from products.models import Product
>>> for p in Product.objects.all():
...     print(f"{p.name} - ${p.price}")
```

## 🎯 Common Tasks

### Add Sample Review
```python
python manage.py shell
>>> from products.models import Product, Review
>>> from django.contrib.auth.models import User
>>> product = Product.objects.first()
>>> user = User.objects.first()
>>> Review.objects.create(
...     product=product,
...     user=user,
...     rating=5,
...     comment="Great product!"
... )
```

### Check Order Count
```python
>>> from orders.models import Order
>>> Order.objects.count()
```

### List All Users
```python
>>> from django.contrib.auth.models import User
>>> User.objects.values_list('username', 'email')
```

## 🔐 Security

### Change Admin Password
```bash
python manage.py changepassword admin
```

### Create New Superuser
```bash
python manage.py createsuperuser
```

## 📈 Monitoring

### Check Logs
```bash
# Backend logs (if using gunicorn)
tail -f logs/gunicorn.log

# Frontend logs
# Check browser console
```

### Database Stats
```python
python manage.py shell
>>> from products.models import Product, Category
>>> from orders.models import Order
>>> from django.contrib.auth.models import User
>>> print(f"Products: {Product.objects.count()}")
>>> print(f"Categories: {Category.objects.count()}")
>>> print(f"Orders: {Order.objects.count()}")
>>> print(f"Users: {User.objects.count()}")
```

## 💾 Backup

### Backup MongoDB
```bash
mongodump --db ecommerce_db --out backup/
```

### Restore MongoDB
```bash
mongorestore --db ecommerce_db backup/ecommerce_db/
```

---

## 🎯 Most Common Commands

```bash
# Start backend
cd backend && source venv/bin/activate && python manage.py runserver

# Start frontend
cd frontend && npm start

# Seed data
cd backend && source venv/bin/activate && python seed_data.py

# Access admin
# Open: http://localhost:8000/admin
# Login: admin / admin123
```

---

**💡 Tip**: Bookmark this file for quick reference!

# 🌱 Seed Data Instructions

## Overview

The seed data script creates a complete Amazon-like e-commerce store with:
- **40+ Products** across 8 categories
- **5 Test Users** for testing
- **1 Admin User** for management
- **50+ Product Reviews** with realistic ratings
- **Real product descriptions** similar to Amazon listings

## Quick Start

### 1. Make sure MongoDB is running
```bash
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS
```

### 2. Navigate to backend directory
```bash
cd backend
source venv/bin/activate  # Activate virtual environment
```

### 3. Run the seed script
```bash
python seed_data.py
```

## What Gets Created

### Categories (8)
1. **Electronics** - Phones, laptops, headphones, cameras
2. **Clothing & Fashion** - Jeans, shoes, jackets, sunglasses
3. **Books & Media** - Books, Kindle devices
4. **Home & Kitchen** - Air fryers, coffee makers, vacuums
5. **Sports & Outdoors** - Fitness equipment, camping gear
6. **Beauty & Personal Care** - Skincare, electric toothbrushes
7. **Toys & Games** - LEGO, gaming consoles
8. **Automotive** - GPS, tires, accessories

### Sample Products Include:
- **iPhone 15 Pro Max** - $1,199.99
- **MacBook Pro 16" M3** - $3,499.99
- **Sony WH-1000XM5 Headphones** - $399.99
- **Samsung 65" QLED TV** - $1,299.99
- **Nike Air Max 270** - $149.99
- **PlayStation 5** - $499.99
- **Dyson V15 Vacuum** - $649.99
- **Peloton Bike+** - $2,495.00
- And 30+ more!

### User Accounts

#### Admin Account
```
Username: admin
Password: admin123
Email: admin@ecommerce.com
```

#### Test User Accounts
```
Username: user1, user2, user3, user4, user5
Password: password123
Emails: user1@example.com, user2@example.com, etc.
```

### Product Reviews
- 50+ realistic reviews across products
- Ratings from 1-5 stars
- Weighted towards positive reviews (like real e-commerce)
- Authentic review comments

## Verification

After running the seed script, verify the data:

### 1. Check in Admin Panel
```
Visit: http://localhost:8000/admin
Login with admin/admin123
```

### 2. Check via API
```bash
# Get all products
curl http://localhost:8000/api/products/

# Get all categories
curl http://localhost:8000/api/products/categories/
```

### 3. Check in Frontend
```
Visit: http://localhost:3000
You should see all products displayed
```

## Features You Can Test

### 1. Browse Products
- Visit homepage to see all products
- Use search to find specific items
- Filter by category
- See featured products section
- View trending products

### 2. Product Details
- Click any product to see full details
- View product reviews
- See ratings and review counts
- Check stock availability

### 3. Shopping Cart
- Login with test user (user1/password123)
- Add products to cart
- Update quantities
- Remove items
- See cart total

### 4. Checkout
- Proceed to checkout from cart
- Enter shipping information
- Select payment method
- Place order

### 5. Order History
- View past orders
- See order details
- Check order status

### 6. Admin Functions
- Login to admin panel (admin/admin123)
- Manage products
- View orders
- Manage users
- Moderate reviews

## Resetting Data

To reset and re-seed the database:

```bash
# Delete existing data
python manage.py shell
>>> from products.models import Product, Category, Review
>>> from orders.models import Order, OrderItem, Cart, CartItem
>>> Product.objects.all().delete()
>>> Category.objects.all().delete()
>>> Review.objects.all().delete()
>>> Order.objects.all().delete()
>>> Cart.objects.all().delete()
>>> exit()

# Re-run seed script
python seed_data.py
```

## Customizing Seed Data

Edit `seed_data.py` to:
- Add more products
- Change product prices
- Modify categories
- Adjust review counts
- Change user credentials

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
sudo systemctl status mongodb

# Start MongoDB
sudo systemctl start mongodb
```

### Import Errors
```bash
# Make sure you're in the backend directory
cd backend

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Permission Errors
```bash
# Make sure migrations are applied
python manage.py makemigrations
python manage.py migrate
```

## Expected Output

When the script runs successfully, you'll see:

```
🌱 Starting data seeding...
✅ Admin user created (username: admin, password: admin123)
✅ Created 5 test users
✅ Created 8 categories
✅ Created 40 products
✅ Created 50+ reviews

==================================================
🎉 Data seeding completed successfully!
==================================================

📊 Summary:
  • Categories: 8
  • Products: 40
  • Users: 6
  • Reviews: 50+

👤 Admin credentials:
  Username: admin
  Password: admin123

👥 Test user credentials:
  Username: user1-user5
  Password: password123

🌐 Access the application:
  Frontend: http://localhost:3000
  Admin: http://localhost:8000/admin

✨ Happy shopping!
```

## Next Steps

After seeding data:

1. **Start the backend server**:
   ```bash
   python manage.py runserver
   ```

2. **Start the frontend** (in new terminal):
   ```bash
   cd frontend
   npm start
   ```

3. **Visit the application**:
   - Frontend: http://localhost:3000
   - Admin: http://localhost:8000/admin

4. **Test the features**:
   - Browse products
   - Search and filter
   - Add to cart
   - Complete checkout
   - View orders

## Support

If you encounter any issues:
1. Check MongoDB is running
2. Verify virtual environment is activated
3. Ensure all dependencies are installed
4. Check the console for error messages
5. Review the troubleshooting section above

---

**Happy Testing! 🚀**

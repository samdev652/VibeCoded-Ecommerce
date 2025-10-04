# 🔧 Quick Fix for Setup Issues

## Issues Found

1. ❌ **Typo in command**: You typed `runserever` instead of `runserver`
2. ❌ **Dependencies not installed**: `djongo` module is missing
3. ⚠️ **Wrong SECRET_KEY**: You put MongoDB connection string in SECRET_KEY

## ✅ Quick Fix (Run These Commands)

### Step 1: Install Dependencies
```bash
cd /home/soliditywizard/demoproj/backend
pip3 install -r requirements.txt
```

### Step 2: Create Correct .env File
```bash
cp .env.example .env
```

Then edit the `.env` file to have:
```env
SECRET_KEY=django-insecure-dev-key-change-in-production-12345
DEBUG=True
MONGODB_NAME=ecommerce_db
MONGODB_HOST=localhost
MONGODB_PORT=27017
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

**Note**: The SECRET_KEY should be a random Django secret key, NOT your MongoDB connection string!

### Step 3: Run Migrations
```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

### Step 4: Seed Database
```bash
python3 seed_data_comprehensive.py
```

### Step 5: Start Server (Correct Command!)
```bash
python3 manage.py runserver
```
**Note the correct spelling**: `runserver` not `runserever`

## 🎯 Complete Setup Commands (Copy & Paste)

```bash
# Navigate to backend
cd /home/soliditywizard/demoproj/backend

# Install dependencies
pip3 install -r requirements.txt

# Create .env file
cat > .env << 'EOF'
SECRET_KEY=django-insecure-dev-key-change-in-production-12345
DEBUG=True
MONGODB_NAME=ecommerce_db
MONGODB_HOST=localhost
MONGODB_PORT=27017
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
EOF

# Run migrations
python3 manage.py makemigrations
python3 manage.py migrate

# Seed database with 100+ products
python3 seed_data_comprehensive.py

# Start server
python3 manage.py runserver
```

## 📝 Important Notes

### About SECRET_KEY
- ❌ **WRONG**: `SECRET_KEY=mongodb+srv://...` (This is a MongoDB connection string!)
- ✅ **CORRECT**: `SECRET_KEY=django-insecure-dev-key-12345` (Random Django secret)

### About MongoDB Connection
If you want to use MongoDB Atlas (cloud), you need to configure it differently:

```env
MONGODB_HOST=mongodb+srv://andrewbaraka652:Caroline2024@cluster0.gpizecl.mongodb.net/
MONGODB_NAME=ecommerce_db
```

But for local development, use:
```env
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_NAME=ecommerce_db
```

## 🚀 After Setup

Once everything is installed and running:

1. **Backend**: http://localhost:8000/api/products/
2. **Frontend**: http://localhost:3000 (already running)
3. **Admin**: http://localhost:8000/admin

## ⚠️ Common Errors & Solutions

### Error: "No module named 'djongo'"
**Solution**: Run `pip3 install -r requirements.txt`

### Error: "SECRET_KEY" issues
**Solution**: Make sure SECRET_KEY is a Django secret, not MongoDB connection

### Error: "Connection refused"
**Solution**: Make sure MongoDB is running: `sudo systemctl start mongodb`

### Typo: "runserever"
**Solution**: Use `runserver` (correct spelling)

## 🎊 You're Almost There!

Just run the commands above and your store with 100+ products and images will be ready!

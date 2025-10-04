# Deployment Guide

This guide covers deploying the e-commerce platform to production.

## Prerequisites

- Domain name
- SSL certificate
- Server with Ubuntu 20.04+ (or similar)
- MongoDB Atlas account (or self-hosted MongoDB)

## Backend Deployment

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python and dependencies
sudo apt install python3-pip python3-venv nginx -y

# Install MongoDB (or use MongoDB Atlas)
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2. Deploy Backend Code

```bash
# Clone repository
cd /var/www
sudo git clone <your-repo-url> ecommerce
cd ecommerce/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install gunicorn
```

### 3. Configure Environment

Create `/var/www/ecommerce/backend/.env`:

```env
SECRET_KEY=your-production-secret-key-very-long-and-random
DEBUG=False
MONGODB_NAME=ecommerce_prod
MONGODB_HOST=localhost  # or MongoDB Atlas connection string
MONGODB_PORT=27017
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### 4. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

### 5. Configure Gunicorn

Create `/etc/systemd/system/gunicorn.service`:

```ini
[Unit]
Description=Gunicorn daemon for E-Commerce API
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/ecommerce/backend
Environment="PATH=/var/www/ecommerce/backend/venv/bin"
ExecStart=/var/www/ecommerce/backend/venv/bin/gunicorn \
    --workers 3 \
    --bind unix:/var/www/ecommerce/backend/gunicorn.sock \
    ecommerce.wsgi:application

[Install]
WantedBy=multi-user.target
```

Start Gunicorn:

```bash
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
```

### 6. Configure Nginx

Create `/etc/nginx/sites-available/ecommerce`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location /api/ {
        proxy_pass http://unix:/var/www/ecommerce/backend/gunicorn.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /admin/ {
        proxy_pass http://unix:/var/www/ecommerce/backend/gunicorn.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /var/www/ecommerce/backend/staticfiles/;
    }

    location /media/ {
        alias /var/www/ecommerce/backend/media/;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/ecommerce /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Frontend Deployment

### Option 1: Netlify

1. Build the project:
```bash
cd frontend
npm run build
```

2. Deploy to Netlify:
- Connect your GitHub repository
- Set build command: `npm run build`
- Set publish directory: `build`
- Add environment variable: `REACT_APP_API_URL=https://yourdomain.com/api`

### Option 2: Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd frontend
vercel --prod
```

### Option 3: Self-hosted with Nginx

1. Build the project:
```bash
cd frontend
npm run build
```

2. Copy build files:
```bash
sudo cp -r build/* /var/www/ecommerce/frontend/
```

3. Update Nginx config to serve frontend:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/ecommerce/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://unix:/var/www/ecommerce/backend/gunicorn.sock;
        # ... proxy settings
    }
}
```

## MongoDB Atlas Setup (Recommended for Production)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses
5. Get connection string
6. Update `.env`:

```env
MONGODB_HOST=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_NAME=ecommerce_prod
```

## Security Checklist

- [ ] Set `DEBUG=False` in production
- [ ] Use strong `SECRET_KEY`
- [ ] Configure ALLOWED_HOSTS properly
- [ ] Set up SSL/HTTPS
- [ ] Configure CORS properly
- [ ] Use environment variables for sensitive data
- [ ] Set up firewall (ufw)
- [ ] Regular backups of MongoDB
- [ ] Keep dependencies updated
- [ ] Monitor logs for errors
- [ ] Set up rate limiting
- [ ] Configure proper file upload limits

## Monitoring

### Backend Logs
```bash
# Gunicorn logs
sudo journalctl -u gunicorn -f

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Database Backup

```bash
# Backup MongoDB
mongodump --db ecommerce_prod --out /backups/$(date +%Y%m%d)

# Restore MongoDB
mongorestore --db ecommerce_prod /backups/20231201/ecommerce_prod
```

## Performance Optimization

1. **Enable Gzip compression** in Nginx
2. **Use CDN** for static files
3. **Enable caching** for API responses
4. **Optimize images** before upload
5. **Use database indexing** for frequently queried fields
6. **Enable Redis** for session storage and caching
7. **Monitor server resources** (CPU, RAM, disk)

## Troubleshooting

### Backend not starting
```bash
sudo systemctl status gunicorn
sudo journalctl -u gunicorn -n 50
```

### Database connection issues
```bash
sudo systemctl status mongod
mongo --eval "db.adminCommand('ping')"
```

### Nginx errors
```bash
sudo nginx -t
sudo systemctl status nginx
```

## Maintenance

### Update application
```bash
cd /var/www/ecommerce
sudo git pull
cd backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
sudo systemctl restart gunicorn
```

### Update frontend
```bash
cd frontend
npm install
npm run build
sudo cp -r build/* /var/www/ecommerce/frontend/
```

# M-Pesa STK Push Integration Guide

## Overview

This e-commerce platform now includes full M-Pesa STK Push integration using the Safaricom Daraja API. When a customer places an order and selects M-Pesa as the payment method, they receive an STK Push prompt on their phone to enter their M-Pesa PIN and complete the payment.

## Setup Instructions

### 1. Get M-Pesa Daraja API Credentials

1. **Go to Daraja Portal**:

   - Sandbox (Testing): https://developer.safaricom.co.ke/
   - Production: https://developer.safaricom.co.ke/

2. **Create an App**:

   - Sign up/Login to the portal
   - Create a new app
   - Select "Lipa Na M-Pesa Online" API
   - Note down your Consumer Key and Consumer Secret

3. **Get Your Credentials**:
   - Consumer Key
   - Consumer Secret
   - Business Shortcode (Sandbox: 174379, Production: Your till/paybill number)
   - Passkey (provided in sandbox test credentials)

### 2. Configure Backend

Update your `.env` file in the backend directory:

```bash
# M-Pesa Configuration
MPESA_ENVIRONMENT=sandbox  # Change to 'production' for live
MPESA_CONSUMER_KEY=your_consumer_key_here
MPESA_CONSUMER_SECRET=your_consumer_secret_here
MPESA_SHORTCODE=174379  # Sandbox shortcode (use your own in production)
MPESA_PASSKEY=your_passkey_here
MPESA_CALLBACK_URL=https://yourdomain.com/api/payments/mpesa/callback/
```

**Sandbox Test Credentials** (for testing):

```
Consumer Key: Get from Daraja portal
Consumer Secret: Get from Daraja portal
Shortcode: 174379
Passkey: bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
Test Phone: 254708374149 (or your own Safaricom number)
```

### 3. Set Up Callback URL

For local development, you need a public URL for M-Pesa callbacks:

**Option 1: Use ngrok (Recommended for development)**:

```bash
# Install ngrok
npm install -g ngrok

# Start your backend server
python manage.py runserver 8000

# In another terminal, create ngrok tunnel
ngrok http 8000

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
# Update .env:
MPESA_CALLBACK_URL=https://abc123.ngrok.io/api/payments/mpesa/callback/
```

**Option 2: Use your production domain**:

```bash
MPESA_CALLBACK_URL=https://yourdomain.com/api/payments/mpesa/callback/
```

### 4. Update Database

Run migrations to update the Payment model:

```bash
cd backend
python manage.py makemigrations payments
python manage.py migrate
```

### 5. Test the Integration

#### Using Sandbox (Testing):

1. Start the backend:

```bash
cd backend
source venv/bin/activate
python manage.py runserver 8000
```

2. Start the frontend:

```bash
cd frontend
npm start
```

3. **Test Flow**:
   - Register/Login to the application
   - Add products to cart
   - Go to checkout
   - Select "M-Pesa (STK Push)" as payment method
   - Enter phone number: `254708374149` (or your Safaricom number)
   - Click "Pay with M-Pesa"
   - Check your phone for STK Push prompt
   - Enter M-Pesa PIN: `1234` (sandbox PIN)
   - Payment will be processed

#### Test Phone Numbers (Sandbox):

- `254708374149` - Successful payment
- `254708374150` - Insufficient funds error
- `254708374151` - User cancels payment

### 6. Production Deployment

For production:

1. **Update Environment**:

```bash
MPESA_ENVIRONMENT=production
MPESA_CONSUMER_KEY=your_production_consumer_key
MPESA_CONSUMER_SECRET=your_production_consumer_secret
MPESA_SHORTCODE=your_paybill_or_till_number
MPESA_PASSKEY=your_production_passkey
MPESA_CALLBACK_URL=https://yourdomain.com/api/payments/mpesa/callback/
```

2. **Security Checklist**:

   - [ ] Use HTTPS for callback URL
   - [ ] Store credentials in environment variables (never commit to git)
   - [ ] Implement IP whitelisting for callback endpoint
   - [ ] Add request signature verification
   - [ ] Enable detailed logging for transactions
   - [ ] Set up monitoring and alerts

3. **Go Live**:
   - Submit your app for review on Daraja portal
   - Test with small transactions first
   - Monitor callback logs

## API Endpoints

### Initiate M-Pesa Payment

```
POST /api/payments/initiate_mpesa/
```

**Request**:

```json
{
  "order_id": 1,
  "phone_number": "254708374149"
}
```

**Response**:

```json
{
  "success": true,
  "message": "STK Push sent to your phone. Please enter your M-Pesa PIN.",
  "payment_id": 1,
  "order_id": 1,
  "amount": 89.99,
  "phone_number": "254708374149",
  "checkout_request_id": "ws_CO_DMZ_123456789_12345678"
}
```

### Check Payment Status

```
GET /api/payments/{payment_id}/check_status/
```

**Response**:

```json
{
  "id": 1,
  "status": "completed",
  "amount": "89.99",
  "transaction_reference": "OD123ABC45",
  "phone_number": "254708374149",
  "created_at": "2025-11-10T20:00:00Z",
  "completed_at": "2025-11-10T20:01:00Z"
}
```

### M-Pesa Callback (Called by Safaricom)

```
POST /api/payments/mpesa/callback/
```

## Payment Flow

```
User selects M-Pesa payment
         ↓
Frontend calls /initiate_mpesa/
         ↓
Backend sends STK Push request to M-Pesa API
         ↓
M-Pesa sends prompt to user's phone
         ↓
User enters M-Pesa PIN
         ↓
M-Pesa processes payment
         ↓
M-Pesa calls callback URL with result
         ↓
Backend updates payment & order status
         ↓
Frontend polls /check_status/ and shows result
```

## Troubleshooting

### STK Push not received on phone

**Check**:

- Phone number format is correct (254XXXXXXXXX)
- Phone is switched on and has network
- M-Pesa app is installed
- Not in airplane mode
- Callback URL is publicly accessible

**Logs**:

```bash
# Check backend terminal for errors
python manage.py runserver 8000

# Check M-Pesa API response
# Look for error messages in the payment.metadata field
```

### Payment stuck in "processing"

**Possible causes**:

- Callback URL not accessible
- User canceled payment
- Network timeout

**Solution**:

```bash
# Query payment status manually
GET /api/payments/{payment_id}/check_status/
```

### Callback not working

**Check**:

- Callback URL is HTTPS (required by M-Pesa)
- URL is publicly accessible (test with curl)
- Django CSRF protection is bypassed for callback
- Check callback payload in backend logs

**Test callback**:

```bash
curl -X POST https://yourdomain.com/api/payments/mpesa/callback/ \
  -H "Content-Type: application/json" \
  -d '{"Body":{"stkCallback":{"CheckoutRequestID":"test","ResultCode":0}}}'
```

### Common Error Codes

- `0` - Success
- `1` - Insufficient funds
- `1032` - Request canceled by user
- `1037` - Timeout (user didn't enter PIN)
- `2001` - Invalid initiator information
- `401` - Unauthorized (check credentials)

## Phone Number Format

The system automatically formats phone numbers:

- `0712345678` → `254712345678`
- `712345678` → `254712345678`
- `+254712345678` → `254712345678`
- `254712345678` → `254712345678` ✓

## Test Mode

If M-Pesa credentials are not configured, the system runs in **test mode**:

- No actual STK Push sent
- Payment auto-completes after few seconds
- Useful for development without M-Pesa account

## Security Best Practices

1. **Never expose credentials**:

   - Use environment variables
   - Add `.env` to `.gitignore`

2. **Validate callbacks**:

   - Verify request source
   - Check payment amounts match

3. **Log everything**:

   - All API requests/responses
   - Payment state changes
   - Errors and failures

4. **Handle failures gracefully**:
   - Retry logic for network errors
   - Clear error messages to users
   - Notification on payment failure

## Support

- **Daraja Portal**: https://developer.safaricom.co.ke/
- **Documentation**: https://developer.safaricom.co.ke/docs
- **Support Email**: apisupport@safaricom.co.ke

## License

MIT License - Use freely in your projects!

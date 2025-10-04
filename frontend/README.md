# E-Commerce Frontend

Modern React.js frontend for the e-commerce platform.

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm start
```

3. **Build for production:**
```bash
npm run build
```

## Features

### Pages
- **Home** - Product listing with search and filters
- **Product Detail** - Detailed product view with reviews
- **Cart** - Shopping cart management
- **Checkout** - Order placement
- **Login/Register** - User authentication
- **Profile** - User profile management
- **Orders** - Order history

### Components
- **Navbar** - Navigation with cart badge
- **ProductCard** - Reusable product card
- **PrivateRoute** - Protected route wrapper

### Context Providers
- **AuthContext** - Authentication state management
- **CartContext** - Shopping cart state management

## Project Structure

```
src/
├── api/
│   └── axios.js          # API client configuration
├── components/
│   ├── Navbar.js
│   ├── ProductCard.js
│   └── PrivateRoute.js
├── context/
│   ├── AuthContext.js
│   └── CartContext.js
├── pages/
│   ├── Home.js
│   ├── ProductDetail.js
│   ├── Cart.js
│   ├── Checkout.js
│   ├── Login.js
│   ├── Register.js
│   ├── Profile.js
│   └── Orders.js
├── App.js
├── index.js
└── index.css
```

## API Integration

The frontend connects to the backend API at `http://localhost:8000/api`

### Authentication Flow
1. User logs in/registers
2. JWT tokens stored in localStorage
3. Tokens automatically attached to requests
4. Token refresh on expiration

### State Management
- React Context API for global state
- Local state for component-specific data
- Axios interceptors for token management

## Styling

Custom CSS with utility classes:
- Responsive grid system
- Reusable button styles
- Form components
- Alert messages
- Card layouts

## Environment Configuration

Update API base URL in `src/api/axios.js` for production:

```javascript
const instance = axios.create({
  baseURL: 'https://your-api-domain.com/api',
});
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- react: ^18.2.0
- react-router-dom: ^6.20.1
- axios: ^1.6.2
- lucide-react: ^0.294.0

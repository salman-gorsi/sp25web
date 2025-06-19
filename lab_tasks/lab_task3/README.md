# Seasalt Cornwall Express.js Application

A dynamic e-commerce website built with Express.js, EJS templating, MongoDB, and authentication system.

## Features

- **Express.js Backend**: RESTful routes and middleware
- **MongoDB Database**: User and order data storage with Mongoose ODM
- **EJS Templating**: Dynamic content rendering with layouts
- **Authentication System**: User registration, login, and session management with MongoDB session store
- **Protected Routes**: Orders page accessible only to authenticated users
- **Responsive Design**: Mobile-friendly interface
- **Product Catalog**: Dynamic product display with categories
- **Order Management**: View order history and details
- **Newsletter Signup**: Email subscription functionality
- **Flash Messages**: User feedback system

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `seasalt_cornwall`

4. Create environment file:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Update the `.env` file with your MongoDB connection string and session secret.

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

\`\`\`
├── app.js                 # Main application file
├── config/
│   └── database.js        # MongoDB connection configuration
├── models/
│   ├── User.js           # User model with authentication methods
│   └── Order.js          # Order model
├── middleware/
│   └── auth.js           # Authentication middleware
├── routes/
│   ├── auth.js           # Authentication routes
│   └── orders.js         # Order management routes
├── utils/
│   └── seedData.js       # Sample data seeding utilities
├── views/                # EJS templates
│   ├── layouts/          # Layout templates
│   ├── partials/         # Reusable components
│   ├── auth/             # Authentication pages
│   ├── orders/           # Order-related pages
│   └── *.ejs             # Page templates
├── public/               # Static assets
│   ├── css/             # Stylesheets
│   └── js/              # Client-side JavaScript
└── assignment_2/assets/  # Images and media files
\`\`\`

## Routes

### Public Routes
- `GET /` - Home page
- `GET /products` - Products listing with category filtering
- `GET /about` - About page
- `GET /login` - Login page
- `POST /login` - Login form submission
- `GET /register` - Registration page
- `POST /register` - Registration form submission
- `POST /newsletter` - Newsletter signup

### Protected Routes (Require Authentication)
- `GET /profile` - User profile
- `GET /my-orders` - User's order history
- `GET /my-orders/:orderId` - Specific order details
- `GET /logout` - Logout (destroys session)

## Authentication Features

- **User Registration**: Create new accounts with encrypted passwords
- **User Login**: Session-based authentication with MongoDB session store
- **Password Security**: bcrypt hashing for password storage
- **Session Management**: Persistent sessions stored in MongoDB
- **Route Protection**: Middleware to protect authenticated routes
- **Automatic Logout**: Session destruction and cookie clearing

## Database Models

### User Model
- name, email, password (hashed)
- Pre-save password hashing
- Password comparison method
- Timestamps (createdAt, updatedAt)

### Order Model
- User reference and email
- Order items with product details
- Shipping address and payment method
- Order status tracking
- Auto-generated order numbers

## Sample Data

The application includes sample order data that gets seeded for new users to demonstrate the orders functionality.

## Technologies Used

- **Backend**: Express.js, Node.js
- **Database**: MongoDB, Mongoose ODM
- **Templating**: EJS, express-ejs-layouts
- **Authentication**: bcryptjs, express-session, connect-mongo
- **Styling**: CSS3, Responsive Design
- **JavaScript**: Vanilla JS for client-side interactions

## Development

To run in development mode with auto-restart:

\`\`\`bash
npm run dev
\`\`\`

## Production Considerations

- Set `NODE_ENV=production` in environment variables
- Use a strong `SESSION_SECRET` in production
- Configure MongoDB Atlas or production MongoDB instance
- Set up HTTPS in production
- Implement proper error logging and monitoring
- Add input validation and sanitization
- Consider implementing rate limiting for authentication routes

## Environment Variables

Create a `.env` file with the following variables:

\`\`\`
MONGODB_URI=mongodb://localhost:27017/seasalt_cornwall
SESSION_SECRET=your-super-secret-session-key-here
PORT=3000
NODE_ENV=development
\`\`\`

## License

MIT License

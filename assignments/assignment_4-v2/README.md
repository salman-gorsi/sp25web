# Seasalt Cornwall E-commerce Website

A professional e-commerce website built with Node.js, Express, MongoDB, and EJS templating. Features a complete admin panel for product and order management.

## 🚀 Features

### Frontend
- **Responsive Design**: Mobile-first approach with Tailwind-inspired CSS
- **Product Catalog**: Browse products by category with search functionality
- **User Authentication**: Secure login/register system
- **Order Management**: Users can view their order history and details
- **Newsletter Signup**: Email subscription functionality

### Admin Panel
- **Dashboard**: Overview of products, orders, and users
- **Product Management**: Add, edit, delete products with image support
- **Order Management**: View and update order statuses
- **User Management**: Admin user system with role-based access

### Technical Features
- **Session Management**: Secure sessions with MongoDB store
- **Flash Messages**: User feedback system
- **Error Handling**: Comprehensive error handling and logging
- **Security**: Password hashing, session security, input validation
- **Professional Structure**: Modular architecture with controllers and routes

## 📁 Project Structure

\`\`\`
├── server.js                 # Application entry point
├── app.js                    # Express app configuration
├── config/
│   ├── database.js           # MongoDB connection
│   └── session.js            # Session configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── productController.js  # Product management
│   ├── orderController.js    # Order management
│   └── adminController.js    # Admin panel logic
├── middleware/
│   ├── auth.js              # Authentication middleware
│   ├── admin.js             # Admin authorization
│   ├── validation.js        # Input validation
│   └── general.js           # General middleware
├── models/
│   ├── User.js              # User model
│   ├── Product.js           # Product model
│   └── Order.js             # Order model
├── routes/
│   ├── index.js             # Main routes
│   ├── auth.js              # Authentication routes
│   ├── products.js          # Product routes
│   ├── orders.js            # Order routes
│   └── admin.js             # Admin routes
├── views/                   # EJS templates
├── public/                  # Static assets
├── utils/                   # Utility functions
└── assignment_2/assets/     # Project assets
\`\`\`

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd seasalt-cornwall
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Configuration**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

4. **Start MongoDB**
   \`\`\`bash
   # Ubuntu/Debian
   sudo systemctl start mongod
   
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   \`\`\`

5. **Seed the database**
   \`\`\`bash
   npm run seed
   \`\`\`

6. **Start the application**
   \`\`\`bash
   # Development
   npm run dev
   
   # Production
   npm start
   \`\`\`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/seasalt` |
| `SESSION_SECRET` | Session encryption key | Auto-generated |
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |

### Admin Access

Default admin credentials:
- **Email**: `admin@seasalt.com`
- **Password**: `admin123`

**⚠️ Change these credentials in production!**

## 📱 Usage

### For Users
1. **Browse Products**: Visit `/products` to see all available items
2. **Register/Login**: Create an account or sign in at `/register` or `/login`
3. **View Orders**: Check your order history at `/my-orders`
4. **Profile**: Manage your account at `/profile`

### For Administrators
1. **Access Admin Panel**: Visit `/admin` (requires admin login)
2. **Manage Products**: Add, edit, or delete products
3. **Process Orders**: View and update order statuses
4. **Monitor Dashboard**: View site statistics and recent activity

## 🧪 Testing

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
\`\`\`

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use strong `SESSION_SECRET`
- [ ] Configure MongoDB Atlas or production database
- [ ] Set up HTTPS
- [ ] Configure reverse proxy (nginx)
- [ ] Set up monitoring and logging

### Docker Deployment
\`\`\`bash
# Build image
docker build -t seasalt-cornwall .

# Run container
docker run -p 3000:3000 --env-file .env seasalt-cornwall
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Troubleshooting Guide](TROUBLESHOOTING.md)
2. Review the logs for error messages
3. Ensure all dependencies are installed correctly
4. Verify MongoDB is running

## 🙏 Acknowledgments

- Seasalt Cornwall for design inspiration
- Express.js community for excellent documentation
- MongoDB team for the robust database solution

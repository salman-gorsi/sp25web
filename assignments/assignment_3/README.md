# Seasalt Cornwall Express.js Application

A dynamic e-commerce website built with Express.js, EJS templating, and authentication system.

## Features

- **Express.js Backend**: RESTful routes and middleware
- **EJS Templating**: Dynamic content rendering with layouts
- **Authentication System**: User registration, login, and session management
- **Responsive Design**: Mobile-friendly interface
- **Product Catalog**: Dynamic product display with categories
- **Newsletter Signup**: Email subscription functionality
- **Flash Messages**: User feedback system

## Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

\`\`\`
├── app.js                 # Main application file
├── views/                 # EJS templates
│   ├── layouts/          # Layout templates
│   ├── partials/         # Reusable components
│   ├── auth/             # Authentication pages
│   └── *.ejs             # Page templates
├── public/               # Static assets
│   ├── css/             # Stylesheets
│   └── js/              # Client-side JavaScript
└── assignment_2/assets/  # Images and media files
\`\`\`

## Routes

- `GET /` - Home page
- `GET /products` - Products listing with category filtering
- `GET /about` - About page
- `GET /login` - Login page
- `POST /login` - Login form submission
- `GET /register` - Registration page
- `POST /register` - Registration form submission
- `GET /logout` - Logout
- `GET /profile` - User profile (protected)
- `POST /newsletter` - Newsletter signup

## Authentication

The application uses session-based authentication with bcrypt for password hashing. User data is stored in memory (replace with database in production).

## Technologies Used

- **Backend**: Express.js, Node.js
- **Templating**: EJS, express-ejs-layouts
- **Authentication**: bcryptjs, express-session
- **Styling**: CSS3, Responsive Design
- **JavaScript**: Vanilla JS for client-side interactions

## Development

To run in development mode with auto-restart:

\`\`\`bash
npm run dev
\`\`\`

## Production Considerations

- Replace in-memory user storage with a proper database
- Add environment variables for sensitive configuration
- Implement proper error logging
- Add input validation and sanitization
- Set up HTTPS in production
- Configure session store for production

## License

MIT License

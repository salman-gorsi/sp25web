#!/bin/bash

# Setup script for Ubuntu
echo "Setting up Seasalt Cornwall Express.js Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first:"
    echo "curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -"
    echo "sudo apt-get install -y nodejs"
    exit 1
fi

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "MongoDB is not installed. Installing MongoDB..."
    
    # Import MongoDB public GPG key
    curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
    
    # Create list file for MongoDB
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
    
    # Update package database
    sudo apt-get update
    
    # Install MongoDB
    sudo apt-get install -y mongodb-org
    
    # Start MongoDB service
    sudo systemctl start mongod
    sudo systemctl enable mongod
    
    echo "MongoDB installed and started!"
else
    echo "MongoDB is already installed."
    # Make sure MongoDB is running
    sudo systemctl start mongod
fi

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Create directory structure
echo "Creating directory structure..."
npm run fix-structure

# Check assets
echo "Checking assets..."
npm run check-assets

echo ""
echo "Setup complete!"
echo ""
echo "To start the application:"
echo "1. Make sure MongoDB is running: sudo systemctl status mongod"
echo "2. Start the development server: npm run dev"
echo "3. Open your browser to: http://localhost:3000"
echo ""
echo "If images are still not showing, make sure all assets are in the assignment_2/assets/ directory"

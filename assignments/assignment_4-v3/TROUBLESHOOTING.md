# Troubleshooting Guide

## Images Not Showing

### Problem
Images are not displaying on the website.

### Possible Causes & Solutions

1. **Missing Assets Directory**
   \`\`\`bash
   # Check if the directory exists
   ls -la assignment_2/assets/
   
   # If missing, create it
   mkdir -p assignment_2/assets/
   \`\`\`

2. **Incorrect File Paths**
   - Make sure all image files are in `assignment_2/assets/`
   - Check file names match exactly (case-sensitive on Linux)
   - Run the asset checker: `npm run check-assets`

3. **Static File Serving Issues**
   - Ensure the static middleware is configured correctly
   - Check browser developer tools for 404 errors
   - Verify file permissions: `chmod 644 assignment_2/assets/*`

4. **File Extensions**
   - Make sure file extensions match (.avif, .webp, .svg, .mp4)
   - Some browsers may not support .avif format

### Quick Fix Commands

\`\`\`bash
# Check directory structure
npm run setup

# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB if not running
sudo systemctl start mongod

# Check file permissions
ls -la assignment_2/assets/

# Fix permissions if needed
chmod -R 644 assignment_2/assets/*
chmod 755 assignment_2/assets/
\`\`\`

## MongoDB Connection Issues

### Problem
Cannot connect to MongoDB.

### Solutions

1. **Start MongoDB Service**
   \`\`\`bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   \`\`\`

2. **Check MongoDB Status**
   \`\`\`bash
   sudo systemctl status mongod
   \`\`\`

3. **Check MongoDB Logs**
   \`\`\`bash
   sudo journalctl -u mongod
   \`\`\`

## Environment Variables

### Why Use .env?

1. **Security**: Keeps sensitive data out of code
2. **Flexibility**: Different settings for development/production
3. **Portability**: Easy to deploy across different environments

### Ubuntu Specific Notes

- Environment variables work the same on Ubuntu as other systems
- The `.env` file is loaded by the `dotenv` package
- You can also set environment variables directly:
  \`\`\`bash
  export MONGODB_URI="mongodb://localhost:27017/seasalt"
  export SESSION_SECRET="mysecretkey"
  npm start
  \`\`\`

## Common Issues

### Port Already in Use
\`\`\`bash
# Find what's using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>
\`\`\`

### Permission Denied
\`\`\`bash
# Fix file permissions
chmod -R 755 .
chmod -R 644 *.js *.json *.md
\`\`\`

### Node Modules Issues
\`\`\`bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

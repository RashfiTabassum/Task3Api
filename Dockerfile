# Use Node.js official image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY server.js .

# Expose port (Render uses PORT environment variable)
EXPOSE 10000

# Run the application
CMD ["node", "server.js"]

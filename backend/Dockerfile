# Use official Node.js runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of backend code
COPY . .

# Expose backend port (e.g., 4000)
EXPOSE 4000

# Start backend server (change if your main file is different)
CMD ["node", "server.js"]

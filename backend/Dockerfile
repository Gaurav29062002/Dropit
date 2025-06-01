# Use official Node.js runtime
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of backend source code
COPY . .

# Expose backend port
EXPOSE 4000

# Start backend server
CMD ["node", "server.js"]

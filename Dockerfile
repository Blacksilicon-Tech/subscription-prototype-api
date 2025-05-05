# Use official Node.js 20 image as base
FROM node:20-alpine

# Create and set working directory
WORKDIR /usr/src/app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3010

# Command to run the application
CMD ["node", "dist/main"]

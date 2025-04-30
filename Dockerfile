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

# Set environment variables
ENV JWT_SECRET=dfdffgghttybnbnnbyuuy7676768hjhgbvdfcdffdgnmmn78878b
ENV API_SECRET=hghghg7778hhbhgghnmnm7765656fggvbvb767678fgfggfvh
ENV DB_HOST=localhost
ENV DB_PORT=3306
ENV DB_USERNAME=root
ENV DB_PASSWORD=P@ssw0rd
ENV DB_DATABASE=subspropdb
ENV FRONTEND_URL=http://localhost:5177
ENV PORT=3010

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3010

# Command to run the application
CMD ["node", "dist/main"]
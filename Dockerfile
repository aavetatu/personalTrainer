# Build stage
FROM node:24.7.0-alpine3.21 AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

#Expose backend port
EXPOSE 5173

ENV PORT=5173

#Start the backend in development mode
CMD ["npm", "run", "dev"]

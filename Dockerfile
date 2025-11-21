# Build stage
FROM node:24.7.0-alpine3.21 AS build

# Set the working directory
WORKDIR /usr/app

# Copy dependencies
COPY package*.json .
COPY tsconfig*.json .

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build app
RUN npm run build

# Production stage 
FROM nginx:alpine

# Copy files for built app
COPY --from=build /usr/app/dist /usr/share/nginx/html

# Serve app in exposed port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

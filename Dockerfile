#Newest node version as base image
FROM node:24.7.0-alpine3.21 AS dev

#Set the working directory inside the container 
WORKDIR /usr/src/app

#Copy dependencies
COPY package*.json ./

#Install dependencies
RUN npm install

#Copy the rest of the code
COPY . .

#Expose backend port
EXPOSE 5173

ENV PORT=5173

#Start the backend in development mode
CMD ["npm", "run", "dev"]

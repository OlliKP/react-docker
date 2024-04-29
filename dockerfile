# Base image
FROM node:17-alpine
 
# Set the working directory
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the app's code
COPY . .
 
# Start the app
CMD ["npm", "start"]
# Use the official Node.js image as the base image
FROM --platform=linux/amd64 node:lts

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the dependencies
RUN npm ci --only=production

# Copy the application code into the container
COPY . .

# Expose the port the app will run on
EXPOSE 3001

# Start the application
CMD [ "npm", "start" ]
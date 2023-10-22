# Use a lighter version of Node as a parent image
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any dependencies
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

ARG DB_CONNECTION_STRING
ARG NODE_ENV

# Run migrations
RUN npm run db:migrate

EXPOSE 3001

# Define the command to run your app using CMD which defines your runtime. Here we will use the "start" script defined in your package.json
CMD [ "npm", "start" ]

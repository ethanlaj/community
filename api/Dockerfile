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

RUN echo "Database URL is: $DATABASE_URL"

# Run migrations
RUN npx sequelize db:migrate --env production

EXPOSE 3001

# Define the command to run your app using CMD which defines your runtime. Here we will use the "start" script defined in your package.json
CMD [ "npm", "start" ]

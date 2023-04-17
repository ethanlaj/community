# Build stage
FROM --platform=linux/amd64 node:lts

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the source code
COPY . .

# Build the app for production
RUN npm run build

# Expose the port your app will run on (default is 3000)
EXPOSE 3000

# Start the Vite production serve
CMD ["npm", "run", "serve"]

# Use the official Node.js image as base
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which your Express app runs
EXPOSE 4000

# Command to run the application
CMD ["node", "server.js"]

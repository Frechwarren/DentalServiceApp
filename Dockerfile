# Dockerfile

# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and lock files
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the Next.js app code
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the Next.js app
CMD ["npm", "run", "dev"]  
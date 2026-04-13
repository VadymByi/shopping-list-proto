# BASE IMAGE
FROM node:20-alpine

# WORKING DIRECTORY
WORKDIR /app

# DEPENDENCIES
COPY package*.json ./
RUN npm install

# PROJECT FILES
COPY . .

# PORTS CONFIGURATION
EXPOSE 8081
EXPOSE 3000

# EXECUTION
# Services are managed via docker-compose
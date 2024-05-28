# Dockerfile for Express Server
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["sh", "-c", "npx sequelize-cli db:migrate && node dist/server.js"]

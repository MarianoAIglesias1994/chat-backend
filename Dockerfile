FROM node:12.4.0-alpine
RUN apk update
# Create root application folder
WORKDIR /app
# Copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# Install all packages
RUN npm install
# Copy source code to /app/lib folder
COPY lib /app/lib

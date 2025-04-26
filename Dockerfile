# Use the official Playwright image with all dependencies installed
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Run tests (this can be overridden by Docker Compose or Jenkins)
CMD ["npx", "playwright", "test"]

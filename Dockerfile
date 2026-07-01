# 1. Use the official Playwright image matching your Node version
FROM mcr.microsoft.com/playwright:v1.49.0-noble

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files first to leverage Docker caching
COPY package*.json ./

# 4. Install dependencies
RUN npm ci

# 5. Copy the rest of your application code
COPY . .

# 6. Default command to run tests and generate results
CMD ["npm", "run", "test"]
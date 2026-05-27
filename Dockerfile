# Use Node Alpine stage
FROM node:20-alpine

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install clean production and development dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build Vite application inside container
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start lightweight static content server with SPA routing enabled
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]

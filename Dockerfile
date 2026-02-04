# Dockerfile for CryptoHub - Local Development Setup
# Multi-stage build optimized for development workflow

# Base stage - shared dependencies
FROM node:24-alpine AS base

# Install essential build tools for native dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package*.json ./

# Development stage
FROM base AS development

# Install all dependencies (including devDependencies)
RUN npm install

# Copy application source
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start development server with host binding for Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Production build stage
FROM base AS builder

# Install dependencies
RUN npm install --production=false

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production runtime stage
FROM nginx:alpine AS production

# Copy custom nginx configuration
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config if needed (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

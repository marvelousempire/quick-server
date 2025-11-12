FROM node:18-alpine

WORKDIR /app

# Auto-Fit: Install dependencies
COPY package.json package-lock.json* ./
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile || npm install

# Copy application files
COPY server.js ./
COPY sites ./sites
COPY scripts ./scripts

# Auto-Born: Create data directory (database will be auto-created by server.js on first run)
RUN mkdir -p /app/data

# Expose ports
EXPOSE 8000 8443

# Auto-Heal: Health check (Docker automatically restarts unhealthy containers)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start server (database auto-initializes on first run via server.js initDatabase())
CMD ["node", "server.js"]


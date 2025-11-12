# Vue.js Seed - Business Identity Shaper

This is a seed template for creating Vue.js-based sites integrated with the Business Identity Shaper (BIS) framework.

## Features

- Vue.js 3 reactive framework
- BIS framework integration
- Resource and service management
- RAG-ready data structures
- Component-based architecture
- Deployment options: Docker, Caddy, Traefik, Vite HMR

## Deployment Options

### Docker

```bash
# Vue.js with Vite
docker-compose --profile vue up -d
```

### Caddy

Configure Caddy to serve Vue.js static files or proxy to Vite dev server:

```caddy
your-site.com {
    root * /path/to/vue/dist
    file_server
}
```

### Traefik

Add Vue.js service to docker-compose.yml with Traefik labels.

### Vite HMR

For development with Hot Module Replacement:

```bash
npm run dev  # or pnpm dev
```

Vite dev server runs on port 5173 with HMR enabled.

## Usage

1. Clone this seed: `cp -r sites/_vue-seed sites/your-vue-site`
2. Update `config.json` with your site details
3. Install dependencies: `pnpm install` or `npm install`
4. Deploy using your preferred method (Docker, Caddy, Traefik, or Vite)


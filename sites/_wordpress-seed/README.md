# WordPress Seed - Business Identity Shaper

This is a seed template for creating WordPress-based sites integrated with the Business Identity Shaper (BIS) framework.

## Features

- WordPress content management system
- BIS framework integration
- Resource and service management
- RAG-ready data structures
- Deployment options: Docker, Caddy, Traefik

## Deployment Options

### Docker

```bash
# WordPress with MySQL
docker-compose --profile wordpress up -d
```

### Caddy

Configure Caddy to proxy to WordPress:

```caddy
your-site.com {
    reverse_proxy wordpress:80
}
```

### Traefik

Add WordPress service to docker-compose.yml with Traefik labels.

## Usage

1. Clone this seed: `cp -r sites/_wordpress-seed sites/your-wordpress-site`
2. Update `config.json` with your site details
3. Deploy using your preferred method (Docker, Caddy, or Traefik)


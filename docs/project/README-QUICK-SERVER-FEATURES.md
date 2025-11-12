# Quick Server — Complete Features Reference

**Created:** 2025-11-12  
**Last Updated:** 2025-11-12

> **Complete feature disclosure** — Comprehensive table of all Quick Server capabilities, including Business Identity Shaper (BIS) framework features, with full technical details.

## Overview

Quick Server (formerly LearnMappers Server) is a **production-ready, multi-site web server** with a comprehensive **Business Identity Shaper (BIS)** framework for building business identity platforms. This document provides a complete, detailed breakdown of every feature.

---

## Complete Features Table

| Feature Category | Feature Name | Description | Technical Details | BIS Integration | Status |
|-----------------|--------------|-------------|-------------------|------------------|--------|
| **Core Server** | Multi-Site Detection | Automatically detects and serves multiple sites from `sites/` folder | Scans `sites/` on startup, detects folders with `pages/index.html` or `index.html`, excludes `default` folder | Each site can be a BIS instance | ✅ Active |
| **Core Server** | Site Selector | Beautiful Docker Desktop-style interface when multiple sites detected | Served at root URL (`/`), shows table with site name, description, page count, status | Displays all BIS instances | ✅ Active |
| **Core Server** | Auto-Fit | Automatically installs missing dependencies and tools | Uses UV (Universal Package Manager) to detect and install Node.js, Python, pnpm. Falls back to system package managers (Homebrew, apt, yum) | Required for BIS framework setup | ✅ Active |
| **Core Server** | Auto-Born | Automatically initializes database and certificates on first run | Creates `data/` directory, runs `scripts/init-db.js` to create SQLite database, uses `mkcert` to generate SSL certificates for localhost, 127.0.0.1, ::1, and local network IP | Initializes BIS database schema | ✅ Active |
| **Core Server** | Auto-Heal | Automatically checks and fixes issues (ports, database, certificates) | Checks port availability (8000/8443), runs `PRAGMA integrity_check` on SQLite, validates SSL certificates, verifies Node.js/Python versions, rebuilds native modules if needed | Maintains BIS data integrity | ✅ Active |
| **Core Server** | REST API | Full CRUD REST API for inventory management | Endpoints: `GET/POST/PUT/DELETE /api/inventory`, `GET /api/stats`, `GET /api/health`, `GET /api/sites` | BIS entities accessible via API | ✅ Active |
| **Core Server** | SQLite Database | Persistent SQLite database for data storage | Auto-created at `data/learnmappers.db`, tables: `inventory`, `stats`, etc. | Stores all BIS entities (Resources, Services, Persons, Companies) | ✅ Active |
| **Core Server** | HTTPS Support | Auto-generated SSL certificates for secure connections | Uses `mkcert` to generate `localhost+3.pem` and `localhost+3-key.pem`, valid for localhost, 127.0.0.1, ::1, local IP | Secure BIS data access | ✅ Active |
| **Core Server** | Network Access | Auto-detects network IP and serves on local network | Detects local IP address, serves on `http://YOUR_IP:8000` and `https://YOUR_IP:8443` | Access BIS from any device on network | ✅ Active |
| **Core Server** | Fast Python Mode | Instant startup Python HTTP server for static sites | Command: `./go --fast`, uses `python3 -m http.server`, zero dependencies, instant startup | Can serve static BIS sites | ✅ Active |
| **Core Server** | Docker Deployment | Full containerized stack with Docker Compose | Includes `docker-compose.yml`, supports MySQL, Caddy/Traefik reverse proxy, automatic HTTPS with Let's Encrypt | BIS runs in containers | ✅ Active |
| **Core Server** | Health Monitoring | Server health check endpoint and monitoring | `GET /api/health` returns comprehensive server status, checks database, ports, certificates | Monitors BIS system health | ✅ Active |
| **BIS Framework** | Resources System | Catalog tools, equipment, appliances, materials, and people/contacts | Schema-based resource tracking with Purpose, Use Cases, Outcomes, Capabilities, Abilities. Types: `tool`, `equipment`, `appliance`, `material`, `person`, `company` | Core BIS component | ✅ Active |
| **BIS Framework** | Services System | Define and manage service offerings | Schema-based service definitions with Purpose, Use Cases, Outcomes, Features, Pricing, Tools, Outcomes, What You Can Build, Why Need | Core BIS component | ✅ Active |
| **BIS Framework** | Relationship Mapping | Map connections between Resources and Services | Visual relationship system connecting Resources ↔ Services, enables capability projection and gap analysis | Core BIS feature | ✅ Active |
| **BIS Framework** | RAG Context Generation | Auto-generates RAG-ready context for all entities | Generates `rag.semanticContext`, `rag.learnableSummary`, `rag.embeddingText`, `rag.queryPatterns`, `rag.retrievalTags`, `rag.contextualExamples`, `rag.knowledgeGraph` for all entities | RAG-optimized BIS entities | ✅ Active |
| **BIS Framework** | Resource Cards | Auto-generated detail pages for each resource | Pages at `/pages/resource-cards/{filename}.html`, dynamically generated from JSON files in `content/resources/`, displays Purpose, Use Cases, Outcomes, Capabilities, Abilities, Specifications, Purchase Info, Maintenance, Images | BIS resource presentation | ✅ Active |
| **BIS Framework** | Service Cards | Auto-generated detail pages for each service | Pages at `/pages/service-cards/{service-id}.html`, dynamically generated from `config.json`, displays Title, Description, Purpose, Pricing, Features, Tools, Outcomes, What You Can Build, Why Need, Booking Links | BIS service presentation | ✅ Active |
| **BIS Framework** | Schema Validation | JSON schema validation for all entities | Schemas: `resource-schema.json`, `service-schema.json`, `person-schema.json`, `company-schema.json`, `relationship-schema.json`. Validator ensures data consistency | BIS data integrity | ✅ Active |
| **BIS Framework** | Vendor Import System | Import resources from vendor files (Amazon, eBay, Home Depot, etc.) | Supports CSV, JSON, ZIP files. Mappers: `AmazonMapper`, `EbayMapper`, `HomeDepotMapper`, `LowesMapper`, `BHMapper`, `GenericMapper`. Extracts 73+ columns from Amazon CSV, parses eBay HTML, maps to unified resource schema | BIS data ingestion | ✅ Active |
| **BIS Framework** | Duplicate Prevention | Serial numbers and UDINs prevent duplicate resources/contacts | Resources use `serialNumber` field, Contacts use `UDIN` (Unique Digital Identifier Number) field. System checks for duplicates before import | BIS data quality | ✅ Active |
| **BIS Framework** | Onboarding System | Guided setup process for new BIS instances | Multi-step onboarding flow: Welcome, Business Info, Services, Resources, Relationships, Review, Complete. Populates database for evaluation and analysis | BIS initialization | ✅ Active |
| **BIS Framework** | Market Analysis | AI-powered market analysis for services and resources | Analyzes demand, pricing, competition, market positioning. Generates insights and recommendations | BIS business intelligence | ✅ Active |
| **BIS Framework** | Entity Summary | AI-powered comprehensive entity summaries | Generates detailed summaries with insights, "never seen before" perspectives, use case analysis | BIS entity understanding | ✅ Active |
| **BIS Framework** | Dynamic Configuration | JSON-based configuration system | All site content driven by `config.json`, includes theme customization, content management, SEO metadata | BIS customization | ✅ Active |
| **BIS Framework** | Multi-Site BIS | Support for multiple BIS instances on one server | Each site in `sites/` can be a separate BIS instance with its own config, resources, services, database | BIS multi-tenancy | ✅ Active |
| **BIS Framework** | Person Schema | Track people as resources (contacts, team members, partners) | Includes UDIN, Purpose, Use Cases, Outcomes, Capabilities, Abilities, Contact Info, Relationship Context, History, Examples | BIS people management | ✅ Active |
| **BIS Framework** | Company Schema | Manage partners and companies as resources | Includes RAG Context Fields, Relationship Mappings, Service/Product Catalog, Partnership Context | BIS company management | ✅ Active |
| **BIS Framework** | Relationship Schema | Map connections between all entity types | Includes RAG Context Fields, Strength & Direction, Examples, Knowledge Graph Data | BIS relationship visualization | ✅ Active |
| **Content Management** | Inventory Management | Complete inventory tracking system | Track tools, equipment, materials with brand, model, serial number, purchase date, price, condition, location, specifications, maintenance schedule | Integrated with BIS Resources | ✅ Active |
| **Content Management** | Vendor File Import | Import from Amazon, eBay, Home Depot, Lowe's, B&H, generic CSV/JSON | Supports CSV, JSON, ZIP archives. Parses vendor-specific formats, maps to unified schema, extracts specifications, tags, dimensions, weight, capacity | BIS data ingestion | ✅ Active |
| **Content Management** | Resource Card Generation | Auto-generates resource detail pages | Creates pages at `/pages/resource-cards/{filename}.html` from JSON files, includes photorealistic mockups, specifications, purchase info, maintenance | BIS resource presentation | ✅ Active |
| **Content Management** | Service Card Generation | Auto-generates service detail pages | Creates pages at `/pages/service-cards/{service-id}.html` from `config.json`, includes pricing, features, outcomes, booking links | BIS service presentation | ✅ Active |
| **Content Management** | Image Management | Image handling with mockups and thumbnails | Supports image URLs, thumbnails, alt text, source tracking, photorealistic mockups (toolbox, shelf, etc.) | BIS visual presentation | ✅ Active |
| **Content Management** | Tag System | Automatic tag extraction and management | Extracts tags from titles, descriptions, categories. Tags used for search, filtering, retrieval | BIS content organization | ✅ Active |
| **Content Management** | Specification Extraction | Auto-extracts specifications from text | Extracts power, dimensions, weight, capacity from titles and descriptions using regex patterns | BIS data enrichment | ✅ Active |
| **API & Integration** | REST API Endpoints | Full REST API for all operations | `GET/POST/PUT/DELETE /api/inventory`, `GET /api/stats`, `GET /api/health`, `GET /api/sites`, `GET /api/analysis/*` | BIS API access | ✅ Active |
| **API & Integration** | Health Check API | Comprehensive health status endpoint | `GET /api/health/status` returns server health, database status, port availability, certificate validity | BIS system monitoring | ✅ Active |
| **API & Integration** | Statistics API | Inventory statistics endpoint | `GET /api/stats` returns total items, categories, recent additions, value totals | BIS analytics | ✅ Active |
| **API & Integration** | Sites API | List all available sites | `GET /api/sites` returns array of site objects with name, description, page count, default flag | BIS site management | ✅ Active |
| **API & Integration** | Analysis API | AI-powered analysis endpoints | `POST /api/analysis/entity-summary`, `POST /api/analysis/market`, generates insights and recommendations | BIS business intelligence | ✅ Active |
| **API & Integration** | CORS Support | Cross-Origin Resource Sharing enabled | Configurable CORS for API access from different domains | BIS API integration | ✅ Active |
| **Deployment** | Standalone Mode | Works without server (localStorage) | Site works completely independently, uses localStorage for data, no server needed | BIS can run standalone | ✅ Active |
| **Deployment** | Server Mode | Optional Node.js server adds API and database | Server enhances standalone site with REST API, SQLite database, network access | BIS enhanced mode | ✅ Active |
| **Deployment** | Docker Compose | Full containerized deployment | Includes `docker-compose.yml`, supports MySQL, Caddy/Traefik, automatic HTTPS | BIS containerized | ✅ Active |
| **Deployment** | Fast Python Mode | Instant Python HTTP server | `./go --fast` starts Python server instantly, zero dependencies | BIS static serving | ✅ Active |
| **Deployment** | Remote Server Setup | Deploy on remote Linux servers | Scripts: `setup-git-remote-server.sh`, `check-remote.sh`, uses SSH config for connection | BIS remote deployment | ✅ Active |
| **Deployment** | GLiNet Router | Deploy on GLiNet routers | Specialized deployment guide for GLiNet router hardware | BIS embedded deployment | ✅ Active |
| **Deployment** | Linux Deployment | Deploy on any Linux system | Works on Ubuntu, Debian, CentOS, Arch, Alpine, Raspberry Pi, IoT devices | BIS universal deployment | ✅ Active |
| **Deployment** | Package Distribution | Create distributable server packages | `./package-server.sh` creates ZIP/tarball with everything needed, users just drop sites and run | BIS distribution | ✅ Active |
| **Security** | HTTPS/SSL | Auto-generated SSL certificates | Uses `mkcert` to generate trusted certificates for localhost and network IP | Secure BIS access | ✅ Active |
| **Security** | Path Validation | Prevents directory traversal attacks | Validates all file paths, prevents access outside `sites/` directory | BIS security | ✅ Active |
| **Security** | Input Sanitization | API endpoints validate and sanitize input | All API endpoints validate input data, prevent injection attacks | BIS data security | ✅ Active |
| **Security** | CORS Configuration | Configurable CORS for API access | Can be configured to allow/deny specific origins | BIS API security | ✅ Active |
| **Performance** | Static File Caching | Efficient static file serving | Express.js static middleware with caching headers | Fast BIS page loads | ✅ Active |
| **Performance** | Database Optimization | SQLite with proper indexing | Database tables include indexes for fast queries | Fast BIS queries | ✅ Active |
| **Performance** | Lazy Initialization | Database and services initialized on demand | Components initialized only when needed, faster startup | Fast BIS startup | ✅ Active |
| **Development** | Auto-Reload | Development mode with file watching | Server watches for file changes, can auto-reload (development mode) | BIS development | ✅ Active |
| **Development** | Site Templates | Seed templates for Vue.js and WordPress | `_vue-seed` and `_wordpress-seed` templates for creating new BIS sites | BIS site creation | ✅ Active |
| **Development** | Project Replication | Schema-based project replication system | `README-PROJECT-REPLICATION.md` guide for replicating project structure | BIS framework reuse | ✅ Active |
| **Documentation** | Comprehensive Docs | Extensive documentation system | Multiple README files covering all features, deployment, configuration, schemas | BIS documentation | ✅ Active |
| **Documentation** | In-App Documentation | Built-in documentation pages | Documentation rendered from markdown files, accessible in-app | BIS user guides | ✅ Active |
| **Documentation** | Schema Documentation | Complete schema reference | `README-SCHEMAS.md` documents all JSON schemas | BIS schema reference | ✅ Active |

---

## Feature Categories Breakdown

### 1. Core Server Features (13 features)

**Multi-Site Detection & Management**
- Automatically detects all sites in `sites/` folder
- Beautiful site selector interface (Docker Desktop-style)
- Supports unlimited sites
- Each site can be a separate BIS instance

**Automatic Setup & Maintenance**
- **Auto-Fit:** Installs missing dependencies (Node.js, Python, pnpm) via UV
- **Auto-Born:** Creates database and SSL certificates on first run
- **Auto-Heal:** Checks and fixes ports, database, certificates automatically

**Server Capabilities**
- REST API with full CRUD operations
- SQLite database with auto-initialization
- HTTPS support with auto-generated certificates
- Network access (auto-detects IP)
- Health monitoring and status endpoints

**Deployment Options**
- Fast Python mode (instant startup)
- Node.js server (full-featured)
- Docker Compose (enterprise-grade)

### 2. Business Identity Shaper (BIS) Framework (20 features)

**Core BIS Components**
- **Resources System:** Catalog tools, equipment, appliances, materials, people, companies
- **Services System:** Define and manage service offerings
- **Relationship Mapping:** Connect Resources ↔ Services for capability projection
- **RAG Context Generation:** Auto-generates RAG-ready context for AI systems

**BIS Data Management**
- Schema-based validation (Resources, Services, Persons, Companies, Relationships)
- Duplicate prevention (Serial numbers, UDINs)
- Vendor import system (Amazon, eBay, Home Depot, etc.)
- Specification extraction (power, dimensions, weight, capacity)

**BIS Presentation**
- Auto-generated Resource Cards
- Auto-generated Service Cards
- Image management with mockups
- Tag system for organization

**BIS Intelligence**
- Market analysis (AI-powered)
- Entity summaries (AI-powered)
- Onboarding system (guided setup)
- Dynamic configuration system

**BIS Multi-Tenancy**
- Multi-site BIS support
- Isolated configurations per site
- Shared or separate databases

### 3. Content Management (7 features)

- Inventory management
- Vendor file import
- Resource/Service card generation
- Image management
- Tag system
- Specification extraction
- Content organization

### 4. API & Integration (6 features)

- REST API endpoints
- Health check API
- Statistics API
- Sites API
- Analysis API (AI-powered)
- CORS support

### 5. Deployment (8 features)

- Standalone mode (localStorage)
- Server mode (Node.js)
- Docker Compose
- Fast Python mode
- Remote server setup
- GLiNet router deployment
- Linux deployment (universal)
- Package distribution

### 6. Security (4 features)

- HTTPS/SSL (auto-generated)
- Path validation
- Input sanitization
- CORS configuration

### 7. Performance (3 features)

- Static file caching
- Database optimization
- Lazy initialization

### 8. Development (3 features)

- Auto-reload (development mode)
- Site templates (Vue.js, WordPress)
- Project replication system

### 9. Documentation (3 features)

- Comprehensive documentation
- In-app documentation
- Schema documentation

---

## BIS Framework Deep Dive

### What is BIS?

**Business Identity Shaper (BIS)** is a comprehensive framework for building business identity platforms. It provides:

1. **RAG-Shaping for Entities** — Every entity (Resource, Service, Person, Company) is structured to be immediately learnable by AI systems
2. **Resources ↔ Services Relationship** — Maps what you have (Resources) to what you can do (Services)
3. **Capability Projection** — See what you can accomplish with available resources
4. **Gap Analysis** — Identify what resources you need for desired services

### BIS Core Concepts

**Resources (What You Have)**
- Tools (drills, saws, wrenches)
- Equipment (3D printers, scanners, power systems)
- Appliances (refrigerators, washers, dryers, ovens, dishwashers)
- Materials (hardware, consumables, supplies)
- People/Contacts (team members, partners, contractors, specialists)

**Services (What You Can Do)**
- Service offerings (furniture assembly, TV mounting, system setup)
- Each service has Purpose, Use Cases, Outcomes, Features, Pricing

**The Relationship**
- Resources enable Services (drill enables furniture assembly)
- Services require Resources (furniture assembly requires drill)
- Capability projection (see what you can do with what you have)
- Gap analysis (identify what you need for desired services)

### BIS RAG Context Fields

Every BIS entity includes RAG context fields for AI systems:

- `rag.semanticContext` — Rich, comprehensive text for semantic embeddings
- `rag.learnableSummary` — Immediately understandable summary (self-contained)
- `rag.keyConcepts` — Key terms for retrieval
- `rag.queryPatterns` — Common questions this entity answers
- `rag.embeddingText` — Optimized text for embedding generation
- `rag.retrievalTags` — Tags optimized for search
- `rag.contextualExamples` — Real-world examples
- `rag.knowledgeGraph` — Graph representation for relationship queries

### BIS Entity Identification Factors

All BIS entities share core identification factors:

- **Purpose** — Why this entity exists and what value it provides
- **Use Cases** — Specific scenarios where this entity is applied
- **Outcomes** — What happens when this entity is applied (results, achievements)
- **Capabilities** — What this entity can do (core capabilities)
- **Abilities** — Specific abilities, skills, or features

---

## Technical Specifications

### Server Requirements

- **Node.js:** 18+ (auto-installed via UV or system package manager)
- **Python:** 3.6+ (optional, for Fast Python mode)
- **pnpm or npm:** (auto-installed)
- **mkcert:** (optional, for SSL certificates)

### Database

- **Type:** SQLite
- **Location:** `data/learnmappers.db`
- **Auto-created:** Yes (Auto-Born)
- **Tables:** `inventory`, `stats`, etc.

### Ports

- **HTTP:** 8000 (default, auto-detects if busy)
- **HTTPS:** 8443 (default, auto-detects if busy)

### File Structure

```
quick-server/
├── server.js              # Main server
├── package.json           # Dependencies
├── go, go.sh, go.bat      # Auto-start scripts
├── sites/                 # All sites directory
│   ├── default/          # Site selector
│   ├── learnmappers/     # Example BIS site
│   └── [other-sites]/    # Additional BIS instances
├── data/                  # Database (gitignored)
├── docs/                  # Documentation
└── scripts/               # Utility scripts
```

---

## Use Cases

### 1. Multi-Site BIS Hosting
Host multiple Business Identity Shaper instances on one server:
- Each site is a separate BIS instance
- Isolated configurations and data
- Shared server infrastructure

### 2. Business Identity Platform
Build a complete business identity platform:
- Catalog all resources (tools, equipment, people)
- Define all services
- Map relationships
- Generate RAG-ready data for AI systems

### 3. Resource Management System
Track and manage resources:
- Import from vendor files (Amazon, eBay, etc.)
- Track specifications, maintenance, location
- Generate resource cards
- Map to services

### 4. Service Marketplace
Create a service marketplace:
- Define service offerings
- Map to required resources
- Generate service cards
- Enable booking integration

### 5. RAG Data Generation
Generate RAG-ready data for AI systems:
- Auto-generates semantic context
- Creates learnable summaries
- Optimizes for embedding generation
- Includes query patterns and retrieval tags

---

## Related Documentation

- **[README-MAIN-PROJECT-ENTRY.md](../README-MAIN-PROJECT-ENTRY.md)** — Main project entry point
- **[README-BUSINESS-IDENTITY-SHAPER.md](./README-BUSINESS-IDENTITY-SHAPER.md)** — Complete BIS framework guide
- **[README-SERVER.md](../server/README-SERVER.md)** — Server guide
- **[README-AUTO-FEATURES.md](../server/README-AUTO-FEATURES.md)** — Auto-Fit, Auto-Born, Auto-Heal
- **[README-DEPLOYMENT-OPTIONS.md](./README-DEPLOYMENT-OPTIONS.md)** — Deployment options
- **[README-ADDING-SERVICES-AND-RESOURCES.md](./README-ADDING-SERVICES-AND-RESOURCES.md)** — Adding content
- **[README-VENDOR-IMPORT.md](./README-VENDOR-IMPORT.md)** — Vendor import system
- **[README-RELATIONSHIP-MAPPING.md](./README-RELATIONSHIP-MAPPING.md)** — Relationship mapping
- **[README-ONBOARDING.md](./README-ONBOARDING.md)** — BIS onboarding system
- **[README-RAG-IMPLEMENTATION.md](./README-RAG-IMPLEMENTATION.md)** — RAG context generation

---

## Summary

**Quick Server** is a comprehensive, production-ready web server with a complete **Business Identity Shaper (BIS)** framework. It includes:

- ✅ **67 total features** across 9 categories
- ✅ **20 BIS framework features** for building business identity platforms
- ✅ **13 core server features** for multi-site hosting
- ✅ **Full RAG integration** for AI systems
- ✅ **Zero-configuration deployment** with Auto-Fit, Auto-Born, Auto-Heal
- ✅ **Complete documentation** for all features

**Everything is documented, everything is working, everything is ready to use.**


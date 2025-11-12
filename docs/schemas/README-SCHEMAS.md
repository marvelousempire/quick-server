# Schema Documentation

**Created:** Monday, November 10, 2025 at 08:28:32 EDT
**Last Updated:** Monday, November 10, 2025 at 08:28:32 EDT

Complete documentation for all schemas used in this project.

---

## Purpose

Schemas enable **fast project replication** by providing:
- ✅ **Standardized structure** - Know exactly what files you need
- ✅ **Validation** - Ensure configuration is correct
- ✅ **Documentation** - Understand what each setting does
- ✅ **Consistency** - Same structure across all projects

---

## Available Schemas

### 1. Environment Schema (`env-schema.json`)

**Location:** `schemas/env-schema.json`

Defines all environment variables and their types, defaults, and purposes.

**Usage:**
```bash
# Validate .env file against schema
npm install -g ajv-cli
ajv validate -s schemas/env-schema.json -d .env
```

**Key Variables:**
- `DOMAIN` / `HOSTNAME` - TLD for URL priority
- `HTTP_PORT` / `HTTPS_PORT` - Server ports
- `SITE_DIR` - Which site to serve
- `DB_TYPE` - Database type (sqlite/mysql)

---

### 2. Project Structure Schema (`project-structure-schema.json`)

**Location:** `schemas/project-structure-schema.json`

Defines the required file and directory structure for the project.

**Usage:**
- Reference when creating new projects
- Validate project structure
- Ensure all required files are present

**Required Files:**
- Root: `server.js`, `package.json`, `go.sh`, `.env.example`
- Site: `config.json`, `config.js`, `scripts.js`, `pages/index.html`
- Optional: `css/`, `js/`, `schemas/`

---

### 3. Core Functions Manifest (`core-functions-manifest.json`)

**Location:** `schemas/core-functions-manifest.json`

Documents all core functions, their locations, and purposes.

**Categories:**
- **Server** - `detectSites()`, `getAccessInfo()`, `getNetworkIPs()`
- **Client** - `fetchTo()`, `loadConfig()`, `markdownToHTML()`
- **Startup** - `detect_sites()`, `get_network_ip()`, `get_best_url()`, `open_private_browser()`

**Usage:**
- Understand what functions are available
- Know where to find them
- Understand their purposes

---

### 4. Site Data Schemas

**Location:** `sites/*/schemas/`

Schemas for site-specific data:

- **`resource-schema.json`** - Resource/tool data structure
- **`service-schema.json`** - Service data structure
- **`person-schema.json`** - Person/contact data structure
- **`company-schema.json`** - Company/partner data structure
- **`relationship-schema.json`** - Relationship mapping structure

**Usage:**
- Validate imported data
- Ensure data consistency
- Guide data entry

---

## Using Schemas

### Validation

```bash
# Install validator
npm install -g ajv-cli

# Validate .env
ajv validate -s schemas/env-schema.json -d .env

# Validate config.json
ajv validate -s sites/learnmappers/schemas/resource-schema.json -d data/resource.json
```

### Documentation

Schemas serve as **living documentation**:
- Always up-to-date
- Self-documenting
- Validated structure

### Project Creation

When creating a new project:
1. Reference `project-structure-schema.json` for required files
2. Use `env-schema.json` to create `.env.example`
3. Check `core-functions-manifest.json` for available functions
4. Copy site schemas as needed

---

## Extending Schemas

### Adding New Environment Variables

1. Edit `schemas/env-schema.json`
2. Add property with type, description, default
3. Update `.env.example`
4. Document in `README-PROJECT-REPLICATION.md`

### Adding New Data Schemas

1. Create new schema in `sites/your-site/schemas/`
2. Follow JSON Schema format
3. Reference existing schemas for patterns
4. Use for validation in your code

---

## Schema Standards

All schemas follow:
- **JSON Schema Draft 7** specification
- **Descriptive properties** - Clear descriptions
- **Default values** - Sensible defaults
- **Examples** - Usage examples
- **Type safety** - Proper types defined

---

## Quick Reference

| Schema | Purpose | Location |
|--------|---------|----------|
| `env-schema.json` | Environment variables | `schemas/` |
| `project-structure-schema.json` | File structure | `schemas/` |
| `core-functions-manifest.json` | Function documentation | `schemas/` |
| `resource-schema.json` | Resource data | `sites/*/schemas/` |
| `service-schema.json` | Service data | `sites/*/schemas/` |
| `person-schema.json` | Person data | `sites/*/schemas/` |
| `company-schema.json` | Company data | `sites/*/schemas/` |

---

**See Also:**
- `README-PROJECT-REPLICATION.md` - How to replicate projects
- `sites/learnmappers/README-CONFIG.md` - Configuration guide


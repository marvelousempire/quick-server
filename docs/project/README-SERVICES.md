# Services System Documentation

Complete guide to the schema-based service pages system. Learn how to manage services, create individual service pages, and customize service data.

## Overview

The Services system provides a schema-based approach to managing and displaying services. Each service has:

- A dedicated detail page in `pages/service-cards/`
- Schema-based data from `config.json`
- Automatic content population from configuration
- Integration with booking systems (TaskRabbit, etc.)

## Service Structure

Services are defined in `config.json` under `content.services.categories`. Each service includes:

### Required Fields

- **`id`** (string): Unique identifier (used as filename)
- **`title`** (string): Service display name
- **`description`** (string): Short service description

### Optional Fields

- **`icon`** (string): Emoji or icon identifier
- **`features`** (array): List of service features
- **`pricing`** (string): Pricing information
- **`duration`** (string): Estimated duration
- **`tools`** (array): Tools/equipment used
- **`purpose`** (string): What problem the service solves
- **`outcomes`** (array): What clients will achieve
- **`whatYouCanBuild`** (array): Specific things clients can create
- **`whyNeed`** (string): Compelling reason to book

## Service Categories

Services are organized into categories:

```json
{
  "content": {
    "services": {
      "categories": [
        {
          "id": "assembly",
          "title": "Furniture Assembly",
          "description": "Get your furniture built right the first time.",
          "icon": "🔨",
          "services": [
            {
              "id": "furniture-assembly",
              "title": "Furniture Assembly",
              "description": "Professional assembly service",
              // ... service fields
            }
          ]
        }
      ]
    }
  }
}
```

## Service Card Pages

Each service automatically gets a dedicated page at:

```
/pages/service-cards/{service-id}.html
```

The page is dynamically generated from the service data in `config.json`, so you don't need to create HTML files manually.

> **Auto-Generation:** Service cards are automatically generated for the unified `learnmappers` site. When you add a service to `config.json`, the corresponding card page is created automatically.

## Adding Services

See the [Adding Services & Resources](../README-ADDING-SERVICES-AND-RESOURCES.md) guide for step-by-step instructions.

## Service Display

Services are displayed on:

- **Services Menu** (`service-menu.html`): Grid view of all services
- **Home Page** (`index.html`): Featured services section
- **Individual Service Pages**: Full detail pages for each service

## Booking Integration

Services can integrate with booking systems:

```json
{
  "integrations": {
    "taskrabbit": {
      "profileUrl": "https://www.taskrabbit.com/profile/...",
      "utmSource": "learnmappers_site",
      "utmMedium": "services"
    }
  }
}
```

Booking links are automatically generated for each service.

## Customization

### Service Icons

Use emojis or icon identifiers:

```json
{
  "icon": "🔨"  // or "tool", "wrench", etc.
}
```

### Service Features

List key features that differentiate the service:

```json
{
  "features": [
    "Expert assembly techniques",
    "Proper tool usage & safety",
    "Level & stable results"
  ]
}
```

### Service Outcomes

Describe what clients will achieve:

```json
{
  "outcomes": [
    "Save 2-6 hours of your time per piece",
    "Avoid costly mistakes and damaged parts",
    "Get furniture that's actually level and stable"
  ]
}
```

## Best Practices

1. **Clear Service IDs**: Use descriptive, URL-friendly IDs (e.g., `"furniture-assembly"` not `"fa"`)
2. **Customer-Focused Titles**: Write titles that explain value (e.g., "Furniture Assembly" not "FA Services")
3. **Compelling Descriptions**: Focus on outcomes and value, not just features
4. **Complete Feature Lists**: Include all key differentiators
5. **Specific Outcomes**: Be concrete about what clients will achieve

## Related Documentation

- [Adding Services & Resources](../README-ADDING-SERVICES-AND-RESOURCES.md)
- [JSON Schemas](../../schemas/README-SCHEMAS.md)
- [Configuration System](./README-CONFIG.md)


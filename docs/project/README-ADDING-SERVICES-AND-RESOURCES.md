# Adding Services and Resources to Your LearnMappers Site

This guide explains how to add new services and resources to your LearnMappers site. The unified `learnmappers` site combines all services and resources from both Headquarters Development (HQDEV) and Family Office Administration (FOADMIN) sections.

> **Auto-Generation:** Service cards and resource cards are automatically generated for the unified `learnmappers` site. When you add a service to `config.json` or a resource JSON file, the corresponding card page is automatically created at `/pages/service-cards/{service-id}.html` or `/pages/resource-cards/{resource-slug}.html`.

## Table of Contents

- [Adding a New Service](#adding-a-new-service)
- [Adding a New Resource](#adding-a-new-resource)
- [Service Card Pages](#service-card-pages)
- [Resource Card Pages](#resource-card-pages)
- [Best Practices](#best-practices)

---

## Adding a New Service

### Step 1: Edit `config.json`

Open your site's `config.json` file (e.g., `sites/learnmappers/config.json`).

Navigate to the `content.services.categories` array. Each category contains multiple services.

### Step 2: Add Service to Existing Category

If your service fits an existing category, add it to that category's `services` array:

```json
{
  "content": {
    "services": {
      "categories": [
        {
          "id": "assembly",
          "title": "Furniture Assembly",
          "services": [
            {
              "id": "your-new-service-id",
              "title": "Your New Service Name",
              "description": "A clear, concise description of what this service does.",
              "purpose": "What problem does this service solve? What outcome does it provide?",
              "icon": "🔨",
              "category": "assembly",
              "pricing": {
                "type": "hourly",
                "rate": 80,
                "minimum": 1,
                "currency": "USD"
              },
              "features": [
                "Feature 1 that makes this service valuable",
                "Feature 2 that differentiates it",
                "Feature 3 that shows expertise"
              ],
              "tools": ["Tool 1", "Tool 2", "Tool 3"],
              "outcomes": [
                "What the client will achieve or receive",
                "The value they'll get",
                "The problem that will be solved"
              ],
              "whatYouCanBuild": [
                "Specific things they can create or accomplish",
                "Use cases and applications"
              ],
              "whyNeed": "A compelling reason why someone needs this service right now."
            }
          ]
        }
      ]
    }
  }
}
```

### Step 3: Create a New Category (if needed)

If your service doesn't fit existing categories, create a new category:

```json
{
  "content": {
    "services": {
      "categories": [
        {
          "id": "your-new-category",
          "title": "Your Category Name",
          "description": "Description of this category",
          "icon": "🎯",
          "services": [
            {
              "id": "your-service-id",
              "title": "Service Name",
              // ... rest of service fields
            }
          ]
        }
      ]
    }
  }
}
```

### Step 4: Service Card Page (Auto-Generated)

When you add a service to `config.json`, a service card page is automatically available at:

```
/pages/service-cards/{service-id}.html
```

For example, if your service `id` is `"financial-planning"`, the page will be at:
```
/pages/service-cards/financial-planning.html
```

The page is dynamically generated from the service data in `config.json`, so you don't need to create an HTML file manually.

### Step 5: Verify

1. Save `config.json`
2. Refresh your site
3. Check the Services page (`service-menu.html`) - your new service should appear
4. Click on the service to view its card page
5. Verify all fields display correctly

---

## Adding a New Resource

Resources (tools, equipment, contacts, appliances, etc.) are stored as JSON files in the `content/resources/` directory.

### Step 1: Create Resource JSON File

Create a new JSON file in `sites/{your-site}/content/resources/` with a descriptive filename:

**Filename format:** `{main-noun}-{descriptor}.json`

Examples:
- `drill-1-2.json` (drill, 1/2 inch)
- `laptop-macbook-pro.json` (laptop, MacBook Pro)
- `contact-john-smith.json` (contact, John Smith)
- `appliance-dishwasher.json` (appliance, dishwasher)

### Step 2: Resource JSON Structure

Use this template:

```json
{
  "id": "unique-resource-id",
  "title": "Resource Name",
  "type": "tool",
  "category": "power-tools",
  "description": "Brief description of the resource",
  "purpose": "What this resource is used for",
  "useCases": [
    "Specific use case 1",
    "Specific use case 2"
  ],
  "outcomes": [
    "What you can achieve with this resource",
    "The value it provides"
  ],
  "capabilities": [
    "What this resource can do",
    "Its key abilities"
  ],
  "abilities": [
    "Specific skills or functions it enables"
  ],
  "brand": "Brand Name",
  "model": "Model Number",
  "serialNumber": "SN123456789",
  "purchaseDate": "2024-01-15",
  "purchasePrice": 299.99,
  "purchaseVendor": "Vendor Name",
  "msrp": 349.99,
  "lastUsed": "2024-10-23T14:30:00Z",
  "condition": "excellent",
  "location": "Workshop",
  "specifications": {
    "power": "18V",
    "weight": "3.5 lbs",
    "dimensions": "8x3x8 inches"
  },
  "maintenance": {
    "lastMaintenance": "2024-09-01",
    "nextMaintenance": "2025-03-01",
    "notes": "Regular cleaning and lubrication"
  },
  "links": {
    "manual": "https://example.com/manual.pdf",
    "warranty": "https://example.com/warranty",
    "purchase": "https://example.com/product"
  },
  "image": {
    "url": "/images/resources/drill.jpg",
    "thumbnail": "/images/resources/drill-thumb.jpg",
    "alt": "1/2 inch drill driver",
    "source": "manual",
    "mockup": {
      "type": "toolbox",
      "enabled": true
    }
  },
  "meta": {
    "tags": ["power-tool", "drill", "cordless"],
    "notes": "Primary drill for all assembly work"
  }
}
```

### Step 3: Resource Types

Set the `type` field based on what the resource is:

- `"tool"` - Power tools, hand tools, equipment
- `"contact"` or `"person"` - People, contacts, team members
- `"company"` - Companies, partners, vendors
- `"appliance"` - Appliances, machines
- `"equipment"` - General equipment
- `"material"` - Materials, supplies

### Step 4: Resource Card Page (Auto-Generated)

When you create a resource JSON file, the resource card page is automatically available at:

```
/pages/resource-cards/{filename-without-extension}.html
```

For example, if your file is `drill-1-2.json`, the page will be at:
```
/pages/resource-cards/drill-1-2.html
```

The page is dynamically generated from the JSON file, so you don't need to create an HTML file manually.

### Step 5: Add to Database (Optional)

If you're using the server with SQLite database, you can also add the resource via:

1. **Inventory Page** - Use the "Add Resource" form
2. **API** - POST to `/api/inventory` with the resource data
3. **Import** - Drop CSV/JSON files on the inventory page

The server will automatically create the JSON file in `content/resources/` when you add via the API or inventory page.

### Step 6: Verify

1. Save the JSON file
2. Refresh your site
3. Check the Resources/Inventory page (`inventory.html`) - your new resource should appear
4. Click on the resource to view its card page
5. Verify all fields display correctly

---

## Service Card Pages

Service card pages are automatically generated from `config.json` for the unified `learnmappers` site. Each service gets its own page at:

```
/pages/service-cards/{service-id}.html
```

The page displays:
- Service title, description, and purpose
- Pricing information
- Features list
- Tools used
- Outcomes and value propositions
- What you can build/achieve
- Why you need it
- Booking links (if configured)

**No manual HTML file creation needed!** The system uses the shared template at `sites/_shared/pages/service-cards/template.html` (or site-specific override if it exists).

---

## Resource Card Pages

Resource card pages are automatically generated from JSON files in `content/resources/` for the unified `learnmappers` site. Each resource gets its own page at:

```
/pages/resource-cards/{filename-without-extension}.html
```

The page displays:
- Resource title, type, and category
- Purpose, use cases, outcomes
- Capabilities and abilities
- Specifications and details
- Purchase information
- Maintenance schedule
- Images with photorealistic mockups (if configured)
- Links to manuals, warranties, etc.

**No manual HTML file creation needed!** The system uses the shared template at `sites/_shared/pages/resource-cards/resource-card.html`.

---

## Best Practices

### Service Naming

- Use clear, descriptive service IDs (e.g., `"financial-planning"`, not `"fp"`)
- Make titles customer-focused (e.g., "Financial Planning" not "FP Services")
- Write descriptions that explain value, not just features

### Resource Naming

- Use descriptive filenames: `{main-noun}-{descriptor}.json`
- Prioritize the main noun first (e.g., `drill-1-2.json`, not `1-2-drill.json`)
- Keep compound descriptors together (e.g., `planters-self-watering.json`)

### Required Fields

**Services:**
- `id` (unique)
- `title`
- `description`
- `category`

**Resources:**
- `id` (unique)
- `title`
- `type`
- `category`
- `purpose`
- `useCases`
- `outcomes`

### Optional but Recommended

**Services:**
- `purpose` - What problem it solves
- `features` - Key differentiators
- `outcomes` - What clients get
- `whyNeed` - Compelling reason to book

**Resources:**
- `serialNumber` - Prevents duplicates
- `lastUsed` - Track usage
- `image` - Visual representation
- `specifications` - Technical details

### Site-Specific Resources

For the unified `learnmappers` site:
- Combines both Headquarters Development (HQDEV) and Family Office Administration (FOADMIN) resources
- Services include home improvement, homesteading, tech services, family office administration, education, and more
- Resources include tools, equipment, materials, contacts, documents, and knowledge kits

---

## Quick Reference

### Adding a Service to the Unified Site

1. Open `sites/learnmappers/config.json`
2. Find or create a category in `content.services.categories`
3. Add service object to category's `services` array
4. Save file
5. Service appears automatically on Services page and gets its own card page

### Adding a Resource to the Unified Site

1. Create JSON file: `sites/learnmappers/content/resources/{name}.json`
2. Fill in all required fields
3. Save file
4. Resource appears automatically on Resources page and gets its own card page

### File Locations

- **Services config:** `sites/{site-name}/config.json` → `content.services.categories`
- **Resource JSON files:** `sites/{site-name}/content/resources/*.json`
- **Service card template:** `sites/_shared/pages/service-cards/template.html`
- **Resource card template:** `sites/_shared/pages/resource-cards/resource-card.html`

---

## Troubleshooting

### Service Not Appearing

- Check JSON syntax in `config.json`
- Verify service is inside a category's `services` array
- Check browser console for errors
- Ensure `config.js` is loading correctly

### Resource Not Appearing

- Check JSON syntax in resource file
- Verify file is in `content/resources/` directory
- Check filename matches URL (e.g., `drill-1-2.json` → `/pages/resource-cards/drill-1-2.html`)
- Check browser console for errors
- Verify server is running (if using API/database)

### Card Page Not Loading

- Verify the service/resource exists in config or JSON file
- Check the URL matches the ID/filename exactly
- Check browser console for 404 errors
- Verify server routing is working

---

## Need Help?

- Check the [Schemas Documentation](../schemas/README-SCHEMAS.md) for field definitions
- Review existing services/resources as examples
- Check the [Business Identity Shaper Guide](./README-BUSINESS-IDENTITY-SHAPER.md) for the framework overview


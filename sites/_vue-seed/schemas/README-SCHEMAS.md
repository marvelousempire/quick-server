# JSON Schemas — Data Structure System

**Created:** 2025-11-08  
**Last Updated:** 2025-11-08

> **Schema system guide** — How to structure data for consistent imports and evaluation of your means (resources, services, persons, companies).

## Overview

JSON schemas ensure that all resources (tools, equipment, materials, etc.) follow a consistent structure, regardless of where they're imported from. This allows the system to:

- ✅ **Validate imports** - Ensure data is complete and correct
- ✅ **Map fields** - Match external data to our structure
- ✅ **Display consistently** - All resources show the same information
- ✅ **Search effectively** - Find resources by purpose, use case, etc.
- ✅ **Track capabilities** - Know what each resource can produce/accomplish

## Schema Files

```
sites/default/schemas/
├── resource-schema.json    # Resources (tools, equipment, materials)
├── resource-example.json   # Example resource
├── service-schema.json     # Services (what you offer)
├── service-example.json    # Example service
├── person-schema.json      # Persons (contacts, partners, team)
├── person-example.json     # Example person
├── company-schema.json     # Companies/Partners (business entities)
├── company-example.json    # Example company
├── validator.js            # Validation and normalization utilities
└── README-SCHEMAS.md       # This file
```

## Available Schemas

1. **Resource Schema** - Tools, equipment, materials, consumables
2. **Service Schema** - Services you offer to clients
3. **Person Schema** - People (contacts, partners, team members, clients)
4. **Company Schema** - Business partners, vendors, suppliers, platforms

## Required Fields by Schema

### Resource Schema
1. **`title`** - Name of the resource
2. **`category`** - Classification (tool, equipment, material, etc.)
3. **`purpose`** - What it's for (10-500 characters)

### Service Schema
1. **`title`** - Name of the service
2. **`category`** - Service type (assembly, mounting, installation, etc.)
3. **`purpose`** - Primary purpose/goal (10-500 characters)
4. **`description`** - Detailed description (20-2000 characters)

### Person Schema
1. **`name`** - Person's name (first, last required)
2. **`role`** - Primary role (client, partner, vendor, etc.)
3. **`relationship`** - Nature of relationship

### Company Schema
1. **`name`** - Company name
2. **`type`** - Company type (vendor, partner, client, etc.)
3. **`relationship`** - Business relationship type
4. **`purpose`** - Why this relationship exists (10-500 characters)

## Core Fields

### Identity
- **`id`** - Unique identifier (auto-generated if not provided)
- **`title`** - Resource name
- **`meta`** - Metadata (brand, model, location, condition, etc.)

### Classification
- **`category`** - Primary category (tool, equipment, material, consumable, hardware, software, documentation, other)
- **`meta.tags`** - Additional tags for filtering

### Purpose & Use
- **`purpose`** - Primary purpose/function (required, 10-500 chars)
- **`useCases`** - Array of specific use cases with frequency
- **`canProduceWith`** - What can be accomplished using this resource

### Details
- **`specifications`** - Technical specs (dimensions, weight, power, capacity, compatibility)
- **`maintenance`** - Maintenance schedule and history
- **`status`** - Current availability (available, in-use, reserved, maintenance, retired)
- **`notes`** - Additional observations
- **`links`** - Related documentation/manuals

## Field Descriptions

### `useCases` Array
Each use case object:
```json
{
  "scenario": "Description of when/how this is used",
  "frequency": "daily|weekly|monthly|occasional|rare"
}
```

### `canProduceWith` Array
Each production capability:
```json
{
  "output": "What can be produced/created",
  "description": "How this resource enables it",
  "requires": ["other", "resources", "needed"]
}
```

## Import Process

When importing data from external sources:

1. **Load schema** - `await validator.loadSchema('resource', '/schemas/resource-schema.json')` (or 'service', 'person', 'company')
2. **Map fields** - Match external data fields to schema fields
3. **Normalize** - Use `validator.normalize(data, 'resource')` to fill defaults
4. **Validate** - Use `validator.validate(data, 'resource')` to check structure
5. **Handle errors** - Check `validator.getErrors()` for validation issues

## Examples

- **Resource**: See `resource-example.json` - Example tool/equipment entry
- **Service**: See `service-example.json` - Example service offering
- **Person**: See `person-example.json` - Example contact/partner entry
- **Company**: See `company-example.json` - Example business partner entry

## Validation

Use the `validator.js` utility for any schema:

```javascript
// All schemas auto-load, but you can manually load:
await validator.loadSchema('resource', '/schemas/resource-schema.json');
await validator.loadSchema('service', '/schemas/service-schema.json');
await validator.loadSchema('person', '/schemas/person-schema.json');
await validator.loadSchema('company', '/schemas/company-schema.json');

// Validate data (works for any schema)
const isValid = validator.validate(data, 'resource'); // or 'service', 'person', 'company'

if (!isValid) {
  const errors = validator.getErrors();
  console.error('Validation errors:', errors);
}

// Normalize (fill defaults)
const normalized = validator.normalize(data, 'resource');

// Get required fields for import mapping
const requiredFields = validator.getRequiredFields('resource');
const allFields = validator.getAllFields('resource');
```

## Benefits

✅ **Consistent structure** - All entries follow the same schema  
✅ **Import validation** - Catch errors before adding to database  
✅ **Field mapping** - Know exactly what fields to extract from external sources  
✅ **Purpose tracking** - Understand why each resource/service/person/company exists  
✅ **Capability tracking** - Know what can be accomplished with each entry  
✅ **Use case tracking** - Understand when/how things are used  
✅ **Searchable** - Find entries by purpose, use case, or capability  
✅ **Evaluate means** - Complete picture of resources, services, partners, and capabilities  

## Schema Evolution

When updating the schema:
1. Update `resource-schema.json`
2. Update `resource-example.json` to match
3. Test validation with existing data
4. Update import scripts if needed
5. Document changes in this README


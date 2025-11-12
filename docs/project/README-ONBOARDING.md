# BIS Onboarding System

## Overview

The BIS (Business Identity Shaper) Onboarding System guides new entities through the setup process to populate their database for evaluation and analysis. This is essential for creating a fresh, ready-to-go BIS from the dynamic seed template.

## Architecture

- **BIS Framework** — The core system for shaping business identity
- **LearnMappers** — First site/edition built with BIS
- **_dynamic-site** — Seed template for creating new BIS instances
- **Onboarding System** — Guides setup and data population
- **Vendor Import System** — Separate import processes for each vendor

## Onboarding Flow

### Steps

1. **Welcome** — Introduction to BIS
2. **Entity Info** — Basic business information
3. **Capabilities** — Define what you can do
4. **Resources** — Add tools, equipment, materials, contacts
5. **Services** — Define service offerings
6. **Vendor Imports** — Import purchase history from vendors
7. **Relationships** — Map resources to services
8. **Review** — Review and validate data
9. **Complete** — Ready for evaluation

### API Endpoints

#### Get Onboarding Status
```http
GET /api/onboarding/status?site=site-name
```

**Response**:
```json
{
  "success": true,
  "status": {
    "siteName": "site-name",
    "currentStep": "resources",
    "completedSteps": ["welcome", "entity-info", "capabilities"],
    "progress": 33,
    "dataStatus": {
      "entityInfo": true,
      "capabilities": true,
      "resources": false,
      "services": false,
      "vendorImports": false,
      "relationships": false
    },
    "nextActions": [
      {
        "step": "resources",
        "action": "Add your resources",
        "description": "Import or manually add tools, equipment, materials, and contacts",
        "priority": "high"
      }
    ]
  }
}
```

#### Process Onboarding Step
```http
POST /api/onboarding/step
Content-Type: application/json

{
  "site": "site-name",
  "step": "entity-info",
  "data": {
    "name": "My Business",
    "description": "Business description",
    "tagline": "Tagline",
    "type": "business"
  }
}
```

**Response**:
```json
{
  "success": true,
  "step": "entity-info",
  "message": "Entity information saved",
  "nextStep": "capabilities",
  "data": {
    "saved": true,
    "config": { /* updated config */ }
  }
}
```

#### Complete Onboarding
```http
POST /api/onboarding/complete
Content-Type: application/json

{
  "site": "site-name"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Onboarding complete! Your BIS is ready for evaluation.",
  "status": { /* final status */ },
  "nextSteps": [
    "Review your entity summary",
    "Run market analysis",
    "Generate forecasts",
    "Explore situation-based recommendations"
  ]
}
```

## Vendor Import System

### Separate Import Processes

Each vendor has its own dedicated importer:

- **Amazon** — `amazon-importer.js`
- **eBay** — `ebay-importer.js`
- **Home Depot** — `homedepot-importer.js`
- **Lowe's** — `lowes-importer.js`
- **B&H** — `bh-importer.js`
- **Generic** — `generic-importer.js`

### Vendor-Specific Features

Each importer:
- Handles vendor-specific file formats
- Extracts vendor-specific fields
- Maps to unified resource schema
- Prevents duplicates by transaction ID
- Saves to vendor-specific directory: `content/resources/vendor-imports/{vendor}/`

### API Endpoints

#### Get Available Vendors
```http
GET /api/vendors
```

**Response**:
```json
{
  "success": true,
  "vendors": [
    {
      "id": "amazon",
      "name": "Amazon",
      "description": "Import orders and purchases from Amazon (CSV, JSON, ZIP)",
      "supportedFormats": ["CSV", "JSON", "ZIP"]
    },
    {
      "id": "ebay",
      "name": "eBay",
      "description": "Import orders and purchases from eBay (ZIP with CSV files)",
      "supportedFormats": ["ZIP"]
    }
    // ... more vendors
  ]
}
```

#### Import from Vendor
```http
POST /api/vendors/import
Content-Type: application/json

{
  "site": "site-name",
  "vendor": "amazon",
  "filename": "orders.csv",
  "fileData": "base64-encoded-file-data"
}
```

**Response**:
```json
{
  "success": true,
  "vendor": "amazon",
  "imported": 25,
  "duplicates": 3,
  "saved": ["item-1", "item-2", ...],
  "errors": []
}
```

#### Auto-Detect and Import
```http
POST /api/vendors/auto-import
Content-Type: application/json

{
  "site": "site-name",
  "filename": "orders_from_20200923_to_20251023.csv",
  "fileData": "base64-encoded-file-data"
}
```

**Response**:
```json
{
  "success": true,
  "vendor": "amazon",
  "imported": 25,
  "duplicates": 3,
  "saved": ["item-1", "item-2", ...],
  "errors": []
}
```

## File Structure

### Vendor Imports
```
sites/{site-name}/
  content/
    resources/
      vendor-imports/
        amazon/
          item-1.json
          item-2.json
          ...
        ebay/
          item-1.json
          ...
        homedepot/
          ...
```

### Onboarding Data
- Entity info → `config.json`
- Resources → `content/resources/{type}/`
- Services → `content/services/{category}/`
- Relationships → `content/relationships/`

## Workflow

### 1. Create New BIS from Seed
```bash
cp -r sites/_dynamic-site sites/my-new-business
```

### 2. Start Onboarding
```javascript
// Get status
const status = await fetch('/api/onboarding/status?site=my-new-business');

// Process steps
await fetch('/api/onboarding/step', {
  method: 'POST',
  body: JSON.stringify({
    site: 'my-new-business',
    step: 'entity-info',
    data: { /* entity data */ }
  })
});
```

### 3. Import Vendor Data
```javascript
// Auto-detect and import
await fetch('/api/vendors/auto-import', {
  method: 'POST',
  body: JSON.stringify({
    site: 'my-new-business',
    filename: 'amazon-orders.csv',
    fileData: base64FileData
  })
});
```

### 4. Complete Onboarding
```javascript
await fetch('/api/onboarding/complete', {
  method: 'POST',
  body: JSON.stringify({
    site: 'my-new-business'
  })
});
```

## Benefits

1. **Guided Setup** — Step-by-step process ensures complete data
2. **Vendor Separation** — Each vendor has dedicated import logic
3. **Duplicate Prevention** — Transaction IDs prevent duplicate imports
4. **RAG Auto-Generation** — RAG context automatically generated for all imports
5. **Ready for Evaluation** — Complete data enables market analysis and forecasting

## Next Steps

After onboarding:
1. Review entity summary: `POST /api/analysis/entity-summary`
2. Analyze market fit: `POST /api/analysis/market-fit`
3. Generate forecasts: `POST /api/analysis/forecast`
4. Explore situations: `POST /api/analysis/situation-analysis`

---

*The Onboarding System ensures every new BIS instance is properly set up with complete data for evaluation and analysis.*


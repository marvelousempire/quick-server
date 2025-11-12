# Vendor File Import System — Documentation

**Created:** Monday, November 10, 2025 at 08:28:32 EDT
**Last Updated:** Monday, November 10, 2025 at 08:28:32 EDT

> **Vendor import guide** — How to import vendor files (Amazon, eBay, Home Depot, Lowe's, B&H) with automatic schema validation and rich data extraction.

## Overview

The vendor import system automatically processes vendor files and extracts rich metadata, validates against the resource schema, and provides a preview before importing. It supports multiple vendor formats and intelligently maps vendor-specific fields to the LearnMappers resource schema.

## Supported Vendors

- ✅ **Amazon** — CSV/JSON exports
- ✅ **eBay** — ZIP files (contains CSV)
- ✅ **Home Depot** — CSV exports
- ✅ **Lowe's** — CSV exports
- ✅ **B&H Photo Video** — CSV exports
- ✅ **Generic** — Any CSV/JSON with standard fields

## Supported File Formats

- **CSV** — Comma-separated values (quotes-aware parsing)
- **JSON** — JSON arrays or objects
- **ZIP** — ZIP archives containing CSV files (eBay exports)

## How to Use

### 1. Access Import

Navigate to the **Resources** page (`inventory.html`) and find the import drop zone at the top.

### 2. Drop or Select Files

- **Drag & drop** vendor files onto the drop zone
- **Click** the drop zone to browse and select files
- Supports **multiple files** at once

### 3. Review Preview

After processing, a preview modal shows:
- **Items to import** — List of all resources extracted
- **Validation errors** — Any schema validation issues
- **Item details** — Title, category, brand/model, price, purpose

### 4. Confirm Import

- Review the preview
- Click **"Import X items"** to confirm
- Or click **"Cancel"** to abort

## What Gets Extracted

### From All Vendors

- **Title** — Product name/title
- **Category** — Auto-inferred (tool, equipment, hardware, etc.)
- **Purpose** — Auto-generated from product description
- **Tags** — Extracted features (cordless, portable, professional, etc.)

### Vendor-Specific Data

#### Amazon
- Brand/Manufacturer
- Model number/SKU/ASIN
- Purchase price
- Order date
- Product category
- Item condition

#### eBay
- Item title
- Sale price
- Sale date
- Item condition
- Category

#### Home Depot / Lowe's
- Product name
- SKU/Item number
- Price
- Department/Category

#### B&H
- Product name
- Brand
- Model/MPN
- Price
- Category

## Data Mapping

### Category Inference

The system automatically infers categories from product titles and descriptions:

- **Tool** — Drills, saws, sanders, routers, etc.
- **Equipment** — 3D printers, cameras, network gear, solar/power
- **Hardware** — Screws, bolts, fasteners
- **Software** — Apps, programs
- **Documentation** — Books, manuals, guides
- **Material** — Raw materials, supplies
- **Consumable** — Disposable items
- **Other** — Everything else

### Purpose Generation

Purpose is auto-generated from:
- Product title
- Description/notes
- Category information
- Extracted features

Example: "Tool/equipment for Bosch GSB18V-21 Cordless Drill. Features: cordless operation, professional grade."

### Power Extraction

Automatically extracts power requirements:
- Voltage (e.g., "20V", "110V")
- Type (Battery, USB, AC, DC)
- From product title and description

### Condition Mapping

Maps vendor condition strings to schema enums:
- "New" / "Unused" → `new`
- "Excellent" / "Like New" → `excellent`
- "Good" / "Great" → `good`
- "Fair" / "Used" → `fair`
- "Poor" / "Worn" → `poor`
- "Repair" / "Broken" → `needs-repair`

## Schema Validation

All imported items are validated against the **Resource Schema**:

### Required Fields
- ✅ **title** — Must be present
- ✅ **category** — Auto-inferred if missing
- ✅ **purpose** — Auto-generated if missing (min 10 chars)

### Validation Checks
- Field types (string, number, date, etc.)
- String length limits
- Enum values (category, condition, status)
- Date formats (YYYY-MM-DD)
- Required field presence

### Error Display

Validation errors are shown in the preview:
- **Row number** — Which row has the error
- **Field name** — Which field failed
- **Error message** — What's wrong

Items with errors can still be imported, but you may want to fix them first.

## File Format Examples

### Amazon CSV Headers
```
Title, Brand, Model, Price, Order Date, Category, Condition
```

### eBay CSV Headers
```
Item Title, Sale Price, Sale Date, Condition, Category
```

### Generic CSV Headers
```
Name, Title, Product, Description, Category, Notes
```

### JSON Format
```json
[
  {
    "title": "Bosch GSB18V-21 Cordless Drill",
    "brand": "Bosch",
    "model": "GSB18V-21",
    "price": 89.99,
    "category": "Tools",
    "description": "Professional cordless drill..."
  }
]
```

## Import Process Flow

```
1. File Dropped/Selected
   ↓
2. Vendor Type Detection
   (Amazon, eBay, Home Depot, etc.)
   ↓
3. File Parsing
   (CSV → rows, JSON → objects, ZIP → extract CSV)
   ↓
4. Data Mapping
   (Vendor fields → Resource schema)
   ↓
5. Schema Validation
   (Check required fields, types, formats)
   ↓
6. Preview Display
   (Show items + errors)
   ↓
7. User Confirmation
   (Import or Cancel)
   ↓
8. Data Conversion
   (Schema format → Inventory format)
   ↓
9. Save to Inventory
   (Add to data array, save, refresh)
```

## Technical Details

### Vendor Detection

The system detects vendor type by:
1. **Filename** — Checks for vendor names in filename
2. **CSV Headers** — Matches known header patterns
3. **Content** — Analyzes data structure

### Header Mapping

Each vendor mapper looks for common header variations:

**Title/Name:**
- `title`, `name`, `item name`, `product name`, `description`, `product title`, `item title`

**Brand:**
- `brand`, `manufacturer`, `seller`

**Model:**
- `model`, `model number`, `sku`, `asin`, `mpn`, `item number`

**Price:**
- `price`, `purchase price`, `total`, `amount`, `sale price`

**Date:**
- `order date`, `purchase date`, `date`, `sale date`

**Category:**
- `category`, `product category`, `department`, `class`, `item category`

### Error Handling

- **Invalid file format** — Shows error message
- **Missing required fields** — Validation errors shown
- **Parse errors** — Row-level error reporting
- **ZIP without CSV** — Clear error message
- **Network issues** — Graceful fallback

## Best Practices

1. **Review Preview** — Always check the preview before importing
2. **Fix Errors** — Address validation errors if possible
3. **Multiple Files** — Import multiple vendor files at once
4. **Backup First** — Export your current inventory before large imports
5. **Verify Data** — Check imported items after import

## Troubleshooting

### "No items imported"
- Check file format (must be CSV, JSON, or ZIP)
- Verify file has data rows (not just headers)
- Check for valid product names/titles

### "Validation errors"
- Review error messages in preview
- Some errors are warnings (can still import)
- Required fields are auto-filled when possible

### "ZIP has no CSV"
- Extract CSV from ZIP manually
- Drop the CSV file directly
- Check ZIP file structure

### "Import failed"
- Check browser console for details
- Verify file isn't corrupted
- Try a different file format

## Files

- **`js/vendor-importer.js`** — Main import engine
- **`schemas/validator.js`** — Schema validation
- **`schemas/resource-schema.json`** — Resource data structure
- **`pages/inventory.html`** — Import UI and integration

## Future Enhancements

- [ ] Manual field mapping for custom CSV formats
- [ ] Import history and undo
- [ ] Batch edit before import
- [ ] Duplicate detection
- [ ] Image import from vendor files
- [ ] More vendor formats (Target, Walmart, etc.)
- [ ] Import templates for custom formats


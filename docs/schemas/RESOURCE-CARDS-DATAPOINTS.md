# Resource Cards — Data Points & Storage

## Where Items Are Stored

### Primary Storage: SQLite Database
- **Location**: `./data/learnmappers.db`
- **Table**: `inventory`
- **Current Items**: 23 items (as of last check)

### Secondary Storage: Browser localStorage
- **Key**: `lm_inventory` (for standalone mode)
- **Key**: `lm_resource_cards` (for resource card data)

---

## Current Database Schema (Basic)

The database currently stores items with these fields:

```sql
CREATE TABLE inventory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT,              -- e.g., "Drill / Driver", "Miter Saw"
  name TEXT NOT NULL,      -- e.g., "Compact 1/2" drill driver"
  power TEXT,              -- e.g., "Battery 20V", "Corded"
  state TEXT,              -- e.g., "Good", "New", "Repair"
  spot TEXT,               -- e.g., "Bin 1", "Table", "Wall rack"
  notes TEXT,              -- Free-form notes
  created_at DATETIME,
  updated_at DATETIME
);
```

### Example Database Record:
```
id: 1
type: "Drill / Driver"
name: "Compact 1/2" drill driver"
power: "Battery 20V"
state: "Good"
spot: "Bin 1"
notes: "Daily use"
```

---

## Resource Card Schema (Rich)

The resource cards expect much richer data based on `resource-schema.json`:

### Core Fields:
- **`title`** - Name of the resource (mapped from `name`)
- **`category`** - Classification (mapped from `type` via `mapTypeToCategory()`)
- **`purpose`** - Primary purpose/function (mapped from `notes` or generated)
- **`status`** - Availability: `available`, `in-use`, `reserved`, `maintenance`, `retired`

### Meta Information:
- **`meta.brand`** - Brand/manufacturer (not in DB yet)
- **`meta.model`** - Model number (not in DB yet)
- **`meta.serialNumber`** - Serial number (not in DB yet)
- **`meta.purchaseDate`** - When acquired (not in DB yet)
- **`meta.purchasePrice`** - Purchase price (not in DB yet)
- **`meta.location`** - Physical location (mapped from `spot`)
- **`meta.condition`** - Condition (mapped from `state` via `mapStateToCondition()`)
- **`meta.tags`** - Tags (extracted from `notes` via `extractTagsFromNotes()`)

### Specifications:
- **`specifications.power`** - Power requirements (mapped from `power`)
- **`specifications.dimensions`** - Physical dimensions (not in DB yet)
- **`specifications.weight`** - Weight (not in DB yet)
- **`specifications.capacity`** - Capacity/limits (not in DB yet)
- **`specifications.compatibility`** - Compatible systems (not in DB yet)

### Use Cases:
- **`useCases[]`** - Array of use case objects:
  - `scenario` - Description of use case
  - `frequency` - `daily`, `weekly`, `monthly`, `occasional`, `rare`

### What You Can Build:
- **`canProduceWith[]`** - Array of production objects:
  - `output` - What can be produced/created
  - `description` - How this resource enables it
  - `requires[]` - Other resources needed

### Maintenance:
- **`maintenance.schedule`** - Maintenance schedule
- **`maintenance.lastMaintenance`** - Last maintenance date
- **`maintenance.nextMaintenance`** - Next maintenance date
- **`maintenance.notes`** - Maintenance notes

### Links:
- **`links[]`** - Array of related links:
  - `label` - Link label
  - `url` - Link URL
  - `type` - `manual`, `documentation`, `website`, `video`, `other`

### Notes:
- **`notes`** - Additional notes (mapped from `notes`)

---

## Current Mapping (Database → Resource Card)

The template converts basic database fields to rich resource schema:

```javascript
// Database item → Resource card format
resource = {
  id: `resource-${item.id}`,
  title: item.name,
  category: mapTypeToCategory(item.type),  // "Drill / Driver" → "tool"
  purpose: item.notes || `Tool/equipment: ${item.name}`,
  meta: {
    condition: mapStateToCondition(item.state),  // "Good" → "good"
    location: item.spot,                          // "Bin 1"
    tags: extractTagsFromNotes(item.notes)       // Extract from notes
  },
  specifications: {
    power: item.power                            // "Battery 20V"
  },
  status: 'available',
  notes: item.notes
};
```

### Mapping Functions:

**`mapTypeToCategory(type)`** - Maps database `type` to schema `category`:
- `"Drill / Driver"` → `"tool"`
- `"Miter Saw"` → `"tool"`
- `"3D Printer"` → `"equipment"`
- `"Garden"` → `"material"`
- etc.

**`mapStateToCondition(state)`** - Maps database `state` to schema `condition`:
- `"New"` → `"new"`
- `"Great"` → `"excellent"`
- `"Good"` → `"good"`
- `"Repair"` → `"needs-repair"`

**`extractTagsFromNotes(notes)`** - Extracts tags from notes:
- Looks for keywords like "cordless", "battery", "compact", "portable", "professional"
- Returns array: `["cordless", "portable"]`

---

## Gap: Missing Datapoints

Many resource card schema fields are **not yet in the database**:

### Not Currently Stored:
- ❌ Brand/Manufacturer
- ❌ Model number
- ❌ Serial number
- ❌ Purchase date/price
- ❌ Dimensions/Weight
- ❌ Capacity
- ❌ Compatibility
- ❌ Use cases (structured)
- ❌ What you can build (structured)
- ❌ Maintenance schedule/dates
- ❌ Links (manuals, documentation)

### Currently Available (Basic):
- ✅ Name/Title
- ✅ Type/Category (mapped)
- ✅ Power requirements
- ✅ Condition/State (mapped)
- ✅ Location/Spot
- ✅ Notes (free-form)

---

## Recommendations

### Option 1: Enhance Database Schema
Add columns to `inventory` table for rich data:
```sql
ALTER TABLE inventory ADD COLUMN brand TEXT;
ALTER TABLE inventory ADD COLUMN model TEXT;
ALTER TABLE inventory ADD COLUMN serial_number TEXT;
ALTER TABLE inventory ADD COLUMN purchase_date DATE;
ALTER TABLE inventory ADD COLUMN purchase_price REAL;
ALTER TABLE inventory ADD COLUMN dimensions TEXT;
ALTER TABLE inventory ADD COLUMN weight TEXT;
ALTER TABLE inventory ADD COLUMN capacity TEXT;
-- etc.
```

### Option 2: Use JSON Column
Store rich data as JSON in a single column:
```sql
ALTER TABLE inventory ADD COLUMN resource_data JSON;
```

### Option 3: Hybrid Approach
- Keep basic fields in main table
- Store rich schema data in JSON column
- Migrate gradually

---

## Current Resource Cards

- **Location**: `sites/learnmappers/pages/resource-cards/`
- **Template**: `template.html` (excluded from count)
- **Generated Cards**: `resource-{id}.html` (one per inventory item)
- **Current Count**: 0 generated cards (only template exists)
- **Expected Count**: Should match number of items in database (23 items = 23 cards)

---

## Next Steps

1. **Generate all resource cards** from existing database items
2. **Enhance database schema** to support rich resource data
3. **Update import system** to populate rich fields
4. **Add UI** for editing rich resource data
5. **Migrate existing items** to include rich datapoints


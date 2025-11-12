# Relationship Mapping System — Data Relationships & Projections

**Created:** Monday, November 10, 2025 at 08:28:32 EDT
**Last Updated:** Monday, November 10, 2025 at 08:28:32 EDT

> **Relationship mapping guide** — How to visualize connections, analyze capabilities, and project outcomes using the relationship mapping system.

## Overview

The relationship mapping system creates a complex data relationship network that helps you:
- ✅ **Visualize connections** between resources, services, persons, and companies
- ✅ **Project capabilities** - See what can be accomplished with your current means
- ✅ **Analyze requirements** - Understand what's needed to achieve goals
- ✅ **Find paths** - Discover how entities connect through relationships
- ✅ **Realize potential** - Clearly see opportunities and capabilities

## Components

### 1. Relationship Schema
Defines how entities connect to each other:
- **From/To** - Source and target entities
- **Type** - Relationship type (enables, requires, produces, uses, etc.)
- **Purpose** - Why the relationship exists
- **Strength** - How important (critical, high, medium, low)
- **Capabilities** - What this relationship enables

### 2. Relationship Mapper (`relationship-mapper.js`)
Core engine for:
- Loading and storing entities and relationships
- Building graph structure for traversal
- Finding paths between entities
- Projecting capabilities
- Analyzing requirements

### 3. Relationship Modal (`relationship-modal.js`)
UI components for:
- Displaying entity relationships
- Showing capability projections
- Analyzing requirements
- Visualizing connections

## Usage

### Load the System

```html
<!-- In your HTML -->
<link rel="stylesheet" href="/css/relationship-modal.css">
<script src="/js/relationship-mapper.js"></script>
<script src="/js/relationship-modal.js"></script>
```

### Show Entity Relationships

```javascript
// Show all relationships for a resource
window.relationshipModal.showRelationships(
  'resource',
  'drill-bosch-gsb18v-21',
  'Bosch GSB18V-21 Cordless Drill'
);

// Show relationships for a service
window.relationshipModal.showRelationships(
  'service',
  'furniture-assembly',
  'Furniture Assembly'
);
```

### Project Capabilities

```javascript
// What can be accomplished with selected resources/services?
const capabilities = window.mapper.projectCapabilities(
  ['drill-bosch-gsb18v-21', 'screwdriver-set'], // resource IDs
  ['furniture-assembly'] // service IDs
);

// Show in modal
window.relationshipModal.showProjection(
  ['drill-bosch-gsb18v-21'],
  ['furniture-assembly']
);
```

### Analyze Requirements

```javascript
// What's needed to accomplish a goal?
const requirements = window.mapper.analyzeRequirements('Assembled furniture');

// Show in modal
window.relationshipModal.showRequirements('Assembled furniture');
```

### Find Paths

```javascript
// How do two entities connect?
const path = window.mapper.findPath(
  'resource', 'drill-id',
  'service', 'assembly-service-id'
);

if (path) {
  console.log('Path found:', path);
} else {
  console.log('No path found');
}
```

### Find Producers

```javascript
// What can produce a specific output?
const producers = window.mapper.findProducers('Assembled furniture');

producers.forEach(({ type, entity, capability }) => {
  console.log(`${type}: ${entity.title || entity.name}`);
  console.log(`  Can produce: ${capability.output}`);
});
```

## Relationship Types

- **`enables`** - Entity A enables Entity B to function
- **`requires`** - Entity A requires Entity B
- **`produces`** - Entity A produces Entity B
- **`uses`** - Entity A uses Entity B
- **`provides`** - Entity A provides Entity B
- **`partners-with`** - Entity A partners with Entity B
- **`depends-on`** - Entity A depends on Entity B
- **`complements`** - Entity A complements Entity B
- **`replaces`** - Entity A can replace Entity B
- **`supports`** - Entity A supports Entity B
- **`manages`** - Entity A manages Entity B
- **`owns`** - Entity A owns Entity B

## Example Workflow

### 1. Define Relationships

```json
{
  "id": "drill-enables-assembly",
  "from": { "type": "resource", "id": "drill-id", "name": "Cordless Drill" },
  "to": { "type": "service", "id": "assembly-id", "name": "Furniture Assembly" },
  "type": "enables",
  "purpose": "Drill enables fast, efficient furniture assembly",
  "strength": "critical"
}
```

### 2. Query Capabilities

```javascript
// What can I do with my drill?
const capabilities = window.mapper.projectCapabilities(['drill-id'], []);

// Results show all outputs the drill can produce, directly or through relationships
```

### 3. Plan Projects

```javascript
// What do I need to assemble furniture?
const needs = window.mapper.analyzeRequirements('Assembled furniture');

// Results show required resources, services, persons, and companies
```

## Benefits

✅ **Clear visualization** - See how everything connects  
✅ **Capability projection** - Know what you can accomplish  
✅ **Requirement analysis** - Understand what's needed  
✅ **Path finding** - Discover connections between entities  
✅ **Strategic planning** - Make informed decisions  
✅ **Gap analysis** - Identify missing pieces  
✅ **Opportunity discovery** - Find new capabilities through relationships  

## Integration

The system integrates with:
- **Resource inventory** - Maps tool/equipment relationships
- **Service catalog** - Shows service dependencies
- **Partner network** - Tracks business relationships
- **Team structure** - Maps person-to-person connections

## Future Enhancements

- Visual graph rendering
- Interactive relationship editor
- Automated relationship discovery
- Relationship strength scoring
- Timeline/projection views
- Export/import relationship data


/**
 * LearnMappers PWA — Relationship Mapper
 * 
 * Created: 2025-11-08
 * Last Updated: 2025-11-08
 * 
 * Maps and visualizes relationships between resources, services, persons, and companies
 * Enables complex data relationship analysis and projections
 */

class RelationshipMapper {
  constructor() {
    this.relationships = [];
    this.entities = {
      resources: new Map(),
      services: new Map(),
      persons: new Map(),
      companies: new Map()
    };
    this.graph = new Map(); // Adjacency list for graph traversal
  }

  /**
   * Load entities from API or local storage
   */
  async loadEntities() {
    try {
      const apiBase = window.CONFIG?.api?.baseUrl || window.location.origin;
      
      // Load all entity types
      const [resources, services, persons, companies] = await Promise.all([
        fetch(`${apiBase}/api/inventory`).then(r => r.json()).catch(() => []),
        fetch(`${apiBase}/api/services`).then(r => r.json()).catch(() => []),
        fetch(`${apiBase}/api/persons`).then(r => r.json()).catch(() => []),
        fetch(`${apiBase}/api/companies`).then(r => r.json()).catch(() => [])
      ]);

      // Store in maps
      resources.forEach(r => this.entities.resources.set(r.id, r));
      services.forEach(s => this.entities.services.set(s.id, s));
      persons.forEach(p => this.entities.persons.set(p.id, p));
      companies.forEach(c => this.entities.companies.set(c.id, c));

      return { resources, services, persons, companies };
    } catch (e) {
      console.error('Failed to load entities:', e);
      return { resources: [], services: [], persons: [], companies: [] };
    }
  }

  /**
   * Load relationships
   */
  async loadRelationships() {
    try {
      const apiBase = window.CONFIG?.api?.baseUrl || window.location.origin;
      const rels = await fetch(`${apiBase}/api/relationships`).then(r => r.json()).catch(() => []);
      this.relationships = rels;
      this.buildGraph();
      return rels;
    } catch (e) {
      console.error('Failed to load relationships:', e);
      return [];
    }
  }

  /**
   * Build graph structure for traversal
   */
  buildGraph() {
    this.graph.clear();
    
    this.relationships.forEach(rel => {
      const fromKey = `${rel.from.type}:${rel.from.id}`;
      const toKey = `${rel.to.type}:${rel.to.id}`;

      if (!this.graph.has(fromKey)) {
        this.graph.set(fromKey, []);
      }
      this.graph.get(fromKey).push({ relationship: rel, target: toKey });

      // If bidirectional, add reverse edge
      if (rel.bidirectional) {
        if (!this.graph.has(toKey)) {
          this.graph.set(toKey, []);
        }
        this.graph.get(toKey).push({ relationship: rel, target: fromKey });
      }
    });
  }

  /**
   * Get entity by type and ID
   */
  getEntity(type, id) {
    const map = this.entities[`${type}s`];
    return map ? map.get(id) : null;
  }

  /**
   * Get all relationships for an entity
   */
  getRelationships(entityType, entityId, direction = 'both') {
    return this.relationships.filter(rel => {
      if (direction === 'from' || direction === 'both') {
        if (rel.from.type === entityType && rel.from.id === entityId) return true;
      }
      if (direction === 'to' || direction === 'both') {
        if (rel.to.type === entityType && rel.to.id === entityId) return true;
      }
      return false;
    });
  }

  /**
   * Find path between two entities
   */
  findPath(fromType, fromId, toType, toId, maxDepth = 5) {
    const startKey = `${fromType}:${fromId}`;
    const endKey = `${toType}:${toId}`;
    const visited = new Set();
    const queue = [{ key: startKey, path: [], depth: 0 }];

    while (queue.length > 0) {
      const { key, path, depth } = queue.shift();

      if (key === endKey) {
        return path;
      }

      if (depth >= maxDepth || visited.has(key)) continue;
      visited.add(key);

      const neighbors = this.graph.get(key) || [];
      neighbors.forEach(({ relationship, target }) => {
        if (!visited.has(target)) {
          queue.push({
            key: target,
            path: [...path, relationship],
            depth: depth + 1
          });
        }
      });
    }

    return null; // No path found
  }

  /**
   * Get all entities that can produce a given output
   */
  findProducers(output) {
    const producers = [];

    // Check resources
    this.entities.resources.forEach(resource => {
      if (resource.canProduceWith) {
        resource.canProduceWith.forEach(prod => {
          if (prod.output.toLowerCase().includes(output.toLowerCase())) {
            producers.push({ type: 'resource', entity: resource, capability: prod });
          }
        });
      }
    });

    // Check services
    this.entities.services.forEach(service => {
      if (service.canProduceWith) {
        service.canProduceWith.forEach(prod => {
          if (prod.output.toLowerCase().includes(output.toLowerCase())) {
            producers.push({ type: 'service', entity: service, capability: prod });
          }
        });
      }
    });

    // Check persons
    this.entities.persons.forEach(person => {
      if (person.canProduceWith) {
        person.canProduceWith.forEach(prod => {
          if (prod.output.toLowerCase().includes(output.toLowerCase())) {
            producers.push({ type: 'person', entity: person, capability: prod });
          }
        });
      }
    });

    // Check companies
    this.entities.companies.forEach(company => {
      if (company.canProduceWith) {
        company.canProduceWith.forEach(prod => {
          if (prod.output.toLowerCase().includes(output.toLowerCase())) {
            producers.push({ type: 'company', entity: company, capability: prod });
          }
        });
      }
    });

    return producers;
  }

  /**
   * Project: What can be accomplished with given resources/services
   */
  projectCapabilities(resourceIds = [], serviceIds = []) {
    const capabilities = new Map();

    // Get direct capabilities
    [...resourceIds, ...serviceIds].forEach(id => {
      const entity = this.entities.resources.get(id) || this.entities.services.get(id);
      if (entity?.canProduceWith) {
        entity.canProduceWith.forEach(prod => {
          if (!capabilities.has(prod.output)) {
            capabilities.set(prod.output, []);
          }
          capabilities.get(prod.output).push({
            entity: entity,
            capability: prod,
            direct: true
          });
        });
      }
    });

    // Get capabilities through relationships
    resourceIds.forEach(id => {
      const rels = this.getRelationships('resource', id, 'from');
      rels.forEach(rel => {
        const target = this.getEntity(rel.to.type, rel.to.id);
        if (target?.canProduceWith) {
          target.canProduceWith.forEach(prod => {
            if (!capabilities.has(prod.output)) {
              capabilities.set(prod.output, []);
            }
            capabilities.get(prod.output).push({
              entity: target,
              capability: prod,
              direct: false,
              via: rel
            });
          });
        }
      });
    });

    return Array.from(capabilities.entries()).map(([output, sources]) => ({
      output,
      sources,
      canProduce: sources.length > 0
    }));
  }

  /**
   * Analyze: What's needed to accomplish a goal
   */
  analyzeRequirements(goal) {
    const requirements = {
      resources: [],
      services: [],
      persons: [],
      companies: [],
      relationships: []
    };

    // Find what can produce the goal
    const producers = this.findProducers(goal);

    producers.forEach(({ type, entity, capability }) => {
      requirements[`${type}s`].push({
        entity,
        capability,
        required: capability.requires || []
      });

      // Check relationships
      const rels = this.getRelationships(type, entity.id, 'to');
      requirements.relationships.push(...rels);
    });

    return requirements;
  }
}

// Create global mapper instance
window.RelationshipMapper = RelationshipMapper;
window.mapper = new RelationshipMapper();

// Auto-load on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.mapper.loadEntities();
    window.mapper.loadRelationships();
  });
} else {
  window.mapper.loadEntities();
  window.mapper.loadRelationships();
}


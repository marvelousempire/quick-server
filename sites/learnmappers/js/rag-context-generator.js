/**
 * RAG Context Generator
 * 
 * Generates RAG-ready context for entities to make them immediately learnable
 * and fully encompassing for Retrieval-Augmented Generation systems.
 * 
 * Purpose: Shape entities for RAG by creating rich, structured, immediately
 * learnable descriptions that contain all necessary context.
 */

class RAGContextGenerator {
  /**
   * Generate RAG context for a Resource entity
   */
  generateResourceContext(resource) {
    const {
      title,
      type,
      category,
      purpose,
      useCases = [],
      outcomes = [],
      capabilities = [],
      abilities = [],
      canProduceWith = [],
      meta = {},
      specifications = {},
      status = 'available',
      notes = ''
    } = resource;

    // Build semantic context (comprehensive description for embeddings)
    const semanticContext = this.buildSemanticContext({
      entityType: 'resource',
      title,
      type,
      category,
      purpose,
      useCases,
      outcomes,
      capabilities,
      abilities,
      canProduceWith,
      meta,
      specifications,
      status,
      notes
    });

    // Build learnable summary (immediately understandable)
    const learnableSummary = this.buildLearnableSummary({
      entityType: 'resource',
      title,
      type,
      purpose,
      capabilities,
      outcomes
    });

    // Extract key concepts
    const keyConcepts = this.extractKeyConcepts({
      title,
      type,
      category,
      capabilities,
      abilities,
      meta
    });

    // Generate query patterns
    const queryPatterns = this.generateQueryPatterns({
      entityType: 'resource',
      title,
      type,
      purpose,
      capabilities
    });

    // Build embedding-optimized text
    const embeddingText = this.buildEmbeddingText({
      entityType: 'resource',
      title,
      type,
      category,
      purpose,
      useCases,
      outcomes,
      capabilities,
      abilities,
      canProduceWith,
      meta,
      specifications
    });

    // Generate retrieval tags
    const retrievalTags = this.generateRetrievalTags({
      title,
      type,
      category,
      capabilities,
      abilities,
      meta
    });

    // Build contextual examples
    const contextualExamples = this.buildContextualExamples({
      entityType: 'resource',
      useCases,
      outcomes,
      canProduceWith
    });

    return {
      semanticContext,
      learnableSummary,
      keyConcepts,
      queryPatterns,
      embeddingText,
      retrievalTags,
      contextualExamples,
      lastEmbeddingUpdate: new Date().toISOString(),
      embeddingVersion: '1.0'
    };
  }

  /**
   * Generate RAG context for a Service entity
   */
  generateServiceContext(service) {
    const {
      title,
      category,
      purpose,
      description,
      useCases = [],
      canProduceWith = [],
      requirements = {},
      process = [],
      pricing = {},
      notes = ''
    } = service;

    // Build semantic context
    const semanticContext = this.buildSemanticContext({
      entityType: 'service',
      title,
      category,
      purpose,
      description,
      useCases,
      canProduceWith,
      requirements,
      process,
      pricing,
      notes
    });

    // Build learnable summary
    const learnableSummary = this.buildLearnableSummary({
      entityType: 'service',
      title,
      category,
      purpose,
      description,
      canProduceWith
    });

    // Extract key concepts
    const keyConcepts = this.extractKeyConcepts({
      title,
      category,
      purpose,
      requirements
    });

    // Generate query patterns
    const queryPatterns = this.generateQueryPatterns({
      entityType: 'service',
      title,
      category,
      purpose,
      description
    });

    // Build embedding-optimized text
    const embeddingText = this.buildEmbeddingText({
      entityType: 'service',
      title,
      category,
      purpose,
      description,
      useCases,
      canProduceWith,
      requirements,
      process
    });

    // Generate retrieval tags
    const retrievalTags = this.generateRetrievalTags({
      title,
      category,
      purpose,
      requirements
    });

    // Build contextual examples
    const contextualExamples = this.buildContextualExamples({
      entityType: 'service',
      useCases,
      canProduceWith,
      process
    });

    return {
      semanticContext,
      learnableSummary,
      keyConcepts,
      queryPatterns,
      embeddingText,
      retrievalTags,
      contextualExamples,
      lastEmbeddingUpdate: new Date().toISOString(),
      embeddingVersion: '1.0'
    };
  }

  /**
   * Generate RAG context for a Person entity
   */
  generatePersonContext(person) {
    const {
      name,
      role,
      relationship,
      purpose,
      useCases = [],
      outcomes = [],
      capabilities = [],
      abilities = [],
      canProduceWith = [],
      contact = {},
      notes = ''
    } = person;

    const fullName = name.full || `${name.first} ${name.last}`;

    // Build semantic context
    const semanticContext = this.buildSemanticContext({
      entityType: 'person',
      title: fullName,
      role,
      relationship,
      purpose,
      useCases,
      outcomes,
      capabilities,
      abilities,
      canProduceWith,
      contact,
      notes
    });

    // Build learnable summary
    const learnableSummary = this.buildLearnableSummary({
      entityType: 'person',
      title: fullName,
      role,
      relationship,
      purpose,
      capabilities,
      outcomes
    });

    // Extract key concepts
    const keyConcepts = this.extractKeyConcepts({
      title: fullName,
      role,
      relationship,
      capabilities,
      abilities
    });

    // Generate query patterns
    const queryPatterns = this.generateQueryPatterns({
      entityType: 'person',
      title: fullName,
      role,
      relationship,
      purpose
    });

    // Build embedding-optimized text
    const embeddingText = this.buildEmbeddingText({
      entityType: 'person',
      title: fullName,
      role,
      relationship,
      purpose,
      useCases,
      outcomes,
      capabilities,
      abilities,
      canProduceWith
    });

    // Generate retrieval tags
    const retrievalTags = this.generateRetrievalTags({
      title: fullName,
      role,
      relationship,
      capabilities,
      abilities
    });

    // Build contextual examples
    const contextualExamples = this.buildContextualExamples({
      entityType: 'person',
      useCases,
      outcomes,
      canProduceWith
    });

    return {
      semanticContext,
      learnableSummary,
      keyConcepts,
      queryPatterns,
      embeddingText,
      retrievalTags,
      contextualExamples,
      lastEmbeddingUpdate: new Date().toISOString(),
      embeddingVersion: '1.0'
    };
  }

  /**
   * Generate RAG context for a Company entity
   */
  generateCompanyContext(company) {
    const {
      name,
      type,
      relationship,
      purpose,
      capabilities = [],
      canProduceWith = [],
      services = [],
      contact = {},
      notes = ''
    } = company;

    // Build semantic context
    const semanticContext = this.buildSemanticContext({
      entityType: 'company',
      title: name,
      type,
      relationship,
      purpose,
      capabilities,
      canProduceWith,
      services,
      contact,
      notes
    });

    // Build learnable summary
    const learnableSummary = this.buildLearnableSummary({
      entityType: 'company',
      title: name,
      type,
      relationship,
      purpose,
      capabilities
    });

    // Extract key concepts
    const keyConcepts = this.extractKeyConcepts({
      title: name,
      type,
      relationship,
      capabilities,
      services
    });

    // Generate query patterns
    const queryPatterns = this.generateQueryPatterns({
      entityType: 'company',
      title: name,
      type,
      relationship,
      purpose
    });

    // Build embedding-optimized text
    const embeddingText = this.buildEmbeddingText({
      entityType: 'company',
      title: name,
      type,
      relationship,
      purpose,
      capabilities,
      canProduceWith,
      services
    });

    // Generate retrieval tags
    const retrievalTags = this.generateRetrievalTags({
      title: name,
      type,
      relationship,
      capabilities,
      services
    });

    // Build contextual examples
    const contextualExamples = this.buildContextualExamples({
      entityType: 'company',
      canProduceWith,
      services
    });

    return {
      semanticContext,
      learnableSummary,
      keyConcepts,
      queryPatterns,
      embeddingText,
      retrievalTags,
      contextualExamples,
      lastEmbeddingUpdate: new Date().toISOString(),
      embeddingVersion: '1.0'
    };
  }

  /**
   * Build comprehensive semantic context for embeddings
   */
  buildSemanticContext(data) {
    const { entityType, title, type, category, purpose, description, useCases, outcomes, capabilities, abilities, canProduceWith, requirements, process, meta, specifications, status, notes } = data;

    let context = `${title} is a ${type || category || entityType}`;
    
    if (purpose) {
      context += ` designed to ${purpose.toLowerCase()}`;
    }
    
    if (description) {
      context += `. ${description}`;
    }

    if (capabilities && capabilities.length > 0) {
      const caps = Array.isArray(capabilities) ? capabilities.map(c => typeof c === 'string' ? c : c.capability || c.ability).join(', ') : '';
      context += ` It can ${caps}.`;
    }

    if (abilities && abilities.length > 0) {
      const abs = abilities.map(a => typeof a === 'string' ? a : a.ability).join(', ');
      context += ` Key abilities include: ${abs}.`;
    }

    if (useCases && useCases.length > 0) {
      const cases = useCases.map(uc => typeof uc === 'string' ? uc : uc.scenario).join('; ');
      context += ` Common use cases: ${cases}.`;
    }

    if (outcomes && outcomes.length > 0) {
      const results = outcomes.map(o => typeof o === 'string' ? o : o.result).join(', ');
      context += ` When applied, it produces: ${results}.`;
    }

    if (canProduceWith && canProduceWith.length > 0) {
      const outputs = canProduceWith.map(p => typeof p === 'string' ? p : p.output).join(', ');
      context += ` It can produce or enable: ${outputs}.`;
    }

    if (requirements && Object.keys(requirements).length > 0) {
      const reqs = [];
      if (requirements.tools) reqs.push(`tools: ${requirements.tools.join(', ')}`);
      if (requirements.materials) reqs.push(`materials: ${requirements.materials.join(', ')}`);
      if (requirements.skills) reqs.push(`skills: ${requirements.skills.join(', ')}`);
      if (reqs.length > 0) {
        context += ` Requirements: ${reqs.join('; ')}.`;
      }
    }

    if (specifications && Object.keys(specifications).length > 0) {
      const specs = [];
      if (specifications.dimensions) specs.push(`dimensions: ${specifications.dimensions}`);
      if (specifications.power) specs.push(`power: ${specifications.power}`);
      if (specifications.capacity) specs.push(`capacity: ${specifications.capacity}`);
      if (specs.length > 0) {
        context += ` Specifications: ${specs.join(', ')}.`;
      }
    }

    if (meta && meta.brand) {
      context += ` Brand: ${meta.brand}.`;
    }

    if (status) {
      context += ` Current status: ${status}.`;
    }

    if (notes) {
      context += ` Additional notes: ${notes}.`;
    }

    return context.trim();
  }

  /**
   * Build immediately learnable summary
   */
  buildLearnableSummary(data) {
    const { entityType, title, type, category, purpose, description, capabilities, outcomes } = data;

    let summary = `${title}`;
    
    if (type || category) {
      summary += ` is a ${type || category}`;
    }
    
    if (purpose) {
      summary += ` that ${purpose.toLowerCase()}`;
    } else if (description) {
      summary += `: ${description.substring(0, 200)}`;
    }

    if (capabilities && capabilities.length > 0) {
      const caps = capabilities.slice(0, 3).map(c => typeof c === 'string' ? c : c.capability || c.ability).join(', ');
      summary += `. It can ${caps}`;
    }

    if (outcomes && outcomes.length > 0) {
      const results = outcomes.slice(0, 2).map(o => typeof o === 'string' ? o : o.result).join(' and ');
      summary += `, producing ${results}`;
    }

    return summary.trim() + '.';
  }

  /**
   * Extract key concepts for retrieval
   */
  extractKeyConcepts(data) {
    const concepts = new Set();
    const { title, type, category, capabilities, abilities, meta, requirements, services } = data;

    // Add title words
    if (title) {
      title.split(/\s+/).forEach(word => {
        if (word.length > 3) concepts.add(word.toLowerCase());
      });
    }

    // Add type and category
    if (type) concepts.add(type);
    if (category) concepts.add(category);

    // Add capabilities
    if (capabilities) {
      capabilities.forEach(cap => {
        const capStr = typeof cap === 'string' ? cap : cap.capability || cap.ability;
        capStr.split(/\s+/).forEach(word => {
          if (word.length > 3) concepts.add(word.toLowerCase());
        });
      });
    }

    // Add abilities
    if (abilities) {
      abilities.forEach(ability => {
        const abStr = typeof ability === 'string' ? ability : ability.ability;
        abStr.split(/\s+/).forEach(word => {
          if (word.length > 3) concepts.add(word.toLowerCase());
        });
      });
    }

    // Add brand/model
    if (meta && meta.brand) concepts.add(meta.brand.toLowerCase());
    if (meta && meta.model) concepts.add(meta.model.toLowerCase());

    // Add requirements
    if (requirements) {
      Object.values(requirements).flat().forEach(req => {
        if (typeof req === 'string') {
          req.split(/\s+/).forEach(word => {
            if (word.length > 3) concepts.add(word.toLowerCase());
          });
        }
      });
    }

    // Add services
    if (services) {
      services.forEach(svc => {
        const svcName = typeof svc === 'string' ? svc : svc.name;
        svcName.split(/\s+/).forEach(word => {
          if (word.length > 3) concepts.add(word.toLowerCase());
        });
      });
    }

    return Array.from(concepts).slice(0, 20);
  }

  /**
   * Generate query patterns this entity answers
   */
  generateQueryPatterns(data) {
    const { entityType, title, type, category, purpose, description, capabilities } = data;
    const patterns = [];

    // What is X?
    patterns.push(`What is ${title}?`);
    patterns.push(`Tell me about ${title}`);

    // What can X do?
    if (capabilities && capabilities.length > 0) {
      patterns.push(`What can ${title} do?`);
      patterns.push(`What are the capabilities of ${title}?`);
    }

    // How is X used?
    patterns.push(`How is ${title} used?`);
    patterns.push(`What is ${title} used for?`);

    // What does X produce?
    patterns.push(`What does ${title} produce?`);
    patterns.push(`What are the outcomes of using ${title}?`);

    // Who/what needs X?
    patterns.push(`Who needs ${title}?`);
    patterns.push(`What requires ${title}?`);

    // Type-specific queries
    if (entityType === 'service') {
      patterns.push(`How much does ${title} cost?`);
      patterns.push(`What do I need for ${title}?`);
    }

    if (entityType === 'resource') {
      patterns.push(`Where is ${title} located?`);
      patterns.push(`What is the condition of ${title}?`);
    }

    if (entityType === 'person') {
      patterns.push(`How do I contact ${title}?`);
      patterns.push(`What is ${title}'s role?`);
    }

    if (entityType === 'company') {
      patterns.push(`What services does ${title} provide?`);
      patterns.push(`What is our relationship with ${title}?`);
    }

    return patterns;
  }

  /**
   * Build embedding-optimized text
   */
  buildEmbeddingText(data) {
    const parts = [];

    // Title and type
    parts.push(`${data.title} (${data.type || data.category || data.entityType})`);

    // Purpose
    if (data.purpose) {
      parts.push(`Purpose: ${data.purpose}`);
    }

    // Description
    if (data.description) {
      parts.push(`Description: ${data.description}`);
    }

    // Capabilities
    if (data.capabilities && data.capabilities.length > 0) {
      const caps = data.capabilities.map(c => typeof c === 'string' ? c : c.capability || c.ability).join(', ');
      parts.push(`Capabilities: ${caps}`);
    }

    // Abilities
    if (data.abilities && data.abilities.length > 0) {
      const abs = data.abilities.map(a => typeof a === 'string' ? a : a.ability).join(', ');
      parts.push(`Abilities: ${abs}`);
    }

    // Use cases
    if (data.useCases && data.useCases.length > 0) {
      const cases = data.useCases.map(uc => typeof uc === 'string' ? uc : uc.scenario).join('; ');
      parts.push(`Use cases: ${cases}`);
    }

    // Outcomes
    if (data.outcomes && data.outcomes.length > 0) {
      const results = data.outcomes.map(o => typeof o === 'string' ? o : o.result).join(', ');
      parts.push(`Outcomes: ${results}`);
    }

    // Can produce
    if (data.canProduceWith && data.canProduceWith.length > 0) {
      const outputs = data.canProduceWith.map(p => typeof p === 'string' ? p : p.output).join(', ');
      parts.push(`Produces: ${outputs}`);
    }

    // Requirements
    if (data.requirements) {
      const reqs = [];
      if (data.requirements.tools) reqs.push(`Tools: ${data.requirements.tools.join(', ')}`);
      if (data.requirements.materials) reqs.push(`Materials: ${data.requirements.materials.join(', ')}`);
      if (data.requirements.skills) reqs.push(`Skills: ${data.requirements.skills.join(', ')}`);
      if (reqs.length > 0) {
        parts.push(`Requirements: ${reqs.join('; ')}`);
      }
    }

    // Specifications
    if (data.specifications) {
      const specs = [];
      if (data.specifications.dimensions) specs.push(data.specifications.dimensions);
      if (data.specifications.power) specs.push(data.specifications.power);
      if (data.specifications.capacity) specs.push(data.specifications.capacity);
      if (specs.length > 0) {
        parts.push(`Specifications: ${specs.join(', ')}`);
      }
    }

    // Meta info
    if (data.meta) {
      if (data.meta.brand) parts.push(`Brand: ${data.meta.brand}`);
      if (data.meta.model) parts.push(`Model: ${data.meta.model}`);
    }

    return parts.join('. ') + '.';
  }

  /**
   * Generate retrieval tags
   */
  generateRetrievalTags(data) {
    const tags = new Set();
    const { title, type, category, capabilities, abilities, meta, requirements, services, role, relationship } = data;

    // Basic tags
    if (title) tags.add(title.toLowerCase());
    if (type) tags.add(type);
    if (category) tags.add(category);
    if (role) tags.add(role);
    if (relationship) tags.add(relationship);

    // Add variations
    if (title) {
      // Add singular/plural
      if (title.endsWith('s')) {
        tags.add(title.slice(0, -1).toLowerCase());
      } else {
        tags.add((title + 's').toLowerCase());
      }
    }

    // Capabilities as tags
    if (capabilities) {
      capabilities.forEach(cap => {
        const capStr = typeof cap === 'string' ? cap : cap.capability || cap.ability;
        tags.add(capStr.toLowerCase());
        // Add individual words
        capStr.split(/\s+/).forEach(word => {
          if (word.length > 4) tags.add(word.toLowerCase());
        });
      });
    }

    // Abilities as tags
    if (abilities) {
      abilities.forEach(ability => {
        const abStr = typeof ability === 'string' ? ability : ability.ability;
        tags.add(abStr.toLowerCase());
      });
    }

    // Brand/model
    if (meta && meta.brand) tags.add(meta.brand.toLowerCase());
    if (meta && meta.model) tags.add(meta.model.toLowerCase());

    // Requirements as tags
    if (requirements) {
      Object.values(requirements).flat().forEach(req => {
        if (typeof req === 'string') {
          tags.add(req.toLowerCase());
        }
      });
    }

    // Services as tags
    if (services) {
      services.forEach(svc => {
        const svcName = typeof svc === 'string' ? svc : svc.name;
        tags.add(svcName.toLowerCase());
      });
    }

    return Array.from(tags).slice(0, 30);
  }

  /**
   * Build contextual examples
   */
  buildContextualExamples(data) {
    const examples = [];
    const { entityType, useCases, outcomes, canProduceWith, process, services } = data;

    // From use cases
    if (useCases && useCases.length > 0) {
      useCases.slice(0, 3).forEach(uc => {
        const scenario = typeof uc === 'string' ? uc : uc.scenario;
        examples.push({
          scenario: scenario,
          application: `Using this ${entityType} in the scenario: ${scenario}`,
          outcome: outcomes && outcomes.length > 0 
            ? (typeof outcomes[0] === 'string' ? outcomes[0] : outcomes[0].result)
            : 'Successfully completed the task'
        });
      });
    }

    // From canProduceWith
    if (canProduceWith && canProduceWith.length > 0) {
      canProduceWith.slice(0, 2).forEach(prod => {
        const output = typeof prod === 'string' ? prod : prod.output;
        const desc = typeof prod === 'string' ? '' : (prod.description || '');
        examples.push({
          scenario: `Need to produce ${output}`,
          application: desc || `Using this ${entityType} to create ${output}`,
          outcome: `Successfully produced ${output}`
        });
      });
    }

    // From process (for services)
    if (process && process.length > 0) {
      process.slice(0, 2).forEach(step => {
        examples.push({
          scenario: `Performing ${data.title || 'service'}`,
          application: typeof step === 'string' ? step : step.description,
          outcome: 'Service completed successfully'
        });
      });
    }

    return examples.length > 0 ? examples : [
      {
        scenario: `Using ${data.title || 'this entity'}`,
        application: `Applied in typical use case`,
        outcome: 'Achieved desired outcome'
      }
    ];
  }

  /**
   * Generate knowledge graph node data
   */
  generateKnowledgeGraphNode(entity, entityType, relationships = []) {
    return {
      nodeId: `${entityType}-${entity.id}`,
      nodeType: entityType,
      edges: relationships.map(rel => ({
        targetNodeId: `${rel.to.type}-${rel.to.id}`,
        edgeType: rel.type,
        weight: this.calculateRelationshipWeight(rel)
      }))
    };
  }

  /**
   * Calculate relationship weight (0-1)
   */
  calculateRelationshipWeight(relationship) {
    const strengthMap = {
      'critical': 1.0,
      'high': 0.8,
      'medium': 0.6,
      'low': 0.4,
      'optional': 0.2
    };
    return strengthMap[relationship.strength] || 0.5;
  }
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RAGContextGenerator;
} else if (typeof window !== 'undefined') {
  window.RAGContextGenerator = RAGContextGenerator;
}


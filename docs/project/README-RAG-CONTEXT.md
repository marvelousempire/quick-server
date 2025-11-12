# RAG Context System

## Purpose

The Business Identity Shaper framework shapes all entities (Resources, Services, Persons, Companies) for **RAG (Retrieval-Augmented Generation)** systems. This ensures every entity is:

1. **Fully Encompassing** — Contains all necessary context and information
2. **Immediately Learnable** — Understandable at a glance without additional context

## What is RAG?

**RAG (Retrieval-Augmented Generation)** is an AI technique that:
- **Retrieves** relevant information from a knowledge base
- **Augments** the AI's context with that information
- **Generates** responses based on the retrieved context

For RAG to work effectively, entities must be:
- **Richly described** — Comprehensive information for retrieval
- **Semantically structured** — Optimized for embedding-based search
- **Self-contained** — Complete context without external dependencies
- **Relationship-aware** — Clear connections to other entities

## RAG Context Fields

Every entity in the Business Identity Shaper includes RAG context fields:

### `rag.semanticContext`
**Purpose**: Rich, comprehensive text optimized for semantic embeddings

**Content**: Complete description including:
- What the entity is
- What it does (purpose, capabilities, abilities)
- How it's used (use cases, scenarios)
- What it produces (outcomes, deliverables)
- Requirements and specifications
- Relationships and context

**Length**: 100-2000 characters
**Use**: Primary field for embedding generation and semantic search

### `rag.learnableSummary`
**Purpose**: Immediately understandable summary that is self-contained

**Content**: Concise but complete description that allows instant understanding:
- Entity identification
- Primary purpose
- Key capabilities
- Main outcomes

**Length**: 50-500 characters
**Use**: Quick understanding, display in search results, tooltips

### `rag.keyConcepts`
**Purpose**: Key concepts, keywords, and terms for retrieval

**Content**: Array of important terms including:
- Entity name and variations
- Type and category
- Capabilities and abilities
- Related terms and synonyms

**Count**: 3-20 concepts
**Use**: Tag-based search, keyword matching, concept extraction

### `rag.queryPatterns`
**Purpose**: Common query patterns or questions this entity answers

**Content**: Array of natural language questions like:
- "What is [entity]?"
- "What can [entity] do?"
- "How is [entity] used?"
- "What does [entity] produce?"

**Count**: 3+ patterns
**Use**: Query matching, FAQ generation, search optimization

### `rag.embeddingText`
**Purpose**: Optimized text for embedding generation

**Content**: Structured text combining:
- Title and type
- Purpose and description
- Capabilities and abilities
- Use cases and outcomes
- Requirements and specifications

**Length**: 200-3000 characters
**Use**: Embedding generation, vector search, semantic similarity

### `rag.retrievalTags`
**Purpose**: Tags optimized for retrieval

**Content**: Array of tags including:
- Entity name and variations
- Synonyms and alternative names
- Use cases and applications
- Related terms

**Count**: 5-30 tags
**Use**: Tag-based filtering, keyword search, faceted search

### `rag.contextualExamples`
**Purpose**: Real-world examples demonstrating the entity

**Content**: Array of examples with:
- Scenario description
- How the entity is applied
- Outcome achieved

**Count**: 2+ examples
**Use**: Example-based learning, demonstration, context building

### `rag.knowledgeGraph`
**Purpose**: Knowledge graph representation

**Content**: Graph structure with:
- Node ID and type
- Edges to related entities
- Edge types (enables, requires, produces, etc.)
- Relationship weights

**Use**: Graph queries, relationship traversal, capability projection

## Automatic Generation

The `RAGContextGenerator` class automatically generates all RAG context fields for entities:

```javascript
const generator = new RAGContextGenerator();

// Generate RAG context for a resource
const ragContext = generator.generateResourceContext(resource);

// Generate RAG context for a service
const ragContext = generator.generateServiceContext(service);

// Generate RAG context for a person
const ragContext = generator.generatePersonContext(person);

// Generate RAG context for a company
const ragContext = generator.generateCompanyContext(company);
```

The generator:
1. Extracts all relevant information from the entity
2. Builds comprehensive semantic context
3. Creates immediately learnable summaries
4. Generates query patterns and retrieval tags
5. Builds embedding-optimized text
6. Creates contextual examples
7. Constructs knowledge graph nodes

## Usage in RAG Systems

### 1. Embedding Generation
Use `rag.embeddingText` or `rag.semanticContext` to generate embeddings:

```javascript
const embedding = await generateEmbedding(entity.rag.embeddingText);
```

### 2. Semantic Search
Search using semantic context:

```javascript
const queryEmbedding = await generateEmbedding(userQuery);
const results = await semanticSearch(queryEmbedding, entities.map(e => e.rag.embeddingText));
```

### 3. Query Matching
Match user queries to query patterns:

```javascript
const matchingEntity = entities.find(entity => 
  entity.rag.queryPatterns.some(pattern => 
    matchesQuery(userQuery, pattern)
  )
);
```

### 4. Tag-Based Retrieval
Filter entities by retrieval tags:

```javascript
const results = entities.filter(entity =>
  entity.rag.retrievalTags.some(tag => 
    userQuery.toLowerCase().includes(tag)
  )
);
```

### 5. Knowledge Graph Queries
Traverse relationships:

```javascript
const relatedEntities = entity.rag.knowledgeGraph.edges
  .filter(edge => edge.edgeType === 'enables')
  .map(edge => getEntityById(edge.targetNodeId));
```

## Benefits

1. **Immediate Understanding** — Entities are self-contained and immediately learnable
2. **Better Retrieval** — Rich context improves semantic search accuracy
3. **Complete Context** — All necessary information is present for generation
4. **Relationship Awareness** — Clear connections enable complex queries
5. **Query Optimization** — Query patterns improve matching
6. **Example-Based Learning** — Contextual examples provide real-world context

## Integration

RAG context is automatically generated when:
- Entities are created or updated
- Data is imported from vendors
- Relationships are mapped
- Entities are validated

The context is stored alongside entity data and kept in sync with entity updates.

---

*The RAG Context System ensures that every entity in the Business Identity Shaper is optimized for AI understanding and retrieval, making the entire knowledge base immediately learnable and fully encompassing.*


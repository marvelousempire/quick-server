# Lazy Initialization Pattern

## Overview

Heavy modules (RAG Context Generator, Market Analyzer, AI Assistant, Onboarding System, Vendor Import System) are initialized **lazily** (on-demand) rather than at server startup to prevent blocking and improve startup time.

## Problem

Previously, these modules were initialized synchronously at the top level of `server.js`:

```javascript
// ❌ OLD: Blocks startup for 9-12 seconds
const ragGenerator = new RAGContextGenerator();
const marketAnalyzer = new MarketAnalyzer();
const aiAssistant = new AIAssistant(ragGenerator, marketAnalyzer);
const onboardingSystem = new OnboardingSystem(ragGenerator, marketAnalyzer);
const vendorImportSystem = new VendorImportSystem(ragGenerator);
```

This caused:
- **Slow startup**: 9-12 second delay before server was ready
- **Blocking**: Server couldn't respond until all modules loaded
- **Resource waste**: Modules loaded even if never used

## Solution: Lazy Initialization

Modules are now initialized only when first needed:

```javascript
// ✅ NEW: Lazy initialization pattern
let ragGenerator = null;
function getRAGGenerator() {
  if (!ragGenerator) {
    console.log('📚 Initializing RAG Context Generator...');
    ragGenerator = new RAGContextGenerator();
    console.log('✓ RAG Context Generator ready');
  }
  return ragGenerator;
}
```

## Benefits

1. **Fast Startup**: Server starts immediately (< 1 second)
2. **On-Demand Loading**: Modules initialize only when API endpoints are called
3. **Better Resource Usage**: Unused modules never load
4. **Clear Logging**: See exactly when each module initializes

## Implementation

### Current Lazy Modules

1. **RAGContextGenerator** (`getRAGGenerator()`)
   - Used by: RAG context generation, resource/service imports
   - Initializes when: First RAG context is generated

2. **MarketAnalyzer** (`getMarketAnalyzer()`)
   - Used by: Market fit analysis, situation projection
   - Initializes when: First market analysis API call

3. **AIAssistant** (`getAIAssistant()`)
   - Used by: Entity summaries, forecasts, situation analysis
   - Initializes when: First AI assistant API call
   - Depends on: RAGGenerator, MarketAnalyzer

4. **OnboardingSystem** (`getOnboardingSystem()`)
   - Used by: Onboarding flow APIs
   - Initializes when: First onboarding API call
   - Depends on: RAGGenerator, MarketAnalyzer

5. **VendorImportSystem** (`getVendorImportSystem()`)
   - Used by: Vendor file imports (Amazon, eBay, etc.)
   - Initializes when: First vendor import API call
   - Depends on: RAGGenerator

### Usage Pattern

Always use getter functions instead of direct access:

```javascript
// ✅ CORRECT: Use getter function
app.post('/api/rag/generate', (req, res) => {
  const ragContext = getRAGGenerator().generateResourceContext(entity);
  // ...
});

// ❌ WRONG: Direct access (will cause error)
app.post('/api/rag/generate', (req, res) => {
  const ragContext = ragGenerator.generateResourceContext(entity); // ragGenerator is null!
});
```

## Dependency Chain

```
RAGContextGenerator (no dependencies)
    ↓
MarketAnalyzer (no dependencies)
    ↓
AIAssistant (depends on RAGGenerator + MarketAnalyzer)
    ↓
OnboardingSystem (depends on RAGGenerator + MarketAnalyzer)
    ↓
VendorImportSystem (depends on RAGGenerator)
```

When a module with dependencies initializes, it automatically initializes its dependencies first.

## Performance Impact

### Before (Eager Initialization)
- **Startup Time**: 9-12 seconds
- **Memory**: All modules loaded immediately
- **First Request**: Fast (modules already loaded)

### After (Lazy Initialization)
- **Startup Time**: < 1 second
- **Memory**: Modules load on-demand
- **First Request**: Slight delay (module initialization), subsequent requests fast

## Monitoring

Each module logs when it initializes:

```
📚 Initializing RAG Context Generator...
✓ RAG Context Generator ready
📊 Initializing Market Analyzer...
✓ Market Analyzer ready
🤖 Initializing AI Assistant...
✓ AI Assistant ready
```

Monitor server logs to see initialization patterns and optimize if needed.

## Future Improvements

### 1. Pre-warming (Optional)

If you want modules ready before first use, add a pre-warm function:

```javascript
async function prewarmModules() {
  // Initialize in background after server starts
  setTimeout(() => {
    console.log('🔥 Pre-warming modules...');
    getRAGGenerator();
    getMarketAnalyzer();
    // Don't pre-warm dependent modules (they'll init when needed)
  }, 2000); // Wait 2 seconds after server starts
}
```

### 2. Health Check Endpoint

Add an endpoint to check module initialization status:

```javascript
app.get('/api/health/modules', (req, res) => {
  res.json({
    ragGenerator: ragGenerator !== null,
    marketAnalyzer: marketAnalyzer !== null,
    aiAssistant: aiAssistant !== null,
    onboardingSystem: onboardingSystem !== null,
    vendorImportSystem: vendorImportSystem !== null
  });
});
```

### 3. Graceful Degradation

Handle initialization failures gracefully:

```javascript
function getRAGGenerator() {
  if (!ragGenerator) {
    try {
      console.log('📚 Initializing RAG Context Generator...');
      ragGenerator = new RAGContextGenerator();
      console.log('✓ RAG Context Generator ready');
    } catch (error) {
      console.error('❌ Failed to initialize RAG Context Generator:', error);
      // Return a stub or throw error depending on requirements
      throw new Error('RAG Context Generator unavailable');
    }
  }
  return ragGenerator;
}
```

## Best Practices

1. **Always use getter functions** - Never access modules directly
2. **Handle initialization errors** - Modules might fail to initialize
3. **Monitor initialization** - Watch logs for performance issues
4. **Consider pre-warming** - If modules are always needed, pre-warm them
5. **Document dependencies** - Keep dependency chain clear

## Related Files

- `server.js` - Main server file with lazy initialization
- `server/rag-context-generator.js` - RAG Context Generator module
- `server/market-analysis.js` - Market Analyzer module
- `server/ai-assistant.js` - AI Assistant module
- `server/onboarding.js` - Onboarding System module
- `server/vendor-importers/index.js` - Vendor Import System module


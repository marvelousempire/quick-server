#!/usr/bin/env node
/**
 * LearnMappers PWA - Node.js Backend Server
 * Serves static files and provides SQLite API endpoints
 */

import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Database from 'better-sqlite3';
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, mkdirSync, accessSync, constants } from 'fs';
import { createServer } from 'https';
import { createServer as createHttpServer } from 'http';
import { networkInterfaces } from 'os';
import { createServer as createNetServer } from 'net';
import { autoBornImage, autoFixImage, autoHealImage } from './server/image-retriever.js';
import { testConnection, deploySite, getRemoteStats } from './server/deployment.js';
import { RAGContextGenerator } from './server/rag-context-generator.js';
import { MarketAnalyzer } from './server/market-analysis.js';
import { AIAssistant } from './server/ai-assistant.js';
import { OnboardingSystem } from './server/onboarding.js';
import { VendorImportSystem } from './server/vendor-importers/index.js';
import { HealthMonitor } from './server/health-monitor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const DEFAULT_PORT = process.env.PORT || 8443;
const DEFAULT_HTTP_PORT = process.env.HTTP_PORT || 8000;
const USE_HTTPS = process.env.HTTPS !== 'false';

// Function to check if a port is available
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = createNetServer();
    let resolved = false;
    
    const cleanup = () => {
      if (!resolved) {
        resolved = true;
        try {
          server.removeAllListeners();
          server.close();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
    
    server.once('listening', () => {
      cleanup();
      resolve(true);
    });
    
    server.once('error', (err) => {
      cleanup();
      resolve(false);
    });
    
    // Set a timeout to prevent hanging
    setTimeout(() => {
      if (!resolved) {
        cleanup();
        resolve(false);
      }
    }, 100);
    
    try {
      server.listen(port, '127.0.0.1');
    } catch (e) {
      cleanup();
      resolve(false);
    }
  });
}

// Function to find next available port starting from a given port
async function findAvailablePort(startPort, maxAttempts = 10) {
  for (let i = 0; i < maxAttempts; i++) {
    const port = startPort + i;
    const available = await isPortAvailable(port);
    if (available) {
      return port;
    }
  }
  // If no port found, return the original port and let it fail with a clear error
  return startPort;
}

// Function to start server on a port with automatic retry
async function startServerOnPort(server, port, startPort, localIP, isHttps = false) {
  return new Promise((resolve, reject) => {
    let resolved = false;
    
    const onListening = (actualPort) => {
      if (resolved) return;
      resolved = true;
      
      const protocol = isHttps ? 'https' : 'http';
      console.log(`\n${'='.repeat(60)}`);
      console.log(`LearnMappers PWA - Node.js Backend (${isHttps ? 'HTTPS' : 'HTTP'})`);
      console.log(`${'='.repeat(60)}`);
      console.log(`Site:     ${SITE_DIR}`);
      console.log(`Local:    ${protocol}://localhost:${actualPort}`);
      console.log(`Network:  ${protocol}://${localIP}:${actualPort}`);
      console.log(`API:      ${protocol}://localhost:${actualPort}/api`);
      console.log(`${'='.repeat(60)}\n`);
      resolve(actualPort);
    };
    
    const onError = async (err) => {
      if (resolved) return;
      
      if (err.code === 'EADDRINUSE') {
        console.log(`   Port ${port} is in use, finding next available port...`);
        const nextPort = await findAvailablePort(port + 1, 5);
        if (nextPort === port) {
          resolved = true;
          reject(new Error(`Could not find available port after ${port}`));
          return;
        }
        console.log(`   Using port ${nextPort} instead`);
        // Remove old listeners
        server.removeAllListeners('error');
        server.removeAllListeners('listening');
        // Try again with new port
        server.once('listening', () => onListening(nextPort));
        server.once('error', onError);
        try {
          server.listen(nextPort, '0.0.0.0');
        } catch (e) {
          resolved = true;
          reject(e);
        }
      } else {
        resolved = true;
        reject(err);
      }
    };
    
    server.once('listening', () => onListening(port));
    server.once('error', onError);
    
    try {
      server.listen(port, '0.0.0.0');
    } catch (e) {
      resolved = true;
      reject(e);
    }
  });
}

// Initialize RAG Context Generator (lazy initialization to avoid blocking startup)
let ragGenerator = null;
function getRAGGenerator() {
  if (!ragGenerator) {
    console.log('📚 Initializing RAG Context Generator...');
    ragGenerator = new RAGContextGenerator();
    console.log('✓ RAG Context Generator ready');
  }
  return ragGenerator;
}

// Initialize Market Analyzer and AI Assistant (lazy initialization)
let marketAnalyzer = null;
let aiAssistant = null;
function getMarketAnalyzer() {
  if (!marketAnalyzer) {
    console.log('📊 Initializing Market Analyzer...');
    marketAnalyzer = new MarketAnalyzer();
    console.log('✓ Market Analyzer ready');
  }
  return marketAnalyzer;
}
function getAIAssistant() {
  if (!aiAssistant) {
    console.log('🤖 Initializing AI Assistant...');
    aiAssistant = new AIAssistant(getRAGGenerator(), getMarketAnalyzer());
    console.log('✓ AI Assistant ready');
  }
  return aiAssistant;
}

// Initialize Onboarding System and Vendor Import System (lazy initialization)
let onboardingSystem = null;
let vendorImportSystem = null;
function getOnboardingSystem() {
  if (!onboardingSystem) {
    console.log('🚀 Initializing Onboarding System...');
    onboardingSystem = new OnboardingSystem(getRAGGenerator(), getMarketAnalyzer());
    console.log('✓ Onboarding System ready');
  }
  return onboardingSystem;
}
function getVendorImportSystem() {
  if (!vendorImportSystem) {
    console.log('📦 Initializing Vendor Import System...');
    vendorImportSystem = new VendorImportSystem(getRAGGenerator());
    console.log('✓ Vendor Import System ready');
  }
  return vendorImportSystem;
}

// Initialize Health Monitor (lazy initialization to avoid blocking startup)
let healthMonitor = null;
function getHealthMonitor() {
  if (!healthMonitor) {
    try {
      healthMonitor = new HealthMonitor();
    } catch (e) {
      console.warn('⚠️  Health Monitor initialization failed:', e.message);
    }
  }
  return healthMonitor;
}

// Site directory configuration
// Can be: 'sites/learnmappers' (default), 'sites/site-name', or any relative path
const SITE_DIR = process.env.SITE_DIR || process.argv[2] || 'sites/learnmappers';
const sitePath = join(__dirname, SITE_DIR);

// Middleware
app.use(cors());
app.use(express.json());
// Serve static files from all sites (for site selector and cross-site access)
const sitesDir = join(__dirname, 'sites');
if (existsSync(sitesDir)) {
  app.use('/sites', express.static(sitesDir, {
    dotfiles: 'ignore',
    etag: true,
    extensions: ['html', 'js', 'css', 'json', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'ico', 'webmanifest'],
    index: false, // Don't serve index.html automatically
    maxAge: '1d',
    setHeaders: (res, path) => {
      // Set proper content types
      if (path.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json');
      } else if (path.endsWith('.webmanifest')) {
        res.setHeader('Content-Type', 'application/manifest+json');
      }
    }
  }));
}

// Serve resources from unified learnmappers site
const unifiedResourcesDir = join(__dirname, 'sites', 'learnmappers', 'content', 'resources');
if (existsSync(unifiedResourcesDir)) {
  app.use('/sites/learnmappers/content/resources', express.static(unifiedResourcesDir));
}

// Serve docs directory (for markdown files)
const docsDir = join(__dirname, 'docs');
if (existsSync(docsDir)) {
  app.use('/docs', express.static(docsDir));
}

// Serve shared schemas (including type templates)
const sharedSchemasDir = join(__dirname, 'sites', 'learnmappers', 'schemas');
if (existsSync(sharedSchemasDir)) {
  app.use('/schemas', express.static(sharedSchemasDir));
}

// Serve static files from specified site directory (primary)
app.use(express.static(sitePath, {
  setHeaders: (res, path) => {
    // Set proper content types
    if (path.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json');
    } else if (path.endsWith('.webmanifest')) {
      res.setHeader('Content-Type', 'application/manifest+json');
    }
  }
}));

// Database setup
const dbPath = join(__dirname, 'data', 'learnmappers.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL'); // Better concurrency

// Initialize database if needed
function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      name TEXT NOT NULL,
      power TEXT,
      state TEXT,
      spot TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_type ON inventory(type);
    CREATE INDEX IF NOT EXISTS idx_state ON inventory(state);
  `);
  
  // Enhance schema with rich resource card datapoints (migrate existing table)
  const columns = db.prepare("PRAGMA table_info(inventory)").all();
  const columnNames = columns.map(c => c.name);
  
  // Add new columns if they don't exist
  const newColumns = [
    { name: 'brand', type: 'TEXT' },
    { name: 'model', type: 'TEXT' },
    { name: 'serial_number', type: 'TEXT' },
    { name: 'purchase_date', type: 'DATE' },
    { name: 'purchase_price', type: 'REAL' },
    { name: 'dimensions', type: 'TEXT' },
    { name: 'weight', type: 'TEXT' },
    { name: 'capacity', type: 'TEXT' },
    { name: 'compatibility', type: 'TEXT' }, // JSON array as text
    { name: 'use_cases', type: 'TEXT' }, // JSON array as text
    { name: 'can_produce_with', type: 'TEXT' }, // JSON array as text
    { name: 'maintenance_schedule', type: 'TEXT' },
    { name: 'last_maintenance', type: 'DATE' },
    { name: 'next_maintenance', type: 'DATE' },
    { name: 'maintenance_notes', type: 'TEXT' },
    { name: 'links', type: 'TEXT' }, // JSON array as text
    { name: 'status', type: 'TEXT' }, // available, in-use, reserved, maintenance, retired
    { name: 'category', type: 'TEXT' }, // tool, equipment, material, etc.
    { name: 'purpose', type: 'TEXT' }, // Primary purpose/function
    { name: 'tags', type: 'TEXT' } // JSON array as text
  ];
  
  for (const col of newColumns) {
    if (!columnNames.includes(col.name)) {
      try {
        db.exec(`ALTER TABLE inventory ADD COLUMN ${col.name} ${col.type}`);
        console.log(`✓ Added column: ${col.name}`);
      } catch (e) {
        // Column might already exist or other error
        console.warn(`Could not add column ${col.name}:`, e.message);
      }
    }
  }
}

initDatabase();

// API Routes

// GET /api/inventory - Get all inventory items
app.get('/api/inventory', (req, res) => {
  try {
    const { type, state, search } = req.query;
    let query = 'SELECT * FROM inventory WHERE 1=1';
    const params = [];

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }
    if (state) {
      query += ' AND state LIKE ?';
      params.push(`%${state}%`);
    }
    if (search) {
      query += ' AND (name LIKE ? OR notes LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    query += ' ORDER BY created_at DESC';
    const items = db.prepare(query).all(...params);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/inventory/:id - Get single item
app.get('/api/inventory/:id', (req, res) => {
  try {
    const item = db.prepare('SELECT * FROM inventory WHERE id = ?').get(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/rag/generate - Generate RAG context for an entity
app.post('/api/rag/generate', (req, res) => {
  try {
    const { entityType, entity } = req.body;
    
    if (!entityType || !entity) {
      return res.status(400).json({ error: 'entityType and entity are required' });
    }
    
    let ragContext;
    switch (entityType) {
      case 'resource':
        ragContext = getRAGGenerator().generateResourceContext(entity);
        break;
      case 'service':
        ragContext = getRAGGenerator().generateServiceContext(entity);
        break;
      case 'person':
        ragContext = getRAGGenerator().generatePersonContext(entity);
        break;
      case 'company':
        ragContext = getRAGGenerator().generateCompanyContext(entity);
        break;
      default:
        return res.status(400).json({ error: `Unknown entity type: ${entityType}` });
    }
    
    res.json({
      success: true,
      rag: ragContext
    });
  } catch (error) {
    console.error('Error generating RAG context:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/rag/regenerate-all - Regenerate RAG context for all entities
app.post('/api/rag/regenerate-all', async (req, res) => {
  try {
    const { site } = req.query;
    let siteName = site || SITE_DIR.replace('sites/', '');
    const results = { resources: 0, services: 0, persons: 0, companies: 0, errors: [] };
    
    // Regenerate for resources
    try {
      const resourcesDir = join(__dirname, 'sites', siteName, 'content', 'resources');
      if (existsSync(resourcesDir)) {
        const resourceTypes = ['tool', 'equipment', 'material', 'document', 'other'];
        for (const type of resourceTypes) {
          const typeDir = join(resourcesDir, type);
          if (existsSync(typeDir)) {
            const files = readdirSync(typeDir).filter(f => f.endsWith('.json') && !f.includes('template'));
            for (const file of files) {
              try {
                const filePath = join(typeDir, file);
                const resource = JSON.parse(readFileSync(filePath, 'utf8'));
                const ragContext = getRAGGenerator().generateResourceContext(resource);
                resource.rag = ragContext;
                writeFileSync(filePath, JSON.stringify(resource, null, 2), 'utf8');
                results.resources++;
              } catch (e) {
                results.errors.push({ type: 'resource', file, error: e.message });
              }
            }
          }
        }
      }
    } catch (e) {
      results.errors.push({ type: 'resources', error: e.message });
    }
    
    // Regenerate for services
    try {
      const servicesDir = join(__dirname, 'sites', siteName, 'content', 'services');
      if (existsSync(servicesDir)) {
        function processServices(dir) {
          const entries = readdirSync(dir, { withFileTypes: true });
          for (const entry of entries) {
            const fullPath = join(dir, entry.name);
            if (entry.isDirectory()) {
              processServices(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.json') && entry.name.startsWith('service-')) {
              try {
                const service = JSON.parse(readFileSync(fullPath, 'utf8'));
                const ragContext = getRAGGenerator().generateServiceContext(service);
                service.rag = ragContext;
                writeFileSync(fullPath, JSON.stringify(service, null, 2), 'utf8');
                results.services++;
              } catch (e) {
                results.errors.push({ type: 'service', file: entry.name, error: e.message });
              }
            }
          }
        }
        processServices(servicesDir);
      }
    } catch (e) {
      results.errors.push({ type: 'services', error: e.message });
    }
    
    res.json({
      success: true,
      results,
      message: `Regenerated RAG context: ${results.resources} resources, ${results.services} services`
    });
  } catch (error) {
    console.error('Error regenerating RAG context:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/analysis/market-fit - Analyze entity market fit
app.post('/api/analysis/market-fit', (req, res) => {
  try {
    const { entity, marketContext } = req.body;
    
    if (!entity) {
      return res.status(400).json({ error: 'Entity is required' });
    }
    
    const defaultContext = {
      marketType: 'general',
      competitionLevel: 'medium',
      demandLevel: 'medium',
      marketTrends: [],
      targetAudience: []
    };
    
    const analysis = getMarketAnalyzer().analyzeMarketFit(
      entity, 
      marketContext || defaultContext
    );
    
    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('Error analyzing market fit:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/analysis/situation - Project entity for specific situation
app.post('/api/analysis/situation', (req, res) => {
  try {
    const { entity, situation } = req.body;
    
    if (!entity || !situation) {
      return res.status(400).json({ error: 'Entity and situation are required' });
    }
    
    const projection = getMarketAnalyzer().projectForSituation(entity, situation);
    
    res.json({
      success: true,
      projection
    });
  } catch (error) {
    console.error('Error projecting for situation:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/analysis/entity-summary - Generate comprehensive entity summary
app.post('/api/analysis/entity-summary', (req, res) => {
  try {
    const { entity, options = {} } = req.body;
    
    if (!entity) {
      return res.status(400).json({ error: 'Entity is required' });
    }
    
    const summary = getAIAssistant().generateEntitySummary(entity, options);
    
    res.json({
      success: true,
      summary
    });
  } catch (error) {
    console.error('Error generating entity summary:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/analysis/forecast - Generate precision forecast
app.post('/api/analysis/forecast', (req, res) => {
  try {
    const { entity, marketContext, timeframe = '12 months' } = req.body;
    
    if (!entity || !marketContext) {
      return res.status(400).json({ error: 'Entity and marketContext are required' });
    }
    
    const forecast = getAIAssistant().generatePrecisionForecast(entity, marketContext, timeframe);
    
    res.json({
      success: true,
      forecast
    });
  } catch (error) {
    console.error('Error generating forecast:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/analysis/situation-analysis - Analyze entity for specific situation with AI insights
app.post('/api/analysis/situation-analysis', (req, res) => {
  try {
    const { entity, situation } = req.body;
    
    if (!entity || !situation) {
      return res.status(400).json({ error: 'Entity and situation are required' });
    }
    
    const analysis = getAIAssistant().analyzeForSituation(entity, situation);
    
    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('Error analyzing situation:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/onboarding/status - Get onboarding status for a site
app.get('/api/onboarding/status', (req, res) => {
  try {
    const { site } = req.query;
    const siteName = site || SITE_DIR.replace('sites/', '');
    
    const status = getOnboardingSystem().getOnboardingStatus(siteName);
    
    res.json({
      success: true,
      status
    });
  } catch (error) {
    console.error('Error getting onboarding status:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/onboarding/step - Process onboarding step
app.post('/api/onboarding/step', (req, res) => {
  try {
    const { site, step, data } = req.body;
    const siteName = site || SITE_DIR.replace('sites/', '');
    
    if (!step) {
      return res.status(400).json({ error: 'Step is required' });
    }
    
    const result = getOnboardingSystem().processStep(siteName, step, data);
    
    res.json(result);
  } catch (error) {
    console.error('Error processing onboarding step:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/onboarding/complete - Complete onboarding
app.post('/api/onboarding/complete', (req, res) => {
  try {
    const { site } = req.body;
    const siteName = site || SITE_DIR.replace('sites/', '');
    
    const result = getOnboardingSystem().completeOnboarding(siteName);
    
    res.json(result);
  } catch (error) {
    console.error('Error completing onboarding:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/vendors - Get available vendor importers
app.get('/api/vendors', (req, res) => {
  try {
    const vendors = getVendorImportSystem().getAvailableVendors();
    
    res.json({
      success: true,
      vendors
    });
  } catch (error) {
    console.error('Error getting vendors:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/vendors/import - Import from vendor
app.post('/api/vendors/import', async (req, res) => {
  try {
    const { site, vendor, filename, fileData } = req.body;
    const siteName = site || SITE_DIR.replace('sites/', '');
    
    if (!vendor || !filename || !fileData) {
      return res.status(400).json({ error: 'vendor, filename, and fileData are required' });
    }
    
    // Convert base64 to buffer if needed
    let buffer;
    if (typeof fileData === 'string') {
      buffer = Buffer.from(fileData, 'base64');
    } else {
      buffer = Buffer.from(fileData);
    }
    
    const result = await getVendorImportSystem().importFromVendor(siteName, vendor, {
      filename,
      buffer,
      text: buffer.toString('utf8')
    });
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error importing from vendor:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/vendors/auto-import - Auto-detect vendor and import
app.post('/api/vendors/auto-import', async (req, res) => {
  try {
    const { site, filename, fileData } = req.body;
    const siteName = site || SITE_DIR.replace('sites/', '');
    
    if (!filename || !fileData) {
      return res.status(400).json({ error: 'filename and fileData are required' });
    }
    
    // Convert base64 to buffer if needed
    let buffer;
    if (typeof fileData === 'string') {
      buffer = Buffer.from(fileData, 'base64');
    } else {
      buffer = Buffer.from(fileData);
    }
    
    const result = await getVendorImportSystem().autoImport(siteName, filename, {
      filename,
      buffer,
      text: buffer.toString('utf8')
    });
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error auto-importing:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/services - Get all services from JSON files or config (for service cards)
app.get('/api/services', (req, res) => {
  try {
    const { id, site } = req.query;
    let siteName = site || SITE_DIR.replace('sites/', '');
    
    // If specific ID requested, return that service
    if (id) {
      // Try JSON files first
      const servicesDir = join(__dirname, 'sites', siteName, 'content', 'services');
      if (existsSync(servicesDir)) {
        const serviceDirs = readdirSync(servicesDir, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name);
        
        for (const dir of serviceDirs) {
          const serviceFiles = readdirSync(join(servicesDir, dir))
            .filter(f => f.startsWith('service-') && f.endsWith('.json'));
          
          for (const file of serviceFiles) {
            try {
              const filePath = join(servicesDir, dir, file);
              const content = readFileSync(filePath, 'utf8');
              const service = JSON.parse(content);
              if (service.id === id) {
                return res.json(service);
              }
            } catch (e) {
              // Continue
            }
          }
        }
      }
      
      // Fallback to config.json
      const configPath = join(__dirname, 'sites', siteName, 'config.json');
      if (existsSync(configPath)) {
        const config = JSON.parse(readFileSync(configPath, 'utf8'));
        const categories = config.content?.services?.categories || [];
        for (const category of categories) {
          if (category.id === id && !category.services) {
            return res.json(category);
          }
          if (category.services && Array.isArray(category.services)) {
            const service = category.services.find(s => s.id === id);
            if (service) {
              return res.json(service);
            }
          }
        }
      }
      
      return res.status(404).json({ error: 'Service not found' });
    }
    
    // Return all services
    const allServices = [];
    const servicesDir = join(__dirname, 'sites', siteName, 'content', 'services');
    
    if (existsSync(servicesDir)) {
      const serviceDirs = readdirSync(servicesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
      
      serviceDirs.forEach(dir => {
        const typeDir = join(servicesDir, dir);
        const files = readdirSync(typeDir).filter(f => f.startsWith('service-') && f.endsWith('.json'));
        files.forEach(file => {
          try {
            const filePath = join(typeDir, file);
            const content = readFileSync(filePath, 'utf8');
            const service = JSON.parse(content);
            service._source = `content/services/${dir}/${file}`;
            allServices.push(service);
          } catch (e) {
            console.warn(`Error reading service file ${file}:`, e.message);
          }
        });
      });
    }
    
    // Also add services from config.json if not already included
    const configPath = join(__dirname, 'sites', siteName, 'config.json');
    if (existsSync(configPath)) {
      const config = JSON.parse(readFileSync(configPath, 'utf8'));
      const categories = config.content?.services?.categories || [];
      categories.forEach(category => {
        if (category.id && !category.services) {
          // Category is itself a service
          if (!allServices.find(s => s.id === category.id)) {
            allServices.push(category);
          }
        } else if (category.services && Array.isArray(category.services)) {
          category.services.forEach(service => {
            if (!allServices.find(s => s.id === service.id)) {
              allServices.push(service);
            }
          });
        }
      });
    }
    
    res.json(allServices);
  } catch (error) {
    console.error('Error getting services:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/resources - Get all resources from JSON files (for resource cards)
app.get('/api/resources', (req, res) => {
  try {
    const { type, site } = req.query;
    let siteName = site || SITE_DIR.replace('sites/', '');
    
    // Get resources from JSON files in content/resources/
    const resourcesDir = join(__dirname, 'sites', siteName, 'content', 'resources');
    const allResources = [];
    
    if (existsSync(resourcesDir)) {
      const resourceTypes = type ? [type] : ['tool', 'equipment', 'material', 'document', 'other'];
      
      resourceTypes.forEach(resourceType => {
        const typeDir = join(resourcesDir, resourceType);
        if (existsSync(typeDir)) {
          const files = readdirSync(typeDir).filter(f => f.endsWith('.json') && !f.includes('template') && !f.includes('example'));
          files.forEach(file => {
            try {
              const filePath = join(typeDir, file);
              const content = readFileSync(filePath, 'utf8');
              const resource = JSON.parse(content);
              resource._source = `content/resources/${resourceType}/${file}`;
              resource._type = resourceType;
              allResources.push(resource);
            } catch (e) {
              console.warn(`Error reading resource file ${file}:`, e.message);
            }
          });
        }
      });
      
      // Also check root of resources directory (backward compatibility)
      const rootFiles = readdirSync(resourcesDir).filter(f => f.endsWith('.json') && !f.includes('template') && !f.includes('example'));
      rootFiles.forEach(file => {
        try {
          const filePath = join(resourcesDir, file);
          const content = readFileSync(filePath, 'utf8');
          const resource = JSON.parse(content);
          resource._source = `content/resources/${file}`;
          resource._type = resource.type || 'other';
          allResources.push(resource);
        } catch (e) {
          console.warn(`Error reading resource file ${file}:`, e.message);
        }
      });
    }
    
    res.json(allResources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/inventory - Create new item
app.post('/api/inventory', async (req, res) => {
  try {
    const { 
      type, name, power, state, spot, notes,
      // Rich schema fields
      brand, model, serial_number, purchase_date, purchase_price,
      dimensions, weight, capacity, compatibility,
      use_cases, can_produce_with,
      maintenance_schedule, last_maintenance, next_maintenance, maintenance_notes,
      links, status, category, purpose, tags
    } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const stmt = db.prepare(`
      INSERT INTO inventory (
        type, name, power, state, spot, notes,
        brand, model, serial_number, purchase_date, purchase_price,
        dimensions, weight, capacity, compatibility,
        use_cases, can_produce_with,
        maintenance_schedule, last_maintenance, next_maintenance, maintenance_notes,
        links, status, category, purpose, tags
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    // Convert arrays/objects to JSON strings for storage
    const compatibilityJson = compatibility ? (Array.isArray(compatibility) ? JSON.stringify(compatibility) : compatibility) : null;
    const useCasesJson = use_cases ? (Array.isArray(use_cases) ? JSON.stringify(use_cases) : use_cases) : null;
    const canProduceJson = can_produce_with ? (Array.isArray(can_produce_with) ? JSON.stringify(can_produce_with) : can_produce_with) : null;
    const linksJson = links ? (Array.isArray(links) ? JSON.stringify(links) : links) : null;
    const tagsJson = tags ? (Array.isArray(tags) ? JSON.stringify(tags) : tags) : null;
    
    const result = stmt.run(
      type || '', name, power || '', state || 'Good', spot || '', notes || '',
      brand || null, model || null, serial_number || null, purchase_date || null, purchase_price || null,
      dimensions || null, weight || null, capacity || null, compatibilityJson,
      useCasesJson, canProduceJson,
      maintenance_schedule || null, last_maintenance || null, next_maintenance || null, maintenance_notes || null,
      linksJson, status || 'available', category || null, purpose || null, tagsJson
    );
    const item = db.prepare('SELECT * FROM inventory WHERE id = ?').get(result.lastInsertRowid);
    
    // Auto-Born: Generate image for resource
    let imageData = null;
    try {
      const siteName = SITE_DIR.replace('sites/', '');
      imageData = await autoBornImage({
        title: item.name,
        category: item.category || mapTypeToCategory(item.type),
        meta: {
          brand: item.brand,
          model: item.model
        }
      }, siteName);
      
      if (imageData) {
        console.log(`✅ Auto-Born Image: ${item.name}`);
      }
    } catch (imageError) {
      console.warn('Image auto-born failed:', imageError.message);
    }
    
    // Auto-Born: Generate JSON file for on-the-fly imports (Multisite structure)
      try {
        // Try new content folder first, fallback to old data folder
        const contentDir = join(__dirname, 'sites', SITE_DIR.replace('sites/', ''), 'content', 'resources');
        const dataDir = join(__dirname, 'sites', SITE_DIR.replace('sites/', ''), 'data', 'resources');
        const resourcesDir = existsSync(contentDir) ? contentDir : dataDir;
        mkdirSync(resourcesDir, { recursive: true });
      
      // Create slug function
      function createSlug(name) {
        const leadingDescriptors = ['compact', 'cordless', 'brushless', 'single', 'double', 'portable', 'foldable', 'self', 'smart', 'professional', 'heavy', 'light', 'mini', 'micro', 'large', 'small', 'watering'];
        const words = (name || 'untitled').toLowerCase().split(/[^a-z0-9]+/).filter(w => w);
        
        let mainNounIndex = -1;
        for (let i = words.length - 1; i >= 0; i--) {
          if (!leadingDescriptors.includes(words[i]) && !/^\d+$/.test(words[i])) {
            mainNounIndex = i;
            break;
          }
        }
        
        if (mainNounIndex === -1) {
          return words.join('-').substring(0, 80);
        }
        
        let nounStart = mainNounIndex;
        for (let i = mainNounIndex - 1; i >= 0; i--) {
          if (leadingDescriptors.includes(words[i]) || /^\d+$/.test(words[i])) {
            break;
          }
          nounStart = i;
        }
        
        const nounPhrase = words.slice(nounStart, mainNounIndex + 1);
        const beforeNoun = words.slice(0, nounStart);
        const afterNoun = words.slice(mainNounIndex + 1);
        const ordered = [...nounPhrase, ...beforeNoun, ...afterNoun];
        
        return ordered.join('-').substring(0, 80);
      }
      
      const slug = createSlug(item.name);
      const jsonPath = join(resourcesDir, `${slug}.json`);
      
      // Convert database item to JSON format
      const resourceJson = {
        id: item.id,
        title: item.name,
        name: item.name,
        type: item.type || 'tool',
        category: item.category || 'tool',
        description: item.notes || item.description || '',
        purpose: item.purpose || '',
        image: imageData || null, // Include auto-retrieved image
        brand: item.brand || null,
        model: item.model || null,
        serialNumber: item.serial_number || null,
        purchaseDate: item.purchase_date || null,
        purchasePrice: item.purchase_price || null,
        msrp: item.msrp || null,
        dimensions: item.dimensions || null,
        weight: item.weight || null,
        capacity: item.capacity || null,
        compatibility: item.compatibility ? JSON.parse(item.compatibility) : null,
        useCases: item.use_cases ? JSON.parse(item.use_cases) : [],
        canProduceWith: item.can_produce_with ? JSON.parse(item.can_produce_with) : [],
        maintenanceSchedule: item.maintenance_schedule || null,
        lastMaintenance: item.last_maintenance || null,
        nextMaintenance: item.next_maintenance || null,
        maintenanceNotes: item.maintenance_notes || null,
        links: item.links ? JSON.parse(item.links) : [],
        status: item.status || 'available',
        tags: item.tags ? JSON.parse(item.tags) : [],
        lastUsed: item.last_used || null,
        outcomes: [],
        capabilities: [],
        abilities: [],
        specifications: {
          dimensions: item.dimensions || null,
          weight: item.weight || null,
          power: item.power || null,
          capacity: item.capacity || null,
          compatibility: item.compatibility ? JSON.parse(item.compatibility) : null
        },
        meta: {
          brand: item.brand || null,
          model: item.model || null,
          serialNumber: item.serial_number || null,
          purchaseDate: item.purchase_date || null,
          purchasePrice: item.purchase_price || null,
          msrp: item.msrp || null,
          location: item.spot || null,
          condition: mapStateToCondition(item.state),
          tags: item.tags ? JSON.parse(item.tags) : [],
          createdAt: item.created_at || new Date().toISOString(),
          updatedAt: item.updated_at || new Date().toISOString()
        }
      };
      
      // Auto-Born: Generate RAG context for immediate learnability
      try {
        const ragContext = getRAGGenerator().generateResourceContext(resourceJson);
        resourceJson.rag = ragContext;
        console.log(`✅ Auto-Born RAG Context: ${item.name}`);
      } catch (ragError) {
        console.warn('RAG context generation failed:', ragError.message);
      }
      
      writeFileSync(jsonPath, JSON.stringify(resourceJson, null, 2), 'utf-8');
      console.log(`✅ Generated JSON: ${slug}.json`);
    } catch (jsonError) {
      console.warn('Could not generate JSON file:', jsonError.message);
    }
    
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/inventory/:id - Update item
app.put('/api/inventory/:id', (req, res) => {
  try {
    const { 
      type, name, power, state, spot, notes,
      brand, model, serial_number, purchase_date, purchase_price,
      dimensions, weight, capacity, compatibility,
      use_cases, can_produce_with,
      maintenance_schedule, last_maintenance, next_maintenance, maintenance_notes,
      links, status, category, purpose, tags
    } = req.body;
    
    // Convert arrays/objects to JSON strings for storage
    const compatibilityJson = compatibility ? (Array.isArray(compatibility) ? JSON.stringify(compatibility) : compatibility) : null;
    const useCasesJson = use_cases ? (Array.isArray(use_cases) ? JSON.stringify(use_cases) : use_cases) : null;
    const canProduceJson = can_produce_with ? (Array.isArray(can_produce_with) ? JSON.stringify(can_produce_with) : can_produce_with) : null;
    const linksJson = links ? (Array.isArray(links) ? JSON.stringify(links) : links) : null;
    const tagsJson = tags ? (Array.isArray(tags) ? JSON.stringify(tags) : tags) : null;
    
    const stmt = db.prepare(`
      UPDATE inventory 
      SET 
        type = ?, name = ?, power = ?, state = ?, spot = ?, notes = ?,
        brand = ?, model = ?, serial_number = ?, purchase_date = ?, purchase_price = ?,
        dimensions = ?, weight = ?, capacity = ?, compatibility = ?,
        use_cases = ?, can_produce_with = ?,
        maintenance_schedule = ?, last_maintenance = ?, next_maintenance = ?, maintenance_notes = ?,
        links = ?, status = ?, category = ?, purpose = ?, tags = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    const result = stmt.run(
      type || '', name || '', power || '', state || '', spot || '', notes || '',
      brand || null, model || null, serial_number || null, purchase_date || null, purchase_price || null,
      dimensions || null, weight || null, capacity || null, compatibilityJson,
      useCasesJson, canProduceJson,
      maintenance_schedule || null, last_maintenance || null, next_maintenance || null, maintenance_notes || null,
      linksJson, status || 'available', category || null, purpose || null, tagsJson,
      req.params.id
    );
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    const item = db.prepare('SELECT * FROM inventory WHERE id = ?').get(req.params.id);
    
    // Auto-Born: Update JSON file for on-the-fly imports (Multisite structure)
    try {
      // Try new content folder first, fallback to old data folder
      // Support resources from both current site and HQDEV/FOADMIN
      const siteName = SITE_DIR.replace('sites/', '');
      const contentDir = join(__dirname, 'sites', siteName, 'content', 'resources');
      const dataDir = join(__dirname, 'sites', siteName, 'data', 'resources');
      
      // Use unified learnmappers site resources
      const resourcesDir = existsSync(contentDir) ? contentDir : dataDir;
      mkdirSync(resourcesDir, { recursive: true });
      
      // Create slug function (same as POST)
      function createSlug(name) {
        const leadingDescriptors = ['compact', 'cordless', 'brushless', 'single', 'double', 'portable', 'foldable', 'self', 'smart', 'professional', 'heavy', 'light', 'mini', 'micro', 'large', 'small', 'watering'];
        const words = (name || 'untitled').toLowerCase().split(/[^a-z0-9]+/).filter(w => w);
        
        let mainNounIndex = -1;
        for (let i = words.length - 1; i >= 0; i--) {
          if (!leadingDescriptors.includes(words[i]) && !/^\d+$/.test(words[i])) {
            mainNounIndex = i;
            break;
          }
        }
        
        if (mainNounIndex === -1) {
          return words.join('-').substring(0, 80);
        }
        
        let nounStart = mainNounIndex;
        for (let i = mainNounIndex - 1; i >= 0; i--) {
          if (leadingDescriptors.includes(words[i]) || /^\d+$/.test(words[i])) {
            break;
          }
          nounStart = i;
        }
        
        const nounPhrase = words.slice(nounStart, mainNounIndex + 1);
        const beforeNoun = words.slice(0, nounStart);
        const afterNoun = words.slice(mainNounIndex + 1);
        const ordered = [...nounPhrase, ...beforeNoun, ...afterNoun];
        
        return ordered.join('-').substring(0, 80);
      }
      
      const slug = createSlug(item.name);
      const jsonPath = join(resourcesDir, `${slug}.json`);
      
      // Convert database item to JSON format
      const resourceJson = {
        id: item.id,
        title: item.name,
        name: item.name,
        type: item.type || 'tool',
        category: item.category || 'tool',
        description: item.notes || item.description || '',
        purpose: item.purpose || '',
        brand: item.brand || null,
        model: item.model || null,
        serialNumber: item.serial_number || null,
        purchaseDate: item.purchase_date || null,
        purchasePrice: item.purchase_price || null,
        msrp: item.msrp || null,
        dimensions: item.dimensions || null,
        weight: item.weight || null,
        capacity: item.capacity || null,
        compatibility: item.compatibility ? JSON.parse(item.compatibility) : null,
        useCases: item.use_cases ? JSON.parse(item.use_cases) : [],
        canProduceWith: item.can_produce_with ? JSON.parse(item.can_produce_with) : [],
        maintenanceSchedule: item.maintenance_schedule || null,
        lastMaintenance: item.last_maintenance || null,
        nextMaintenance: item.next_maintenance || null,
        maintenanceNotes: item.maintenance_notes || null,
        links: item.links ? JSON.parse(item.links) : [],
        status: item.status || 'available',
        tags: item.tags ? JSON.parse(item.tags) : [],
        lastUsed: item.last_used || null,
        outcomes: [],
        capabilities: [],
        abilities: [],
        specifications: {
          dimensions: item.dimensions || null,
          weight: item.weight || null,
          power: item.power || null,
          capacity: item.capacity || null,
          compatibility: item.compatibility ? JSON.parse(item.compatibility) : null
        },
        meta: {
          brand: item.brand || null,
          model: item.model || null,
          serialNumber: item.serial_number || null,
          purchaseDate: item.purchase_date || null,
          purchasePrice: item.purchase_price || null,
          msrp: item.msrp || null,
          location: item.spot || null,
          condition: mapStateToCondition(item.state),
          tags: item.tags ? JSON.parse(item.tags) : [],
          createdAt: item.created_at || new Date().toISOString(),
          updatedAt: item.updated_at || new Date().toISOString()
        }
      };
      
      // Auto-Born: Generate/Update RAG context for immediate learnability
      try {
        const ragContext = getRAGGenerator().generateResourceContext(resourceJson);
        resourceJson.rag = ragContext;
        console.log(`✅ Auto-Born RAG Context: ${item.name}`);
      } catch (ragError) {
        console.warn('RAG context generation failed:', ragError.message);
      }
      
      writeFileSync(jsonPath, JSON.stringify(resourceJson, null, 2), 'utf-8');
      console.log(`✅ Updated JSON: ${slug}.json`);
    } catch (jsonError) {
      console.warn('Could not update JSON file:', jsonError.message);
    }
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/inventory/:id - Delete item
app.delete('/api/inventory/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM inventory WHERE id = ?');
    const result = stmt.run(req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ success: true, id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/stats - Get inventory statistics
app.get('/api/stats', (req, res) => {
  try {
    const total = db.prepare('SELECT COUNT(*) as count FROM inventory').get();
    const byType = db.prepare(`
      SELECT type, COUNT(*) as count 
      FROM inventory 
      GROUP BY type 
      ORDER BY count DESC
    `).all();
    const byState = db.prepare(`
      SELECT state, COUNT(*) as count 
      FROM inventory 
      GROUP BY state 
      ORDER BY count DESC
    `).all();
    
    res.json({
      total: total.count,
      byType,
      byState
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Resource Card Generation API
// Resource cards are now in _shared (Multisite structure)
// JSON files go in content/resources/ folder

// POST /api/resource-cards/generate - Generate a single resource card
app.post('/api/resource-cards/generate', (req, res) => {
  try {
    const resource = req.body;
    if (!resource) {
      return res.status(400).json({ error: 'Resource data required' });
    }

    // Generate resource ID if missing
    const resourceId = resource.id || (resource.title || resource.name || 'untitled')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);

    // With DRY approach, we don't create individual HTML files
    // Instead, we use dynamic routing to serve the template
    // The template loads data from the API based on the slug
    
    res.json({ 
      success: true, 
      resourceId,
      path: `/pages/resource-cards/${resourceId}.html`
    });
  } catch (error) {
    console.error('Error generating resource card:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/resource-cards/generate-all - Generate cards for all inventory items
app.post('/api/resource-cards/generate-all', async (req, res) => {
  try {
    const items = db.prepare('SELECT * FROM inventory').all();
    const results = [];
    const errors = [];

    for (const item of items) {
      try {
        // With DRY approach, we don't create individual HTML files
        // The template is served dynamically via routing
        // Generate slug for the resource
        const leadingDescriptors = ['compact', 'cordless', 'brushless', 'single', 'double', 'portable', 'foldable', 'self', 'smart', 'professional', 'heavy', 'light', 'mini', 'micro', 'large', 'small', 'watering'];
        const words = (item.name || 'untitled').toLowerCase().split(/[^a-z0-9]+/).filter(w => w);
        
        // Find the LAST main noun
        let mainNounIndex = -1;
        for (let i = words.length - 1; i >= 0; i--) {
          if (!leadingDescriptors.includes(words[i]) && !/^\d+$/.test(words[i])) {
            mainNounIndex = i;
            break;
          }
        }
        
        let resourceId = 'untitled';
        if (mainNounIndex >= 0) {
          let nounStart = mainNounIndex;
          for (let i = mainNounIndex - 1; i >= 0; i--) {
            if (leadingDescriptors.includes(words[i]) || /^\d+$/.test(words[i])) {
              break;
            }
            nounStart = i;
          }
          const nounPhrase = words.slice(nounStart, mainNounIndex + 1);
          const beforeNoun = words.slice(0, nounStart);
          const afterNoun = words.slice(mainNounIndex + 1);
          const ordered = [...nounPhrase, ...beforeNoun, ...afterNoun];
          resourceId = ordered.join('-').substring(0, 80);
        } else {
          resourceId = words.join('-').substring(0, 80);
        }
        
        results.push({ resourceId, success: true, path: `/pages/resource-cards/${resourceId}.html` });
      } catch (error) {
        errors.push({ item: item.name, error: error.message });
      }
    }

    res.json({ 
      success: true, 
      generated: results.length,
      errors: errors.length,
      results,
      errors
    });
  } catch (error) {
    console.error('Error generating all resource cards:', error);
    res.status(500).json({ error: error.message });
  }
});

// Helper functions for resource card generation
function mapTypeToCategory(type) {
  const map = {
    'Drill / Driver': 'tool',
    'Miter Saw': 'tool',
    'Circular Saw': 'tool',
    'Jig Saw': 'tool',
    'Recip Saw': 'tool',
    'Sander': 'tool',
    'Rotary Tool': 'tool',
    'Hand Tool': 'tool',
    '3D Printer': 'equipment',
    'Scanner': 'equipment',
    'Network': 'equipment',
    'Solar / Power': 'equipment',
    'Photo / Video': 'equipment',
    'Garden': 'material',
    'Hardware': 'hardware',
    'Software': 'software',
    'Documentation': 'documentation'
  };
  return map[type] || 'other';
}

function mapStateToCondition(state) {
  const map = {
    'New': 'new',
    'Great': 'excellent',
    'Good': 'good',
    'Repair': 'needs-repair'
  };
  return map[state] || 'good';
}

function extractTagsFromNotes(notes) {
  if (!notes) return [];
  const tags = [];
  const text = notes.toLowerCase();
  if (/cordless|battery/i.test(text)) tags.push('cordless');
  if (/compact|portable/i.test(text)) tags.push('portable');
  if (/professional|pro/i.test(text)) tags.push('professional');
  return tags;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

// Helper: Get network IP addresses
function getNetworkIPs() {
  const interfaces = networkInterfaces();
  const ips = [];
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }
  
  return ips;
}

// Helper function to detect sites (must be defined before use)
function detectSites() {
  const sitesDir = join(__dirname, 'sites');
  const sites = [];
  
  if (!existsSync(sitesDir)) {
    return sites;
  }
  
  const entries = readdirSync(sitesDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
    if (entry.name === 'default') continue; // Skip default folder (it's the selector)
    
    const sitePath = join(sitesDir, entry.name);
    // Try new content/pages structure first, then legacy pages structure
    const hasIndex = existsSync(join(sitePath, 'content', 'pages', 'index.html')) || 
                   existsSync(join(sitePath, 'pages', 'index.html')) ||
                   existsSync(join(sitePath, 'index.html'));
    
    if (hasIndex) {
      const isSeedModel = entry.name.startsWith('_');
      sites.push({
        name: entry.name,
        path: sitePath,
        isSeedModel: isSeedModel
      });
    }
  }
  
  return sites;
}

// Detect operating system
function detectOS() {
  const platform = process.platform;
  if (platform === 'darwin') return { name: 'macOS', icon: '🍎', type: 'darwin' };
  if (platform === 'linux') return { name: 'Linux', icon: '🐧', type: 'linux' };
  if (platform === 'win32') return { name: 'Windows', icon: '🪟', type: 'windows' };
  return { name: platform, icon: '💻', type: 'unknown' };
}

const osInfo = detectOS();

// GET /api/health - Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    pid: process.pid,
    os: osInfo
  });
});

// GET /api/system - System information endpoint
app.get('/api/system', (req, res) => {
  res.json({
    os: osInfo,
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    uptime: process.uptime(),
    pid: process.pid,
    memory: process.memoryUsage()
  });
});

// GET /api/health/status - Get comprehensive server health status
app.get('/api/health/status', async (req, res) => {
  try {
    const monitor = getHealthMonitor();
    if (!monitor) {
      return res.status(503).json({
        success: false,
        error: 'Health Monitor not available',
        status: {
          timestamp: new Date().toISOString(),
          health: {
            overall: 'error',
            score: 0,
            message: 'Health Monitor not initialized'
          }
        }
      });
    }
    const status = await monitor.getServerStatus(sitesDir);
    res.json({
      success: true,
      status
    });
  } catch (error) {
    console.error('Error getting health status:', error);
    res.status(500).json({ 
      success: false,
      error: error.message,
      status: {
        timestamp: new Date().toISOString(),
        health: {
          overall: 'error',
          score: 0,
          message: `Error checking status: ${error.message}`
        }
      }
    });
  }
});

// POST /api/server/restart - Restart the server
app.post('/api/server/restart', (req, res) => {
  try {
    // Send response immediately before restarting
    res.json({ 
      success: true, 
      message: 'Server restart initiated',
      timestamp: new Date().toISOString()
    });
    
    // Flush response
    res.end();
    
    // Schedule restart after a short delay to ensure response is sent
    setTimeout(() => {
      console.log('🔄 Server restart requested via API...');
      gracefulRestart();
    }, 500);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

function gracefulRestart() {
  // Try multiple restart methods
  // Note: Using ES module imports (already imported at top of file)
  
  // Method 1: Write restart flag - go.sh monitor will detect and restart
  const restartFlag = join(__dirname, '.restart-flag');
  try {
    writeFileSync(restartFlag, Date.now().toString(), 'utf8');
    console.log('✅ Restart flag written, exiting...');
    
    // Exit gracefully - go.sh monitor will restart
    setTimeout(() => {
      process.exit(0);
    }, 500);
  } catch (err) {
    console.error('❌ Failed to write restart flag:', err);
    // Last resort: just exit
    setTimeout(() => process.exit(0), 500);
  }
}

// GET /api/sites - List all available sites
app.get('/api/sites', (req, res) => {
  try {
    const sites = detectSites();
    if (!Array.isArray(sites)) {
      console.error('❌ detectSites() did not return an array:', sites);
      return res.status(500).json({ error: 'Failed to detect sites' });
    }
    const sitesList = [];
    
    for (const site of sites) {
      // Count pages, service cards, and resource cards separately
      let pageCount = 0;
      let serviceCardCount = 0;
      let resourceCardCount = 0;
      
      // Count service cards from JSON files in content/services/{category}/
      const servicesDir = join(site.path, 'content', 'services');
      const servicesList = [];
      if (existsSync(servicesDir)) {
        try {
          function countServiceCards(dir, basePath = '') {
            let count = 0;
            const entries = readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
              const fullPath = join(dir, entry.name);
              const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
              if (entry.isDirectory()) {
                // Recursively count subdirectories (categories)
                count += countServiceCards(fullPath, relativePath);
              } else if (entry.isFile() && entry.name.endsWith('.json') && entry.name.startsWith('service-')) {
                count++;
                // Also collect the service path for the modal
                servicesList.push({
                  name: entry.name.replace('.json', '').replace(/^service-/, ''),
                  path: relativePath,
                  fullPath: fullPath,
                  category: basePath || 'root'
                });
              }
            }
            return count;
          }
          serviceCardCount = countServiceCards(servicesDir);
        } catch (e) {
          // Ignore errors
        }
      }
      
      // Count resource cards from JSON files in content/resources/{type}/
      // Resource files can be named resource-*.json or just *.json (any JSON file in resources subfolders)
      const resourcesDir = join(site.path, 'content', 'resources');
      const resourcesList = [];
      if (existsSync(resourcesDir)) {
        try {
          function countResourceCards(dir, basePath = '') {
            let count = 0;
            const entries = readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
              const fullPath = join(dir, entry.name);
              const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
              if (entry.isDirectory()) {
                // Recursively count subdirectories (types: tool, equipment, material, document, other)
                count += countResourceCards(fullPath, relativePath);
              } else if (entry.isFile() && entry.name.endsWith('.json')) {
                // Count all JSON files in resources subfolders (they can be named anything)
                // Exclude template files if they exist
                if (entry.name !== 'template.json' && entry.name !== 'resource-template.json') {
                  count++;
                  // Also collect the resource path for the modal
                  resourcesList.push({
                    name: entry.name.replace('.json', '').replace(/^resource-/, ''),
                    path: relativePath,
                    fullPath: fullPath,
                    type: basePath || 'other'
                  });
                }
              }
            }
            return count;
          }
          resourceCardCount = countResourceCards(resourcesDir);
        } catch (e) {
          // Ignore errors
        }
      }
      
      // Count schemas from JSON files in schemas/ or content/schemas/
      let schemaCount = 0;
      const schemasList = [];
      const schemasDir = join(site.path, 'schemas');
      const contentSchemasDir = join(site.path, 'content', 'schemas');
      const actualSchemasDir = existsSync(contentSchemasDir) ? contentSchemasDir : (existsSync(schemasDir) ? schemasDir : null);
      
      if (actualSchemasDir) {
        try {
          function collectSchemas(dir, basePath = '') {
            const entries = readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
              const fullPath = join(dir, entry.name);
              const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
              
              if (entry.isDirectory()) {
                collectSchemas(fullPath, relativePath);
              } else if (entry.isFile() && entry.name.endsWith('.json')) {
                // Exclude template and example files
                if (!entry.name.includes('template') && !entry.name.includes('example')) {
                  schemaCount++;
                  schemasList.push({
                    name: entry.name.replace('.json', ''),
                    path: relativePath,
                    fullPath: fullPath
                  });
                }
              }
            }
          }
          collectSchemas(actualSchemasDir);
        } catch (e) {
          // Ignore errors
        }
      }
      
      // Count regular pages from HTML files in content/pages or pages/
      // Try new content/pages structure first, then legacy pages structure
      const contentPagesDir = join(site.path, 'content', 'pages');
      const legacyPagesDir = join(site.path, 'pages');
      const pagesDir = existsSync(contentPagesDir) ? contentPagesDir : legacyPagesDir;
      const pagesList = [];
      
      if (existsSync(pagesDir)) {
        try {
          // Count all HTML files recursively, excluding service-cards and resource-cards folders
          function countHTMLFiles(dir, basePath = '') {
            let count = 0;
            const entries = readdirSync(dir, { withFileTypes: true });
            
            for (const entry of entries) {
              const fullPath = join(dir, entry.name);
              const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
              
              if (entry.isDirectory()) {
                // Skip service-cards and resource-cards directories (these are now JSON-based)
                if (!relativePath.includes('service-cards/') && !relativePath.includes('resource-cards/')) {
                  // Recursively count subdirectories
                  count += countHTMLFiles(fullPath, relativePath);
                }
              } else if (entry.isFile() && entry.name.endsWith('.html')) {
                // Exclude template files
                if (entry.name !== 'service-card.html' && entry.name !== 'resource-card.html' && entry.name !== 'template.html') {
                  count++;
                  // Also collect the page path for the modal
                  const pagePath = basePath ? `${basePath}/${entry.name}` : entry.name;
                  pagesList.push({
                    name: entry.name.replace('.html', ''),
                    path: pagePath,
                    fullPath: fullPath
                  });
                }
              }
            }
            
            return count;
          }
          
          pageCount = countHTMLFiles(pagesDir);
        } catch (e) {
          // Ignore errors
        }
      }
      
      // Try to read site config for description and type
      let description = null;
      let siteType = 'BIS'; // Default to Business Identity Shaper
      try {
        const configPath = join(site.path, 'config.json');
        if (existsSync(configPath)) {
          const config = JSON.parse(readFileSync(configPath, 'utf8'));
          description = config.site?.description || null;
          // Detect site type from config or folder structure
          siteType = config.site?.type || 
                     config.framework?.type ||
                     (existsSync(join(site.path, 'package.json')) ? 'App' : 'BIS'); // Check for package.json (TSX/React app)
          // Check for dashboard indicators
          if (existsSync(join(site.path, 'dashboard')) || 
              existsSync(join(site.path, 'dashboards')) ||
              config.site?.type === 'Dashboard') {
            siteType = 'Dashboard';
          }
          // Check for app indicators (TypeScript/React)
          if (existsSync(join(site.path, 'src')) && 
              (existsSync(join(site.path, 'tsconfig.json')) || 
               existsSync(join(site.path, 'package.json')))) {
            siteType = 'App';
          }
        }
      } catch (e) {
        // Ignore errors
      }
      
      // Build description with breakdown
      const totalPages = pageCount + serviceCardCount + resourceCardCount;
      let pageBreakdown = [];
      if (pageCount > 0) pageBreakdown.push(`${pageCount} page${pageCount !== 1 ? 's' : ''}`);
      if (serviceCardCount > 0) pageBreakdown.push(`${serviceCardCount} service card${serviceCardCount !== 1 ? 's' : ''}`);
      if (resourceCardCount > 0) pageBreakdown.push(`${resourceCardCount} resource card${resourceCardCount !== 1 ? 's' : ''}`);
      
      const breakdownText = pageBreakdown.length > 0 ? ` (${pageBreakdown.join(', ')})` : '';
      
      const isSeedModel = site.isSeedModel || false;
      const displayName = isSeedModel ? site.name.replace(/^_/, '') : site.name;
      
      sitesList.push({
        name: site.name,
        displayName: displayName,
        isSeedModel: isSeedModel,
        siteType: siteType || 'BIS',
        default: site.name === 'learnmappers',
        pages: totalPages,
        pagesBreakdown: {
          pages: pageCount,
          serviceCards: serviceCardCount,
          resourceCards: resourceCardCount
        },
        pagesList: pagesList, // List of all page paths
        servicesList: servicesList, // List of all service paths
        resourcesList: resourcesList, // List of all resource paths
        schemas: schemaCount,
        schemasList: schemasList,
        description: description || (isSeedModel ? `Seed Model: Clone this to create a new Business Identity Shaper site` : `Site with ${totalPages} page${totalPages !== 1 ? 's' : ''}${breakdownText}`)
      });
    }
    
    // Sort: default first, then seed models, then alphabetically
    sitesList.sort((a, b) => {
      if (a.default) return -1;
      if (b.default) return 1;
      if (a.isSeedModel && !b.isSeedModel) return -1;
      if (!a.isSeedModel && b.isSeedModel) return 1;
      return a.name.localeCompare(b.name);
    });
    
    res.json({ 
      sites: sitesList,
      access: getAccessInfo(),
      count: sitesList.length
    });
  } catch (error) {
    console.error('❌ Error in /api/sites:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Store current server port (will be set when server starts)
let currentPort = DEFAULT_PORT;
let currentHttpPort = DEFAULT_HTTP_PORT;

// Helper: Get access information
function getAccessInfo() {
  const protocol = USE_HTTPS ? 'https' : 'http';
  const httpsPort = currentPort;
  const httpPort = currentHttpPort;
  const networkIPs = getNetworkIPs();
  const hostname = process.env.HOSTNAME || process.env.DOMAIN || null;
  
  const access = {
    local: {
      http: `http://localhost:${httpPort}`,
      https: USE_HTTPS ? `https://localhost:${httpsPort}` : null
    },
    network: networkIPs.map(ip => ({
      ip,
      http: `http://${ip}:${httpPort}`,
      https: USE_HTTPS ? `https://${ip}:${httpsPort}` : null
    })),
    dns: hostname ? {
      hostname,
      http: `http://${hostname}:${httpPort}`,
      https: USE_HTTPS ? `https://${hostname}:${httpsPort}` : null
    } : null
  };
  
  return access;
}

// Root route: handle site detection and routing
app.get('/', (req, res) => {
  const sites = detectSites();
  const siteCount = sites.length;
  
  // No sites detected - show helpful info page
  if (siteCount === 0) {
    // Try new content/pages structure first, then legacy
    const noSitesPath = existsSync(join(__dirname, 'sites', 'default', 'content', 'pages', 'index.html')) 
                      ? join(__dirname, 'sites', 'default', 'content', 'pages', 'index.html')
                      : join(__dirname, 'sites', 'default', 'pages', 'index.html');
    if (existsSync(noSitesPath)) {
      return res.sendFile(noSitesPath);
    }
    // Fallback HTML if selector page doesn't exist
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>No Sites Detected - LearnMappers Server</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
          h1 { color: #333; }
          .info { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
          code { background: #e8e8e8; padding: 2px 6px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>🚀 LearnMappers Server</h1>
        <div class="info">
          <h2>No Sites Detected</h2>
          <p>No sites were found in the <code>sites/</code> directory.</p>
          <h3>To add a site:</h3>
          <ol>
            <li>Create a folder in <code>sites/</code> (e.g., <code>sites/my-site/</code>)</li>
            <li>Add your site files:
              <ul>
                <li><code>content/pages/index.html</code> - Main page (recommended)</li>
                <li>OR <code>pages/index.html</code> - Legacy location</li>
                <li>OR <code>index.html</code> - Root index file</li>
              </ul>
            </li>
            <li>Restart the server</li>
          </ol>
          <p><strong>Example structure:</strong></p>
          <pre><code>sites/
  my-site/
    content/
      pages/
        index.html
      resources/
    config.json</code></pre>
        </div>
      </body>
      </html>
    `);
  }
  
  // Single site detected - auto-launch (redirect to that site)
  if (siteCount === 1) {
    const site = sites[0];
    // Try new content/pages structure first, then legacy
    const contentIndexPath = join(site.path, 'content', 'pages', 'index.html');
    const legacyIndexPath = join(site.path, 'pages', 'index.html');
    const rootIndex = join(site.path, 'index.html');
    
    if (existsSync(contentIndexPath)) {
      return res.sendFile(contentIndexPath);
    } else if (existsSync(legacyIndexPath)) {
      return res.sendFile(legacyIndexPath);
    } else if (existsSync(rootIndex)) {
      return res.sendFile(rootIndex);
    }
  }
  
  // Multiple sites detected - show selector
  if (siteCount > 1) {
    const contentSelectorPath = join(__dirname, 'sites', 'default', 'content', 'pages', 'index.html');
    const legacySelectorPath = join(__dirname, 'sites', 'default', 'pages', 'index.html');
    if (existsSync(contentSelectorPath)) {
      return res.sendFile(contentSelectorPath);
    } else if (existsSync(legacySelectorPath)) {
      return res.sendFile(legacySelectorPath);
    }
  }
  
  // Fallback: serve the configured default site
  const contentIndexPath = join(sitePath, 'content', 'pages', 'index.html');
  const legacyIndexPath = join(sitePath, 'pages', 'index.html');
  const rootIndex = join(sitePath, 'index.html');
  
  if (existsSync(contentIndexPath)) {
    return res.sendFile(contentIndexPath);
  } else if (existsSync(legacyIndexPath)) {
    return res.sendFile(legacyIndexPath);
  } else if (existsSync(rootIndex)) {
    return res.sendFile(rootIndex);
  }
  
  res.status(404).send('Site not found');
});

// Serve sites from /sites/:siteName paths
// Dynamic routing for service cards: /pages/service-cards/{service-id}.html (Multisite structure)
// This MUST come BEFORE the catch-all /sites/:siteName/* route
// Handles both /sites/{site}/pages/service-cards/{id}.html and /pages/service-cards/{id}.html
app.get('/sites/:siteName/pages/service-cards/:serviceId.html', (req, res) => {
  const serviceId = req.params.serviceId;
  const siteName = req.params.siteName;
  
  // Try learnmappers template first (shared templates)
  const sharedPath = join(__dirname, 'sites', 'learnmappers', 'pages', 'service-cards', 'service-card.html');
  const sharedPathFallback = join(__dirname, 'sites', 'learnmappers', 'pages', 'service-cards', `${serviceId}.html`);
  // Try content/pages/ first (new structure), then pages/ (legacy)
  const contentPath = join(__dirname, 'sites', siteName, 'content', 'pages', 'service-cards', 'service-card.html');
  const sitePath = join(__dirname, 'sites', siteName, 'pages', 'service-cards', 'service-card.html');
  
  if (existsSync(sharedPath)) {
    res.sendFile(sharedPath);
  } else if (existsSync(sharedPathFallback)) {
    // Fallback to service-specific file if unified template doesn't exist
    res.sendFile(sharedPathFallback);
  } else if (existsSync(contentPath)) {
    // New content/pages/ structure
    res.sendFile(contentPath);
  } else if (existsSync(sitePath)) {
    // Fallback to legacy pages/ structure (backward compatibility)
    res.sendFile(sitePath);
  } else {
    res.status(404).send('Service card template not found');
  }
});

// Also handle paths without /sites/ prefix (for default site)
app.get('/pages/service-cards/:serviceId.html', (req, res) => {
  const serviceId = req.params.serviceId;
  let siteName = SITE_DIR.replace('sites/', ''); // Use configured site
  
  // Try learnmappers template first (shared templates)
  const sharedPath = join(__dirname, 'sites', 'learnmappers', 'pages', 'service-cards', 'service-card.html');
  const sharedPathFallback = join(__dirname, 'sites', 'learnmappers', 'pages', 'service-cards', `${serviceId}.html`);
  // Try content/pages/ first (new structure), then pages/ (legacy)
  const contentPath = join(__dirname, 'sites', siteName, 'content', 'pages', 'service-cards', 'service-card.html');
  const sitePath = join(__dirname, 'sites', siteName, 'pages', 'service-cards', 'service-card.html');
  
  if (existsSync(sharedPath)) {
    res.sendFile(sharedPath);
  } else if (existsSync(sharedPathFallback)) {
    res.sendFile(sharedPathFallback);
  } else if (existsSync(contentPath)) {
    res.sendFile(contentPath);
  } else if (existsSync(sitePath)) {
    res.sendFile(sitePath);
  } else {
    res.status(404).send('Service card template not found');
  }
});

app.get('/sites/:siteName/*', (req, res) => {
  try {
    const siteName = req.params.siteName;
    const sitePath = join(__dirname, 'sites', siteName);
    
    // Security: prevent directory traversal
    if (!sitePath.startsWith(join(__dirname, 'sites'))) {
      return res.status(403).send('Forbidden');
    }
    
    // Check if site directory exists
    if (!existsSync(sitePath)) {
      return res.status(404).send('Site not found');
    }
    
    // Try new content/pages structure first, then legacy
    const defaultPath = req.params[0] || 'content/pages/index.html';
    const legacyDefaultPath = req.params[0] || 'pages/index.html';
    let filePath = join(sitePath, defaultPath);
    
    // If new path doesn't exist, try legacy
    if (!existsSync(filePath) && defaultPath.includes('content/pages')) {
      filePath = join(sitePath, legacyDefaultPath);
    }
    
    // Security: prevent directory traversal
    if (!filePath.startsWith(sitePath)) {
      return res.status(403).send('Forbidden');
    }
    
    if (existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    console.error('❌ Error serving site file:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve resource JSON files: /content/resources/{slug}.json (Multisite structure)
// Also handles /sites/{siteName}/content/resources/{slug}.json
// Unified site: checks both HQDEV and FOADMIN for resources
app.get('*/content/resources/:slug.json', (req, res) => {
  const slug = req.params.slug;
  
  // Find which site this request is for
  let siteName = SITE_DIR.replace('sites/', '');
  const pathParts = req.path.split('/').filter(p => p);
  const sitesIndex = pathParts.indexOf('sites');
  if (sitesIndex >= 0 && pathParts[sitesIndex + 1]) {
    siteName = pathParts[sitesIndex + 1];
  }
  
  // Search in subfolders (tool/, equipment/, material/, document/, other/)
  const resourcesDir = join(__dirname, 'sites', siteName, 'content', 'resources');
  const resourceTypes = ['tool', 'equipment', 'material', 'document', 'other'];
  
  // Try each type subfolder
  for (const type of resourceTypes) {
    const typePath = join(resourcesDir, type, `${slug}.json`);
    if (existsSync(typePath)) {
      res.setHeader('Content-Type', 'application/json');
      res.sendFile(typePath);
      return;
    }
  }
  
  // Fallback: check root of resources directory (backward compatibility)
  const jsonPath = join(resourcesDir, `${slug}.json`);
  if (existsSync(jsonPath)) {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(jsonPath);
    return;
  }
  
  // Try legacy data/resources/ path
  const fallbackPath = join(__dirname, 'sites', siteName, 'data', 'resources', `${slug}.json`);
  if (existsSync(fallbackPath)) {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(fallbackPath);
    return;
  }
  
  // Unified site: also check learnmappers site (with subfolders)
  const unifiedResourcesDir = join(__dirname, 'sites', 'learnmappers', 'content', 'resources');
  for (const type of resourceTypes) {
    const unifiedTypePath = join(unifiedResourcesDir, type, `${slug}.json`);
    if (existsSync(unifiedTypePath)) {
      res.setHeader('Content-Type', 'application/json');
      res.sendFile(unifiedTypePath);
      return;
    }
  }
  
  // Fallback: unified root
  const unifiedPath = join(unifiedResourcesDir, `${slug}.json`);
  if (existsSync(unifiedPath)) {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(unifiedPath);
    return;
  }
  
  res.status(404).json({ error: 'Resource JSON file not found' });
});

// Legacy endpoint: /data/resources/{slug}.json (backward compatibility)
app.get('*/data/resources/:slug.json', (req, res) => {
  const slug = req.params.slug;
  let siteName = SITE_DIR.replace('sites/', '');
  const pathParts = req.path.split('/').filter(p => p);
  const sitesIndex = pathParts.indexOf('sites');
  if (sitesIndex >= 0 && pathParts[sitesIndex + 1]) {
    siteName = pathParts[sitesIndex + 1];
  }
  
  // Try new content folder first
  const contentPath = join(__dirname, 'sites', siteName, 'content', 'resources', `${slug}.json`);
  const dataPath = join(__dirname, 'sites', siteName, 'data', 'resources', `${slug}.json`);
  
  if (existsSync(contentPath)) {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(contentPath);
  } else if (existsSync(dataPath)) {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(dataPath);
  } else {
    res.status(404).json({ error: 'Resource JSON file not found' });
  }
});

// Dynamic routing for resource cards: /pages/resource-cards/{slug}.html (Multisite structure)
// This serves the shared template for any resource card slug (DRY approach)
// Handles both /pages/resource-cards/{slug}.html and /sites/{site}/pages/resource-cards/{slug}.html
app.get('*/pages/resource-cards/:slug.html', (req, res) => {
  const slug = req.params.slug;
  
  // Find which site this request is for by checking the path
  let siteName = SITE_DIR.replace('sites/', ''); // Use configured site
  const pathParts = req.path.split('/').filter(p => p);
  const sitesIndex = pathParts.indexOf('sites');
  if (sitesIndex >= 0 && pathParts[sitesIndex + 1]) {
    siteName = pathParts[sitesIndex + 1];
  }
  
  // Try learnmappers template first (shared templates)
  const sharedPath = join(__dirname, 'sites', 'learnmappers', 'pages', 'resource-cards', 'resource-card.html');
  // Try content/pages/ first (new structure), then pages/ (legacy)
  const contentPath = join(__dirname, 'sites', siteName, 'content', 'pages', 'resource-cards', 'resource-card.html');
  const sitePath = join(__dirname, 'sites', siteName, 'pages', 'resource-cards', 'resource-card.html');
  
  if (existsSync(sharedPath)) {
    res.sendFile(sharedPath);
  } else if (existsSync(contentPath)) {
    // New content/pages/ structure
    res.sendFile(contentPath);
  } else if (existsSync(sitePath)) {
    // Fallback to legacy pages/ structure (backward compatibility)
    res.sendFile(sitePath);
  } else {
    res.status(404).send('Resource card template not found');
  }
});


// Test deployment connection
app.post('/api/deployment/test', async (req, res) => {
  try {
    const deploymentConfig = req.body;
    const result = await testConnection(deploymentConfig);
    res.json(result);
  } catch (error) {
    console.error('Deployment test error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Deploy site to remote
app.post('/api/deployment/deploy', async (req, res) => {
  try {
    const deploymentConfig = req.body;
    const siteName = req.query.site || 'default';
    const sitePath = join(sitesDir, siteName);
    
    if (!existsSync(sitePath)) {
      return res.status(404).json({ success: false, error: 'Site not found' });
    }

    const result = await deploySite(deploymentConfig, sitePath);
    res.json(result);
  } catch (error) {
    console.error('Deployment error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get remote site stats
app.get('/api/deployment/stats', async (req, res) => {
  try {
    const deploymentConfig = req.body; // Should come from site config
    const result = await getRemoteStats(deploymentConfig);
    res.json(result);
  } catch (error) {
    console.error('Remote stats error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Config API endpoint - Save config.json (site-specific)
app.post('/api/config', (req, res) => {
  try {
    const newConfig = req.body;
    
    // Detect site name from request (query param, header, or referer)
    let siteName = req.query.site || req.headers['x-site-name'];
    if (!siteName && req.headers.referer) {
      // Extract site name from referer URL (e.g., /sites/learnmappers/...)
      const refererMatch = req.headers.referer.match(/\/sites\/([^\/]+)/);
      if (refererMatch) {
        siteName = refererMatch[1];
      }
    }
    
    // Determine config path based on site name
    let configPath;
    if (siteName && siteName !== 'default') {
      // Site-specific config
      configPath = join(__dirname, 'sites', siteName, 'config.json');
    } else {
      // Default to current sitePath (for backward compatibility)
      configPath = join(sitePath, 'config.json');
    }
    
    // Validate JSON structure
    if (!newConfig.site || !newConfig.navigation) {
      return res.status(400).json({ error: 'Invalid config structure' });
    }
    
    // Write to config.json
    writeFileSync(configPath, JSON.stringify(newConfig, null, 2), 'utf-8');
    
    res.json({ success: true, message: 'Configuration saved successfully', site: siteName || 'default' });
  } catch (error) {
    console.error('Error saving config:', error);
    res.status(500).json({ error: error.message });
  }
});

// Config API endpoint - Get config.json (site-specific)
app.get('/api/config', (req, res) => {
  try {
    // Detect site name from request
    let siteName = req.query.site || req.headers['x-site-name'];
    if (!siteName && req.headers.referer) {
      const refererMatch = req.headers.referer.match(/\/sites\/([^\/]+)/);
      if (refererMatch) {
        siteName = refererMatch[1];
      }
    }
    
    // Determine config path based on site name
    let configPath;
    if (siteName && siteName !== 'default') {
      configPath = join(__dirname, 'sites', siteName, 'config.json');
    } else {
      configPath = join(sitePath, 'config.json');
    }
    
    if (!existsSync(configPath)) {
      return res.status(404).json({ error: 'Config file not found' });
    }
    
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    res.json(config);
  } catch (error) {
    console.error('Error loading config:', error);
    res.status(500).json({ error: error.message });
  }
});

// Server Config API endpoints - Get server configuration
app.get('/api/server/config', (req, res) => {
  try {
    const serverConfigPath = join(__dirname, 'server-config.json');
    let serverConfig = {};
    
    if (existsSync(serverConfigPath)) {
      const configData = readFileSync(serverConfigPath, 'utf-8');
      serverConfig = JSON.parse(configData);
    } else {
      // Return default config
      serverConfig = {
        ports: {
          https: DEFAULT_PORT,
          http: DEFAULT_HTTP_PORT
        },
        ssl: {
          enabled: USE_HTTPS,
          certPath: './certs/cert.pem',
          keyPath: './certs/key.pem'
        },
        sites: {
          defaultDir: SITE_DIR,
          rootDir: 'sites'
        },
        network: {
          hostname: process.env.HOSTNAME || process.env.DOMAIN || null,
          autoDetectIP: true
        },
        autoHeal: {
          enabled: true,
          healthCheckInterval: 30,
          maxRestartAttempts: 5
        },
        environment: {
          nodeEnv: process.env.NODE_ENV || 'production',
          logLevel: 'info'
        }
      };
    }
    
    res.json(serverConfig);
  } catch (error) {
    console.error('Error loading server config:', error);
    res.status(500).json({ error: error.message });
  }
});

// Server Config API endpoints - Save server configuration
app.post('/api/server/config', (req, res) => {
  try {
    const newConfig = req.body;
    const serverConfigPath = join(__dirname, 'server-config.json');
    
    // Validate JSON structure
    if (!newConfig.ports || !newConfig.ssl || !newConfig.sites) {
      return res.status(400).json({ error: 'Invalid server config structure' });
    }
    
    // Write to server-config.json
    writeFileSync(serverConfigPath, JSON.stringify(newConfig, null, 2), 'utf-8');
    
    res.json({ success: true, message: 'Server configuration saved successfully. Note: Server restart required for some changes to take effect.' });
  } catch (error) {
    console.error('Error saving server config:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve settings.html - route to appropriate settings page based on context
app.get('/settings.html', (req, res) => {
  // When accessing from root (server page), serve Server App settings
  const defaultSettings = join(__dirname, 'sites', 'default', 'pages', 'settings.html');
  const defaultContentSettings = join(__dirname, 'sites', 'default', 'content', 'pages', 'settings.html');
  
  if (existsSync(defaultSettings)) {
    res.sendFile(defaultSettings);
    return;
  }
  if (existsSync(defaultContentSettings)) {
    res.sendFile(defaultContentSettings);
    return;
  }
  
  res.status(404).send('Server settings page not found');
});

// Serve site-specific settings from /sites/[site-name]/settings.html
app.get('/sites/:siteName/settings.html', (req, res) => {
  const siteName = req.params.siteName;
  const siteDir = join(__dirname, 'sites', siteName);
  
  // Priority: content/pages/settings.html > pages/settings.html
  const contentSettings = join(siteDir, 'content', 'pages', 'settings.html');
  const legacySettings = join(siteDir, 'pages', 'settings.html');
  
  if (existsSync(contentSettings)) {
    res.sendFile(contentSettings);
  } else if (existsSync(legacySettings)) {
    res.sendFile(legacySettings);
  } else {
    res.status(404).send(`Settings page not found for site: ${siteName}`);
  }
});

// Also handle /sites/[site-name]/content/pages/settings.html explicitly
app.get('/sites/:siteName/content/pages/settings.html', (req, res) => {
  const siteName = req.params.siteName;
  const settingsPath = join(__dirname, 'sites', siteName, 'content', 'pages', 'settings.html');
  
  if (existsSync(settingsPath)) {
    res.sendFile(settingsPath);
  } else {
    res.status(404).send(`Settings page not found for site: ${siteName}`);
  }
});

// Serve specific HTML pages from content/pages/ or pages/ or root
app.get('*.html', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/sites/')) {
    return next(); // Let other routes handle these
  }
  
  // Extract filename from path (e.g., /inventory.html -> inventory.html)
  const filename = req.path.split('/').pop();
  
  // Try new content/pages structure first, then legacy, then root
  const contentPagesFile = join(sitePath, 'content', 'pages', filename);
  const legacyPagesFile = join(sitePath, 'pages', filename);
  const rootFile = join(sitePath, filename);
  
  if (existsSync(contentPagesFile)) {
    res.sendFile(contentPagesFile);
  } else if (existsSync(legacyPagesFile)) {
    res.sendFile(legacyPagesFile);
  } else if (existsSync(rootFile)) {
    res.sendFile(rootFile);
  } else {
    // File not found - continue to next route
    next();
  }
});

// Fallback: serve index.html for SPA routing
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api') && !req.path.startsWith('/sites/') && !req.path.endsWith('.html')) {
    // Try new content/pages structure first, then legacy, then root
    const contentPagesIndex = join(sitePath, 'content', 'pages', 'index.html');
    const legacyPagesIndex = join(sitePath, 'pages', 'index.html');
    const rootIndex = join(sitePath, 'index.html');
    
    if (existsSync(contentPagesIndex)) {
      res.sendFile(contentPagesIndex);
    } else if (existsSync(legacyPagesIndex)) {
      res.sendFile(legacyPagesIndex);
    } else if (existsSync(rootIndex)) {
      res.sendFile(rootIndex);
    } else {
      res.status(404).send('Not found');
    }
  } else if (!req.path.startsWith('/api') && !req.path.startsWith('/sites/') && req.path.endsWith('.html')) {
    // HTML file not found - 404
    res.status(404).send('Page not found');
  }
});

// Create data directory if it doesn't exist
// mkdirSync, accessSync, constants are already imported above
try {
  mkdirSync(join(__dirname, 'data'), { recursive: true });
} catch (e) {}

// Verify site directory exists
try {
  accessSync(sitePath, constants.F_OK);
} catch (e) {
  console.error(`❌ Site directory not found: ${sitePath}`);
  console.error(`   Available options:`);
  console.error(`   - Create directory: mkdir -p ${SITE_DIR}`);
  console.error(`   - Use different site: SITE_DIR=sites/other-site node server.js`);
  console.error(`   - Or: node server.js sites/other-site`);
  process.exit(1);
}

// Start server
async function startServer() {
  const localIP = getLocalIP();
  
  // Add error handlers
  process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    console.error(err.stack);
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    // Don't exit on unhandled rejection, just log it
  });
  
  if (USE_HTTPS) {
    // Try to load SSL certificates
    try {
      const certPath = join(__dirname, 'localhost+3.pem');
      const keyPath = join(__dirname, 'localhost+3-key.pem');
      
      // Check if certificates exist before trying to read
      if (!existsSync(certPath) || !existsSync(keyPath)) {
        throw new Error(`SSL certificates not found: ${certPath} or ${keyPath}`);
      }
      
      console.log('📜 Loading SSL certificates...');
      const cert = readFileSync(certPath);
      const key = readFileSync(keyPath);
      console.log('✓ SSL certificates loaded');
      
      // Find available port BEFORE creating server
      console.log('🔍 Checking port availability...');
      let PORT = await findAvailablePort(DEFAULT_PORT);
      if (PORT !== DEFAULT_PORT) {
        console.log(`⚠️  Port ${DEFAULT_PORT} is in use, using port ${PORT} instead`);
      }
      
      console.log(`🚀 Starting HTTPS server on port ${PORT}...`);
      const httpsServer = createServer({ cert, key }, app);
      
      // Add timeout to prevent indefinite hanging
      const startupTimeout = setTimeout(() => {
        console.error('❌ Server startup timeout - taking too long to bind to port');
        console.log('⚠️  Falling back to HTTP server...');
        httpsServer.close();
        startHttpServer();
      }, 10000); // 10 second timeout
      
      httpsServer.once('listening', () => {
        clearTimeout(startupTimeout);
        currentPort = PORT; // Store the actual port being used
        const protocol = 'https';
        console.log(`\n${'='.repeat(60)}`);
        console.log(`LearnMappers PWA - Node.js Backend (HTTPS)`);
        console.log(`${'='.repeat(60)}`);
        console.log(`Site:     ${SITE_DIR}`);
        console.log(`Local:    ${protocol}://localhost:${PORT}`);
        console.log(`Network:  ${protocol}://${localIP}:${PORT}`);
        console.log(`API:      ${protocol}://localhost:${PORT}/api`);
        console.log(`${'='.repeat(60)}\n`);
      });
      
      httpsServer.once('error', async (err) => {
        clearTimeout(startupTimeout);
        if (err.code === 'EADDRINUSE') {
          console.log(`   Port ${PORT} became unavailable, finding next port...`);
          const nextPort = await findAvailablePort(PORT + 1, 5);
          if (nextPort !== PORT) {
            console.log(`   Using port ${nextPort} instead`);
            PORT = nextPort;
            // Create new server instance for new port
            const newServer = createServer({ cert, key }, app);
            newServer.once('listening', () => {
              currentPort = PORT; // Store the actual port being used
              const protocol = 'https';
              console.log(`\n${'='.repeat(60)}`);
              console.log(`LearnMappers PWA - Node.js Backend (HTTPS)`);
              console.log(`${'='.repeat(60)}`);
              console.log(`Site:     ${SITE_DIR}`);
              console.log(`Local:    ${protocol}://localhost:${PORT}`);
              console.log(`Network:  ${protocol}://${localIP}:${PORT}`);
              console.log(`API:      ${protocol}://localhost:${PORT}/api`);
              console.log(`${'='.repeat(60)}\n`);
            });
            newServer.once('error', (e) => {
              console.error('❌ Failed to start HTTPS server on alternate port:', e.message);
              console.log('⚠️  Falling back to HTTP server...');
              startHttpServer();
            });
            newServer.listen(PORT, '0.0.0.0');
          } else {
            console.error('❌ Could not find available port, falling back to HTTP...');
            startHttpServer();
          }
        } else {
          console.error('❌ HTTPS Server Error:', err.message);
          console.log('⚠️  Falling back to HTTP server...');
          startHttpServer();
        }
      });
      
      httpsServer.listen(PORT, '0.0.0.0');
    } catch (e) {
      console.log('⚠️  SSL certificates not found or error loading, starting HTTP server');
      console.error('Error:', e.message);
      startHttpServer();
    }
  } else {
    startHttpServer();
  }
}

async function startHttpServer() {
  const localIP = getLocalIP();
  
  console.log('🔍 Checking HTTP port availability...');
  // Find available port BEFORE creating server
  let HTTP_PORT = await findAvailablePort(DEFAULT_HTTP_PORT);
  if (HTTP_PORT !== DEFAULT_HTTP_PORT) {
    console.log(`⚠️  Port ${DEFAULT_HTTP_PORT} is in use, using port ${HTTP_PORT} instead`);
  }
  
  console.log(`🚀 Starting HTTP server on port ${HTTP_PORT}...`);
  
  const httpServer = createHttpServer(app);
  
  // Add timeout to prevent indefinite hanging
  const startupTimeout = setTimeout(() => {
    console.error('❌ HTTP Server startup timeout - taking too long to bind to port');
    console.error('❌ Server failed to start');
    process.exit(1);
  }, 10000); // 10 second timeout
  
  httpServer.once('listening', () => {
    clearTimeout(startupTimeout);
    currentHttpPort = HTTP_PORT; // Store the actual port being used
    const protocol = 'http';
    console.log(`\n${'='.repeat(60)}`);
    console.log(`LearnMappers PWA - Node.js Backend (HTTP)`);
    console.log(`${'='.repeat(60)}`);
    console.log(`Site:     ${SITE_DIR}`);
    console.log(`Local:    ${protocol}://localhost:${HTTP_PORT}`);
    console.log(`Network:  ${protocol}://${localIP}:${HTTP_PORT}`);
    console.log(`API:      ${protocol}://localhost:${HTTP_PORT}/api`);
    console.log(`${'='.repeat(60)}\n`);
  });
  
  httpServer.once('error', async (err) => {
    clearTimeout(startupTimeout);
    if (err.code === 'EADDRINUSE') {
      console.log(`   Port ${HTTP_PORT} became unavailable, finding next port...`);
      const nextPort = await findAvailablePort(HTTP_PORT + 1, 5);
      if (nextPort !== HTTP_PORT) {
        console.log(`   Using port ${nextPort} instead`);
        HTTP_PORT = nextPort;
        // Create new server instance for new port
        const newServer = createHttpServer(app);
        newServer.once('listening', () => {
          currentHttpPort = HTTP_PORT; // Store the actual port being used
          const protocol = 'http';
          console.log(`\n${'='.repeat(60)}`);
          console.log(`LearnMappers PWA - Node.js Backend (HTTP)`);
          console.log(`${'='.repeat(60)}`);
          console.log(`Site:     ${SITE_DIR}`);
          console.log(`Local:    ${protocol}://localhost:${HTTP_PORT}`);
          console.log(`Network:  ${protocol}://${localIP}:${HTTP_PORT}`);
          console.log(`API:      ${protocol}://localhost:${HTTP_PORT}/api`);
          console.log(`${'='.repeat(60)}\n`);
        });
        newServer.once('error', (e) => {
          console.error('❌ Failed to start HTTP server:', e.message);
          process.exit(1);
        });
        newServer.listen(HTTP_PORT, '0.0.0.0');
      } else {
        console.error('❌ Could not find available port');
        process.exit(1);
      }
    } else {
      console.error('❌ HTTP Server Error:', err.message);
      process.exit(1);
    }
  });
  
  httpServer.listen(HTTP_PORT, '0.0.0.0');
}

function getLocalIP() {
  try {
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
          return net.address;
        }
      }
    }
  } catch (e) {}
  return 'localhost';
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down...');
  db.close();
  process.exit(0);
});

// API endpoint to clone a seed site
app.post('/api/sites/clone', express.json(), (req, res) => {
  try {
    const { seedName, newSiteName } = req.body;
    
    if (!seedName || !newSiteName) {
      return res.status(400).json({ error: 'seedName and newSiteName are required' });
    }
    
    // Validate new site name
    if (!/^[a-z0-9-]+$/.test(newSiteName)) {
      return res.status(400).json({ error: 'Site name can only contain lowercase letters, numbers, and hyphens' });
    }
    
    const seedPath = join(sitesDir, seedName);
    const newSitePath = join(sitesDir, newSiteName);
    
    // Check if seed exists
    if (!existsSync(seedPath)) {
      return res.status(404).json({ error: `Seed site "${seedName}" not found` });
    }
    
    // Check if new site already exists
    if (existsSync(newSitePath)) {
      return res.status(409).json({ error: `Site "${newSiteName}" already exists` });
    }
    
    // Copy the seed directory recursively
    const copyRecursiveSync = (src, dest) => {
      const exists = existsSync(src);
      const stats = exists && statSync(src);
      const isDirectory = exists && stats.isDirectory();
      
      if (isDirectory) {
        mkdirSync(dest, { recursive: true });
        readdirSync(src).forEach(childItemName => {
          copyRecursiveSync(join(src, childItemName), join(dest, childItemName));
        });
      } else {
        const content = readFileSync(src);
        writeFileSync(dest, content);
      }
    };
    
    copyRecursiveSync(seedPath, newSitePath);
    
    // Update config.json with new site name
    const configPath = join(newSitePath, 'config.json');
    if (existsSync(configPath)) {
      const config = JSON.parse(readFileSync(configPath, 'utf8'));
      if (config.site) {
        config.site.name = newSiteName;
        config.site.title = config.site.title ? config.site.title.replace(seedName, newSiteName) : `${newSiteName.charAt(0).toUpperCase() + newSiteName.slice(1)} — Site`;
        if (config.navigation?.logo) {
          config.navigation.logo.text = config.navigation.logo.text ? config.navigation.logo.text.replace(seedName, newSiteName) : newSiteName.charAt(0).toUpperCase() + newSiteName.slice(1);
        }
      }
      writeFileSync(configPath, JSON.stringify(config, null, 2));
    }
    
    res.json({ 
      success: true, 
      message: `Site "${newSiteName}" created successfully from seed "${seedName}"`,
      siteName: newSiteName,
      path: newSitePath
    });
    
  } catch (error) {
    console.error('Error cloning seed site:', error);
    res.status(500).json({ error: error.message || 'Failed to clone seed site' });
  }
});

// Make startServer async to support await
(async () => {
  await startServer();
})();


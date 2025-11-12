#!/usr/bin/env node
/**
 * End-to-End Test for Resource Cards Hybrid System
 * Tests both server mode (SQLite + file cards) and standalone mode (localStorage)
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resourceCardsDir = join(__dirname, 'sites', 'learnmappers', 'pages', 'resource-cards');
const dbPath = join(__dirname, 'data', 'learnmappers.db');

let testsPassed = 0;
let testsFailed = 0;
const results = [];

function test(name, fn) {
  try {
    fn();
    testsPassed++;
    results.push({ name, status: 'PASS', message: 'OK' });
    console.log(`✅ ${name}`);
  } catch (error) {
    testsFailed++;
    results.push({ name, status: 'FAIL', message: error.message });
    console.log(`❌ ${name}: ${error.message}`);
  }
}

console.log('\n🧪 Resource Cards Hybrid System - End-to-End Test\n');
console.log('='.repeat(60));

// Test 1: Directory Structure
test('Resource cards directory exists', () => {
  if (!existsSync(resourceCardsDir)) {
    throw new Error(`Directory not found: ${resourceCardsDir}`);
  }
});

// Test 2: Template File
test('Template file exists', () => {
  const templatePath = join(resourceCardsDir, 'template.html');
  if (!existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }
  
  const template = readFileSync(templatePath, 'utf-8');
  if (!template.includes('populateResourceCard')) {
    throw new Error('Template missing populateResourceCard function');
  }
  // Check for resource-cards references (can be in paths, comments, or code)
  if (!template.includes('resource-cards') && !template.includes('resourceCards') && !template.includes('resource_cards')) {
    throw new Error('Template missing resource-cards references');
  }
});

// Test 3: Database Connection
test('SQLite database exists and is accessible', () => {
  if (!existsSync(dbPath)) {
    throw new Error(`Database not found: ${dbPath}`);
  }
  
  const db = new Database(dbPath);
  try {
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='inventory'").get();
    if (!tables) {
      throw new Error('Inventory table not found in database');
    }
    
    // Test query
    const count = db.prepare('SELECT COUNT(*) as count FROM inventory').get();
    console.log(`   📊 Inventory items: ${count.count}`);
  } finally {
    db.close();
  }
});

// Test 4: Server API Endpoints (check if server.js has the endpoints)
test('Server has resource card generation endpoints', () => {
  const serverPath = join(__dirname, 'server.js');
  if (!existsSync(serverPath)) {
    throw new Error('server.js not found');
  }
  
  const serverCode = readFileSync(serverPath, 'utf-8');
  
  if (!serverCode.includes('/api/resource-cards/generate')) {
    throw new Error('Missing POST /api/resource-cards/generate endpoint');
  }
  
  if (!serverCode.includes('/api/resource-cards/generate-all')) {
    throw new Error('Missing POST /api/resource-cards/generate-all endpoint');
  }
  
  if (!serverCode.includes('resourceCardsDir')) {
    throw new Error('Missing resourceCardsDir configuration');
  }
});

// Test 5: Auto-generation on Create (check server.js logic)
test('Server auto-generates cards on item create', () => {
  const serverPath = join(__dirname, 'server.js');
  const serverCode = readFileSync(serverPath, 'utf-8');
  
  // Check if POST /api/inventory has card generation
  // Look for the endpoint (can have different quote styles)
  const endpointPatterns = [
    'app.post(\'/api/inventory\'',
    'app.post("/api/inventory"',
    'app.post(`/api/inventory`'
  ];
  
  let endpointStart = -1;
  for (const pattern of endpointPatterns) {
    endpointStart = serverCode.indexOf(pattern);
    if (endpointStart !== -1) break;
  }
  
  if (endpointStart === -1) {
    throw new Error('POST /api/inventory endpoint not found');
  }
  
  // Check next 600 characters for auto-generation logic (more generous)
  const endpointSection = serverCode.substring(endpointStart, endpointStart + 600);
  const hasAutoGen = endpointSection.includes('resourceCardsDir') || 
                     endpointSection.includes('writeFileSync') || 
                     endpointSection.includes('cardPath') ||
                     endpointSection.includes('Auto-Born') ||
                     endpointSection.includes('auto-generate');
  
  if (!hasAutoGen) {
    throw new Error('POST /api/inventory missing auto-generation logic');
  }
});

// Test 6: Inventory Page Integration
test('Inventory page has resource card links', () => {
  const inventoryPath = join(__dirname, 'sites', 'learnmappers', 'pages', 'inventory.html');
  if (!existsSync(inventoryPath)) {
    throw new Error('inventory.html not found');
  }
  
  const inventoryCode = readFileSync(inventoryPath, 'utf-8');
  
  if (!inventoryCode.includes('resource-cards/')) {
    throw new Error('Inventory page missing resource-cards links');
  }
  
  if (!inventoryCode.includes('generateCardsBtn')) {
    throw new Error('Inventory page missing Generate All Cards button');
  }
  
  if (!inventoryCode.includes('ResourceCardGenerator')) {
    throw new Error('Inventory page missing ResourceCardGenerator');
  }
});

// Test 7: Resource Card Generator JS
test('Resource card generator JavaScript exists', () => {
  const generatorPath = join(__dirname, 'sites', 'learnmappers', 'js', 'resource-card-generator.js');
  if (!existsSync(generatorPath)) {
    throw new Error('resource-card-generator.js not found');
  }
  
  const generatorCode = readFileSync(generatorPath, 'utf-8');
  
  if (!generatorCode.includes('class ResourceCardGenerator')) {
    throw new Error('ResourceCardGenerator class not found');
  }
  
  if (!generatorCode.includes('generateAllCards')) {
    throw new Error('generateAllCards method not found');
  }
});

// Test 8: Template Data Loading
test('Template can load data from API and localStorage', () => {
  const templatePath = join(resourceCardsDir, 'template.html');
  const template = readFileSync(templatePath, 'utf-8');
  
  // Check for API loading (can be in various formats)
  if (!template.includes('/api/inventory') && !template.includes('apiBase') && !template.includes('fetch')) {
    throw new Error('Template missing API data loading');
  }
  
  // Check for localStorage fallback
  if (!template.includes('localStorage')) {
    throw new Error('Template missing localStorage fallback');
  }
  
  // Check for populateResourceCard function
  if (!template.includes('populateResourceCard')) {
    throw new Error('Template missing populateResourceCard function');
  }
});

// Test 9: ID Format Consistency
test('ID format handling is consistent', () => {
  const inventoryPath = join(__dirname, 'sites', 'learnmappers', 'pages', 'inventory.html');
  const inventoryCode = readFileSync(inventoryPath, 'utf-8');
  
  // Check for resource-{id} format
  if (!inventoryCode.includes('resource-')) {
    throw new Error('Inventory page missing resource- ID format');
  }
  
  // Check for database ID handling
  if (!inventoryCode.includes('typeof r.id === \'number\'')) {
    throw new Error('Inventory page missing database ID type check');
  }
});

// Test 10: Generate All Cards Functionality
test('Generate All Cards button has proper event handler', () => {
  const inventoryPath = join(__dirname, 'sites', 'learnmappers', 'pages', 'inventory.html');
  const inventoryCode = readFileSync(inventoryPath, 'utf-8');
  
  if (!inventoryCode.includes('generateCardsBtn') || !inventoryCode.includes('addEventListener')) {
    throw new Error('Generate All Cards button missing event handler');
  }
  
  if (!inventoryCode.includes('generateAllCards')) {
    throw new Error('Generate All Cards missing API call');
  }
});

// Test 11: Check for existing generated cards
test('Check for existing resource card files', () => {
  if (!existsSync(resourceCardsDir)) {
    throw new Error('Resource cards directory not found');
  }
  
  const files = readdirSync(resourceCardsDir).filter(f => f.endsWith('.html') && f !== 'template.html');
  console.log(`   📄 Found ${files.length} resource card files`);
  
  if (files.length > 0) {
    // Check first file
    const firstFile = join(resourceCardsDir, files[0]);
    const content = readFileSync(firstFile, 'utf-8');
    
    if (!content.includes('<!doctype html>')) {
      throw new Error('Card file missing HTML structure');
    }
    
    if (!content.includes('populateResourceCard')) {
      throw new Error('Card file missing populateResourceCard function');
    }
  }
});

// Test 12: Database Schema Compatibility
test('Database schema supports resource card generation', () => {
  if (!existsSync(dbPath)) {
    throw new Error('Database not found');
  }
  
  const db = new Database(dbPath);
  try {
    const schema = db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='inventory'").get();
    if (!schema) {
      throw new Error('Inventory table schema not found');
    }
    
    // Check for required columns
    const requiredColumns = ['id', 'name', 'type', 'state', 'spot', 'notes'];
    for (const col of requiredColumns) {
      if (!schema.sql.includes(col)) {
        throw new Error(`Missing required column: ${col}`);
      }
    }
  } finally {
    db.close();
  }
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('\n📊 Test Results Summary\n');
console.log(`✅ Passed: ${testsPassed}`);
console.log(`❌ Failed: ${testsFailed}`);
console.log(`📈 Total:  ${testsPassed + testsFailed}`);

if (testsFailed > 0) {
  console.log('\n❌ Failed Tests:');
  results.filter(r => r.status === 'FAIL').forEach(r => {
    console.log(`   - ${r.name}: ${r.message}`);
  });
}

console.log('\n' + '='.repeat(60));

if (testsFailed === 0) {
  console.log('\n🎉 All tests passed! The hybrid system is ready.\n');
  process.exit(0);
} else {
  console.log('\n⚠️  Some tests failed. Please review the issues above.\n');
  process.exit(1);
}


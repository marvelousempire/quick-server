#!/usr/bin/env node
/**
 * Generate resource cards for all tools from the About page list
 * This script adds tools to the database and creates resource card HTML files
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Tool list from about.html
const tools = [
  // Power Tools
  { name: 'Compact ½" Drill/Driver & Impact Combo', category: 'tool', icon: '🔩', purpose: 'Versatile drilling and driving for assembly, mounting, and construction projects. Combines precision drilling with powerful impact driving for screws and fasteners.' },
  { name: '10" Single-Bevel Miter Saw', category: 'tool', icon: '🪚', purpose: 'Precise angled cuts for frames, trim, decking, and furniture. Single-bevel design for accurate miter and bevel cuts.' },
  { name: '7¼" Circular & 4½" Compact Saws', category: 'tool', icon: '⚙️', purpose: 'Full-size and compact circular saws for cutting lumber, plywood, and sheet materials. Compact version for tight spaces and detailed work.' },
  { name: 'Brushless Jig Saw', category: 'tool', icon: '🔨', purpose: 'Curved and intricate cuts in wood, metal, and plastic. Brushless motor for longer runtime and durability.' },
  { name: 'Compact Reciprocating Saw', category: 'tool', icon: '🪓', purpose: 'Demolition, cutting pipes, pruning, and rough cuts. Compact design for accessibility in tight spaces.' },
  { name: '5" Random Orbit & Detail Sanders', category: 'tool', icon: '✨', purpose: 'Smooth finishing on wood, metal, and painted surfaces. Random orbit for swirl-free results, detail sander for edges and corners.' },
  { name: 'Rotary & Routing Tool System', category: 'tool', icon: '🌀', purpose: 'Multi-purpose tool for cutting, grinding, sanding, engraving, and routing. Versatile system for detailed work and custom projects.' },
  { name: 'Oscillating Multi-Tool', category: 'tool', icon: '🔧', purpose: 'Flush cuts, sanding, scraping, and detail work. Oscillating action for precision in tight spaces and delicate materials.' },
  { name: 'Cordless Air Compressor', category: 'equipment', icon: '💨', purpose: 'Portable air power for nail guns, staplers, inflating, and air tools. Cordless design for job site mobility.' },
  { name: 'Shop Vac & Dust Extractor', category: 'equipment', icon: '🧹', purpose: 'Dust collection and cleanup for power tools. Keeps work areas clean and protects air quality during projects.' },
  // Precision & Build Tools (grouped)
  { name: 'Stud Finder, Laser Level, Bubble Level', category: 'tool', icon: '📐', purpose: 'Precision measurement and alignment tools for accurate installations, mounting, and construction layout.' },
  { name: 'Tape Measures, Squares, Angle Guides', category: 'tool', icon: '📏', purpose: 'Measuring and marking tools for accurate cuts, layouts, and installations.' },
  { name: 'Clamps, Bench Vice, Portable Work Stand', category: 'tool', icon: '🔩', purpose: 'Workholding and support equipment for secure, hands-free work during assembly and fabrication.' },
  { name: 'Allen Key Sets, Ratchets, Bit Kits, Screwdrivers', category: 'tool', icon: '🔧', purpose: 'Complete fastener tool collection for assembly, disassembly, and maintenance across all project types.' },
  { name: 'Rubber Mallet, Claw Hammer, Dead-Blow Hammer', category: 'tool', icon: '🔨', purpose: 'Striking tools for assembly, demolition, and material shaping. Different weights and materials for various applications.' },
  { name: 'Pliers, Adjustable Wrenches, Vice Grips (small/large)', category: 'tool', icon: '🔩', purpose: 'Gripping, bending, and holding tools for plumbing, electrical, and general mechanical work.' },
  { name: 'Drill Bits, Anchors, Fasteners, Hook Systems', category: 'material', icon: '📎', purpose: 'Complete fastener and mounting hardware collection for secure installations and assemblies.' },
  // Digital & Diagnostic Tools
  { name: 'Foxwell NT1009 OBD2 Diagnostic Reader', category: 'equipment', icon: '🔌', purpose: 'Automotive diagnostic tool for reading and clearing engine codes, monitoring live data, and vehicle system analysis.' },
  { name: 'Power Meters, Voltage Testers, Cable Checkers', category: 'tool', icon: '⚡', purpose: 'Electrical testing and diagnostic tools for safe electrical work, troubleshooting, and verification.' },
  { name: 'Mesh Router Kit & Smart Network System', category: 'equipment', icon: '📡', purpose: 'Whole-home WiFi coverage and smart network management for connected devices and home automation.' },
  { name: 'Compact UPS & EcoFlow Power Unit', category: 'equipment', icon: '🔋', purpose: 'Backup power and portable energy solutions for off-grid work, power outages, and mobile projects.' },
  { name: 'Foldable Solar Panel Kit', category: 'equipment', icon: '☀️', purpose: 'Portable solar power generation for charging devices, powering tools, and off-grid energy needs.' },
  // Creative & Custom Build Gear
  { name: 'Snapmaker 3D Printer (FDM, Laser, CNC)', category: 'equipment', icon: '🖨️', purpose: '3-in-1 manufacturing system for 3D printing, laser engraving/cutting, and CNC carving. Enables custom parts, prototypes, and creative projects.' },
  { name: 'Rotary Engraving & Cutting Tools', category: 'tool', icon: '🎨', purpose: 'Precision engraving and cutting tools for custom work, personalization, and detailed fabrication.' },
  { name: 'Painting & Finishing Gear', category: 'material', icon: '🖌️', purpose: 'Complete painting and finishing supplies for professional-quality paint jobs, staining, and surface finishing.' },
  { name: 'Photography Equipment: 4K Cinema Camera, DSLR Kit', category: 'equipment', icon: '📷', purpose: 'Professional photography and videography equipment for project documentation, marketing, and creative work.' },
  { name: 'Tripods, LED Panels, Light Meters', category: 'equipment', icon: '💡', purpose: 'Photography support and lighting equipment for stable shots, proper exposure, and professional-quality images.' },
  // Garden & Eco Systems
  { name: 'Compost Bins, Soil Mixers', category: 'equipment', icon: '🌱', purpose: 'Composting and soil preparation equipment for sustainable gardening and soil health management.' },
  { name: 'Self-Watering Planters', category: 'equipment', icon: '🪴', purpose: 'Automated watering systems for plants, reducing maintenance and ensuring consistent moisture for healthy growth.' },
  { name: 'Drip Systems, Rain Barrels', category: 'equipment', icon: '💧', purpose: 'Water-efficient irrigation and rainwater collection systems for sustainable garden watering and water conservation.' },
  { name: 'Seed Starters, Grow Lights', category: 'equipment', icon: '🌿', purpose: 'Indoor seed starting and plant propagation equipment for year-round growing and early season starts.' }
];

// Database setup
const dbPath = join(__dirname, 'data', 'learnmappers.db');
const db = new Database(dbPath);

// Ensure inventory table exists with all columns
db.exec(`
  CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT,
    category TEXT,
    spot TEXT,
    state TEXT,
    power TEXT,
    notes TEXT,
    brand TEXT,
    model TEXT,
    serial_number TEXT,
    purchase_date TEXT,
    purchase_price REAL,
    msrp REAL,
    dimensions TEXT,
    weight TEXT,
    capacity TEXT,
    compatibility TEXT,
    use_cases TEXT,
    can_produce_with TEXT,
    maintenance_schedule TEXT,
    last_maintenance TEXT,
    next_maintenance TEXT,
    maintenance_notes TEXT,
    links TEXT,
    status TEXT DEFAULT 'available',
    purpose TEXT,
    tags TEXT,
    last_used TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Add tools to database
const insertStmt = db.prepare(`
  INSERT INTO inventory (
    name, category, purpose, status, type, state, created_at, updated_at
  ) VALUES (?, ?, ?, 'available', ?, 'Good', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
`);

const resourceCardsDir = join(__dirname, 'sites', 'learnmappers-hqdev', 'pages', 'resource-cards');
const templatePath = join(resourceCardsDir, 'template.html');
const template = readFileSync(templatePath, 'utf-8');

console.log('📦 Adding tools to database and generating resource cards...\n');

let cardCount = 0;
for (const tool of tools) {
  try {
    // Check if tool already exists
    const existing = db.prepare('SELECT id FROM inventory WHERE name = ?').get(tool.name);
    
    if (existing) {
      console.log(`⏭️  Skipping "${tool.name}" (already exists, ID: ${existing.id})`);
      // Still generate the card file
      const cardPath = join(resourceCardsDir, `resource-${existing.id}.html`);
      if (!readFileSync(cardPath, 'utf-8').includes('Resource Not Found')) {
        continue; // Card already exists
      }
      writeFileSync(cardPath, template);
      cardCount++;
      continue;
    }
    
    // Insert tool
    const result = insertStmt.run(
      tool.name,
      tool.category,
      tool.purpose,
      tool.category === 'tool' ? 'Tool' : tool.category === 'equipment' ? 'Equipment' : 'Material'
    );
    
    const toolId = result.lastInsertRowid;
    console.log(`✅ Added "${tool.name}" (ID: ${toolId})`);
    
    // Generate resource card HTML file
    const cardPath = join(resourceCardsDir, `resource-${toolId}.html`);
    writeFileSync(cardPath, template);
    cardCount++;
    
  } catch (error) {
    console.error(`❌ Error processing "${tool.name}":`, error.message);
  }
}

console.log(`\n✨ Complete! Generated ${cardCount} resource card files.`);
console.log(`📁 Resource cards saved to: ${resourceCardsDir}`);

db.close();


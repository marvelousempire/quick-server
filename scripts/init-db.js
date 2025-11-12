#!/usr/bin/env node
/**
 * Initialize database with seed data
 */

import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'data', 'learnmappers.db');

// Create data directory
try {
  mkdirSync(join(__dirname, '..', 'data'), { recursive: true });
} catch (e) {}

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Seed data
const seed = [
  {type:"Drill / Driver", name:"Compact 1/2\" drill driver", power:"Battery 20V", state:"Good", spot:"Bin 1", notes:"Daily use"},
  {type:"Miter Saw", name:"10\" single bevel miter", power:"Corded", state:"Good", spot:"Table", notes:"Trim, frame"},
  {type:"Circular Saw", name:"7‑1/4\" circular", power:"Corded", state:"Good", spot:"Wall rack", notes:"Strong torque"},
  {type:"Circular Saw", name:"4‑1/2\" compact", power:"Battery 20V", state:"Great", spot:"Bin 2", notes:"Tight space"},
  {type:"Jig Saw", name:"Brushless jig saw", power:"Battery 20V", state:"Great", spot:"Bin 2", notes:"LED, curve"},
  {type:"Recip Saw", name:"Compact recip saw", power:"Battery 20V", state:"Great", spot:"Bin 3", notes:"Demo"},
  {type:"Sander", name:"5\" random orbit", power:"Corded", state:"Great", spot:"Bench", notes:"Finish"},
  {type:"Rotary Tool", name:"High‑perf rotary + flex", power:"Corded", state:"Great", spot:"Bin 5", notes:"Engrave, polish"},
  {type:"3D Printer", name:"Snap‑style 3‑in‑1", power:"AC", state:"Great", spot:"Main desk", notes:"Print • laser • CNC"},
  {type:"Hole Saw", name:"Hole saw set & arbors", power:"—", state:"Good", spot:"Bin 6", notes:"Multi size"},
  {type:"Hand Tool", name:"Rubber mallet", power:"—", state:"New", spot:"Bin 1", notes:"Gentle tap"},
  {type:"Hand Tool", name:"Claw hammer 16oz", power:"—", state:"Good", spot:"Bin 1", notes:"Basic"},
  {type:"Hand Tool", name:"Pliers set", power:"—", state:"Good", spot:"Bin 1", notes:"Combo"},
  {type:"Hand Tool", name:"Vice grips small", power:"—", state:"Great", spot:"Bin 1", notes:"Lock grip"},
  {type:"Hand Tool", name:"Vice grips large", power:"—", state:"Great", spot:"Bin 1", notes:"Lock grip"},
  {type:"Scanner", name:"Foxwell NT1009 OBD2", power:"USB/AC", state:"New", spot:"Car kit", notes:"Diag"},
  {type:"Network", name:"Mesh router kit", power:"AC", state:"Great", spot:"Net bin", notes:"Whole home"},
  {type:"Solar / Power", name:"Eco power unit", power:"AC/DC", state:"Great", spot:"Power cart", notes:"Mobile UPS"},
  {type:"Solar / Power", name:"Foldable solar kit", power:"DC", state:"Great", spot:"Power cart", notes:"Field charge"},
  {type:"Garden", name:"Self‑water planters", power:"—", state:"New", spot:"Yard", notes:"Low care"},
  {type:"Garden", name:"Compost bins", power:"—", state:"Good", spot:"Yard", notes:"Soil lift"},
  {type:"Photo / Video", name:"4K cinema cam", power:"AC/Batt", state:"Great", spot:"Case", notes:"Pro lens"},
  {type:"Photo / Video", name:"DSLR kit", power:"Batt", state:"Great", spot:"Case", notes:"Stills"}
];

// Initialize schema
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

// Check if data exists
const count = db.prepare('SELECT COUNT(*) as count FROM inventory').get();
if (count.count === 0) {
  console.log('Seeding database...');
  const stmt = db.prepare(`
    INSERT INTO inventory (type, name, power, state, spot, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  const insertMany = db.transaction((items) => {
    for (const item of items) {
      stmt.run(item.type, item.name, item.power, item.state, item.spot, item.notes);
    }
  });
  
  insertMany(seed);
  console.log(`✓ Inserted ${seed.length} items`);
} else {
  console.log(`Database already has ${count.count} items`);
}

db.close();
console.log('✓ Database initialized');


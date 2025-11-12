/**
 * Amazon Importer
 * 
 * Handles Amazon-specific import formats (CSV, JSON, ZIP)
 */

import { BaseVendorImporter } from './base-importer.js';
import { readFileSync, createReadStream } from 'fs';
import { createInterface } from 'readline';
import { unzipSync } from 'zlib';
import { promisify } from 'util';
import { gunzip } from 'zlib';
import { pipeline } from 'stream/promises';

const gunzipAsync = promisify(gunzip);

export class AmazonImporter extends BaseVendorImporter {
  getName() {
    return 'Amazon';
  }

  getDescription() {
    return 'Import orders and purchases from Amazon (CSV, JSON, ZIP)';
  }

  getSupportedFormats() {
    return ['CSV', 'JSON', 'ZIP'];
  }

  async import(siteName, fileData, options = {}) {
    const { filename, buffer, text } = fileData;
    
    let parsedData;
    
    // Handle ZIP files
    if (filename.endsWith('.zip')) {
      parsedData = await this.parseZIP(buffer);
    } else if (filename.endsWith('.csv')) {
      parsedData = await this.parseCSV(text || buffer.toString());
    } else if (filename.endsWith('.json')) {
      parsedData = await this.parseJSON(text || buffer.toString());
    } else {
      throw new Error(`Unsupported file format: ${filename}`);
    }

    // Map to resources
    const resources = parsedData.map(item => this.mapToResource(item));
    
    // Filter duplicates
    const uniqueResources = [];
    const duplicates = [];
    
    resources.forEach(resource => {
      const transactionId = this.extractTransactionId(resource);
      if (transactionId && this.checkDuplicates(siteName, transactionId, 'amazon')) {
        duplicates.push(resource);
      } else {
        uniqueResources.push(resource);
      }
    });

    // Save resources
    const saveResult = this.saveResources(siteName, uniqueResources, 'amazon');

    return {
      imported: uniqueResources.length,
      duplicates: duplicates.length,
      saved: saveResult.saved,
      errors: saveResult.errors,
      vendor: 'amazon'
    };
  }

  async parseZIP(buffer) {
    // For now, assume ZIP contains CSV files
    // In production, you'd use a proper ZIP library
    throw new Error('ZIP parsing not yet implemented - please extract CSV files first');
  }

  async parseCSV(csvText) {
    // Remove BOM if present
    if (csvText.charCodeAt(0) === 0xFEFF) {
      csvText = csvText.slice(1);
    }

    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];

    // Parse headers
    const headers = this.parseCSVLine(lines[0]).map(h => h.replace(/^\ufeff/, '').trim());
    
    const items = [];
    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);
      if (values.length !== headers.length) continue;

      const item = {};
      headers.forEach((header, index) => {
        item[header.toLowerCase()] = values[index]?.trim() || '';
      });
      
      if (item['order date'] || item['order id'] || item['amazon order id']) {
        items.push(item);
      }
    }

    return items;
  }

  parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    values.push(current);
    return values;
  }

  parseJSON(jsonText) {
    try {
      const data = JSON.parse(jsonText);
      return Array.isArray(data) ? data : [data];
    } catch (e) {
      throw new Error(`Invalid JSON: ${e.message}`);
    }
  }

  mapToResource(item) {
    // Store original data
    const originalData = { ...item };

    // Extract key fields
    const title = item['item name'] || item['title'] || item['product name'] || 'Unknown Item';
    const brand = item['brand'] || item['manufacturer'] || null;
    const model = item['model'] || item['model number'] || item['item model number'] || null;
    const price = parseFloat(item['purchase price per unit'] || item['item price'] || item['price'] || '0');
    const transactionId = item['order id'] || item['amazon order id'] || item['order number'] || null;
    const purchaseDate = item['order date'] || item['purchase date'] || null;

    const resource = {
      id: this.generateSlug(title),
      title,
      type: 'tool', // Default, can be overridden
      category: 'tool',
      purpose: `Purchased from Amazon: ${title}`,
      useCases: [],
      outcomes: [],
      capabilities: [],
      abilities: [],
      meta: {
        brand,
        model,
        purchaseDate,
        purchasePrice: price,
        transactionId,
        vendor: 'amazon',
        originalOrderId: transactionId
      },
      _originalData: originalData
    };

    return resource;
  }

  extractTransactionId(item) {
    return item.meta?.transactionId || 
           item.meta?.originalOrderId || 
           item.transactionId || 
           null;
  }
}


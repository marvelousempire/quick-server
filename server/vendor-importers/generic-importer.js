/**
 * Generic Importer
 * 
 * Handles generic CSV/JSON imports when vendor cannot be detected
 */

import { BaseVendorImporter } from './base-importer.js';

export class GenericImporter extends BaseVendorImporter {
  getName() {
    return 'Generic';
  }

  getDescription() {
    return 'Import from generic CSV or JSON files';
  }

  getSupportedFormats() {
    return ['CSV', 'JSON'];
  }

  async import(siteName, fileData, options = {}) {
    const { filename, buffer, text } = fileData;
    
    let parsedData;
    
    if (filename.endsWith('.csv')) {
      parsedData = await this.parseCSV(text || buffer.toString());
    } else if (filename.endsWith('.json')) {
      parsedData = await this.parseJSON(text || buffer.toString());
    } else {
      throw new Error(`Unsupported file format: ${filename}`);
    }

    const resources = parsedData.map(item => this.mapToResource(item));
    const saveResult = this.saveResources(siteName, resources, 'generic');

    return {
      imported: resources.length,
      saved: saveResult.saved,
      errors: saveResult.errors,
      vendor: 'generic'
    };
  }

  async parseCSV(csvText) {
    if (csvText.charCodeAt(0) === 0xFEFF) {
      csvText = csvText.slice(1);
    }

    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];

    const headers = this.parseCSVLine(lines[0]).map(h => h.replace(/^\ufeff/, '').trim());
    const items = [];

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);
      if (values.length !== headers.length) continue;

      const item = {};
      headers.forEach((header, index) => {
        item[header.toLowerCase()] = values[index]?.trim() || '';
      });
      items.push(item);
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
    const originalData = { ...item };
    const title = item.name || item.title || item.product || 'Unknown Item';
    const price = parseFloat(item.price || item.cost || '0');

    const resource = {
      id: this.generateSlug(title),
      title,
      type: 'tool',
      category: 'tool',
      purpose: `Imported item: ${title}`,
      useCases: [],
      outcomes: [],
      capabilities: [],
      abilities: [],
      meta: {
        purchasePrice: price,
        vendor: 'generic',
        importedAt: new Date().toISOString()
      },
      _originalData: originalData
    };

    return resource;
  }
}


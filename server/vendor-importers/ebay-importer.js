/**
 * eBay Importer
 * 
 * Handles eBay-specific import formats (ZIP with CSV files)
 */

import { BaseVendorImporter } from './base-importer.js';

export class EbayImporter extends BaseVendorImporter {
  getName() {
    return 'eBay';
  }

  getDescription() {
    return 'Import orders and purchases from eBay (ZIP with CSV files)';
  }

  getSupportedFormats() {
    return ['ZIP'];
  }

  async import(siteName, fileData, options = {}) {
    const { filename, buffer } = fileData;
    
    if (!filename.endsWith('.zip')) {
      throw new Error('eBay imports require ZIP files');
    }

    // Parse ZIP
    const parsedData = await this.parseZIP(buffer);
    
    // Map to resources
    const resources = parsedData.map(item => this.mapToResource(item));
    
    // Filter duplicates
    const uniqueResources = [];
    const duplicates = [];
    
    resources.forEach(resource => {
      const transactionId = this.extractTransactionId(resource);
      if (transactionId && this.checkDuplicates(siteName, transactionId, 'ebay')) {
        duplicates.push(resource);
      } else {
        uniqueResources.push(resource);
      }
    });

    // Save resources
    const saveResult = this.saveResources(siteName, uniqueResources, 'ebay');

    return {
      imported: uniqueResources.length,
      duplicates: duplicates.length,
      saved: saveResult.saved,
      errors: saveResult.errors,
      vendor: 'ebay'
    };
  }

  async parseZIP(buffer) {
    // For now, require manual extraction
    // In production, you'd use a ZIP library like 'adm-zip' or 'yauzl'
    throw new Error('ZIP parsing requires adm-zip package. Please extract CSV files from ZIP first, or install: npm install adm-zip');
    
    // Example with adm-zip (uncomment when package is installed):
    /*
    try {
      const AdmZip = (await import('adm-zip')).default;
      const zip = new AdmZip(buffer);
      const zipEntries = zip.getEntries();
      
      const allItems = [];
      
      for (const entry of zipEntries) {
        if (entry.entryName.endsWith('.csv')) {
          const csvText = zip.readAsText(entry);
          const items = await this.parseCSV(csvText);
          allItems.push(...items);
        }
      }
      
      return allItems;
    } catch (error) {
      throw new Error(`Failed to parse ZIP: ${error.message}`);
    }
    */
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
      
      if (item['item number'] || item['transaction id'] || item['order number']) {
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

  mapToResource(item) {
    const originalData = { ...item };

    const title = item['item title'] || item['title'] || item['product name'] || 'Unknown Item';
    const price = parseFloat(item['sale price'] || item['price'] || item['total price'] || '0');
    const transactionId = item['transaction id'] || item['item number'] || item['order number'] || null;
    const purchaseDate = item['sale date'] || item['purchase date'] || item['transaction date'] || null;

    const resource = {
      id: this.generateSlug(title),
      title,
      type: 'tool',
      category: 'tool',
      purpose: `Purchased from eBay: ${title}`,
      useCases: [],
      outcomes: [],
      capabilities: [],
      abilities: [],
      meta: {
        purchaseDate,
        purchasePrice: price,
        transactionId,
        vendor: 'ebay',
        originalTransactionId: transactionId
      },
      _originalData: originalData
    };

    return resource;
  }

  extractTransactionId(item) {
    return item.meta?.transactionId || 
           item.meta?.originalTransactionId || 
           item.transactionId || 
           null;
  }
}


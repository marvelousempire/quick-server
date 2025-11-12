/**
 * Vendor Import System
 * 
 * Separate import processors for each vendor (Amazon, eBay, Home Depot, etc.)
 * Each vendor has its own processor to handle vendor-specific formats.
 */

import { AmazonImporter } from './amazon-importer.js';
import { EbayImporter } from './ebay-importer.js';
import { HomeDepotImporter } from './homedepot-importer.js';
import { LowesImporter } from './lowes-importer.js';
import { BHImporter } from './bh-importer.js';
import { GenericImporter } from './generic-importer.js';

export class VendorImportSystem {
  constructor(ragGenerator) {
    this.ragGenerator = ragGenerator;
    this.importers = {
      'amazon': new AmazonImporter(ragGenerator),
      'ebay': new EbayImporter(ragGenerator),
      'homedepot': new HomeDepotImporter(ragGenerator),
      'lowes': new LowesImporter(ragGenerator),
      'bh': new BHImporter(ragGenerator),
      'generic': new GenericImporter(ragGenerator)
    };
  }

  /**
   * Detect vendor from file
   */
  detectVendor(filename, content) {
    const filenameLower = filename.toLowerCase();
    
    // Check filename patterns
    if (filenameLower.includes('amazon') || filenameLower.includes('orders_from')) {
      return 'amazon';
    }
    if (filenameLower.includes('ebay') || filenameLower.includes('.zip')) {
      return 'ebay';
    }
    if (filenameLower.includes('homedepot') || filenameLower.includes('home_depot')) {
      return 'homedepot';
    }
    if (filenameLower.includes('lowes') || filenameLower.includes('lowe')) {
      return 'lowes';
    }
    if (filenameLower.includes('bh') || filenameLower.includes('bandh')) {
      return 'bh';
    }

    // Check content patterns
    if (content) {
      const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
      if (contentStr.includes('amazon') || contentStr.includes('Amazon Order ID')) {
        return 'amazon';
      }
      if (contentStr.includes('eBay') || contentStr.includes('eBay Item Number')) {
        return 'ebay';
      }
      if (contentStr.includes('Home Depot') || contentStr.includes('HD Order')) {
        return 'homedepot';
      }
    }

    return 'generic';
  }

  /**
   * Import from vendor file
   */
  async importFromVendor(siteName, vendor, fileData, options = {}) {
    const importer = this.importers[vendor];
    
    if (!importer) {
      throw new Error(`No importer found for vendor: ${vendor}`);
    }

    const result = await importer.import(siteName, fileData, options);
    
    return {
      vendor,
      success: true,
      ...result
    };
  }

  /**
   * Auto-detect and import
   */
  async autoImport(siteName, filename, fileData, options = {}) {
    const vendor = this.detectVendor(filename, fileData);
    
    console.log(`🔍 Auto-detected vendor: ${vendor}`);
    
    return this.importFromVendor(siteName, vendor, fileData, options);
  }

  /**
   * Get available vendors
   */
  getAvailableVendors() {
    return Object.keys(this.importers).map(vendor => ({
      id: vendor,
      name: this.importers[vendor].getName(),
      description: this.importers[vendor].getDescription(),
      supportedFormats: this.importers[vendor].getSupportedFormats()
    }));
  }
}


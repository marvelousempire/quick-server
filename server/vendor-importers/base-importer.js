/**
 * Base Vendor Importer
 * 
 * Base class for all vendor-specific importers.
 * Each vendor importer extends this class.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class BaseVendorImporter {
  constructor(ragGenerator) {
    this.ragGenerator = ragGenerator;
  }

  /**
   * Get vendor name (override in subclasses)
   */
  getName() {
    return 'Generic';
  }

  /**
   * Get vendor description (override in subclasses)
   */
  getDescription() {
    return 'Generic vendor importer';
  }

  /**
   * Get supported formats (override in subclasses)
   */
  getSupportedFormats() {
    return ['CSV', 'JSON'];
  }

  /**
   * Import vendor data (override in subclasses)
   */
  async import(siteName, fileData, options = {}) {
    throw new Error('import() must be implemented by subclass');
  }

  /**
   * Parse vendor file (override in subclasses)
   */
  parseFile(fileData) {
    throw new Error('parseFile() must be implemented by subclass');
  }

  /**
   * Map vendor data to resource schema (override in subclasses)
   */
  mapToResource(vendorItem) {
    throw new Error('mapToResource() must be implemented by subclass');
  }

  /**
   * Save resources to site
   */
  saveResources(siteName, resources, vendor) {
    const resourcesDir = join(__dirname, '../../sites', siteName, 'content', 'resources');
    const vendorDir = join(resourcesDir, 'vendor-imports', vendor);
    mkdirSync(vendorDir, { recursive: true });

    const saved = [];
    const errors = [];

    resources.forEach((resource, index) => {
      try {
        // Generate slug
        const slug = this.generateSlug(resource.title || resource.name || `item-${index}`);
        const jsonPath = join(vendorDir, `${slug}.json`);

        // Add vendor metadata
        resource.meta = resource.meta || {};
        resource.meta.vendor = vendor;
        resource.meta.importedAt = new Date().toISOString();
        resource.meta.originalData = resource._originalData || null;

        // Generate RAG context if missing
        if (!resource.rag) {
          try {
            resource.rag = this.ragGenerator.generateResourceContext(resource);
          } catch (e) {
            console.warn(`Could not generate RAG context for ${slug}:`, e.message);
          }
        }

        // Remove temporary fields
        delete resource._originalData;
        delete resource._vendorData;

        writeFileSync(jsonPath, JSON.stringify(resource, null, 2), 'utf8');
        saved.push(slug);
      } catch (error) {
        errors.push({
          index,
          error: error.message,
          item: resource.title || resource.name
        });
      }
    });

    return {
      saved,
      errors,
      count: saved.length,
      vendorDir
    };
  }

  /**
   * Generate slug
   */
  generateSlug(name) {
    return (name || 'untitled')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 80);
  }

  /**
   * Extract transaction ID (override in subclasses)
   */
  extractTransactionId(item) {
    return item.transactionId || item.orderId || item.order_id || null;
  }

  /**
   * Check for duplicates
   */
  checkDuplicates(siteName, transactionId, vendor) {
    if (!transactionId) return false;

    const vendorDir = join(__dirname, '../../sites', siteName, 'content', 'resources', 'vendor-imports', vendor);
    
    if (!existsSync(vendorDir)) {
      return false;
    }

    const files = readdirSync(vendorDir).filter(f => f.endsWith('.json'));
    
    for (const file of files) {
      try {
        const resource = JSON.parse(readFileSync(join(vendorDir, file), 'utf8'));
        const existingId = resource.meta?.transactionId || resource.transactionId;
        if (existingId === transactionId) {
          return true;
        }
      } catch (e) {
        // Skip invalid files
      }
    }

    return false;
  }
}


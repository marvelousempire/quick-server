/**
 * Lowe's Importer
 */

import { BaseVendorImporter } from './base-importer.js';
import { AmazonImporter } from './amazon-importer.js';

export class LowesImporter extends AmazonImporter {
  getName() {
    return "Lowe's";
  }

  getDescription() {
    return "Import orders and purchases from Lowe's (CSV)";
  }

  mapToResource(item) {
    const resource = super.mapToResource(item);
    resource.meta.vendor = 'lowes';
    return resource;
  }
}


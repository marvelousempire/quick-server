/**
 * B&H Importer
 */

import { BaseVendorImporter } from './base-importer.js';
import { AmazonImporter } from './amazon-importer.js';

export class BHImporter extends AmazonImporter {
  getName() {
    return 'B&H';
  }

  getDescription() {
    return 'Import orders and purchases from B&H Photo Video (CSV)';
  }

  mapToResource(item) {
    const resource = super.mapToResource(item);
    resource.meta.vendor = 'bh';
    return resource;
  }
}


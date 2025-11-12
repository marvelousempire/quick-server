/**
 * Home Depot Importer
 */

import { BaseVendorImporter } from './base-importer.js';
import { AmazonImporter } from './amazon-importer.js';

export class HomeDepotImporter extends AmazonImporter {
  getName() {
    return 'Home Depot';
  }

  getDescription() {
    return 'Import orders and purchases from Home Depot (CSV)';
  }

  mapToResource(item) {
    const resource = super.mapToResource(item);
    resource.meta.vendor = 'homedepot';
    return resource;
  }
}


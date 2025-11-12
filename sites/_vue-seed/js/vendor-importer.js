/**
 * LearnMappers PWA — Vendor File Importer
 * 
 * Created: 2025-11-08
 * Last Updated: 2025-01-XX
 * 
 * Enhanced vendor file import system with schema validation, rich data extraction,
 * and Auto-Fit, Auto-Born, Auto-Heal capabilities:
 * 
 * - Auto-Fit: Automatically detects and adapts to vendor file formats (Amazon, eBay, etc.)
 * - Auto-Born: Automatically creates resource cards for imported resources
 * - Auto-Heal: Validates, normalizes, and fixes missing/invalid data
 * - Auto-Know: Intelligently detects file types, vendor formats, and field mappings
 */

class VendorImporter {
  constructor() {
    this.validator = window.validator || null;
    this.results = [];
    this.errors = [];
    this.autoFitEnabled = true;  // Auto-detect vendor formats
    this.autoBornEnabled = true; // Auto-create resource cards
    this.autoHealEnabled = true; // Auto-fix and normalize data
    this.autoKnowEnabled = true; // Auto-detect file types and field mappings
  }

  /**
   * Import vendor file (CSV, JSON, ZIP)
   */
  async importFile(file) {
    this.results = [];
    this.errors = [];
    
    const name = file.name.toLowerCase();
    
    try {
      if (name.endsWith('.csv')) {
        const text = await file.text();
        return await this.importCSV(text, file.name);
      } else if (name.endsWith('.json')) {
        const text = await file.text();
        const data = JSON.parse(text);
        return await this.importJSON(data, file.name);
      } else if (name.endsWith('.zip')) {
        console.log('Auto-Know: Detected ZIP file, extracting...');
        return await this.importZIP(file);
      } else {
        throw new Error(`Unsupported file type: ${file.name}`);
      }
    } catch (e) {
      this.errors.push({ file: file.name, error: e.message });
      return { success: false, results: [], errors: this.errors };
    }
  }

  /**
   * Import CSV file with Auto-Know
   */
  async importCSV(text, filename) {
    const rows = this.parseCSV(text);
    if (rows.length < 2) {
      throw new Error('CSV file must have at least a header row and one data row');
    }

    const headers = rows[0].map(h => h.trim().toLowerCase());
    console.log('Auto-Know: CSV headers detected:', headers);
    
    // Auto-Know: Detect vendor type with enhanced detection
    const vendorType = this.detectVendorType(headers, filename);
    console.log('Auto-Know: Vendor type detected:', vendorType);
    
    const mapper = this.getVendorMapper(vendorType);
    const resources = [];
    
    console.log('Auto-Know: Processing', rows.length - 1, 'data rows');

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0) continue;

      try {
        // Auto-Know: Map resource using detected vendor mapper
        const resource = mapper(headers, row);
        
        if (resource && resource.title) {
          // Auto-Fit: Validate against schema
          if (this.validator) {
            const isValid = this.validator.validate(resource, 'resource');
            if (!isValid) {
              const validationErrors = this.validator.getErrors();
              this.errors.push({
                row: i + 1,
                title: resource.title,
                errors: validationErrors
              });
            }
          }
          
          // Auto-Heal: Normalize to ensure required fields
          const normalized = this.normalizeResource(resource);
          
          // Auto-Know: Log successful mapping
          if (i <= 3) { // Log first 3 for debugging
            console.log('Auto-Know: Mapped row', i, '→', normalized.title, normalized.category);
          }
          
          resources.push(normalized);
        } else {
          console.warn('Auto-Know: Row', i + 1, 'skipped - no title found');
        }
      } catch (e) {
        console.error('Auto-Know: Error mapping row', i + 1, ':', e);
        this.errors.push({ row: i + 1, error: e.message });
      }
    }
    
    console.log('Auto-Know: Import complete. Resources:', resources.length, 'Errors:', this.errors.length);

    this.results = resources;
    return {
      success: true,
      results: resources,
      errors: this.errors,
      vendorType
    };
  }

  /**
   * Import JSON file
   */
  async importJSON(data, filename) {
    const resources = [];
    
    const items = Array.isArray(data) ? data : [data];
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      try {
        const resource = this.mapGenericJSON(item);
        if (resource && resource.title) {
          const normalized = this.normalizeResource(resource);
          resources.push(normalized);
        }
      } catch (e) {
        this.errors.push({ item: i + 1, error: e.message });
      }
    }

    this.results = resources;
    return {
      success: true,
      results: resources,
      errors: this.errors
    };
  }

  /**
   * Import ZIP file (eBay, etc.) with Auto-Know
   */
  async importZIP(file) {
    console.log('Auto-Know: Processing ZIP file:', file.name, file.size, 'bytes');
    
    await this.ensureJSZip();
    
    if (!window.JSZip) {
      console.error('Auto-Know: JSZip library not available, loading...');
      // Try loading again
      await new Promise(resolve => setTimeout(resolve, 500));
      if (!window.JSZip) {
        throw new Error('ZIP parsing library (JSZip) not available. Please refresh the page and try again.');
      }
    }

    console.log('Auto-Know: JSZip loaded, extracting ZIP...');
    const ab = await file.arrayBuffer();
    const zip = await window.JSZip.loadAsync(ab);
    
    console.log('Auto-Know: ZIP extracted, found', Object.keys(zip.files).length, 'files');
    
    // Find CSV file in ZIP (try multiple patterns)
    let csvFile = Object.values(zip.files).find(f => 
      /\.csv$/i.test(f.name) && !f.dir
    );
    
    // If no .csv found, try .txt files (some exports use .txt)
    if (!csvFile) {
      csvFile = Object.values(zip.files).find(f => 
        /\.txt$/i.test(f.name) && !f.dir
      );
    }
    
    // List all files for debugging
    const allFiles = Object.values(zip.files).filter(f => !f.dir).map(f => f.name);
    console.log('Auto-Know: Files in ZIP:', allFiles);

    if (!csvFile) {
      throw new Error(`No CSV or TXT file found in ZIP. Found files: ${allFiles.join(', ')}`);
    }

    console.log('Auto-Know: Found CSV file:', csvFile.name);
    const csvText = await csvFile.async('string');
    console.log('Auto-Know: CSV extracted,', csvText.length, 'characters');
    
    // Return with ZIP context for better messaging
    const result = await this.importCSV(csvText, csvFile.name);
    result.sourceFile = file.name; // Track original ZIP name
    return result;
  }

  /**
   * Auto-Know: Detect vendor type from headers and content (enhanced detection)
   */
  detectVendorType(headers, filename) {
    const filenameLower = filename.toLowerCase();
    const headerStr = headers.join(' ').toLowerCase();
    
    console.log('Auto-Know: Detecting vendor type...', { filename, headers: headers.slice(0, 10) });

    // Amazon detection (enhanced)
    if (filenameLower.includes('amazon') || 
        headerStr.includes('amazon') ||
        headerStr.includes('asin') ||
        headerStr.includes('order id') ||
        headerStr.includes('order date') ||
        headerStr.includes('purchase date') ||
        headerStr.includes('order number') ||
        headerStr.includes('shipment date')) {
      console.log('Auto-Know: Detected Amazon format');
      return 'amazon';
    }
    
    // eBay detection (enhanced)
    if (filenameLower.includes('ebay') || 
        headerStr.includes('ebay') ||
        headerStr.includes('item title') ||
        headerStr.includes('sale date') ||
        headerStr.includes('sale price') ||
        headerStr.includes('item number') ||
        headerStr.includes('transaction id') ||
        headerStr.includes('buyer userid') ||
        headerStr.includes('seller userid')) {
      console.log('Auto-Know: Detected eBay format');
      return 'ebay';
    }
    
    // Home Depot detection
    if (filenameLower.includes('home depot') || 
        filenameLower.includes('homedepot') ||
        headerStr.includes('home depot') ||
        headerStr.includes('homedepot')) {
      console.log('Auto-Know: Detected Home Depot format');
      return 'homedepot';
    }
    
    // Lowe's detection
    if (filenameLower.includes("lowe's") || 
        filenameLower.includes('lowes') || 
        headerStr.includes("lowe") ||
        headerStr.includes('lowes')) {
      console.log('Auto-Know: Detected Lowe\'s format');
      return 'lowes';
    }
    
    // B&H detection
    if (filenameLower.includes('b&h') || 
        filenameLower.includes('bh') || 
        filenameLower.includes('b and h') ||
        headerStr.includes('b&h') ||
        headerStr.includes('bh photo')) {
      console.log('Auto-Know: Detected B&H format');
      return 'bh';
    }
    
    // Generic fallback with smart inference
    console.log('Auto-Know: Using generic mapper with smart inference');
    return 'generic';
  }

  /**
   * Get vendor-specific mapper function
   */
  getVendorMapper(vendorType) {
    const mappers = {
      amazon: this.mapAmazon.bind(this),
      ebay: this.mapEbay.bind(this),
      homedepot: this.mapHomeDepot.bind(this),
      lowes: this.mapLowes.bind(this),
      bh: this.mapBH.bind(this),
      generic: this.mapGeneric.bind(this)
    };
    return mappers[vendorType] || mappers.generic;
  }

  /**
   * Amazon CSV mapper with Auto-Know: Enhanced field detection
   */
  mapAmazon(headers, row) {
    const get = (names) => {
      for (const name of names) {
        const idx = headers.indexOf(name);
        if (idx >= 0 && row[idx]) return row[idx].trim();
      }
      return '';
    };

    // Auto-Know: Enhanced Amazon field detection
    const title = get([
      'title', 'product name', 'item name', 'name', 'description',
      'item title', 'product title', 'listing title'
    ]);
    const brand = get([
      'brand', 'manufacturer', 'seller', 'seller name',
      'manufacturer name', 'brand name'
    ]);
    const model = get([
      'model', 'model number', 'sku', 'asin', 'product id',
      'item number', 'upc', 'mpn', 'part number'
    ]);
    const price = get([
      'price', 'purchase price', 'total', 'amount', 'item subtotal',
      'item total', 'unit price', 'price paid', 'order total'
    ]);
    const date = get([
      'order date', 'purchase date', 'date', 'purchase date (utc)',
      'order date (utc)', 'shipment date', 'order date/time of purchase'
    ]);
    const category = get([
      'category', 'product category', 'department', 'department name',
      'category name', 'product group'
    ]);
    const condition = get([
      'condition', 'item condition', 'item condition (see details)',
      'product condition', 'condition type'
    ]);
    const notes = get([
      'notes', 'description', 'product description', 'item description',
      'additional info', 'comments'
    ]);

    return {
      title: title || 'Untitled Item',
      category: this.inferCategory(title, category),
      purpose: this.generatePurpose(title, notes, category),
      meta: {
        brand: brand || undefined,
        model: model || undefined,
        purchasePrice: this.parsePrice(price),
        purchaseDate: this.parseDate(date),
        condition: this.mapCondition(condition),
        tags: this.extractTags(title, notes, category)
      },
      specifications: {
        power: this.extractPower(title, notes)
      },
      status: 'available',
      notes: notes || undefined
    };
  }

  /**
   * eBay CSV mapper with Auto-Know: Enhanced field detection
   */
  mapEbay(headers, row) {
    const get = (names) => {
      for (const name of names) {
        const idx = headers.indexOf(name);
        if (idx >= 0 && row[idx]) return row[idx].trim();
      }
      return '';
    };

    // Auto-Know: Enhanced eBay field detection
    const title = get([
      'item title', 'title', 'name', 'item name', 'listing title',
      'product name', 'item description', 'description'
    ]);
    const price = get([
      'sale price', 'price', 'total price', 'amount', 'item price',
      'unit price', 'price paid', 'total cost', 'final value fee',
      'transaction price', 'sale amount'
    ]);
    const date = get([
      'sale date', 'purchase date', 'date', 'transaction date',
      'sale date/time', 'purchase date/time', 'order date'
    ]);
    const condition = get([
      'condition', 'item condition', 'item condition (see details)',
      'product condition', 'condition type', 'condition description'
    ]);
    const category = get([
      'category', 'item category', 'category name', 'department',
      'product category', 'store category'
    ]);
    const brand = get([
      'brand', 'manufacturer', 'seller', 'seller name'
    ]);
    const model = get([
      'model', 'model number', 'sku', 'mpn', 'part number',
      'item number', 'product id'
    ]);
    const notes = get([
      'notes', 'description', 'item description', 'product description',
      'additional info', 'comments', 'seller notes'
    ]);

    return {
      title: title || 'Untitled Item',
      category: this.inferCategory(title, category),
      purpose: this.generatePurpose(title, notes, category),
      meta: {
        brand: brand || undefined,
        model: model || undefined,
        purchasePrice: this.parsePrice(price),
        purchaseDate: this.parseDate(date),
        condition: this.mapCondition(condition),
        tags: this.extractTags(title, notes, category)
      },
      specifications: {
        power: this.extractPower(title, notes)
      },
      status: 'available',
      notes: notes || undefined
    };
  }

  /**
   * Home Depot CSV mapper
   */
  mapHomeDepot(headers, row) {
    const get = (names) => {
      for (const name of names) {
        const idx = headers.indexOf(name);
        if (idx >= 0 && row[idx]) return row[idx].trim();
      }
      return '';
    };

    const title = get(['product name', 'item', 'description', 'name']);
    const sku = get(['sku', 'item number', 'product id']);
    const price = get(['price', 'total', 'amount']);
    const category = get(['department', 'category', 'class']);
    const notes = get(['notes', 'description']);

    return {
      title: title || 'Untitled Item',
      category: this.inferCategory(title, category),
      purpose: this.generatePurpose(title, notes, category),
      meta: {
        model: sku || undefined,
        purchasePrice: this.parsePrice(price),
        tags: this.extractTags(title, notes, category)
      },
      specifications: {
        power: this.extractPower(title, notes)
      },
      status: 'available',
      notes: notes || undefined
    };
  }

  /**
   * Lowe's CSV mapper
   */
  mapLowes(headers, row) {
    return this.mapHomeDepot(headers, row); // Similar structure
  }

  /**
   * B&H CSV mapper
   */
  mapBH(headers, row) {
    const get = (names) => {
      for (const name of names) {
        const idx = headers.indexOf(name);
        if (idx >= 0 && row[idx]) return row[idx].trim();
      }
      return '';
    };

    const title = get(['product name', 'item', 'description', 'name']);
    const brand = get(['brand', 'manufacturer']);
    const model = get(['model', 'sku', 'mpn']);
    const price = get(['price', 'total', 'amount']);
    const category = get(['category', 'department']);
    const notes = get(['notes', 'description']);

    return {
      title: title || 'Untitled Item',
      category: this.inferCategory(title, category),
      purpose: this.generatePurpose(title, notes, category),
      meta: {
        brand: brand || undefined,
        model: model || undefined,
        purchasePrice: this.parsePrice(price),
        tags: this.extractTags(title, notes, category)
      },
      specifications: {
        power: this.extractPower(title, notes)
      },
      status: 'available',
      notes: notes || undefined
    };
  }

  /**
   * Generic CSV mapper with Auto-Know: Smart field detection
   */
  mapGeneric(headers, row) {
    const get = (names) => {
      for (const name of names) {
        const idx = headers.indexOf(name);
        if (idx >= 0 && row[idx]) return row[idx].trim();
      }
      return '';
    };

    // Auto-Know: Try to find title/name in many possible column names
    const title = get([
      'title', 'name', 'item', 'product', 'description', 'item title', 
      'product name', 'item name', 'description', 'title/name',
      'product title', 'listing title', 'item description'
    ]);
    
    // Auto-Know: Try to find price
    const price = get([
      'price', 'total', 'amount', 'cost', 'purchase price', 
      'sale price', 'total price', 'item price', 'unit price',
      'price paid', 'total cost', 'order total'
    ]);
    
    // Auto-Know: Try to find date
    const date = get([
      'date', 'order date', 'purchase date', 'sale date',
      'transaction date', 'shipment date', 'purchase date (utc)',
      'order date (utc)', 'date purchased', 'date ordered'
    ]);
    
    // Auto-Know: Try to find brand/manufacturer
    const brand = get([
      'brand', 'manufacturer', 'seller', 'vendor', 'maker',
      'company', 'manufacturer name', 'brand name'
    ]);
    
    // Auto-Know: Try to find model/SKU
    const model = get([
      'model', 'sku', 'model number', 'item number', 'product id',
      'asin', 'upc', 'mpn', 'part number', 'item id', 'product sku'
    ]);
    
    // Auto-Know: Try to find category
    const category = get([
      'category', 'type', 'department', 'class', 'item category',
      'product category', 'department name', 'category name'
    ]);
    
    // Auto-Know: Try to find condition
    const condition = get([
      'condition', 'item condition', 'product condition', 'status',
      'quality', 'state', 'item condition (see details)'
    ]);
    
    // Auto-Know: Try to find notes/description
    const notes = get([
      'notes', 'description', 'details', 'item description',
      'product description', 'notes/comments', 'additional info'
    ]);

    return {
      title: title || 'Untitled Item',
      category: this.inferCategory(title, category),
      purpose: this.generatePurpose(title, notes, category),
      meta: {
        brand: brand || undefined,
        model: model || undefined,
        purchasePrice: this.parsePrice(price),
        purchaseDate: this.parseDate(date),
        condition: this.mapCondition(condition),
        tags: this.extractTags(title, notes, category)
      },
      specifications: {
        power: this.extractPower(title, notes)
      },
      status: 'available',
      notes: notes || undefined
    };
  }

  /**
   * Map generic JSON object
   */
  mapGenericJSON(item) {
    return {
      title: item.title || item.name || item.product || 'Untitled Item',
      category: this.inferCategory(item.title || item.name, item.category),
      purpose: this.generatePurpose(item.title || item.name, item.description || item.notes, item.category),
      meta: {
        brand: item.brand || item.manufacturer,
        model: item.model || item.sku,
        purchasePrice: typeof item.price === 'number' ? item.price : this.parsePrice(item.price),
        purchaseDate: item.purchaseDate || item.date,
        condition: this.mapCondition(item.condition),
        tags: this.extractTags(item.title || item.name, item.description, item.category)
      },
      specifications: {
        power: item.power || this.extractPower(item.title || item.name, item.description),
        dimensions: item.dimensions,
        weight: item.weight,
        capacity: item.capacity
      },
      status: item.status || 'available',
      notes: item.notes || item.description
    };
  }

  /**
   * Infer category from title and category string
   */
  inferCategory(title, categoryStr) {
    const text = `${title || ''} ${categoryStr || ''}`.toLowerCase();
    
    if (/drill|driver|screwdriver|impact/i.test(text)) return 'tool';
    if (/saw|miter|circular|jig|recip/i.test(text)) return 'tool';
    if (/sander|grinder|router/i.test(text)) return 'tool';
    if (/printer|3d|cnc|laser/i.test(text)) return 'equipment';
    if (/camera|lens|photo|video/i.test(text)) return 'equipment';
    if (/router|network|switch|ethernet/i.test(text)) return 'equipment';
    if (/solar|power|battery|ups|inverter/i.test(text)) return 'equipment';
    if (/screw|bolt|nail|hardware|fastener/i.test(text)) return 'hardware';
    if (/software|app|program/i.test(text)) return 'software';
    if (/book|manual|guide|doc/i.test(text)) return 'documentation';
    if (/material|supply|consumable/i.test(text)) return 'consumable';
    
    return 'other';
  }

  /**
   * Generate purpose from title and description
   */
  generatePurpose(title, notes, category) {
    const text = `${title || ''} ${notes || ''} ${category || ''}`.toLowerCase();
    
    // Extract key features
    const features = [];
    if (/cordless|battery/i.test(text)) features.push('cordless operation');
    if (/compact|portable/i.test(text)) features.push('portable');
    if (/professional|pro/i.test(text)) features.push('professional grade');
    if (/heavy.?duty/i.test(text)) features.push('heavy duty');
    
    // Generate purpose
    let purpose = `Tool/equipment for ${title || 'general use'}`;
    if (features.length > 0) {
      purpose += `. Features: ${features.join(', ')}.`;
    }
    if (notes && notes.length > 20) {
      purpose += ` ${notes.substring(0, 200)}`;
    }
    
    return purpose.substring(0, 500);
  }

  /**
   * Extract tags from text
   */
  extractTags(title, notes, category) {
    const tags = [];
    const text = `${title || ''} ${notes || ''} ${category || ''}`.toLowerCase();
    
    if (/cordless|battery/i.test(text)) tags.push('cordless');
    if (/compact|portable/i.test(text)) tags.push('portable');
    if (/professional|pro/i.test(text)) tags.push('professional');
    if (/heavy.?duty/i.test(text)) tags.push('heavy-duty');
    if (/led|light/i.test(text)) tags.push('led');
    if (/brushless/i.test(text)) tags.push('brushless');
    
    return tags.length > 0 ? tags : undefined;
  }

  /**
   * Extract power requirements
   */
  extractPower(title, notes) {
    const text = `${title || ''} ${notes || ''}`.toLowerCase();
    
    const powerMatch = text.match(/(\d+)\s*(v|volt|w|watt|amp)/i);
    if (powerMatch) {
      return `${powerMatch[1]}${powerMatch[2].toUpperCase()}`;
    }
    
    if (/battery|cordless/i.test(text)) return 'Battery';
    if (/usb/i.test(text)) return 'USB';
    if (/ac|110|120|220|240/i.test(text)) return 'AC';
    if (/dc/i.test(text)) return 'DC';
    
    return undefined;
  }

  /**
   * Parse price string to number
   */
  parsePrice(priceStr) {
    if (!priceStr) return undefined;
    const match = priceStr.toString().match(/[\d,]+\.?\d*/);
    if (match) {
      return parseFloat(match[0].replace(/,/g, ''));
    }
    return undefined;
  }

  /**
   * Parse date string
   */
  parseDate(dateStr) {
    if (!dateStr) return undefined;
    try {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    } catch (e) {}
    return undefined;
  }

  /**
   * Map condition string to schema enum
   */
  mapCondition(condition) {
    if (!condition) return undefined;
    const c = condition.toLowerCase();
    if (/new|unused/i.test(c)) return 'new';
    if (/excellent|like new|mint/i.test(c)) return 'excellent';
    if (/good|great|fine/i.test(c)) return 'good';
    if (/fair|used|ok/i.test(c)) return 'fair';
    if (/poor|bad|worn/i.test(c)) return 'poor';
    if (/repair|broken|damaged/i.test(c)) return 'needs-repair';
    return undefined;
  }

  /**
   * Normalize resource to ensure required fields (Auto-Heal)
   * This function automatically fixes missing or invalid data
   */
  normalizeResource(resource) {
    if (!this.autoHealEnabled) return resource;
    
    // Auto-Fit: Ensure required fields exist
    if (!resource.title) resource.title = 'Untitled Item';
    if (!resource.category) resource.category = this.inferCategory(resource.title, '');
    if (!resource.purpose) {
      resource.purpose = this.generatePurpose(resource.title, resource.notes || '', resource.category);
    }
    
    // Auto-Heal: Fix purpose length
    if (resource.purpose.length < 10) {
      resource.purpose = resource.purpose + '. General purpose tool/equipment.';
    }
    if (resource.purpose.length > 500) {
      resource.purpose = resource.purpose.substring(0, 497) + '...';
    }
    
    // Auto-Heal: Ensure meta object exists
    if (!resource.meta) resource.meta = {};
    
    // Auto-Heal: Infer missing metadata
    if (!resource.meta.condition && resource.title) {
      // Try to infer condition from title/notes
      const text = `${resource.title} ${resource.notes || ''}`.toLowerCase();
      if (/new|unused/i.test(text)) resource.meta.condition = 'new';
      else if (/excellent|like new/i.test(text)) resource.meta.condition = 'excellent';
      else if (/good|great/i.test(text)) resource.meta.condition = 'good';
      else resource.meta.condition = 'good'; // Default
    }
    
    // Auto-Heal: Infer location if missing
    if (!resource.meta.location && resource.title) {
      // Use auto-bin logic to suggest location
      resource.meta.location = this.inferLocation(resource.title, resource.category);
    }
    
    // Auto-Heal: Extract tags if missing
    if (!resource.meta.tags || resource.meta.tags.length === 0) {
      resource.meta.tags = this.extractTags(resource.title, resource.notes || '', resource.category);
    }
    
    // Auto-Heal: Ensure specifications object
    if (!resource.specifications) resource.specifications = {};
    
    // Auto-Heal: Infer power if missing
    if (!resource.specifications.power) {
      const power = this.extractPower(resource.title, resource.notes || '');
      if (power) resource.specifications.power = power;
    }
    
    // Auto-Born: Add timestamps
    const now = new Date().toISOString();
    resource.createdAt = resource.createdAt || now;
    resource.updatedAt = now;
    
    // Auto-Born: Generate ID if missing
    if (!resource.id) {
      resource.id = resource.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 50);
    }
    
    // Auto-Born: Set default status
    if (!resource.status) resource.status = 'available';
    
    return resource;
  }

  /**
   * Infer location/bin from resource title and category (Auto-Fit)
   */
  inferLocation(title, category) {
    const text = `${title || ''} ${category || ''}`.toLowerCase();
    
    // Match patterns similar to autoBin logic
    if (/drill|driver|screwdriver|impact/i.test(text)) return 'Bin 1';
    if (/saw|miter|circular|jig|recip/i.test(text)) return 'Bin 2';
    if (/sander|grinder|router/i.test(text)) return 'Bin 3';
    if (/printer|3d|cnc|laser/i.test(text)) return 'Main desk';
    if (/camera|lens|photo|video/i.test(text)) return 'Case';
    if (/router|network|switch|ethernet/i.test(text)) return 'Net bin';
    if (/solar|power|battery|ups|inverter/i.test(text)) return 'Power cart';
    if (/planter|compost|soil|garden/i.test(text)) return 'Yard';
    if (/scanner|obd|diagnostic/i.test(text)) return 'Car kit';
    if (/hammer|mallet|pliers|wrench|socket/i.test(text)) return 'Bin 1';
    
    return 'Bin 1'; // Default
  }

  /**
   * Parse CSV with quote handling
   */
  parseCSV(text) {
    return text.split(/\r?\n/).filter(r => r.trim().length > 0).map(line => {
      let out = [], cur = '', q = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (q && line[i + 1] === '"') {
            cur += '"';
            i++;
          } else {
            q = !q;
          }
        } else if (ch === ',' && !q) {
          out.push(cur);
          cur = '';
        } else {
          cur += ch;
        }
      }
      out.push(cur);
      return out;
    });
  }

  /**
   * Ensure JSZip is loaded (Auto-Know: Load ZIP library)
   */
  async ensureJSZip() {
    if (window.JSZip) {
      console.log('Auto-Know: JSZip already loaded');
      return;
    }
    
    console.log('Auto-Know: Loading JSZip library...');
    
    return new Promise((resolve, reject) => {
      // Check if script already exists
      const existingScript = document.querySelector('script[src*="jszip"]');
      if (existingScript) {
        existingScript.addEventListener('load', () => {
          if (window.JSZip) {
            console.log('Auto-Know: JSZip loaded from existing script');
            resolve();
          } else {
            reject(new Error('JSZip failed to load'));
          }
        });
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
      script.onload = () => {
        if (window.JSZip) {
          console.log('Auto-Know: JSZip loaded successfully');
          resolve();
        } else {
          console.error('Auto-Know: JSZip script loaded but window.JSZip not available');
          reject(new Error('JSZip failed to initialize'));
        }
      };
      script.onerror = () => {
        console.error('Auto-Know: Failed to load JSZip from CDN');
        reject(new Error('Failed to load JSZip library'));
      };
      document.head.appendChild(script);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        if (!window.JSZip) {
          reject(new Error('JSZip loading timeout'));
        }
      }, 10000);
    });
  }
}

// Export
window.VendorImporter = VendorImporter;


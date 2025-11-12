/**
 * LearnMappers PWA — Home Depot Vendor Mapper
 * 
 * Dedicated mapper for Home Depot purchase history and receipt data imports
 * Handles Home Depot-specific CSV formats and field mappings
 */

class HomeDepotMapper {
  constructor() {
    this.vendorName = 'Home Depot';
    this.supportedFormats = ['csv', 'txt'];
    this.requiredFields = ['product name', 'price'];
  }

  /**
   * Detect if this file is from Home Depot
   */
  detect(headers, filename) {
    const filenameLower = filename.toLowerCase();
    const headerStr = headers.join(' ').toLowerCase();
    
    return (
      filenameLower.includes('home depot') || 
      filenameLower.includes('homedepot') ||
      headerStr.includes('home depot') ||
      headerStr.includes('homedepot') ||
      headerStr.includes('the home depot')
    );
  }

  /**
   * Map Home Depot CSV row to resource schema
   */
  map(headers, row) {
    const get = (names) => {
      for (const name of names) {
        const idx = headers.indexOf(name);
        if (idx >= 0 && row[idx]) return row[idx].trim();
      }
      return '';
    };

    // Home Depot-specific field detection
    const title = get([
      'product name', 'item', 'description', 'name', 'product description',
      'item name', 'product title', 'item description'
    ]);
    const sku = get([
      'sku', 'item number', 'product id', 'item id', 'product sku',
      'item sku', 'sku number'
    ]);
    const price = get([
      'price', 'total', 'amount', 'item price', 'unit price',
      'price paid', 'purchase price', 'item total', 'total price'
    ]);
    const category = get([
      'department', 'category', 'class', 'product category',
      'department name', 'category name', 'product department'
    ]);
    const notes = get([
      'notes', 'description', 'item description', 'product description',
      'additional info', 'comments'
    ]);
    const brand = get([
      'brand', 'manufacturer', 'vendor', 'manufacturer name',
      'brand name', 'vendor name'
    ]);
    const quantity = get([
      'quantity', 'qty', 'quantity purchased', 'item quantity'
    ]);
    const date = get([
      'purchase date', 'order date', 'date', 'transaction date',
      'receipt date', 'sale date'
    ]);
    
    // Home Depot-specific transaction ID extraction
    const transactionId = get([
      'order id', 'order number', 'transaction id', 'transaction number',
      'purchase id', 'order id', 'order#', 'transaction#', 'invoice number',
      'receipt number', 'confirmation number', 'receipt id', 'receipt number'
    ]);

    // Parse price
    const parsedPrice = this.parsePrice(price);
    
    // Parse date
    const parsedDate = this.parseDate(date);

    return {
      title: title || 'Untitled Home Depot Item',
      name: title || 'Untitled Home Depot Item',
      category: this.inferCategory(title, category),
      type: this.inferType(title, category),
      description: notes || title || '',
      purpose: this.generatePurpose(title, notes, category),
      meta: {
        brand: brand || undefined,
        model: sku || undefined,
        sku: sku || undefined,
        purchasePrice: parsedPrice,
        purchaseDate: parsedDate,
        quantity: quantity ? parseInt(quantity, 10) : undefined,
        tags: this.extractTags(title, notes, category),
        transactionId: transactionId || undefined,
        orderId: transactionId || undefined,
        orderNumber: transactionId || undefined,
        vendor: 'Home Depot'
      },
      specifications: {
        power: this.extractPower(title, notes)
      },
      status: 'available',
      notes: notes || undefined,
      _vendor: 'homedepot',
      _source: 'homedepot-import'
    };
  }

  /**
   * Helper: Parse price string to number
   */
  parsePrice(priceStr) {
    if (!priceStr) return undefined;
    const cleaned = priceStr.toString().replace(/[$,\s]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? undefined : num;
  }

  /**
   * Helper: Parse date string to ISO format
   */
  parseDate(dateStr) {
    if (!dateStr) return undefined;
    try {
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? undefined : date.toISOString().split('T')[0];
    } catch (e) {
      return undefined;
    }
  }

  /**
   * Helper: Infer category from title and category field
   */
  inferCategory(title, category) {
    const combined = `${title} ${category}`.toLowerCase();
    if (combined.includes('tool') || combined.includes('drill') || combined.includes('saw')) return 'tool';
    if (combined.includes('equipment') || combined.includes('machine')) return 'equipment';
    if (combined.includes('material') || combined.includes('supply') || combined.includes('hardware')) return 'material';
    if (combined.includes('document') || combined.includes('book')) return 'document';
    return category || 'other';
  }

  /**
   * Helper: Infer type from title and category
   */
  inferType(title, category) {
    const combined = `${title} ${category}`.toLowerCase();
    if (combined.includes('tool')) return 'tool';
    if (combined.includes('equipment')) return 'equipment';
    if (combined.includes('material') || combined.includes('hardware')) return 'material';
    if (combined.includes('document')) return 'document';
    return 'other';
  }

  /**
   * Helper: Generate purpose from available data
   */
  generatePurpose(title, notes, category) {
    if (notes && notes.length > 20) return notes.substring(0, 200);
    if (title && title.length > 20) return title;
    return `Purchased from Home Depot${category ? ` in ${category}` : ''}`;
  }

  /**
   * Helper: Extract tags from title, notes, category
   */
  extractTags(title, notes, category) {
    const tags = [];
    if (category) tags.push(category);
    const combined = `${title} ${notes}`.toLowerCase();
    if (combined.includes('cordless') || combined.includes('battery')) tags.push('cordless');
    if (combined.includes('corded') || combined.includes('electric')) tags.push('corded');
    if (combined.includes('professional') || combined.includes('pro')) tags.push('professional');
    if (combined.includes('outdoor') || combined.includes('garden')) tags.push('outdoor');
    if (combined.includes('indoor')) tags.push('indoor');
    return tags.length > 0 ? tags : undefined;
  }

  /**
   * Helper: Extract power specifications
   */
  extractPower(title, notes) {
    const combined = `${title} ${notes}`.toLowerCase();
    const voltageMatch = combined.match(/(\d+)\s*v(?:olt)?/i);
    if (voltageMatch) return `${voltageMatch[1]}V`;
    if (combined.includes('battery')) return 'Battery';
    if (combined.includes('corded') || combined.includes('electric')) return 'Corded';
    return undefined;
  }
}

// Export for use in vendor-importer.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HomeDepotMapper;
} else {
  window.HomeDepotMapper = HomeDepotMapper;
}


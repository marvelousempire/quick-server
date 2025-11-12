/**
 * LearnMappers PWA — eBay Vendor Mapper
 * 
 * Dedicated mapper for eBay purchase history and order data imports
 * Handles eBay-specific CSV formats, ZIP file extraction, and field mappings
 */

class EbayMapper {
  constructor() {
    this.vendorName = 'eBay';
    this.supportedFormats = ['csv', 'txt', 'zip', 'html'];
    this.requiredFields = ['item title', 'sale price'];
  }

  /**
   * Detect if this file is from eBay
   */
  detect(headers, filename) {
    const filenameLower = filename.toLowerCase();
    const headerStr = headers.join(' ').toLowerCase();
    
    return (
      filenameLower.includes('ebay') || 
      headerStr.includes('ebay') ||
      headerStr.includes('item title') ||
      headerStr.includes('sale date') ||
      headerStr.includes('sale price') ||
      headerStr.includes('item number') ||
      headerStr.includes('transaction id') ||
      headerStr.includes('buyer userid') ||
      headerStr.includes('seller userid')
    );
  }

  /**
   * Map eBay HTML table row to resource schema
   */
  mapHTML(htmlRow) {
    // Parse HTML table row - handle nested tags and whitespace
    const cellMatches = htmlRow.matchAll(/<td[^>]*>(.*?)<\/td>/gis);
    const data = [];
    
    for (const match of cellMatches) {
      let cellContent = match[1];
      // Remove all HTML tags
      cellContent = cellContent.replace(/<[^>]+>/g, '');
      // Clean up whitespace (multiple spaces, newlines, tabs)
      cellContent = cellContent.replace(/\s+/g, ' ').trim();
      data.push(cellContent);
    }
    
    // eBay HTML structure: Purchase Date, Item Id, Listing Title, Individual Price, Quantity, Transaction Shipping Fee, Total Price, Currency, Seller Name
    const purchaseDate = data[0] || '';
    const itemId = data[1] || '';
    const listingTitle = data[2] || '';
    const individualPrice = data[3] || '';
    const quantity = data[4] || '1';
    const shippingFee = data[5] || '';
    const totalPrice = data[6] || '';
    const currency = data[7] || 'USD';
    const sellerName = data[8] || '';
    
    console.log('eBay HTML row parsed:', { purchaseDate, itemId, listingTitle: listingTitle.substring(0, 50), individualPrice, quantity, totalPrice, sellerName });
    
    return this.mapFromData({
      title: listingTitle,
      itemId: itemId,
      price: individualPrice,
      totalPrice: totalPrice,
      shipping: shippingFee,
      date: purchaseDate,
      quantity: quantity,
      currency: currency,
      sellerName: sellerName
    });
  }

  /**
   * Map eBay CSV row to resource schema
   */
  map(headers, row) {
    const get = (names) => {
      for (const name of names) {
        const idx = headers.indexOf(name);
        if (idx >= 0 && row[idx]) return row[idx].trim();
      }
      return '';
    };

    // eBay-specific field detection
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
    const itemNumber = get([
      'item number', 'item id', 'listing id', 'ebay item number'
    ]);
    
    // eBay-specific transaction ID extraction
    const transactionId = get([
      'order id', 'order number', 'transaction id', 'transaction number',
      'purchase id', 'order id', 'order#', 'transaction#', 'invoice number',
      'receipt number', 'confirmation number'
    ]);

    return this.mapFromData({
      title: title,
      itemId: itemNumber,
      price: price,
      date: date,
      quantity: get(['quantity', 'qty']),
      condition: condition,
      category: category,
      brand: brand,
      model: model,
      notes: notes,
      transactionId: transactionId,
      sellerName: brand || get(['seller name', 'seller'])
    });
  }

  /**
   * Map from structured data (used by both CSV and HTML mappers)
   */
  mapFromData(data) {
    const title = data.title || 'Untitled eBay Item';
    const price = data.price || data.totalPrice || '';
    const date = data.date || '';
    const quantity = data.quantity || '1';
    const shipping = data.shipping || '';
    const currency = data.currency || 'USD';
    
    // Parse prices
    const parsedPrice = this.parsePrice(price);
    const parsedTotalPrice = this.parsePrice(data.totalPrice || price);
    const parsedShipping = this.parsePrice(shipping);
    
    // Parse date
    const parsedDate = this.parseDate(date);

    return {
      title: title,
      name: title,
      category: this.inferCategory(title, data.category),
      type: this.inferType(title, data.category),
      description: this.buildDescription(title, data.notes, data.category),
      purpose: this.generatePurpose(title, data.notes, data.category),
      brand: data.brand || undefined,
      model: data.model || data.itemId || undefined,
      serialNumber: data.itemId || data.model || undefined,
      meta: {
        // Core identification
        brand: data.brand || undefined,
        manufacturer: data.brand || undefined,
        model: data.model || undefined,
        sku: data.itemId || data.model || undefined,
        itemNumber: data.itemId || undefined,
        itemId: data.itemId || undefined,
        
        // Pricing information
        purchasePrice: parsedPrice,
        totalPrice: parsedTotalPrice,
        shipping: parsedShipping,
        currency: currency || 'USD',
        
        // Purchase details
        purchaseDate: parsedDate,
        quantity: quantity ? parseInt(quantity, 10) : 1,
        condition: this.mapCondition(data.condition),
        
        // Transaction tracking
        transactionId: data.transactionId || data.itemId || undefined,
        orderId: data.transactionId || data.itemId || undefined,
        orderNumber: data.transactionId || data.itemId || undefined,
        
        // Seller information
        vendor: 'eBay',
        sellerName: data.sellerName || undefined,
        
        // Categorization
        category: data.category || undefined,
        
        // Tags and metadata
        tags: this.extractTags(title, data.notes, data.category)
      },
      specifications: {
        power: this.extractPower(title, data.notes),
        dimensions: this.extractDimensions(title, data.notes),
        weight: this.extractWeight(title, data.notes),
        capacity: this.extractCapacity(title, data.notes)
      },
      status: 'available',
      notes: this.buildNotes(data.notes, date, data.sellerName),
      lastUsed: parsedDate || undefined,
      _vendor: 'ebay',
      _source: 'ebay-import',
      _sourceFile: data._sourceFile || undefined
    };
  }

  /**
   * Helper: Build comprehensive description
   */
  buildDescription(title, notes, category) {
    const parts = [];
    if (title) parts.push(title);
    if (category) parts.push(`Category: ${category}`);
    if (notes) parts.push(notes);
    return parts.join('. ') || title || '';
  }

  /**
   * Helper: Build comprehensive notes
   */
  buildNotes(notes, date, sellerName) {
    const parts = [];
    if (notes) parts.push(notes);
    if (date) parts.push(`Purchase Date: ${date}`);
    if (sellerName) parts.push(`Seller: ${sellerName}`);
    return parts.length > 0 ? parts.join(' | ') : undefined;
  }

  /**
   * Helper: Extract dimensions from title/notes
   */
  extractDimensions(title, notes) {
    const text = `${title} ${notes}`.toLowerCase();
    const dimMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:x|×)\s*(\d+(?:\.\d+)?)(?:\s*(?:x|×)\s*(\d+(?:\.\d+)?))?\s*(in|inch|cm|mm|ft|feet)/i);
    if (dimMatch) {
      return `${dimMatch[1]}${dimMatch[4]} x ${dimMatch[2]}${dimMatch[4]}${dimMatch[3] ? ` x ${dimMatch[3]}${dimMatch[4]}` : ''}`;
    }
    return undefined;
  }

  /**
   * Helper: Extract weight from title/notes
   */
  extractWeight(title, notes) {
    const text = `${title} ${notes}`.toLowerCase();
    const weightMatch = text.match(/(\d+(?:\.\d+)?)\s*(lb|lbs|oz|kg|g|pound|ounce)/i);
    if (weightMatch) {
      return `${weightMatch[1]} ${weightMatch[2]}`;
    }
    return undefined;
  }

  /**
   * Helper: Extract capacity from title/notes
   */
  extractCapacity(title, notes) {
    const text = `${title} ${notes}`.toLowerCase();
    const capacityMatch = text.match(/(\d+(?:\.\d+)?)\s*(gal|gallon|l|liter|ml|oz|cup|qt|quart)/i);
    if (capacityMatch) {
      return `${capacityMatch[1]} ${capacityMatch[2]}`;
    }
    return undefined;
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
      // eBay dates are often in format: "Dec 15, 2024 10:30 AM PST"
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
    if (combined.includes('material') || combined.includes('supply')) return 'material';
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
    if (combined.includes('material')) return 'material';
    if (combined.includes('document')) return 'document';
    return 'other';
  }

  /**
   * Helper: Generate purpose from available data
   */
  generatePurpose(title, notes, category) {
    if (notes && notes.length > 20) return notes.substring(0, 200);
    if (title && title.length > 20) return title;
    return `Purchased from eBay${category ? ` in ${category}` : ''}`;
  }

  /**
   * Helper: Map condition string to standard format
   */
  mapCondition(condition) {
    if (!condition) return undefined;
    const cond = condition.toLowerCase();
    if (cond.includes('new')) return 'new';
    if (cond.includes('used') || cond.includes('pre-owned')) return 'used';
    if (cond.includes('refurbished') || cond.includes('refurb')) return 'refurbished';
    if (cond.includes('for parts') || cond.includes('not working')) return 'for-parts';
    return condition;
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
  module.exports = EbayMapper;
} else {
  window.EbayMapper = EbayMapper;
}


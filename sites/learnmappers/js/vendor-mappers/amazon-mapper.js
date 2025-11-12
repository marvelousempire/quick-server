/**
 * LearnMappers PWA — Amazon Vendor Mapper
 * 
 * Dedicated mapper for Amazon order history and purchase data imports
 * Handles Amazon-specific CSV formats, field names, and data structures
 */

class AmazonMapper {
  constructor() {
    this.vendorName = 'Amazon';
    this.supportedFormats = ['csv', 'json'];
    this.requiredFields = ['title', 'price'];
  }

  /**
   * Detect if this file is from Amazon
   */
  detect(headers, filename) {
    const filenameLower = filename.toLowerCase();
    const headerStr = headers.join(' ').toLowerCase();
    
    return (
      filenameLower.includes('amazon') || 
      headerStr.includes('amazon') ||
      headerStr.includes('asin') ||
      headerStr.includes('order id') ||
      headerStr.includes('order date') ||
      headerStr.includes('purchase date') ||
      headerStr.includes('order number') ||
      headerStr.includes('shipment date')
    );
  }

  /**
   * Map Amazon CSV row to resource schema
   */
  map(headers, row) {
    const get = (names) => {
      for (const name of names) {
        const idx = headers.indexOf(name);
        if (idx >= 0 && row[idx]) return row[idx].trim();
      }
      return '';
    };

    // Amazon-specific field detection
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
      'item number', 'upc', 'mpn', 'part number',
      'item model number', 'part number', 'national stock number'
    ]);
    const price = get([
      'price', 'purchase price', 'total', 'amount', 'item subtotal',
      'item total', 'unit price', 'price paid', 'order total',
      'purchase ppu', 'item net total', 'order net total', 'item subtotal',
      'purchase price per unit', 'net total', 'item price'
    ]);
    const date = get([
      'order date', 'purchase date', 'date', 'purchase date (utc)',
      'order date (utc)', 'shipment date', 'order date/time of purchase'
    ]);
    const category = get([
      'category', 'department', 'product category', 'item category',
      'product group', 'product type', 'store category'
    ]);
    const quantity = get([
      'quantity', 'qty', 'quantity purchased', 'item quantity'
    ]);
    const condition = get([
      'condition', 'item condition', 'product condition', 'condition type'
    ]);
    const notes = get([
      'notes', 'description', 'item description', 'product description',
      'additional info', 'comments', 'seller notes'
    ]);
    
    // Amazon-specific transaction ID extraction
    const transactionId = get([
      'order id', 'order number', 'amazon order id', 'order-id',
      'order id (amazon)', 'order number (amazon)', 'order-id',
      'receipt number', 'confirmation number'
    ]);
    const asin = get(['asin', 'amazon standard identification number']);

    // Extract ALL Amazon-specific fields
    const orderDate = get(['order date', 'purchase date', 'date']);
    const orderId = get(['order id', 'order number', 'amazon order id']);
    const accountGroup = get(['account group']);
    const poNumber = get(['po number']);
    const currency = get(['currency']) || 'USD';
    const orderSubtotal = get(['order subtotal']);
    const orderShipping = get(['order shipping & handling', 'order shipping', 'shipping']);
    const orderPromotion = get(['order promotion', 'promotion']);
    const orderTax = get(['order tax', 'tax']);
    const orderNetTotal = get(['order net total', 'order total']);
    const orderStatus = get(['order status', 'status']);
    const unspsc = get(['unspsc']);
    const segment = get(['segment']);
    const family = get(['family']);
    const commodity = get(['commodity']);
    const brandCode = get(['brand code']);
    const nationalStockNumber = get(['national stock number', 'nsn']);
    const itemModelNumber = get(['item model number', 'model number']);
    const partNumber = get(['part number']);
    const listedPPU = get(['listed ppu', 'listed price']);
    const purchasePPU = get(['purchase ppu', 'purchase price per unit']);
    const itemSubtotal = get(['item subtotal']);
    const itemShipping = get(['item shipping & handling', 'item shipping']);
    const itemPromotion = get(['item promotion']);
    const itemTax = get(['item tax']);
    const itemNetTotal = get(['item net total']);
    const poLineItemId = get(['po line item id']);
    const taxExemptionApplied = get(['tax exemption applied']);
    const pricingSavingsProgram = get(['pricing savings program']);
    const discountApplied = get(['pricing discount applied', 'discount applied']);
    const sellerName = get(['seller name']);
    const sellerCity = get(['seller city']);
    const sellerState = get(['seller state']);
    const sellerZip = get(['seller zipcode', 'seller zip']);
    const receivedDate = get(['received date']);
    const receiverName = get(['receiver name']);
    const department = get(['department']);
    const costCenter = get(['cost center']);
    const projectCode = get(['project code']);
    const location = get(['location']);
    const customField1 = get(['custom field 1']);

    // Parse prices
    const parsedPurchasePrice = this.parsePrice(purchasePPU || price);
    const parsedItemNetTotal = this.parsePrice(itemNetTotal);
    const parsedOrderNetTotal = this.parsePrice(orderNetTotal);
    const parsedListedPrice = this.parsePrice(listedPPU);
    const parsedShipping = this.parsePrice(itemShipping || orderShipping);
    const parsedTax = this.parsePrice(itemTax || orderTax);
    const parsedDiscount = this.parsePrice(discountApplied || itemPromotion || orderPromotion);
    
    // Parse date
    const parsedDate = this.parseDate(orderDate || date);
    const parsedReceivedDate = this.parseDate(receivedDate);

    // Build comprehensive resource object with ALL data
    return {
      title: title || 'Untitled Amazon Item',
      name: title || 'Untitled Amazon Item',
      category: this.inferCategory(title, category, segment, family, commodity),
      type: this.inferType(title, category, segment),
      description: this.buildDescription(title, notes, segment, family, commodity),
      purpose: this.generatePurpose(title, notes, category, segment, family),
      brand: brand || undefined,
      model: model || itemModelNumber || asin || undefined,
      serialNumber: asin || itemModelNumber || partNumber || undefined,
      meta: {
        // Core identification
        brand: brand || undefined,
        brandCode: brandCode || undefined,
        manufacturer: get(['manufacturer']) || brand || undefined,
        model: model || itemModelNumber || undefined,
        sku: asin || model || itemModelNumber || undefined,
        asin: asin || undefined,
        partNumber: partNumber || undefined,
        nationalStockNumber: nationalStockNumber || undefined,
        unspsc: unspsc ? unspsc.replace(/[="]/g, '') : undefined,
        
        // Pricing information
        purchasePrice: parsedPurchasePrice,
        listedPrice: parsedListedPrice,
        itemNetTotal: parsedItemNetTotal,
        orderNetTotal: parsedOrderNetTotal,
        shipping: parsedShipping,
        tax: parsedTax,
        discount: parsedDiscount,
        currency: currency || 'USD',
        msrp: parsedListedPrice, // Listed PPU as MSRP
        
        // Purchase details
        purchaseDate: parsedDate,
        receivedDate: parsedReceivedDate,
        quantity: quantity ? parseInt(quantity, 10) : undefined,
        condition: this.mapCondition(condition),
        
        // Transaction tracking
        transactionId: transactionId || orderId || undefined,
        orderId: orderId || undefined,
        orderNumber: orderId || undefined,
        poNumber: poNumber || undefined,
        poLineItemId: poLineItemId || undefined,
        
        // Order details
        orderStatus: orderStatus || undefined,
        accountGroup: accountGroup || undefined,
        paymentReferenceId: get(['payment reference id']) || undefined,
        paymentDate: this.parseDate(get(['payment date'])) || undefined,
        paymentAmount: this.parsePrice(get(['payment amount'])) || undefined,
        paymentInstrumentType: get(['payment instrument type']) || undefined,
        
        // Seller information
        vendor: 'Amazon',
        sellerName: sellerName || undefined,
        sellerCity: sellerCity || undefined,
        sellerState: sellerState || undefined,
        sellerZip: sellerZip ? sellerZip.replace(/[="]/g, '') : undefined,
        
        // Categorization
        amazonCategory: get(['amazon-internal product category']) || category || undefined,
        segment: segment || undefined,
        family: family || undefined,
        commodity: commodity || undefined,
        
        // Receiving information
        receiverName: receiverName || undefined,
        receivedQuantity: get(['received quantity']) || undefined,
        receivingStatus: get(['receiving status', 'order receiving status']) || undefined,
        
        // Organizational
        department: department || undefined,
        costCenter: costCenter || undefined,
        projectCode: projectCode || undefined,
        location: location || undefined,
        customField1: customField1 || undefined,
        
        // Compliance
        taxExemptionApplied: taxExemptionApplied || undefined,
        taxExemptionType: get(['tax exemption type']) || undefined,
        companyCompliance: get(['company compliance']) || undefined,
        
        // Tags and metadata
        tags: this.extractTags(title, notes, category, segment, family, commodity),
        pricingSavingsProgram: pricingSavingsProgram || undefined
      },
      specifications: {
        power: this.extractPower(title, notes),
        dimensions: this.extractDimensions(title, notes),
        weight: this.extractWeight(title, notes),
        capacity: this.extractCapacity(title, notes)
      },
      status: orderStatus && orderStatus.toLowerCase().includes('closed') ? 'available' : 'pending',
      notes: this.buildNotes(notes, orderStatus, receivedDate, receiverName),
      lastUsed: parsedReceivedDate || parsedDate || undefined,
      _vendor: 'amazon',
      _source: 'amazon-import',
      _sourceFile: get(['_sourceFile']) || undefined
    };
  }

  /**
   * Helper: Parse price string to number
   */
  parsePrice(priceStr) {
    if (!priceStr) return undefined;
    // Remove currency symbols, commas, and whitespace
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
   * Helper: Infer category from title and category field (enhanced with Amazon categories)
   */
  inferCategory(title, category, segment, family, commodity) {
    const combined = `${title} ${category} ${segment} ${family} ${commodity}`.toLowerCase();
    if (combined.includes('tool') || combined.includes('drill') || combined.includes('saw') || combined.includes('hardware')) return 'tool';
    if (combined.includes('equipment') || combined.includes('machine') || combined.includes('appliance')) return 'equipment';
    if (combined.includes('material') || combined.includes('supply') || combined.includes('consumable')) return 'material';
    if (combined.includes('document') || combined.includes('book') || combined.includes('manual')) return 'document';
    // Use Amazon's category structure if available
    if (commodity) return commodity.toLowerCase();
    if (family) return family.toLowerCase();
    if (segment) return segment.toLowerCase();
    return category || 'other';
  }

  /**
   * Helper: Infer type from title and category (enhanced)
   */
  inferType(title, category, segment) {
    const combined = `${title} ${category} ${segment}`.toLowerCase();
    if (combined.includes('tool')) return 'tool';
    if (combined.includes('equipment') || combined.includes('appliance')) return 'equipment';
    if (combined.includes('material') || combined.includes('supply')) return 'material';
    if (combined.includes('document') || combined.includes('book')) return 'document';
    return 'other';
  }

  /**
   * Helper: Build comprehensive description
   */
  buildDescription(title, notes, segment, family, commodity) {
    const parts = [];
    if (title) parts.push(title);
    if (segment && family) parts.push(`${segment} > ${family}`);
    if (commodity) parts.push(`Category: ${commodity}`);
    if (notes) parts.push(notes);
    return parts.join('. ') || title || '';
  }

  /**
   * Helper: Build comprehensive notes
   */
  buildNotes(notes, orderStatus, receivedDate, receiverName) {
    const parts = [];
    if (notes) parts.push(notes);
    if (orderStatus) parts.push(`Order Status: ${orderStatus}`);
    if (receivedDate) parts.push(`Received: ${receivedDate}`);
    if (receiverName) parts.push(`Receiver: ${receiverName}`);
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
   * Helper: Generate purpose from available data (enhanced)
   */
  generatePurpose(title, notes, category, segment, family) {
    if (notes && notes.length > 20) return notes.substring(0, 200);
    if (title && title.length > 20) return title;
    const categoryStr = family || segment || category || '';
    return `Purchased from Amazon${categoryStr ? ` in ${categoryStr}` : ''}`;
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
    return condition;
  }

  /**
   * Helper: Extract tags from title, notes, category (enhanced)
   */
  extractTags(title, notes, category, segment, family, commodity) {
    const tags = [];
    const combined = `${title} ${notes} ${category} ${segment} ${family} ${commodity}`.toLowerCase();
    
    // Category tags
    if (category) tags.push(category);
    if (segment) tags.push(segment);
    if (family) tags.push(family);
    if (commodity) tags.push(commodity);
    
    // Feature tags
    if (combined.includes('cordless') || combined.includes('battery')) tags.push('cordless');
    if (combined.includes('corded') || combined.includes('electric')) tags.push('corded');
    if (combined.includes('professional') || combined.includes('pro')) tags.push('professional');
    if (combined.includes('compact') || combined.includes('portable')) tags.push('compact');
    if (combined.includes('heavy') && combined.includes('duty')) tags.push('heavy-duty');
    if (combined.includes('brushless')) tags.push('brushless');
    if (combined.includes('led') || combined.includes('light')) tags.push('led');
    
    // Remove duplicates and return
    return tags.length > 0 ? [...new Set(tags)] : undefined;
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
  module.exports = AmazonMapper;
} else {
  window.AmazonMapper = AmazonMapper;
}


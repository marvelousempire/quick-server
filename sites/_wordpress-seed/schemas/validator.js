/**
 * LearnMappers PWA — JSON Schema Validator
 * 
 * Created: 2025-11-08
 * Last Updated: 2025-11-08
 * 
 * Validates resource data against schemas to ensure consistent structure
 * Works with resource-schema.json and other schema files
 */

class SchemaValidator {
  constructor() {
    this.schemas = {};
    this.errors = [];
  }

  /**
   * Load a schema from a JSON file
   */
  async loadSchema(name, path) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        this.schemas[name] = await response.json();
        return true;
      }
    } catch (e) {
      console.error(`Failed to load schema ${name}:`, e);
    }
    return false;
  }

  /**
   * Validate data against a schema
   */
  validate(data, schemaName) {
    this.errors = [];
    const schema = this.schemas[schemaName];
    
    if (!schema) {
      this.errors.push({ field: 'schema', message: `Schema '${schemaName}' not loaded` });
      return false;
    }

    return this._validateObject(data, schema, '');
  }

  /**
   * Internal recursive validation
   */
  _validateObject(data, schema, path) {
    if (schema.type === 'object') {
      // Check required fields
      if (schema.required) {
        for (const field of schema.required) {
          if (!(field in data)) {
            this.errors.push({ 
              field: path ? `${path}.${field}` : field, 
              message: `Required field '${field}' is missing` 
            });
          }
        }
      }

      // Validate properties
      if (schema.properties) {
        for (const [key, value] of Object.entries(data)) {
          const propSchema = schema.properties[key];
          if (propSchema) {
            this._validateValue(value, propSchema, path ? `${path}.${key}` : key);
          }
        }
      }
    } else {
      return this._validateValue(data, schema, path);
    }

    return this.errors.length === 0;
  }

  /**
   * Validate a value against a schema property
   */
  _validateValue(value, schema, path) {
    // Type checking
    if (schema.type && !this._checkType(value, schema.type)) {
      this.errors.push({ 
        field: path, 
        message: `Expected type '${schema.type}', got '${typeof value}'` 
      });
      return false;
    }

    // String validations
    if (schema.type === 'string') {
      if (schema.minLength && value.length < schema.minLength) {
        this.errors.push({ 
          field: path, 
          message: `String too short (min: ${schema.minLength})` 
        });
      }
      if (schema.maxLength && value.length > schema.maxLength) {
        this.errors.push({ 
          field: path, 
          message: `String too long (max: ${schema.maxLength})` 
        });
      }
      if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
        this.errors.push({ 
          field: path, 
          message: `String does not match pattern: ${schema.pattern}` 
        });
      }
      if (schema.enum && !schema.enum.includes(value)) {
        this.errors.push({ 
          field: path, 
          message: `Value must be one of: ${schema.enum.join(', ')}` 
        });
      }
    }

    // Number validations
    if (schema.type === 'number') {
      if (schema.minimum !== undefined && value < schema.minimum) {
        this.errors.push({ 
          field: path, 
          message: `Number too small (min: ${schema.minimum})` 
        });
      }
      if (schema.maximum !== undefined && value > schema.maximum) {
        this.errors.push({ 
          field: path, 
          message: `Number too large (max: ${schema.maximum})` 
        });
      }
    }

    // Array validations
    if (schema.type === 'array') {
      if (schema.minItems && value.length < schema.minItems) {
        this.errors.push({ 
          field: path, 
          message: `Array too short (min: ${schema.minItems} items)` 
        });
      }
      if (schema.maxItems && value.length > schema.maxItems) {
        this.errors.push({ 
          field: path, 
          message: `Array too long (max: ${schema.maxItems} items)` 
        });
      }
      if (schema.items) {
        value.forEach((item, index) => {
          if (schema.items.type === 'object') {
            this._validateObject(item, schema.items, `${path}[${index}]`);
          } else {
            this._validateValue(item, schema.items, `${path}[${index}]`);
          }
        });
      }
    }

    // Object validations (nested)
    if (schema.type === 'object' && schema.properties) {
      this._validateObject(value, schema, path);
    }

    return true;
  }

  /**
   * Check if value matches expected type
   */
  _checkType(value, expectedType) {
    const actualType = Array.isArray(value) ? 'array' : typeof value;
    return actualType === expectedType;
  }

  /**
   * Get validation errors
   */
  getErrors() {
    return this.errors;
  }

  /**
   * Normalize/transform data to match schema (fill defaults, etc.)
   */
  normalize(data, schemaName) {
    const schema = this.schemas[schemaName];
    if (!schema) return data;

    const normalized = { ...data };

    // Apply defaults
    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (!(key in normalized) && 'default' in propSchema) {
          normalized[key] = propSchema.default;
        }
      }
    }

    return normalized;
  }

  /**
   * Extract required fields from schema for import mapping
   */
  getRequiredFields(schemaName) {
    const schema = this.schemas[schemaName];
    if (!schema) return [];

    const required = schema.required || [];
    const fields = [];

    for (const fieldName of required) {
      const fieldSchema = schema.properties?.[fieldName];
      if (fieldSchema) {
        fields.push({
          name: fieldName,
          type: fieldSchema.type,
          description: fieldSchema.description || '',
          enum: fieldSchema.enum || null,
        });
      }
    }

    return fields;
  }

  /**
   * Get all fields from schema (for import mapping)
   */
  getAllFields(schemaName) {
    const schema = this.schemas[schemaName];
    if (!schema || !schema.properties) return [];

    return Object.entries(schema.properties).map(([name, fieldSchema]) => ({
      name,
      type: fieldSchema.type,
      description: fieldSchema.description || '',
      required: schema.required?.includes(name) || false,
      enum: fieldSchema.enum || null,
      default: fieldSchema.default || null,
    }));
  }
}

// Create global validator instance
window.SchemaValidator = SchemaValidator;
window.validator = new SchemaValidator();

// Auto-load all schemas
(async function() {
  const schemas = window.CONFIG?.schemas || {};
  const schemaNames = ['resource', 'service', 'person', 'company', 'relationship'];
  
  for (const name of schemaNames) {
    const schemaConfig = schemas[name];
    if (schemaConfig?.path) {
      await window.validator.loadSchema(name, schemaConfig.path);
      console.log(`${name} schema loaded`);
    }
  }
})();


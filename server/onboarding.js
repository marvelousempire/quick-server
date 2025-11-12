/**
 * BIS Onboarding System
 * 
 * Guides new entities through the setup process to populate their database
 * for evaluation and analysis.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class OnboardingSystem {
  constructor(ragGenerator, marketAnalyzer) {
    this.ragGenerator = ragGenerator;
    this.marketAnalyzer = marketAnalyzer;
    this.steps = [
      'welcome',
      'entity-info',
      'capabilities',
      'resources',
      'services',
      'vendor-imports',
      'relationships',
      'review',
      'complete'
    ];
  }

  /**
   * Get onboarding status for a site
   */
  getOnboardingStatus(siteName) {
    // Check what data exists
    const status = {
      siteName,
      currentStep: 'welcome',
      completedSteps: [],
      progress: 0,
      dataStatus: {
        entityInfo: false,
        capabilities: false,
        resources: false,
        services: false,
        vendorImports: false,
        relationships: false
      },
      nextActions: []
    };

    // Check entity info (config.json)
    try {
      const configPath = join(__dirname, 'sites', siteName, 'config.json');
      if (existsSync(configPath)) {
        const config = JSON.parse(readFileSync(configPath, 'utf8'));
        if (config.site && config.site.name) {
          status.dataStatus.entityInfo = true;
          status.completedSteps.push('entity-info');
        }
      }
    } catch (e) {
      // Config doesn't exist or invalid
    }

    // Check resources
    try {
      const resourcesDir = join(__dirname, 'sites', siteName, 'content', 'resources');
      if (existsSync(resourcesDir)) {
        const resourceTypes = ['tool', 'equipment', 'material', 'document', 'other'];
        let resourceCount = 0;
        for (const type of resourceTypes) {
          const typeDir = join(resourcesDir, type);
          if (existsSync(typeDir)) {
            const files = readdirSync(typeDir).filter(f => 
              f.endsWith('.json') && !f.includes('template')
            );
            resourceCount += files.length;
          }
        }
        if (resourceCount > 0) {
          status.dataStatus.resources = true;
          status.completedSteps.push('resources');
        }
      }
    } catch (e) {
      // Resources directory doesn't exist
    }

    // Check services
    try {
      const servicesDir = join(__dirname, 'sites', siteName, 'content', 'services');
      if (existsSync(servicesDir)) {
        function countServices(dir) {
          let count = 0;
          const entries = readdirSync(dir, { withFileTypes: true });
          for (const entry of entries) {
            const fullPath = join(dir, entry.name);
            if (entry.isDirectory()) {
              count += countServices(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.json') && entry.name.startsWith('service-')) {
              count++;
            }
          }
          return count;
        }
        const serviceCount = countServices(servicesDir);
        if (serviceCount > 0) {
          status.dataStatus.services = true;
          status.completedSteps.push('services');
        }
      }
    } catch (e) {
      // Services directory doesn't exist
    }

    // Determine current step
    if (!status.dataStatus.entityInfo) {
      status.currentStep = 'entity-info';
    } else if (!status.dataStatus.resources && !status.dataStatus.services) {
      status.currentStep = 'capabilities';
    } else if (!status.dataStatus.resources) {
      status.currentStep = 'resources';
    } else if (!status.dataStatus.services) {
      status.currentStep = 'services';
    } else if (!status.dataStatus.vendorImports) {
      status.currentStep = 'vendor-imports';
    } else if (!status.dataStatus.relationships) {
      status.currentStep = 'relationships';
    } else {
      status.currentStep = 'review';
    }

    // Calculate progress
    const totalSteps = this.steps.length - 2; // Exclude welcome and complete
    status.progress = Math.round((status.completedSteps.length / totalSteps) * 100);

    // Generate next actions
    status.nextActions = this.generateNextActions(status);

    return status;
  }

  /**
   * Generate next actions based on status
   */
  generateNextActions(status) {
    const actions = [];

    if (!status.dataStatus.entityInfo) {
      actions.push({
        step: 'entity-info',
        action: 'Set up basic entity information',
        description: 'Enter your business name, description, and basic details',
        priority: 'high'
      });
    }

    if (!status.dataStatus.resources && !status.dataStatus.services) {
      actions.push({
        step: 'capabilities',
        action: 'Define your capabilities',
        description: 'List what you can do and what resources you have',
        priority: 'high'
      });
    }

    if (!status.dataStatus.resources) {
      actions.push({
        step: 'resources',
        action: 'Add your resources',
        description: 'Import or manually add tools, equipment, materials, and contacts',
        priority: 'high'
      });
    }

    if (!status.dataStatus.services) {
      actions.push({
        step: 'services',
        action: 'Define your services',
        description: 'Create service offerings based on your capabilities',
        priority: 'high'
      });
    }

    if (!status.dataStatus.vendorImports) {
      actions.push({
        step: 'vendor-imports',
        action: 'Import vendor data',
        description: 'Import purchase history from Amazon, eBay, Home Depot, etc.',
        priority: 'medium'
      });
    }

    if (!status.dataStatus.relationships) {
      actions.push({
        step: 'relationships',
        action: 'Map relationships',
        description: 'Connect resources to services to understand capabilities',
        priority: 'medium'
      });
    }

    return actions;
  }

  /**
   * Process onboarding step
   */
  processStep(siteName, step, data) {
    const result = {
      success: false,
      step,
      message: '',
      nextStep: null,
      data: null
    };

    try {
      switch (step) {
        case 'entity-info':
          result.data = this.saveEntityInfo(siteName, data);
          result.success = true;
          result.message = 'Entity information saved';
          result.nextStep = 'capabilities';
          break;

        case 'capabilities':
          result.data = this.saveCapabilities(siteName, data);
          result.success = true;
          result.message = 'Capabilities saved';
          result.nextStep = 'resources';
          break;

        case 'resources':
          result.data = this.saveResources(siteName, data);
          result.success = true;
          result.message = 'Resources saved';
          result.nextStep = 'services';
          break;

        case 'services':
          result.data = this.saveServices(siteName, data);
          result.success = true;
          result.message = 'Services saved';
          result.nextStep = 'vendor-imports';
          break;

        case 'vendor-imports':
          result.data = this.processVendorImports(siteName, data);
          result.success = true;
          result.message = 'Vendor imports processed';
          result.nextStep = 'relationships';
          break;

        case 'relationships':
          result.data = this.saveRelationships(siteName, data);
          result.success = true;
          result.message = 'Relationships saved';
          result.nextStep = 'review';
          break;

        default:
          result.message = `Unknown step: ${step}`;
      }
    } catch (error) {
      result.message = error.message;
      result.error = error.message;
    }

    return result;
  }

  /**
   * Save entity information
   */
  saveEntityInfo(siteName, data) {
    const configPath = join(__dirname, 'sites', siteName, 'config.json');
    
    let config = {};
    if (existsSync(configPath)) {
      config = JSON.parse(readFileSync(configPath, 'utf8'));
    }

    // Update config with entity info
    config.site = config.site || {};
    config.site.name = data.name || config.site.name;
    config.site.description = data.description || config.site.description;
    config.site.tagline = data.tagline || config.site.tagline;
    config.site.type = data.type || 'business'; // business, sole-proprietor, contractor

    // Save config
    mkdirSync(join(__dirname, 'sites', siteName), { recursive: true });
    writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');

    return { saved: true, config };
  }

  /**
   * Save capabilities
   */
  saveCapabilities(siteName, data) {
    // This step helps identify what capabilities to document
    // Actual capabilities are saved with resources and services
    return {
      identified: data.capabilities || [],
      next: 'Add resources and services to document these capabilities'
    };
  }

  /**
   * Save resources
   */
  saveResources(siteName, data) {
    const resourcesDir = join(__dirname, 'sites', siteName, 'content', 'resources');
    mkdirSync(resourcesDir, { recursive: true });

    const saved = [];
    if (data.resources && Array.isArray(data.resources)) {
      data.resources.forEach(resource => {
        const type = resource.type || 'other';
        const typeDir = join(resourcesDir, type);
        mkdirSync(typeDir, { recursive: true });

        // Generate slug
        const slug = this.generateSlug(resource.title || resource.name);
        const jsonPath = join(typeDir, `${slug}.json`);

        // Generate RAG context
        if (!resource.rag) {
          try {
            resource.rag = this.ragGenerator.generateResourceContext(resource);
          } catch (e) {
            console.warn('Could not generate RAG context:', e.message);
          }
        }

        writeFileSync(jsonPath, JSON.stringify(resource, null, 2), 'utf8');
        saved.push(slug);
      });
    }

    return { saved, count: saved.length };
  }

  /**
   * Save services
   */
  saveServices(siteName, data) {
    const servicesDir = join(__dirname, 'sites', siteName, 'content', 'services');
    mkdirSync(servicesDir, { recursive: true });

    const saved = [];
    if (data.services && Array.isArray(data.services)) {
      data.services.forEach(service => {
        const category = service.category || 'other';
        const categoryDir = join(servicesDir, category);
        mkdirSync(categoryDir, { recursive: true });

        // Generate ID
        const serviceId = service.id || this.generateSlug(service.title);
        const jsonPath = join(categoryDir, `service-${serviceId}.json`);

        // Generate RAG context
        if (!service.rag) {
          try {
            service.rag = this.ragGenerator.generateServiceContext(service);
          } catch (e) {
            console.warn('Could not generate RAG context:', e.message);
          }
        }

        writeFileSync(jsonPath, JSON.stringify(service, null, 2), 'utf8');
        saved.push(serviceId);
      });
    }

    return { saved, count: saved.length };
  }

  /**
   * Process vendor imports
   */
  processVendorImports(siteName, data) {
    // This will be handled by vendor-specific importers
    return {
      message: 'Vendor imports should be processed through vendor-specific endpoints',
      vendors: data.vendors || []
    };
  }

  /**
   * Save relationships
   */
  saveRelationships(siteName, data) {
    const relationshipsDir = join(__dirname, 'sites', siteName, 'content', 'relationships');
    mkdirSync(relationshipsDir, { recursive: true });

    const saved = [];
    if (data.relationships && Array.isArray(data.relationships)) {
      data.relationships.forEach((rel, index) => {
        const relId = rel.id || `relationship-${index}`;
        const jsonPath = join(relationshipsDir, `${relId}.json`);
        writeFileSync(jsonPath, JSON.stringify(rel, null, 2), 'utf8');
        saved.push(relId);
      });
    }

    return { saved, count: saved.length };
  }

  /**
   * Generate slug from name
   */
  generateSlug(name) {
    return (name || 'untitled')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 80);
  }

  /**
   * Complete onboarding
   */
  completeOnboarding(siteName) {
    // Generate initial analysis
    const status = this.getOnboardingStatus(siteName);
    
    return {
      success: true,
      message: 'Onboarding complete! Your BIS is ready for evaluation.',
      status,
      nextSteps: [
        'Review your entity summary',
        'Run market analysis',
        'Generate forecasts',
        'Explore situation-based recommendations'
      ]
    };
  }
}


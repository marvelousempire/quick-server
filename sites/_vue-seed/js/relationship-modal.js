/**
 * LearnMappers PWA — Relationship Modal System
 * 
 * Created: 2025-11-08
 * Last Updated: 2025-11-08
 * 
 * Modal components for displaying relationships and projections
 */

class RelationshipModal {
  constructor() {
    this.modals = new Map();
    this.init();
  }

  init() {
    // Create modal container
    if (!document.getElementById('relationship-modal-container')) {
      const container = document.createElement('div');
      container.id = 'relationship-modal-container';
      container.className = 'modal-container';
      container.innerHTML = `
        <div class="modal-overlay" data-modal-close></div>
        <div class="modal-content">
          <button class="modal-close" data-modal-close>×</button>
          <div class="modal-header"></div>
          <div class="modal-body"></div>
          <div class="modal-footer"></div>
        </div>
      `;
      document.body.appendChild(container);

      // Close on overlay/close button click
      container.querySelectorAll('[data-modal-close]').forEach(btn => {
        btn.addEventListener('click', () => this.close());
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.close();
      });
    }
  }

  /**
   * Show entity relationships
   */
  showRelationships(entityType, entityId, entityName) {
    const relationships = window.mapper.getRelationships(entityType, entityId);
    const entity = window.mapper.getEntity(entityType, entityId);

    const html = `
      <h2>Relationships: ${entityName}</h2>
      <div class="relationship-list">
        ${relationships.length === 0 
          ? '<p class="empty">No relationships found</p>'
          : relationships.map(rel => this.renderRelationship(rel)).join('')
        }
      </div>
      ${entity?.canProduceWith ? `
        <div class="capabilities-section">
          <h3>Direct Capabilities</h3>
          <ul class="capability-list">
            ${entity.canProduceWith.map(cap => `
              <li>
                <strong>${cap.output}</strong>
                ${cap.description ? `<p>${cap.description}</p>` : ''}
                ${cap.requires?.length ? `<small>Requires: ${cap.requires.join(', ')}</small>` : ''}
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
    `;

    this.show('Relationships', html);
  }

  /**
   * Show projection modal
   */
  showProjection(resourceIds = [], serviceIds = []) {
    const capabilities = window.mapper.projectCapabilities(resourceIds, serviceIds);

    const html = `
      <h2>Capability Projection</h2>
      <div class="projection-results">
        ${capabilities.length === 0
          ? '<p class="empty">No capabilities found with selected resources/services</p>'
          : capabilities.map(({ output, sources, canProduce }) => `
            <div class="capability-item ${canProduce ? 'available' : 'unavailable'}">
              <h3>${output}</h3>
              <div class="sources">
                ${sources.map(source => `
                  <div class="source-item ${source.direct ? 'direct' : 'indirect'}">
                    <span class="source-type">${source.entity.title || source.entity.name}</span>
                    ${source.via ? `<small>via ${source.via.type} relationship</small>` : ''}
                    ${source.capability.description ? `<p>${source.capability.description}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')
        }
      </div>
    `;

    this.show('Capability Projection', html);
  }

  /**
   * Show requirements analysis
   */
  showRequirements(goal) {
    const requirements = window.mapper.analyzeRequirements(goal);

    const html = `
      <h2>Requirements Analysis: "${goal}"</h2>
      <div class="requirements-analysis">
        ${requirements.resources.length > 0 ? `
          <section class="requirement-section">
            <h3>Resources Needed</h3>
            <ul>
              ${requirements.resources.map(req => `
                <li>
                  <strong>${req.entity.title}</strong>
                  ${req.capability.description ? `<p>${req.capability.description}</p>` : ''}
                  ${req.required.length ? `<small>Also needs: ${req.required.join(', ')}</small>` : ''}
                </li>
              `).join('')}
            </ul>
          </section>
        ` : ''}
        ${requirements.services.length > 0 ? `
          <section class="requirement-section">
            <h3>Services Needed</h3>
            <ul>
              ${requirements.services.map(req => `
                <li>
                  <strong>${req.entity.title}</strong>
                  ${req.capability.description ? `<p>${req.capability.description}</p>` : ''}
                </li>
              `).join('')}
            </ul>
          </section>
        ` : ''}
        ${requirements.persons.length > 0 ? `
          <section class="requirement-section">
            <h3>People Needed</h3>
            <ul>
              ${requirements.persons.map(req => `
                <li>
                  <strong>${req.entity.name.first} ${req.entity.name.last}</strong>
                  ${req.capability.description ? `<p>${req.capability.description}</p>` : ''}
                </li>
              `).join('')}
            </ul>
          </section>
        ` : ''}
        ${requirements.companies.length > 0 ? `
          <section class="requirement-section">
            <h3>Companies Needed</h3>
            <ul>
              ${requirements.companies.map(req => `
                <li>
                  <strong>${req.entity.name}</strong>
                  ${req.capability.description ? `<p>${req.capability.description}</p>` : ''}
                </li>
              `).join('')}
            </ul>
          </section>
        ` : ''}
        ${Object.values(requirements).every(arr => arr.length === 0) 
          ? '<p class="empty">No requirements found for this goal</p>'
          : ''
        }
      </div>
    `;

    this.show('Requirements Analysis', html);
  }

  /**
   * Render a relationship
   */
  renderRelationship(rel) {
    const fromEntity = window.mapper.getEntity(rel.from.type, rel.from.id);
    const toEntity = window.mapper.getEntity(rel.to.type, rel.to.id);

    return `
      <div class="relationship-item" data-relationship-id="${rel.id}">
        <div class="relationship-header">
          <span class="relationship-type ${rel.type}">${rel.type}</span>
          <span class="relationship-strength ${rel.strength}">${rel.strength}</span>
        </div>
        <div class="relationship-path">
          <span class="entity-from">${rel.from.name || fromEntity?.title || fromEntity?.name}</span>
          <span class="arrow">→</span>
          <span class="entity-to">${rel.to.name || toEntity?.title || toEntity?.name}</span>
        </div>
        ${rel.purpose ? `<p class="relationship-purpose">${rel.purpose}</p>` : ''}
        ${rel.capabilities?.length ? `
          <div class="relationship-capabilities">
            <strong>Enables:</strong>
            <ul>
              ${rel.capabilities.map(cap => `<li>${cap.capability}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Show modal with content
   */
  show(title, body, footer = '') {
    const container = document.getElementById('relationship-modal-container');
    if (!container) return;

    container.querySelector('.modal-header').innerHTML = `<h2>${title}</h2>`;
    container.querySelector('.modal-body').innerHTML = body;
    container.querySelector('.modal-footer').innerHTML = footer;

    container.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close modal
   */
  close() {
    const container = document.getElementById('relationship-modal-container');
    if (container) {
      container.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

// Create global modal instance
window.RelationshipModal = RelationshipModal;
window.relationshipModal = new RelationshipModal();


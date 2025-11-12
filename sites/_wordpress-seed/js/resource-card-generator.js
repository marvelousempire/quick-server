/**
 * LearnMappers PWA — Resource Card Generator
 * 
 * Generates individual HTML files for each resource card
 * Works with both localStorage (standalone) and SQLite (server mode)
 */

class ResourceCardGenerator {
  constructor() {
    this.apiBase = window.CONFIG?.api?.baseUrl || '/api';
  }

  /**
   * Generate resource card HTML from resource data
   */
  generateCardHTML(resource) {
    const resourceId = resource.id || this.generateId(resource.title || resource.name);
    const title = resource.title || resource.name || 'Untitled Resource';
    const category = resource.category || 'other';
    const purpose = resource.purpose || resource.notes || `Resource: ${title}`;
    
    // Get icon based on category
    const categoryIcons = {
      'tool': '🔧',
      'equipment': '⚙️',
      'hardware': '🔩',
      'material': '📦',
      'consumable': '🧪',
      'software': '💻',
      'documentation': '📚',
      'other': '📋'
    };
    const icon = categoryIcons[category] || '📋';

    // Build meta information
    const metaItems = [];
    if (resource.meta?.brand) {
      metaItems.push(`<div class="meta-item"><span class="meta-label">Brand</span><span class="meta-value">${this.escapeHtml(resource.meta.brand)}</span></div>`);
    }
    if (resource.meta?.model) {
      metaItems.push(`<div class="meta-item"><span class="meta-label">Model</span><span class="meta-value">${this.escapeHtml(resource.meta.model)}</span></div>`);
    }
    if (resource.meta?.location) {
      metaItems.push(`<div class="meta-item"><span class="meta-label">Location</span><span class="meta-value">${this.escapeHtml(resource.meta.location)}</span></div>`);
    }
    if (resource.specifications?.power) {
      metaItems.push(`<div class="meta-item"><span class="meta-label">Power</span><span class="meta-value">${this.escapeHtml(resource.specifications.power)}</span></div>`);
    }

    // Status badge
    const status = resource.status || 'available';
    const statusClasses = {
      'available': 'status-available',
      'in-use': 'status-in-use',
      'maintenance': 'status-maintenance',
      'retired': 'status-retired'
    };
    const statusClass = statusClasses[status] || 'status-available';

    // Use cases
    let useCasesHTML = '';
    if (resource.useCases && resource.useCases.length > 0) {
      useCasesHTML = `
        <div class="section">
          <h2>Use Cases</h2>
          ${resource.useCases.map(uc => `
            <div class="use-case-item">
              <div>
                <strong>${this.escapeHtml(uc.scenario)}</strong>
                ${uc.frequency ? `<span style="color:var(--muted);font-size:12px;margin-left:8px">(${uc.frequency})</span>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Can produce
    let canProduceHTML = '';
    if (resource.canProduceWith && resource.canProduceWith.length > 0) {
      canProduceHTML = `
        <div class="section">
          <h2>What You Can Build</h2>
          ${resource.canProduceWith.map(item => `
            <div class="produce-item">
              <div>
                <strong>${this.escapeHtml(item.output)}</strong>
                ${item.description ? `<p style="margin:4px 0 0 0;color:var(--muted);font-size:14px">${this.escapeHtml(item.description)}</p>` : ''}
                ${item.requires && item.requires.length > 0 ? `<p style="margin:4px 0 0 0;color:var(--muted);font-size:12px">Requires: ${this.escapeHtml(item.requires.join(', '))}</p>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Specifications
    let specsHTML = '';
    if (resource.specifications) {
      const specs = [];
      if (resource.specifications.dimensions) specs.push(`<div><strong>Dimensions:</strong> ${this.escapeHtml(resource.specifications.dimensions)}</div>`);
      if (resource.specifications.weight) specs.push(`<div><strong>Weight:</strong> ${this.escapeHtml(resource.specifications.weight)}</div>`);
      if (resource.specifications.capacity) specs.push(`<div><strong>Capacity:</strong> ${this.escapeHtml(resource.specifications.capacity)}</div>`);
      if (resource.specifications.compatibility && resource.specifications.compatibility.length > 0) {
        specs.push(`<div><strong>Compatibility:</strong> ${this.escapeHtml(resource.specifications.compatibility.join(', '))}</div>`);
      }
      if (specs.length > 0) {
        specsHTML = `
          <div class="section">
            <h2>Specifications</h2>
            <div class="card">
              ${specs.join('')}
            </div>
          </div>
        `;
      }
    }

    // Metadata
    let metaHTML = '';
    const metaDetails = [];
    if (resource.meta?.purchasePrice) metaDetails.push(`<div><strong>Purchase Price:</strong> $${resource.meta.purchasePrice.toFixed(2)}</div>`);
    if (resource.meta?.purchaseDate) metaDetails.push(`<div><strong>Purchase Date:</strong> ${this.escapeHtml(resource.meta.purchaseDate)}</div>`);
    if (resource.meta?.condition) metaDetails.push(`<div><strong>Condition:</strong> ${this.escapeHtml(resource.meta.condition)}</div>`);
    if (resource.meta?.serialNumber) metaDetails.push(`<div><strong>Serial Number:</strong> ${this.escapeHtml(resource.meta.serialNumber)}</div>`);
    if (metaDetails.length > 0) {
      metaHTML = `
        <div class="section">
          <h2>Details</h2>
          <div class="card">
            ${metaDetails.join('')}
          </div>
        </div>
      `;
    }

    // Tags
    let tagsHTML = '';
    if (resource.meta?.tags && resource.meta.tags.length > 0) {
      tagsHTML = `
        <div class="section">
          <h2>Tags</h2>
          <div class="tags-list">
            ${resource.meta.tags.map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')}
          </div>
        </div>
      `;
    }

    // Notes
    let notesHTML = '';
    if (resource.notes) {
      notesHTML = `
        <div class="section">
          <h2>Notes</h2>
          <div class="card">
            <p style="margin:0;color:var(--muted);line-height:1.7">${this.escapeHtml(resource.notes)}</p>
          </div>
        </div>
      `;
    }

    // Load template HTML structure
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<script src="../../config.js"></script>
<script>
  document.title = window.CONFIG?.site?.title ? \`\${window.CONFIG.site.name} — ${this.escapeHtml(title)}\` : 'LearnMappers — ${this.escapeHtml(title)}';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', window.CONFIG?.site?.themeColor || '#0b0c10');
</script>
<title>LearnMappers — ${this.escapeHtml(title)}</title>
<link rel="manifest" href="../../manifest.webmanifest"><meta name="theme-color" content="#0b0c10">
<style>
:root{ --bg:#0b0c10; --card:#0f131c; --ink:#e9f3ff; --muted:#9bb1c7; --brand:#7ce3ff; --brand2:#60ffa8; --line:#1e2636; --shadow:rgba(3,8,18,.5); --radius:16px; --gap:16px; }
*{box-sizing:border-box} html,body{background:radial-gradient(1200px 500px at 15% -10%, rgba(124,227,255,.14), transparent 50%), radial-gradient(900px 450px at 90% -10%, rgba(96,255,168,.09), transparent 60%), var(--bg);color:var(--ink);font-family:Inter,ui-sans-serif,-apple-system,Segoe UI,Roboto,Ubuntu,Arial,sans-serif;margin:0;line-height:1.6}
a{color:var(--brand);text-decoration:none}
main[data-page]{padding:0}
.wrap{max-width:1440px;margin:0 auto;padding:clamp(18px,4vw,60px)}
nav.stick{position:sticky;top:0;z-index:90;background:color-mix(in srgb, var(--bg) 86%, transparent);backdrop-filter: blur(10px);border-bottom:1px solid var(--line)}
nav .row{display:flex;align-items:center;justify-content:space-between;gap:12px}
.logo{display:flex;gap:10px;align-items:center;font-weight:900}
.logo .dot{width:12px;height:12px;border-radius:50%;background:linear-gradient(135deg,var(--brand),var(--brand2))}
nav .links{display:flex;gap:12px;flex-wrap:wrap}
nav .links a{padding:10px 12px;border-radius:12px}
nav .links a:hover{background:color-mix(in srgb, var(--brand) 18%, transparent)}
.pill{display:inline-flex;align-items:center;gap:6px;margin-right:8px;padding:6px 10px;border-radius:999px;border:1px solid var(--line);background:linear-gradient(180deg, color-mix(in srgb, var(--card) 90%, transparent), color-mix(in srgb, var(--card) 96%, transparent));font-size:12px}
.pill.online{color:#073b18;border-color:#0ea35a;background:linear-gradient(180deg,#d6ffe9,#f1fff7)}
.pill.offline{color:#4b1a1a;border-color:#cc5151;background:linear-gradient(180deg,#ffe3e3,#fff7f7)}
header.hero{position:relative;isolation:isolate;padding:54px 0 24px;margin-bottom:32px}
header.hero.wrap{padding-top:54px;padding-bottom:24px;padding-left:clamp(18px,4vw,60px);padding-right:clamp(18px,4vw,60px)}
h1{font-size:clamp(36px,5vw,56px);margin:0 0 12px;font-weight:900;background:linear-gradient(135deg,var(--ink) 0%,var(--brand) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.lead{font-size:clamp(16px,2.2vw,19px);color:var(--muted);max-width:74ch;margin:0 0 20px;line-height:1.6}
.btn{padding:12px 16px;border-radius:14px;border:1px solid var(--line);background:linear-gradient(180deg, color-mix(in srgb, var(--card) 85%, transparent), color-mix(in srgb, var(--card) 95%, transparent));color:var(--ink);font-weight:800;cursor:pointer;transition:.18s ease;box-shadow:0 14px 40px -20px var(--shadow);text-decoration:none;display:inline-block}
.btn:hover{transform:translateY(-2px)}
.btn.brand{background:linear-gradient(135deg,var(--brand),#c9f5ff);color:#041018;border:none}
.card{background:linear-gradient(180deg, color-mix(in srgb, var(--card) 88%, transparent), color-mix(in srgb, var(--card) 97%, transparent));border:1px solid var(--line);border-radius:var(--radius);padding:24px;box-shadow:0 14px 44px -28px var(--shadow);transition:all 0.2s}
.card:hover{border-color:var(--brand);transform:translateY(-2px);box-shadow:0 20px 48px -16px var(--shadow)}
.section{margin:48px 0}
.section h2{font-size:32px;font-weight:900;margin:0 0 24px;padding-top:16px;border-top:1px solid var(--line);margin-top:32px}
.section h2:first-child{border-top:none;margin-top:0;padding-top:0}
.section h3{font-size:24px;font-weight:800;margin:32px 0 16px}
.section p{margin:16px 0;font-size:16px;line-height:1.7;color:var(--ink)}
.section ul,.section ol{margin:16px 0;padding-left:24px}
.section li{margin:8px 0;line-height:1.6}
.resource-icon{font-size:64px;margin-bottom:16px;display:block}
.resource-meta{display:flex;gap:24px;flex-wrap:wrap;margin:24px 0;padding:20px;background:color-mix(in srgb, var(--card) 88%, transparent);border:1px solid var(--line);border-radius:12px}
.meta-item{display:flex;flex-direction:column;gap:4px}
.meta-label{font-size:12px;text-transform:uppercase;letter-spacing:0.5px;color:var(--muted);font-weight:700}
.meta-value{font-size:18px;font-weight:800;color:var(--brand)}
.use-case-item{display:flex;align-items:start;gap:12px;padding:14px;background:color-mix(in srgb, var(--card) 85%, transparent);border-left:3px solid var(--brand2);border-radius:8px;margin:12px 0}
.use-case-item::before{content:'💡';font-size:20px}
.produce-item{display:flex;align-items:start;gap:12px;padding:14px;background:color-mix(in srgb, var(--card) 90%, transparent);border:1px solid var(--line);border-radius:8px;margin:8px 0}
.produce-item::before{content:'🔧';font-size:18px}
.status-badge{display:inline-block;padding:6px 12px;border-radius:8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px}
.status-available{background:color-mix(in srgb, #10b981 20%, transparent);color:#10b981;border:1px solid #10b981}
.status-in-use{background:color-mix(in srgb, #f59e0b 20%, transparent);color:#f59e0b;border:1px solid #f59e0b}
.status-maintenance{background:color-mix(in srgb, #ef4444 20%, transparent);color:#ef4444;border:1px solid #ef4444}
.status-retired{background:color-mix(in srgb, var(--muted) 20%, transparent);color:var(--muted);border:1px solid var(--muted)}
.engagement-card{background:linear-gradient(135deg, color-mix(in srgb, var(--brand) 15%, transparent), color-mix(in srgb, var(--brand2) 10%, transparent));border:1px solid var(--line);border-radius:var(--radius);padding:28px;margin:24px 0;position:relative;overflow:hidden}
.engagement-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--brand),var(--brand2))}
.engagement-card h3{color:var(--brand);margin-top:0}
.tags-list{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}
.tag{font-size:12px;padding:6px 12px;border-radius:8px;background:color-mix(in srgb, var(--card) 90%, transparent);border:1px solid var(--line);color:var(--muted);text-transform:uppercase;font-weight:700;letter-spacing:0.5px}
</style>
</head>
<body>
<nav class="stick wrap">
  <div class="row">
    <a href="../../index.html" class="logo" id="logo">
      <span class="dot"></span>
      <span>LearnMappers</span>
    </a>
    <div class="links">
      <span id="netPill" class="pill" title="Connection status">● offline</span>
      <div id="navLinks">
        <a href="../../index.html" data-nav>Home</a>
        <a href="../../docs-index.html" data-nav>Docs</a>
        <a href="../../inventory.html" data-nav>Resources</a>
        <a href="../../service-menu.html" data-nav>Services</a>
      </div>
    </div>
  </div>
</nav>

<main data-page>
  <section class="wrap">
    <a href="../../inventory.html" class="back-link">← Back to Resources</a>
    
    <header class="hero" id="resourceHeader">
      <span class="resource-icon">${icon}</span>
      <h1>${this.escapeHtml(title)}</h1>
      <p class="lead">${this.escapeHtml(purpose)}</p>
      
      <div class="resource-meta">
        <div class="meta-item">
          <span class="meta-label">Category</span>
          <span class="meta-value">${this.escapeHtml(category)}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Status</span>
          <span class="meta-value"><span class="status-badge ${statusClass}">${status}</span></span>
        </div>
        ${metaItems.join('')}
      </div>
    </header>

    <div class="section">
      <div class="engagement-card">
        <h3>🎯 Purpose</h3>
        <p style="font-size:18px;line-height:1.7;margin:0">${this.escapeHtml(purpose)}</p>
      </div>
    </div>

    ${useCasesHTML}
    ${canProduceHTML}
    ${specsHTML}
    ${metaHTML}
    ${tagsHTML}
    ${notesHTML}
  </section>
</main>

<script src="../../scripts.js"></script>
<script>if('serviceWorker' in navigator){navigator.serviceWorker.register('../../service-worker.js').catch(()=>{});}</script>
<script>
/* v7.3 net pill */
(function(){
  const el = document.getElementById('netPill'); if(!el) return;
  function setStatus(){
    const on = navigator.onLine;
    el.textContent = (on ? '● online' : '● offline');
    el.classList.toggle('online', on);
    el.classList.toggle('offline', !on);
  }
  window.addEventListener('online', setStatus);
  window.addEventListener('offline', setStatus);
  setStatus();
})();
</script>
</body>
</html>`;
  }

  /**
   * Generate ID from title/name
   */
  generateId(text) {
    return (text || 'untitled')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Generate resource card file (server-side via API)
   */
  async generateCardFile(resource) {
    try {
      const response = await fetch(`${this.apiBase}/resource-cards/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resource)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to generate card: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error generating resource card:', error);
      throw error;
    }
  }

  /**
   * Generate cards for all resources (from API)
   */
  async generateAllCards() {
    try {
      const response = await fetch(`${this.apiBase}/resource-cards/generate-all`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to generate cards: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error generating all resource cards:', error);
      throw error;
    }
  }
}

// Export
window.ResourceCardGenerator = ResourceCardGenerator;


/**
 * LearnMappers PWA — Master Configuration Loader
 * 
 * Created: 2025-11-08
 * Last Updated: 2025-11-08
 * 
 * Loads config.json and makes it available as window.CONFIG
 * JSON format provides: validation, tooling support, easy editing
 */

// Inline config (fallback if JSON fails to load)
// Primary source: config.json (loads asynchronously)
const CONFIG_INLINE = {
  site: {
    name: 'LearnMappers',
    title: 'LearnMappers — Task Suite v7.0',
    description: 'Progressive Web App for managing tools, inventory, and services',
    version: '7.3.0',
    author: '',
    themeColor: '#0b0c10',
    tagline: 'Home • Tech • Systems — done right',
    mission: 'LearnMappers maps your setup so you can keep it working.',
  },
  navigation: {
    logo: { text: 'LearnMappers', showDot: true, href: '/' },
    links: [
      { label: 'Home', href: '/', page: 'index', icon: '🏠' },
      { label: 'Docs', href: '/docs-index.html', page: 'docs', icon: '📖' },
      { label: 'Resources', href: '/inventory.html', page: 'inventory', icon: '📦' },
      { label: 'Services', href: '/service-menu.html', page: 'service-menu', icon: '⚙️' },
    ],
    sticky: true,
  },
  theme: {
    colors: {
      bg: '#0b0c10', card: '#0f131c', ink: '#e9f3ff', muted: '#9bb1c7',
      brand: '#7ce3ff', brand2: '#60ffa8', accent: '#f59e0b',
      success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#3b82f6',
      line: '#1e2636', shadow: 'rgba(3,8,18,.5)', overlay: 'rgba(0,0,0,0.5)',
    },
    spacing: { radius: '16px', gap: '16px', wide: '1200px', sectionPadding: '80px', cardPadding: '18px' },
    typography: {
      fontFamily: 'Inter, ui-sans-serif, -apple-system, Segoe UI, Roboto, sans-serif',
      baseSize: '16px',
      lineHeight: 1.6,
    },
    animations: { enabled: true, duration: '0.18s', easing: 'ease' },
  },
  layout: {
    maxWidth: '1440px',
    padding: 'clamp(18px,4vw,60px)',
    heroPadding: { top: '54px', bottom: '24px', sides: 'clamp(18px,4vw,60px)' },
  },
  content: {
    hero: {
      title: 'Headquarters Development • Homesteading • Family Office — done right',
      subtitle: 'Skilled hands. Smart tools. Clean work.',
      description: 'LearnMappers maps your setup so you can keep it working.',
      chips: ['Assembly', 'Mounting', 'Smart Home', 'Apple & Linux', 'AI & RAG', 'Solar & Off‑Grid'],
      cta: {
        primary: {
          text: 'Book now',
          href: 'https://www.taskrabbit.com/profile/marvin-h--14',
          style: 'brand',
          external: true,
        },
      },
    },
    services: { categories: [] },
    features: [],
    sections: [],
    testimonials: [],
    stats: [],
    faq: [],
    footer: {
      text: 'LearnMappers — Task Suite v7.3',
      copyright: '© 2025 LearnMappers',
      columns: [],
      social: { enabled: false, links: [] },
    },
  },
  pwa: {
    manifest: '/manifest.webmanifest',
    serviceWorker: '/service-worker.js',
    cacheName: 'learnmappers-v7',
    offlinePage: '/index.html',
    enabled: true,
  },
  api: {
    baseUrl: '',
    enabled: true,
    endpoints: { inventory: '/api/inventory', stats: '/api/stats', sites: '/api/sites', health: '/api/health' },
  },
  features: { offline: true, notifications: false, analytics: false, inventory: true, relationships: true },
  schemas: {},
  mapping: {},
  import: {},
  contact: { enabled: false },
  inventory: { enabled: true },
  relationships: { enabled: true },
  documentation: { enabled: true },
  settings: { lazyLoadImages: true, smoothScroll: true, backToTop: true },
};

// Start with inline config (available immediately)
let CONFIG = JSON.parse(JSON.stringify(CONFIG_INLINE));

// Auto-populate dynamic values
if (!CONFIG.api.baseUrl) {
  CONFIG.api.baseUrl = window.location.origin;
}

// Make available immediately
window.CONFIG = CONFIG;

// Deep merge helper
function deepMerge(target, source) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

// Get effective theme mode (handles 'auto' mode)
function getEffectiveThemeMode(config) {
  const mode = config.theme?.mode || 'dark';
  if (mode === 'auto') {
    // Check system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return mode;
}

// Apply theme colors to CSS variables
function applyTheme(config) {
  const root = document.documentElement;
  const mode = getEffectiveThemeMode(config);
  const colors = mode === 'light' 
    ? (config.theme?.colorsLight || config.theme?.colors || {})
    : (config.theme?.colors || {});
  const spacing = config.theme?.spacing || {};
  
  // Apply colors
  Object.keys(colors).forEach(key => {
    root.style.setProperty(`--${key}`, colors[key]);
  });
  
  // Apply spacing
  Object.keys(spacing).forEach(key => {
    root.style.setProperty(`--${key}`, spacing[key]);
  });
  
  // Set data-theme attribute for CSS targeting
  root.setAttribute('data-theme', mode);
  
  // Set theme color meta tag
  const themeColor = mode === 'light' 
    ? (config.theme?.colorsLight?.bg || config.site?.themeColor || '#ffffff')
    : (config.site?.themeColor || '#0b0c10');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', themeColor);
  }
  
  // Store theme mode in localStorage
  if (config.theme?.mode) {
    localStorage.setItem('themeMode', config.theme.mode);
  }
}

// Theme toggle function
function toggleTheme() {
  const config = window.CONFIG || {};
  const currentMode = config.theme?.mode || 'dark';
  let newMode;
  
  // Cycle: dark -> light -> auto -> dark
  if (currentMode === 'dark') {
    newMode = 'light';
  } else if (currentMode === 'light') {
    newMode = 'auto';
  } else {
    newMode = 'dark';
  }
  
  // Update config
  if (!config.theme) config.theme = {};
  config.theme.mode = newMode;
  window.CONFIG = config;
  
  // Apply new theme
  applyTheme(config);
  
  // Update toggle button if it exists
  const toggleBtn = document.querySelector('[data-theme-toggle]');
  if (toggleBtn) {
    const icons = { dark: '🌙', light: '☀️', auto: '🔄' };
    toggleBtn.textContent = icons[newMode] || '🌙';
    toggleBtn.title = `Theme: ${newMode} (click to toggle)`;
  }
  
  // Save to config.json if possible (via API)
  if (window.CONFIG && window.fetch) {
    fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    }).catch(err => console.log('Could not save theme preference:', err));
  }
}

// Expose toggle and apply functions globally
window.toggleTheme = toggleTheme;
window.applyTheme = applyTheme;

// Listen for system theme changes when in auto mode
if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    const config = window.CONFIG || {};
    if (config.theme?.mode === 'auto') {
      applyTheme(config);
    }
  });
}

// Load from JSON file (async, updates config when loaded)
// Unified LearnMappers site (HQDEV + FOADMIN sections already merged in config.json)
(async function loadConfigFromJSON() {
  try {
    // Try multiple paths: relative to current script, absolute, and common locations
    const scriptPath = document.currentScript?.src || '';
    const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/'));
    const possiblePaths = [
      '../../config.json', // Two levels up (from content/pages/ to site root) - PRIMARY
      '../config.json', // One level up (from content/pages/)
      basePath ? `${basePath}/config.json` : 'config.json', // Relative to script
      '/config.json', // Absolute root
      './config.json' // Current directory
    ];
    
    let jsonConfig = null;
    let loadedPath = null;
    for (const path of possiblePaths) {
      try {
        const response = await fetch(path);
        if (response.ok) {
          jsonConfig = await response.json();
          loadedPath = path;
          console.log('✅ Config loaded from:', path);
          break;
        } else {
          console.log('⚠️ Config not found at:', path, '(status:', response.status, ')');
        }
      } catch (e) {
        console.log('⚠️ Failed to load config from:', path, e.message);
        // Try next path
        continue;
      }
    }
    
    if (jsonConfig) {
      // Deep merge JSON config (takes precedence)
      CONFIG = deepMerge(CONFIG_INLINE, jsonConfig);
      // Auto-populate dynamic values
      if (!CONFIG.api?.baseUrl) {
        CONFIG.api.baseUrl = window.location.origin;
      }
      // Update global
      window.CONFIG = CONFIG;
      
      // Load theme mode from localStorage if not in config
      const savedMode = localStorage.getItem('themeMode');
      if (savedMode && !CONFIG.theme?.mode) {
        if (!CONFIG.theme) CONFIG.theme = {};
        CONFIG.theme.mode = savedMode;
      }
      
      // Apply theme immediately
      applyTheme(CONFIG);
      
      // Update theme toggle button if it exists
      const toggleBtn = document.querySelector('[data-theme-toggle]');
      if (toggleBtn) {
        const mode = CONFIG.theme?.mode || 'dark';
        const icons = { dark: '🌙', light: '☀️', auto: '🔄' };
        toggleBtn.textContent = icons[mode] || '🌙';
        toggleBtn.title = `Theme: ${mode} (click to toggle)`;
      }
      
      // Trigger config update event
      window.dispatchEvent(new CustomEvent('configLoaded', { detail: CONFIG }));
      console.log('✅ Config loaded and available:', window.CONFIG);
      console.log('✅ Services categories:', window.CONFIG.content?.services?.categories?.length || 0, 'items');
      console.log('✅ HQDEV services:', window.CONFIG.content?.services?.categories?.filter(c => c.section === 'hqdev').length || 0);
      console.log('✅ FOADMIN services:', window.CONFIG.content?.services?.categories?.filter(c => c.section === 'foadmin').length || 0);
    } else {
      console.warn('⚠️ Could not load config.json from any path:', possiblePaths);
      console.warn('⚠️ Using inline config only. Services may be empty.');
      applyTheme(CONFIG);
      // Still trigger event so page can render with inline config
      window.dispatchEvent(new CustomEvent('configLoaded', { detail: CONFIG }));
    }
  } catch (e) {
    // Silently fall back to inline config (already set)
    console.warn('⚠️ Error loading config.json, using inline config:', e);
    applyTheme(CONFIG);
    // Still trigger event so page can render with inline config
    window.dispatchEvent(new CustomEvent('configLoaded', { detail: CONFIG }));
  }
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}

// LearnMappers light router (v7.0)
// Uses config.js for API endpoints and settings
(function(){
  const config = window.CONFIG || {};
  const apiBase = config.api?.baseUrl || window.location.origin;
  
  function getAppElement() {
    // Try to find main[data-page] element
    let app = document.querySelector('main[data-page]');
    if (!app) {
      // Fallback: try to find main element
      app = document.querySelector('main');
      if (app) {
        app.setAttribute('data-page', '');
      } else {
        // Last resort: use body
        app = document.body;
        console.warn('⚠️  No main[data-page] or main element found, using body for router');
      }
    }
    return app;
  }
  
  let app = null; // Will be set when router initializes
  
  function isInternal(href){ 
    try{ 
      const u = new URL(href, location.href); 
      return u.origin === location.origin; 
    } catch(_){ 
      return false; 
    } 
  }
  
  function extractMain(html){
    const doc = new DOMParser().parseFromString(html,'text/html');
    const next = doc.querySelector('main[data-page]') || doc.querySelector('main');
    return next ? next.innerHTML : html;
  }
  
  async function fetchTo(href, push=true){
    if (!app) {
      console.error('❌ Router: No app element found');
      location.href = href;
      return;
    }
    
    document.documentElement.style.cursor='progress';
    
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.error('❌ Router: Request timeout after 8 seconds');
      controller.abort();
    }, 8000);
    
    try{
      // Use href as-is - browser resolves relative paths correctly
      const res = await fetch(href, {
        credentials:'same-origin',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const text = await res.text();
      const newContent = extractMain(text);
      
      if (newContent) {
        app.innerHTML = newContent;
        if(push) history.pushState({href}, '', href);
        window.scrollTo({top:0, behavior:'instant'});
        
        // Re-run scripts that need to execute after content is loaded
        // This is especially important for pages that populate content from config
        if(window.afterRouteChange) window.afterRouteChange();
        
        // Re-execute any inline scripts in the loaded content
        // But skip scripts that are already loaded (like config.js, scripts.js)
        const scripts = app.querySelectorAll('script:not([src])');
        scripts.forEach(oldScript => {
          // Skip if this script has already been executed (has data-executed attribute)
          if (oldScript.hasAttribute('data-executed')) {
            return;
          }
          
          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });
          newScript.setAttribute('data-executed', 'true');
          newScript.textContent = oldScript.textContent;
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
        
        // Dispatch a custom event for pages that listen to route changes
        window.dispatchEvent(new CustomEvent('routeChanged', { detail: { href } }));
        
        // Also dispatch configLoaded event if CONFIG is available (for pages that need it)
        if (window.CONFIG) {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('configLoaded'));
          }, 50);
        }
      } else {
        throw new Error('No content extracted from response');
      }
    }catch(e){ 
      clearTimeout(timeoutId);
      console.error('❌ Router error:', e); 
      if (e.name === 'AbortError' || e.name === 'TimeoutError') {
        console.error('❌ Request timed out, falling back to full page load');
      }
      location.href = href; 
    }
    finally{ 
      clearTimeout(timeoutId);
      document.documentElement.style.cursor='auto'; 
    }
  }
  
  // Expose API helper using config
  window.getApiUrl = function(endpoint) {
    const endpoints = config.api?.endpoints || {};
    return endpoints[endpoint] || `${apiBase}/api/${endpoint}`;
  };
  
  function onClick(e){
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href');
    if(!href) return;
    
    if(a.hasAttribute('data-nav') && isInternal(href)){
      // Check if we're already on this page
      const currentPath = window.location.pathname;
      const targetPath = new URL(href, window.location.href).pathname;
      
      if (currentPath === targetPath || currentPath.replace(/\/$/, '') === targetPath.replace(/\/$/, '')) {
        console.log('⏭️  Router: Already on this page, skipping navigation');
        return;
      }
      
      e.preventDefault(); 
      e.stopPropagation();
      console.log('🔗 Router: Navigating to', href);
      fetchTo(href, true);
    }
  }
  
  let routerInitialized = false;
  
  // Initialize router when DOM is ready
  function initRouter() {
    // Prevent multiple initializations
    if (routerInitialized) {
      console.log('⏳ Router already initialized, skipping...');
      return;
    }
    
    app = getAppElement();
    if (!app) {
      console.warn('⚠️  Router: App element not found, retrying...');
      setTimeout(initRouter, 100);
      return;
    }
    
    // Mark as initialized before adding listeners to prevent re-initialization
    routerInitialized = true;
    
    window.addEventListener('click', onClick, true); // Use capture phase to catch early
    window.addEventListener('popstate', (e)=>{
      let href = (e.state && e.state.href) || location.pathname.replace(/^\//,'') || 'index.html';
      console.log('🔙 Router: Back/forward to', href);
      fetchTo(href, false);
    });
    
    window.router = { go: (href)=>fetchTo(href, true) };
    
    console.log('✅ Router initialized with app element:', app.tagName, app.className || '');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRouter);
  } else {
    // DOM already loaded
    initRouter();
  }
})();
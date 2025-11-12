// LearnMappers light router (v7.0)
// Uses config.js for API endpoints and settings
(function(){
  const app = document.querySelector('main[data-page]');
  const config = window.CONFIG || {};
  const apiBase = config.api?.baseUrl || window.location.origin;
  
  function isInternal(href){ try{ const u=new URL(href, location.href); return u.origin===location.origin; }catch(_){ return false; } }
  function extractMain(html){
    const doc = new DOMParser().parseFromString(html,'text/html');
    const next = doc.querySelector('main[data-page]');
    return next ? next.innerHTML : html;
  }
  async function fetchTo(href, push=true){
    document.documentElement.style.cursor='progress';
    try{
      // Use href as-is - browser resolves relative paths correctly
      const res = await fetch(href, {credentials:'same-origin'});
      const text = await res.text();
      app.innerHTML = extractMain(text);
      if(push) history.pushState({href}, '', href);
      window.scrollTo({top:0, behavior:'instant'});
      if(window.afterRouteChange) window.afterRouteChange();
    }catch(e){ console.error(e); location.href = href; }
    finally{ document.documentElement.style.cursor='auto'; }
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
    if(a.hasAttribute('data-nav') && isInternal(href)){
      e.preventDefault(); fetchTo(href, true);
    }
  }
  window.addEventListener('click', onClick);
  window.addEventListener('popstate', (e)=>{
    let href = (e.state && e.state.href) || location.pathname.replace(/^\//,'') || 'pages/index.html';
    fetchTo(href, false);
  });
  window.router = { go: (href)=>fetchTo(href, true) };
})();
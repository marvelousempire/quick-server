// LearnMappers SW v7.2
const CACHE='lm-cache-v7-2';
const ASSETS=['./pages/index.html','./pages/docs.html','./pages/docs-index.html','./pages/docs-config.html','./pages/docs-vendor-import.html','./pages/docs-relationship-mapping.html','./pages/docs-schemas.html','./pages/docs-standalone.html','./pages/inventory.html','./pages/service-menu.html','./scripts.js','./config.js','./manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{
    const cp=r.clone(); caches.open(CACHE).then(ch=>ch.put(e.request,cp)); return r;
  }).catch(()=>caches.match('./pages/index.html'))));
});
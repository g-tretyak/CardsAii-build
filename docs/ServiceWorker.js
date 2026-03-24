const cacheName = "ZeroZeroGames-CardsAii-v.01.24.03.2026.10:25";
const contentToCache = [
    "Build/96d617c1ba708fbcdd958ab8c14fbf99.loader.js",
    "Build/14c92c4f964d21c5b3df6db8139e2ea7.framework.js",
    "Build/6ca1bb43091f24c5ce0e82afbd9a5321.data",
    "Build/5dff023966868a768936b03a92a0921f.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});

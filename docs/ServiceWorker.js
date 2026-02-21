const cacheName = "ZeroZeroGames-CardsAii-v.01.21.02.2026.19:27";
const contentToCache = [
    "Build/8a24813da3a294322ebc4cd6f37aa660.loader.js",
    "Build/9fd07cc251673f8850f3029f8c0238dc.framework.js",
    "Build/33c40a62fc5cdfd162f4084e801d3c07.data",
    "Build/b50b174519bdf8aaa01f9c76532450bd.wasm",
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

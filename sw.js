const CACHE_NAME = `gmk-cache-v_INJECT_TIMESTAMP`;
const URLS_TO_CACHE = [INJECT_ASSETS_TO_PRELOAD];

self.addEventListener('fetch', async (fetchEvent) => {
    if (fetchEvent.request.mode === 'navigate') {
        fetchEvent.respondWith(
            (async () => (await caches.open(CACHE_NAME)).match('index.html'))(),
        )
    } else {
        fetchEvent.respondWith(
            (async () => await (await caches.open(CACHE_NAME))?.match(fetchEvent.request) ?? await fetch(fetchEvent.request))()
        )
    }});

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(URLS_TO_CACHE);
      return self.skipWaiting();
    })()
  );
});


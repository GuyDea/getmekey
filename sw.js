const CACHE_NAME = `gmk-cache-v_INJECT_TIMESTAMP`;
const URLS_TO_CACHE = ['INJECT_ASSETS_TO_PRELOAD'];

self.addEventListener('fetch', async (fetchEvent) => {
    const requestUrl = new URL(fetchEvent.request.url);
    if (fetchEvent.request.mode === 'navigate') {
        fetchEvent.respondWith((async () => {
            return await (await caches.open(CACHE_NAME)).match('index.html') ?? await fetch(fetchEvent.request);
        })(),)
    } else if (fetchEvent.request.method === 'GET' && requestUrl.origin === self.location.origin && URLS_TO_CACHE.includes(requestUrl.pathname.replace(/^\//, ''))) {
        fetchEvent.respondWith((async () => await (await caches.open(CACHE_NAME))?.match(fetchEvent.request) ?? await fetch(fetchEvent.request))())
    }
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.filter(n => n !== CACHE_NAME).map((cacheName) => caches.delete(cacheName)));
        // We don't want to use downloaded index.html - always use what is cached to prevent inconsistencies
        await self.registration?.navigationPreload?.disable();
    })());
});

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(URLS_TO_CACHE);
    })());
});

self.addEventListener('message', async (event) => {
    if (event.data.type === 'SKIP_WAIT') {
        await self.skipWaiting();
        const clients = await self.clients.matchAll({type: 'window', includeUncontrolled: true});
        clients.forEach((client) => client.postMessage({type: 'SKIP_WAITING_DONE'}));
    }
});

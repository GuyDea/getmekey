const CACHE_NAME = `gmk-cache-v_INJECT_TIMESTAMP`;
const URLS_TO_CACHE = [INJECT_ASSETS_TO_PRELOAD];

self.addEventListener('fetch', async (fetchEvent) => {
    if (fetchEvent.request.mode === 'navigate') {
        fetchEvent.respondWith((async () => {
            try {
                const preloadResponse = await fetchEvent.preloadResponse;
                if (preloadResponse) {
                    return preloadResponse;
                }
            } catch (e) {
            }
            return (await caches.open(CACHE_NAME)).match('index.html');
        })(),)
    } else if (fetchEvent.request.method === 'GET' && URLS_TO_CACHE.some((regex) => fetchEvent.request.url.match(regex))) {
        fetchEvent.respondWith((async () => await (await caches.open(CACHE_NAME))?.match(fetchEvent.request) ?? await fetch(fetchEvent.request))())
    }
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        if (self.registration.navigationPreload) {
            await self.registration.navigationPreload.enable();
        }
    })());
});

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(URLS_TO_CACHE);
    })());
});


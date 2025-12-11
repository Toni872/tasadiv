// Service Worker para TasaDiv - Optimización PWA básica
const CACHE_NAME = 'tasadiv-v1.0.4';
const STATIC_CACHE_URLS = [
    '/',
    '/index.html',
    '/styles.css?v=2.0',
    '/script.js?v=2.0',
    '/logo.svg',
    '/favicon.ico',
    '/manifest.json'
];

// Instalación del SW
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(STATIC_CACHE_URLS).catch(err => {
                    console.log('Cache addAll failed:', err);
                    // Continuar aunque falle algún recurso
                });
            })
    );
    self.skipWaiting();
});

// Activación del SW
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

// Fetch strategy: Cache First para assets estáticos, Network First para API
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Para API requests, intenta network first
    if (url.hostname.includes('exchangerate-api.com')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Cache successful responses
                    if (response.ok) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Fallback to cache if network fails
                    return caches.match(event.request);
                })
        );
    } else {
        // Para assets estáticos, cache first
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    return response || fetch(event.request);
                })
        );
    }
});

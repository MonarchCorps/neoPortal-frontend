const CACHE_NAME = 'dynamic-image-cache-v1';
const MAX_CACHE_SIZE = 50; // Maximum number of images to cache

// Helper function to limit cache size
async function limitCacheSize(cacheName, maxSize) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxSize) {
        await cache.delete(keys[0]); // Delete the oldest entry
        limitCacheSize(cacheName, maxSize); // Check again
    }
}

// Install event
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    self.skipWaiting(); // Activate the SW immediately
});

// Fetch event
self.addEventListener('fetch', (event) => {
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((response) => {
                    if (response) {
                        // Return the cached image if available
                        return response;
                    }
                    // Fetch the image from the network and cache it
                    return fetch(event.request).then((networkResponse) => {
                        cache.put(event.request, networkResponse.clone());
                        limitCacheSize(CACHE_NAME, MAX_CACHE_SIZE); // Check cache size
                        return networkResponse;
                    });
                });
            })
        );
    } else {
        // For non-image requests, fetch directly from the network
        event.respondWith(fetch(event.request));
    }
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log(`Service Worker: Deleting old cache ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
});

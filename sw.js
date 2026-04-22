const CACHE_NAME = 'NIHORT AgroMet Psychrometric Calculator';
const ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./images.jpeg",
    "./manifest.json"
];

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(
                ASSETS.map(url => {
                    return cache.add(url).catch(err => console.error("Failed to cache:", url, err));
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
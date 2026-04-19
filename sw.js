const CACHE_NAME = 'NIHORT AgroMet Atmospheric Calculator';
const ASSETS = [
  'index.html',
  'style.css',
  'script.js',
  'images.jpeg',
  'background.jpg'
];

// Install the service worker and cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Serve files from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

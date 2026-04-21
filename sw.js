const CACHE_NAME = 'NIHORT AgroMet Psychrometric Calculator';
const ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./images.jpeg"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
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

const CACHE_NAME = "xpenses-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./allowance.html",
  "./style.css",
  "./app.js",
  "./allowance.js",
  "./modal-toast.js",
  "./key_check.js",
  "./image/icon-192.png",
  "./image/icon-512.png",
  "./icons/back.svg",
  "./icons/wallet.svg",
  "./icons/download.svg",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      // Cache resources individually to handle failures gracefully
      return Promise.allSettled(
        urlsToCache.map((url) =>
          cache.add(url).catch((error) => {
            console.warn(`Failed to cache ${url}:`, error);
            return null; // Continue with other resources
          })
        )
      );
    })
  );
});

// Fetch event - serve from cache if available
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

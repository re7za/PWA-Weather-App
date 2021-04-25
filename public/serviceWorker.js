const CACHE_NAME = "weather-v1";
const urlsToCache = [
  "index.html",
  "offline.html",
  "/",
  "static/js/bundle.js",
  "static/js/vendors~main.chunk.js",
  "static/js/main.chunk.js",
  "static/media/wallpaper.74558807.jpg",
];

const self = this;

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("cache opened");
      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for the requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) return res;
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// Active the Service Worker
self.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

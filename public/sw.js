var STATIC_CACHE_VERSION = 'static-v17';
var DYNAMIC_CACHE_VERSION = 'dynamic-v17';

self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing service worker...', event);
  event.waitUntil(
    caches.open(STATIC_CACHE_VERSION).then(function (cache) {
      cache.addAll([
        '/',
        './index.html',
        '../dist/bundle.js',
        './img/logo.jpg',
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'
      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activating service worker...', event);
  // Cleaning the old cache
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(key => {
          if (key !== DYNAMIC_CACHE_VERSION && key !== STATIC_CACHE_VERSION) return caches.delete(key);
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request).then(function (res) {
            return caches.open(DYNAMIC_CACHE_VERSION).then(function (cache) {
              cache.put(event.request.url, res.clone());
              return res;
            });
          });
        }
      });
    })
  );
});

self.addEventListener('sync', event => {
  console.log('Back online!');

  if (event.tag === 'orderSync') {
    console.log('orderSync');
    // event.waitUntil();
  }
});

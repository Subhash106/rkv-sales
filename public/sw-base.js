importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const {
  strategies: { NetworkFirst, StaleWhileRevalidate },
  routing: { registerRoute, Route },
  core: { cacheNames }
} = workbox;

workbox.core.clientsClaim();
workbox.core.setCacheNameDetails({
  prefix: 'rkv',
  precache: 'precache',
  suffix: 'bundle'
});

self.addEventListener('activate', event => {
  self.skipWaiting();
  self.clients.claim();
  event.waitUntil(async function () {
    if ('navigationPreload' in self.registration) {
      self.registration.navigationPreload.enable();
    }
  });

  //   event.waitUntil(
  //     caches.open(cacheNames.precache).then(function (cache) {
  //       cache.addAll([
  //         '/',
  //         './index.html',
  //         '../dist/bundle.js',
  //         './img/logo.jpg',
  //         'https://fonts.googleapis.com',
  //         'https://fonts.gstatic.com',
  //         'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'
  //       ]);
  //     })
  //   );
});

registerRoute(
  ({ url }) => {
    console.log(url);
    return url.pathname === '/';
  },
  new NetworkFirst({
    cacheName: cacheNames.precache
  })
);
registerRoute(
  ({ url }) => url.pathname.startsWith('/orders'),
  new NetworkFirst({
    cacheName: cacheNames.precache
  })
);

const staticAssetsRoute = new Route(
  ({ request }) => {
    return ['image', 'script', 'style', 'manifest'].includes(request.destination);
  },
  new StaleWhileRevalidate({
    cacheName: 'static-assets'
  })
);

// Register the route handling static assets
registerRoute(staticAssetsRoute);

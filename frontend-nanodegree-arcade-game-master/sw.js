// Chrome's currently missing some useful cache methods,
// this polyfill adds them.
//importScripts('js/serviceworker-cache-polyfill.js');


self.addEventListener('install', function (event) {
  // Perform install steps
}); var CACHE_NAME = 'frogger_app';
var urlsToCache = [
        '/',
        '/index.html',
//        'images/',
        '/images/char-boy.png',
        '/images/enemy-bug.png',
        '/images/grass-block.png',
        '/images/water-block.png',
        '/images/stone-block.png',
//        'richlip.github.io/css/',
        '/css/frogstyle.css',
//        'js/',
        '/js/app.js',
        '/js/engine.js',
        '/js/resources.js',
        '/sw.js'
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
    .catch(err => console.log(err, event.request))
  );
});
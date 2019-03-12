var CACHE_NAME = 'alpwa-cache-v1';

var urlsToCache = [
    '/',
    '/css/main.css',
    '/js/jquery.min.js',
    '/js/main.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(
            function(cache){
                console.log('service worker do install..');
                return cache.addAll(urlsToCache);
            }
        )
    )
});

// self.addEventListener('fetch', function(event){
//     event.respondWith(
//         caches.match(event.request).then(function(respond){
//             if(response){
//                 return response;
//             }
//             return fetch(event.request);
//         })
//     )
// })
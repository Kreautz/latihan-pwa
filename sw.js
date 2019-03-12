var CACHE_NAME = 'alpwa-cache-v1';

var urlsToCache = [
    '/',
    '/css/main.css',
    '/images/ugm.png',
    '/js/jquery.min.js',
    '/js/main.js',
    '/fallback.json'
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

/* aktivasi cache */
self.addEventListener('activate', function(event) {  
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName){
              return cacheName !== CACHE_NAME
          }).map(function(cacheName){
              return caches.delete(cacheName)
          })
        );
      })
    );
  });

    /* Fetch Cache */

    self.addEventListener('fetch', function(event){

        var request = event.request;
        var url = new URL(request.url);
    
        if(url.origin === location.origin){
            event.respondWith(
                caches.match(request).then(function(response) {
                    return response || fetch(request);
                })
            )
        } 
    
        else {
            event.respondWith(
                caches.open('alpwa-cache-v1')
                .then(function (cache){
                    return fetch(request).then(function(liveRequest) {
                        cache.put(request, liveRequest.clone());
                        return liveRequest;
                    }).catch(function() {
                        return caches.match(request)
                        .then(function (response) {
                            if (response) return response;
                            return caches.match('/fallback.json')
                        })
                    })
                })
            )
        }
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
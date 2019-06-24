// Set a name for the current cache
var CACHE = 'v1';

self.addEventListener('install', function (evt) {
	evt.waitUntil(precache());
});

// self.addEventListener('fetch', function (evt) {
// 	evt.respondWith(fromCache(evt.request));
// 	evt.waitUntil(update(evt.request));
// });

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});


function precache() {
	return caches.open(CACHE).then(function (cache) {
		return cache.addAll([
			'./',
			'./styling/site.min.css',
			'./script/site.min.js',
			// 'https://fonts.googleapis.com/css?family=Roboto'
		]);
	});
}

// function fromCache(request) {
// 	return caches.open(CACHE).then(function (cache) {
// 		return cache.match(request).then(function (matching) {
// 			return matching || Promise.reject('no-match');
// 		});
// 	});
// }

// function update(request) {
// 	return caches.open(CACHE).then(function (cache) {
// 		return fetch(request).then(function (response) {
// 			return cache.put(request, response);
// 		});
// 	});
// }

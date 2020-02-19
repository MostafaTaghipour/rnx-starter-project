/* eslint-disable no-undef */
/* eslint no-restricted-globals: "off" */

workbox.skipWaiting();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute('./index.html', {
	blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
});

// cache external images
workbox.routing.registerRoute(
	new RegExp('^https://image\\.tmdb\\.org/'),
	new workbox.strategies.CacheFirst({
		cacheName: 'image-cache',
		plugins: [
			new workbox.cacheableResponse.Plugin({
				statuses: [0, 200],
			}),
		],
	})
);

self.addEventListener('install', event => {
	console.log('Installing service worker...');
});
self.addEventListener('activate', event => {
	console.log('Activate service worker...');
});

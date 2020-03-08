// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read http://bit.ly/CRA-PWA

const isLocalhost = Boolean(
	window.location.hostname === 'localhost' ||
		// [::1] is the IPv6 localhost address.
		window.location.hostname === '[::1]' ||
		// 127.0.0.1/8 is considered localhost for IPv4.
		window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

type Config = {
	onSuccess?: (registration: ServiceWorkerRegistration) => void;
	onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
	if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
		// The URL constructor is available in all browsers that support SW.
		const publicUrl = new URL(
			(process as { env: { [key: string]: string } }).env.PUBLIC_URL,
			window.location.href
		);
		if (publicUrl.origin !== window.location.origin) {
			// Our service worker won't work if PUBLIC_URL is on a different origin
			// from what our page is served on. This might happen if a CDN is used to
			// serve assets; see https://github.com/facebook/create-react-app/issues/2374
			return;
		}

		window.addEventListener('load', () => {
			// show instruction for "how install pwa in different platforms"
			handleInstructions();

			const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

			if (isLocalhost) {
				// This is running on localhost. Let's check if a service worker still exists or not.
				checkValidServiceWorker(swUrl, config);

				// Add some additional logging to localhost, pointing developers to the
				// service worker/PWA documentation.
				navigator.serviceWorker.ready.then(() => {
					console.log(
						'This web app is being served cache-first by a service ' +
							'worker. To learn more, visit http://bit.ly/CRA-PWA'
					);
				});
			} else {
				// Is not localhost. Just register service worker
				registerValidSW(swUrl, config);
			}
		});
	}
}

function registerValidSW(swUrl: string, config?: Config) {
	navigator.serviceWorker
		.register(swUrl)
		.then(registration => {
			registration.onupdatefound = () => {
				const installingWorker = registration.installing;

				if (installingWorker == null) {
					return;
				}
				installingWorker.onstatechange = () => {
					if (installingWorker.state === 'installed') {
						if (navigator.serviceWorker.controller) {
							// At this point, the updated precached content has been fetched,
							// but the previous service worker will still serve the older
							// content until all client tabs are closed.
							console.log(
								'New content is available and will be used when all ' +
									'tabs for this page are closed. See http://bit.ly/CRA-PWA.'
							);

							// Execute callback
							if (config && config.onUpdate) {
								config.onUpdate(registration);
							}
						} else {
							// At this point, everything has been precached.
							// It's the perfect time to display a
							// "Content is cached for offline use." message.
							console.log('Content is cached for offline use.');

							// Execute callback
							if (config && config.onSuccess) {
								config.onSuccess(registration);
							}
						}
					}
				};
			};
		})
		.catch(error => {
			console.error('Error during service worker registration:', error);
		});
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
	// Check if the service worker can be found. If it can't reload the page.
	fetch(swUrl)
		.then(response => {
			// Ensure service worker exists, and that we really are getting a JS file.
			const contentType = response.headers.get('content-type');
			if (
				response.status === 404 ||
				(contentType != null && contentType.indexOf('javascript') === -1)
			) {
				// No service worker found. Probably a different app. Reload the page.
				navigator.serviceWorker.ready.then(registration => {
					registration.unregister().then(() => {
						window.location.reload();
					});
				});
			} else {
				// Service worker found. Proceed as normal.
				registerValidSW(swUrl, config);
			}
		})
		.catch(() => {
			console.log('No internet connection found. App is running in offline mode.');
		});
}

export function unregister() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready.then(registration => {
			registration.unregister();
		});
	}
}

/***** BEGIN INSTRUCTIONS ******/
type osType = 'Windows Phone' | 'Android' | 'iOS' | 'unknown';

function getOperatingSystem(): osType {
	//@ts-ignore
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	// Windows Phone must come first because its UA also contains "Android"
	if (/windows phone/i.test(userAgent)) {
		return 'Windows Phone';
	}

	if (/android/i.test(userAgent)) {
		return 'Android';
	}

	if (
		/iPad|iPhone|iPod|iPad Simulator|iPhone Simulator|iPod Simulator/.test(userAgent) &&
		//@ts-ignore
		!window.MSStream
	) {
		return 'iOS';
	}

	return 'unknown';
}

type browserType = 'edge' | 'chrome' | 'safari' | 'unknown';

function getBrowser(): browserType {
	var userAgent =
		//@ts-ignore
		navigator.userAgent.toLowerCase() || navigator.vendor.toLowerCase() || window.opera;

	switch (true) {
		case userAgent.indexOf('edge') > -1:
			return 'edge';
		//@ts-ignore
		case userAgent.indexOf('chrome') > -1 && !!window.chrome:
			return 'chrome';
		case userAgent.indexOf('safari') > -1:
			return 'safari';
		default:
			return 'unknown';
	}
}

const LATS_SHOWN_KEY = 'lastShown';

function handleInstructions() {
	//@ts-ignore
	var isStandalone = navigator.standalone;
	if (isStandalone) return;

	var os: osType = getOperatingSystem();
	if (os == 'unknown' || os == 'Windows Phone') return;

	var browser: browserType = getBrowser();
	if (browser == 'unknown') return;

	if (os == 'iOS' && browser != 'safari') return;
	if (os == 'Android' && browser != 'chrome') return;
	// if (os == 'Windows Phone' && browser != 'edge') return;

	var lastShown = localStorage.getItem(LATS_SHOWN_KEY);
	var now = new Date().getTime();
	var lastShownIsLastWeek = lastShown && +lastShown + 1000 * 60 * 60 * 24 <= now;

	if (!lastShown || lastShownIsLastWeek) {
		document.getElementById('instruction-section')!!.style.display = 'flex';

		document.getElementById('instruction-ios')!!.style.display =
			os == 'iOS' && browser == 'safari' ? 'block' : 'none';
		document.getElementById('instruction-android')!!.style.display =
			os == 'Android' && browser == 'chrome' ? 'block' : 'none';
		// document.getElementById('instruction-windows')!!.style.display =
		// 	os == 'Windows Phone' && browser == 'edge' ? 'block' : 'none';

		localStorage.setItem(LATS_SHOWN_KEY, now.toString());
	}
}
/***** END INSTRUCTIONS ******/

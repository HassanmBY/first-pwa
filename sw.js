const version = 2;
const urlsToCache = [
	"./",
	"./index.html",
	"./style/style.css",
	"./scripts/main.js",
	"./scripts/install.js",
	"./manifest.json",
	"./icons/favicon-16x16.png",
	"./icons/favicon-32x32.png",
	"./icons/favicon-96x96.png",
	"./icons/favicon-256x256.png",
	"./icons/favicon.ico",
	"./screenshots/screenshot-landscape.png",
	"./screenshots/screenshot-portrait.png",
];
// Workbox google library => cache by folder

const CACHE_NAME = "pwa-cache-" + version;

self.addEventListener("install", e => {
	console.log("sw installed");

	/* prettier-ignore */
	e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
        );
	return self.skipWaiting();
});

self.addEventListener("activate", e => {
	console.log("sw activated");
	e.waitUntil(
		caches.has(`pwa-cache-${version - 1}`).then(exists => {
			if (exists) {
				caches.delete(`pwa-cache-${version - 1}`).then(response => {
					console.log("Old cache deleted: " + response);
				});
			}
		})
	);
	return self.clients.claim();
});

self.addEventListener("fetch", e => {
	if (e.request.method !== "GET") return;

	e.respondWith(
		/* prettier-ignore */
		caches.match(e.request)
            .then(cached => {
			    if (cached) return cached;
                
                return fetch(e.request)
                    .then(response => response)
                    .catch(()=>{
                        return new Response("Offline", {
                            status: 503,
                            statusText: "Offline"
                        })
                    }
                    )
		    })
	);
});

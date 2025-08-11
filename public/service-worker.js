const cache_name = "app-cache-v4";
const static_cache_name = "static-cache-v4";

const static_assets = [
  "/",
  "/index.html",
  "/index.css",
  "/index.client.js",
  "/favicon.png",
  "/apple-touch-icon-152x152.png",
  "/splash-screen-1024x1024.png",
  "/joystick_logo_light.svg",
  "/joystick_logo_dark.svg",
  "/manifest.json"
];

const static_exts = new Set([
  ".css", ".js", ".mjs",
  ".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico",
  ".woff", ".woff2", ".ttf", ".eot",
  ".json", ".txt"
]);

const cookie_vary_paths = new Set([
  "/joystick_logo_light.svg",
  "/joystick_logo_dark.svg"
]);

const get_ext = (path) => {
  const i = path.lastIndexOf(".");
  return i === -1 ? "" : path.slice(i).toLowerCase();
};

const is_static_asset = (url) => {
  const { pathname } = new URL(url, self.location.origin);
  if (static_assets.includes(pathname)) return true;
  return static_exts.has(get_ext(pathname));
};

const is_cache_busted = (url) => {
  return url.searchParams.has("_swcb") || url.searchParams.has("_cb");
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(static_cache_name)
      .then((cache) => cache.addAll(static_assets))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((names) =>
        Promise.all(
          names.map((n) => {
            if (n !== cache_name && n !== static_cache_name) {
              return caches.delete(n);
            }
          })
        )
      ),
      self.clients.claim()
    ])
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") return;
  if (url.origin !== location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  const is_navigation = request.mode === "navigate" || request.destination === "document";
  const needs_fresh = is_navigation || cookie_vary_paths.has(url.pathname) || is_cache_busted(url);

  if (needs_fresh) {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request, { cache: "no-store" });
        } catch {
          const cached = await caches.match(is_navigation ? "/" : request);
          return cached || new Response("Offline", { status: 503, statusText: "Service Unavailable" });
        }
      })()
    );
    return;
  }

  if (is_static_asset(request.url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;

        try {
          const network_response = await fetch(request);
          if (network_response && network_response.ok && (network_response.type === "basic" || network_response.type === "default")) {
            const response_clone = network_response.clone();
            event.waitUntil(
              (async () => {
                const c = await caches.open(static_cache_name);
                await c.put(request, response_clone);
              })()
            );
          }
          return network_response;
        } catch {
          const fallback = await caches.match(request);
          return fallback || new Response("Offline", { status: 503, statusText: "Service Unavailable" });
        }
      })()
    );
    return;
  }

  event.respondWith(
    (async () => {
      try {
        return await fetch(request, { cache: "no-store" });
      } catch {
        const cached = await caches.match(request);
        return cached || new Response("Offline", { status: 503, statusText: "Service Unavailable" });
      }
    })()
  );
});

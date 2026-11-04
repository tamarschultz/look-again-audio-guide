// Saves the whole tour on the phone so it can run with no reception. Used only on the hosted version.
const CACHE = "look-again-1793777804";
const FILES = ["./", "index.html", "guide.js", "track.mp4", "img/museum-logo.png",
  ...["intro", "film", "handmaid", "stalking", "pinkwall", "peace", "nighttrain", "eye"].map(n => `img/${n}.jpg`)];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
    // Keep the web font too, so captions look the same offline.
    if (res.ok && /fonts\.(googleapis|gstatic)\.com/.test(e.request.url)) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  })));
});

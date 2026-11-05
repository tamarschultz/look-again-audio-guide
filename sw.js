// Saves the whole tour on the phone, so it runs with no reception.
const CACHE = "look-again-1793837352";
const FILES = ['./', 'index.html', 'guide-v4.js', 'track-sweet.mp4', 'track-short.mp4', 'img/museum-logo.png', 'img/bigdog.jpg', 'img/coke.jpg', 'img/doublebill.jpg', 'img/early.jpg', 'img/entrance.jpg', 'img/ex-beyondsmall.jpg', 'img/ex-cahn.jpg', 'img/ex-cherniak.jpg', 'img/ex-dotan.jpg', 'img/ex-levac.jpg', 'img/ex-newbones.jpg', 'img/ex-noma.jpg', 'img/ex-playing.jpg', 'img/ex-simplydraw.jpg', 'img/ex-wesselmann.jpg', 'img/ex-yearzero.jpg', 'img/eye.jpg', 'img/faces.jpg', 'img/facingup.jpg', 'img/film.jpg', 'img/grid.jpg', 'img/handmaid.jpg', 'img/heartfull.jpg', 'img/howigot.jpg', 'img/lookout.jpg', 'img/murakami.jpg', 'img/nighttrain.jpg', 'img/opposites.jpg', 'img/optimistic.jpg', 'img/peace.jpg', 'img/pointed.jpg', 'img/portraits.jpg', 'img/rabbit.jpg', 'img/seethingsround.jpg', 'img/shyguy.jpg', 'img/sml.jpg', 'img/squares.jpg', 'img/stalking.jpg', 'img/summer.jpg', 'img/timetochange.jpg', 'img/unmaskingbook.jpg', 'img/vanda.jpg', 'img/vocalfry.jpg', 'img/whatyousee.jpg', 'img/whichcame.jpg', 'img/wolves.jpg', 'img/zerok.jpg'];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
    if (res.ok && /fonts\.(googleapis|gstatic)\.com/.test(e.request.url)) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  })));
});

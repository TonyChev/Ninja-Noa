/* Service worker : permet de jouer hors connexion */
const CACHE = 'ninja-noa-v2';
const FILES = ['./', 'index.html', 'manifest.json', 'css/style.css', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png',
  'js/util.js', 'js/content/maths.js', 'js/content/francais.js', 'js/content/histoire.js', 'js/content/geographie.js',
  'js/content/sciences.js', 'js/content/anglais.js', 'js/storage.js', 'js/voice.js', 'js/rewards.js', 'js/mascot.js', 'js/app.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok && new URL(e.request.url).origin === location.origin) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return r;
  }).catch(() => caches.match(e.request)));
});

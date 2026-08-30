/* Kloef tracker — service worker (offline app shell) */
const CACHE = "kloef-v2";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// tap a notification → focus or open the app
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(cs => {
    for (const c of cs) { if ("focus" in c) return c.focus(); }
    if (clients.openWindow) return clients.openWindow("./");
  }));
});

// browser-scheduled daily nudge (installed PWA on Android) — fires even when the app is closed
self.addEventListener("periodicsync", e => {
  if (e.tag === "kloef-reminder") {
    e.waitUntil(self.registration.showNotification("Kloef", {
      body: "Time to check in — plan your day and reset.",
      icon: "icon-192.png", badge: "icon-192.png", tag: "kloef-daily"
    }));
  }
});

// future: true push via FCM (needs a server/Cloud Function to send)
self.addEventListener("push", e => {
  let d = { title: "Kloef", body: "Reminder" };
  try { d = e.data.json(); } catch (_) { if (e.data) d.body = e.data.text(); }
  e.waitUntil(self.registration.showNotification(d.title || "Kloef", {
    body: d.body || "", icon: "icon-192.png", badge: "icon-192.png"
  }));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Never cache Firebase / Google API calls — always go to network (needed for live sync).
  if (/firebase|googleapis|gstatic|google\.com/.test(url.hostname)) return;

  // App navigations: network-first, fall back to the cached shell when offline.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).catch(() => caches.match("index.html")));
    return;
  }

  // Same-origin assets: cache-first, then network (and cache it).
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => hit))
    );
  }
});

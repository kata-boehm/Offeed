self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// Required by Chrome for PWA installability
self.addEventListener('fetch', e => e.respondWith(fetch(e.request)));

// Fires on browsers that support Periodic Background Sync (Chrome/Edge)
self.addEventListener('periodicsync', e => {
  if (e.tag === 'offeed-reminder') {
    e.waitUntil(
      self.registration.showNotification('Offeed 📵', {
        body: "Don't forget to log yesterday's screen time! Don't let your friends catch up 👀",
        tag: 'offeed-reminder',
        renotify: true,
      })
    );
  }
});

// Tap notification → open/focus the app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length) return list[0].focus();
      return clients.openWindow('/Offeed/');
    })
  );
});

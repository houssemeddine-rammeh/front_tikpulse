/// <reference lib="webworker" />

import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { NavigationRoute, registerRoute } from 'workbox-routing';

// Precache files injected by VitePWA plugin
precacheAndRoute(self.__WB_MANIFEST);

// Clean outdated caches automatically
cleanupOutdatedCaches();

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
});

let allowlist;
// Disable precaching on dev environment to avoid caching problems
if (import.meta.env.DEV) {
  allowlist = [/^\/$/];
}

// Cache navigation requests to enable SPA offline support
registerRoute(
  new NavigationRoute(createHandlerBoundToURL('index.html'), { allowlist })
);

self.addEventListener('push', (event) => {
  console.log('Push received', event);
  const data = event.data ? JSON.parse(event.data.text()) : {};
  const title = data.title || 'Notification';
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    data: { url: data.url || '/' },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
      const matchingClient = clientsArr.find(client =>
        client.url === new URL(urlToOpen, self.location.origin).href
      );

      if (matchingClient && 'focus' in matchingClient) {
        return matchingClient.focus();
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});

self.skipWaiting();
clientsClaim();

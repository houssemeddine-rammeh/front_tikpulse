/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { NavigationRoute, registerRoute } from 'workbox-routing';

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST);

// Clean old assets
cleanupOutdatedCaches();

/** @type {RegExp[] | undefined} */
let allowlist;
// In dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) allowlist = [/^\/$/];

// To allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL('index.html'), { allowlist })
);

self.skipWaiting();
clientsClaim();

// Push notification event listener
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const title = data.title || 'Notification';
  const options = {
    body: data.body || 'You have a new notification.',
    icon: data.icon || '/logo192.png',
    badge: data.badge || '/logo192.png',
    data: {
      url: data.url || '/', // URL to navigate when the notification is clicked
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click event listener
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a matching client exists, focus it; otherwise, open a new window
      const client = clientList.find((client) => client.url === url && 'focus' in client);
      if (client) {
        return client.focus();
      }
      return clients.openWindow(url);
    })
  );
});

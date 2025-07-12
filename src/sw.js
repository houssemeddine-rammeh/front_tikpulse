// src/sw.js

self.addEventListener('push', function (event) {
    const data = event.data?.json() || {}
  
    const title = data.title || 'New Notification'
    const options = {
      body: data.body || 'You have a new message!',
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      data: data.url || '/',
    }
  
    event.waitUntil(self.registration.showNotification(title, options))
  })
  
  self.addEventListener('notificationclick', function (event) {
    event.notification.close()
    const url = event.notification.data || '/'
    event.waitUntil(clients.openWindow(url))
  })
  
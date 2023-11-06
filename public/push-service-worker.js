self.addEventListener('push', function (event) {

    const notification = event.data.json();
    const imageUrl = 'new-logo512.png';
    const title = notification.title;
    const urlToOpen = `${self.location.origin}/events/${notification.eventId}`;

    const options = {
        body: notification.body,    
        icon: imageUrl,
        vibrate: [100, 50, 100],
        data: {
            url: urlToOpen
        }
    };

    event.waitUntil(self.registration.showNotification(title, options));
    event.waitUntil(self.skipWaiting());    
});

self.addEventListener('notificationclick', event => {
    const notificationData = event.notification.data;
    const urlToOpen = notificationData.url;

    event.waitUntil(clients.openWindow(urlToOpen));
});
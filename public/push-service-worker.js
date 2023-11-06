self.addEventListener('push', function (event) {
    const title = 'Event Organizer';

    const options = {
        body: event.data.text(),
        //icon: imageUrl,
        /*vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now()
        },
        actions: [
            {
                action: "explore", title: actionName,
            },
            {
                action: "close", title: "Ignore",
            },
        ]*/
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
});
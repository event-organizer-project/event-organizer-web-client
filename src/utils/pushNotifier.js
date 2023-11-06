import subscriptionService from 'services/subscriptionService'

export class PushNotifier {

    constructor() {
        if ('serviceWorker' in navigator) {
            this.registerPushServiceWorker();
        } else {
            console.log('Service Workers are not supported');
        }
    }

    registerPushServiceWorker() {
        if (!this.isNotificationGranted()) {
            console.log("Notifications are denied");
            return;
        }
        
        navigator.serviceWorker.register('/push-service-worker.js')
            .then(serviceWorkerRegistration => {
                serviceWorkerRegistration.pushManager.getSubscription()
                    .then(subscription => {
                        if (subscription == null) {
                            this.subscribe(serviceWorkerRegistration.pushManager);
                        } else {
                            console.log('Subscription already exists');
                        }
            });

            console.log('Push Service Worker has been registered successfully');
        }).catch(error => {
            console.log('Push Service Worker registration has failed: ' + error);
        });
    }

    subscribe(pushManager) {
        pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: subscriptionService.getPublicKey()
        })
        .then(result => {            
            const subscription = {
                endpoint: result.endpoint,
                p256dh: this.arrayBufferToBase64(result.getKey("p256dh")),
                auth: this.arrayBufferToBase64(result.getKey("auth"))
            }

            subscriptionService.storeSubscription(subscription);
        }).catch(error => {
            console.log(error)
        });
    }

    isNotificationGranted() {
        if (Notification.permission === 'default') {
            return Notification.requestPermission(status => status === 'granted')
        } else {
            return Notification.permission === 'granted';
        }
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
}

export const registerPushNotifier = () => new PushNotifier();
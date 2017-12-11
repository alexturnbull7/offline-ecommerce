importScripts('js/serviceworker-cache-polyfill.js');
// Here comes the install event!
// This only happens once, when the browser sees this
// version of the ServiceWorker for the first time.

var apiUrl = "https://pacific-citadel-7170.herokuapp.com/";

self.addEventListener('install', function (event) {
    // We pass a promise to event.waitUntil to signal how
    // long install takes, and if it failed

    event.waitUntil(
        // We open a cache...
        caches.open('simple-sw-v1').then(function (cache) {
            // And add resources to it
            return cache.addAll([
                '/',
                'cart.html',
                'detail.html',
                'index.html',
                'manifest.json',
                'peloton-detail.html',
                'css/fonts.css',
                'css/materialize.min.css',
                'css/styles.css',
                'js/logging.js',
                'js/serviceworker-cache-polyfill.js',
                'js/api-utils.js',
                'js/materialize.min.js',
                'js/index.js',
                'js/cart.js',
                'js/jquery-2.1.4.min.js',
                'js/detail.js',
                'images/bag.jpeg',
                'images/bike.jpeg',
                'images/cart.png',
                'images/crc-icon.png',
                'images/cart_ico.png',
                'images/logo.jpeg',
                'images/logo.png',
                'images/logo-square.png',
                'images/favicon.ico',
                'images/favicon-16x16.png',
                'images/favicon-32x32.png',
                'images/helmet.jpeg',
                'images/pants.jpeg',
                'images/trousers.jpeg',
                'images/tshirt.jpeg',
                'font/material-design-icons/Material-Design-Icons.eot',
                'font/material-design-icons/Material-Design-Icons.svg',
                'font/material-design-icons/Material-Design-Icons.ttf',
                'font/material-design-icons/Material-Design-Icons.woff',
                'font/material-design-icons/Material-Design-Icons.woff2',
                'font/material-design-icons/icons.woff2',
                'font/roboto/Roboto-Bold.ttf',
                'font/roboto/Roboto-Bold.woff2',
                'font/roboto/Roboto-Light.woff',
                'font/roboto/Roboto-Medium.ttf',
                'font/roboto/Roboto-Medium.woff2',
                'font/roboto/Roboto-Regular.woff',
                'font/roboto/Roboto-Thin.ttf',
                'font/roboto/Roboto-Thin.woff2',
                'font/roboto/Roboto-Bold.woff',
                'font/roboto/Roboto-Light.ttf',
                'font/roboto/Roboto-Light.woff2',
                'font/roboto/Roboto-Medium.woff',
                'font/roboto/Roboto-Regular.ttf',
                'font/roboto/Roboto-Regular.woff2',
                'font/roboto/Roboto-Thin.woff',
                'helmet-detail.html',
                'bag.html',
                'pants.html',
                'techtee.html',
                'trousers.html'
            ]);
        })

        );

    // fetch("https://pacific-citadel-7170.herokuapp.com/products").then(function(response) {
    //   return response.json();
    // }).then(function(data) {
    //   var realdata = [];
    //   for (var i in data) {
    //     realdata.push(data[i]);
    //   }
    //   saveInIndexedDb(realdata);
    // }).catch(function(err) {
    //   console.log(err);
    // });

});

function saveInIndexedDb(data) {


    var dbName = "bikedata";
    var request = indexedDB.open(dbName, 2);

    request.onerror = function (event) {
        // Handle errors.
    };

    request.onupgradeneeded = function (event) {
        var db = event.target.result;

        var objectStore = db.createObjectStore("crcdata", { keyPath: "productId" });

        objectStore.transaction.oncomplete = function (event) {
            // Store values in the newly created objectStore.
            var customerObjectStore = db.transaction("crcdata", "readwrite").objectStore("crcdata");
            for (var i = 0; i < data.length; i++) {
                console.log(JSON.stringify(data[i]));
                customerObjectStore.add(data[i]);
            }
        }
    };
}




// The fetch event happens for the page request with the
// ServiceWorker's scope, and any request made within that
// page
self.addEventListener('fetch', function (event) {
    // Calling event.respondWith means we're in charge
    // of providing the response. We pass in a promise
    // that resolves with a response object
    event.respondWith(
        // First we look for something in the caches that
        // matches the request
        caches.match(event.request).then(function (response) {
            // If we get something, we return it, otherwise
            // it's null, and we'll pass the request to
            // fetch, which will use the network.
            return response || fetch(event.request);
        })
        );
});

self.addEventListener('push', function (event) {
    console.log('Received a push message', event);

    var title = 'Hey, you\'re back online!';
    var body = 'Would you like to proceed to the checkout?';
    var icon = '/images/logo-square.png';
    var tag = 'simple-push-demo-notification-tag';

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: tag
        })
        );
});


self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(clients.openWindow("/cart.html"));
});



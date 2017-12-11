var product = null;

function addToCart() {
    var productName = document.getElementById('name').textContent;
    var image = document.getElementById('image').src;
    var price = document.getElementById('price').textContent.substring(1);
    var colour = document.getElementById('colour-select').value;
    var size = document.getElementById('size-select').value;
    var json = {
        'name': productName,
        'image': image,
        'price': price,
        'colour': colour,
        'size': size
    };

    var currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    currentCart.push(json);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    updateCartCount();
}

window.addEventListener("DOMContentLoaded", function () {
    var request = window.indexedDB.open("bikedata", 2);
    var productId = document.URL.split("=")[1];
    // if productId is undefined or not in db, return to homepage
    // TODO: Get product from indexed db
}, false);
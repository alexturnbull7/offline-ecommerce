var cartItems = [];
var div = null;
var total = 0;

function loadCartItems() {
    cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    div = document.getElementById("cart-card");
    if (cartItems.length > 0) {
        cartItems.forEach(function (item) {
            var fragment = '<div class="card-action">\
            <span>' + item.name + '<b class="right">&pound;' + item.price + '</b></span>\
          </div>';
            div.innerHTML = div.innerHTML + fragment;
            total += Number(item.price);
        });
        div.innerHTML = div.innerHTML + '<div class="card-action">\
            <a class="modal-trigger" href="#modal1">PROCEED TO CHECKOUT</a>\
            <b class="right">&pound;' + total.toFixed(2) + '</b>\
          </div>';
        $('.modal-trigger').leanModal();
    } else {
        div.innerHTML = div.innerHTML + '<div class="card-action">\
            <span>No items in your cart</span>\
          </div>';
    }
}

function clearCart() {
    document.getElementById("cart-card").innerHTML = '<div class="card-content">\
            <span class="smaller-title card-title activator grey-text text-darken-4">Cart</span>\
            <a class="right" href="#" onclick="clearCart();">CLEAR</a>\
          </div>';
    localStorage.setItem('cart', "[]");
    loadCartItems();
    updateCartCount();
    localStorage.setItem('notification', '');
}

window.addEventListener("DOMContentLoaded", function () {
    loadCartItems();
    if (navigator.onLine) {
        $('#checkout-text').text('Your order total is \xA3' + total.toFixed(2) + '. Make payment?');
    }
}, false);
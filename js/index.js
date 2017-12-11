function updateCartCount() {
    var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    var numItems = cartItems.length;
    if (numItems > 9) {
        document.getElementById("cart-count").innerHTML = "&#43;";
        $(document.getElementById("cart-count-circle")).show();
    } else if (numItems > 0) {
        document.getElementById("cart-count").innerHTML = numItems.toString();
        $(document.getElementById("cart-count-circle")).show();
    } else {
        $(document.getElementById("cart-count-circle")).hide();
    }
}

window.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
}, false);
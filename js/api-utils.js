var apiUrl = "https://pacific-citadel-7170.herokuapp.com/"

function getImageUrl(product) {
    return decodeURIComponent(product.imageUrl);
}

function getProducts() {
    $.get(apiUrl + "products",
        function (data) {
            return data;
        });
}

function getProduct(productId) {
    $.get(apiUrl + "products/" + productId,
        function (data) {
            return data;
        });
}

function getReviews(productId) {
    $.get(apiUrl + "products/" + productId + "/reviews",
        function (data) {
            return data;
        });
}
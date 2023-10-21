let products = JSON.parse(localStorage.getItem("productsData"));
let productId = localStorage.getItem("productId");
let itemDom = document.querySelector(".item-details");
let productDetails = products.find((item) => item.id == productId);

itemDom.innerHTML = `
        <img src="${productDetails.imageUrl}" alt="image">
        <h2>${productDetails.title}</h2>
        <span>${productDetails.size}</span>`;

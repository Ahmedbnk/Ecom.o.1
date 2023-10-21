let userInfo = document.querySelector("#user_info");
let userDom = document.querySelector("#user");
let logoutBtn = document.querySelector("#logout");
let links = document.querySelector("#links");

let username = localStorage.getItem("username");
let cartLength = JSON.parse(localStorage.getItem("cartLength")) || 0;

if (username) {
  links.remove();
  userInfo.style.display = "flex";
  userDom.textContent = username;
}

logoutBtn.addEventListener("click", function () {
  localStorage.clear();
  setTimeout(() => {
    window.location = "register.html";
  }, 1500);
});

// Define Product
let productsDom = document.querySelector(".products");
let cartProductMenu = document.querySelector(".carts-products");
let cartProductDivDom = document.querySelector(".carts-products div");
let badgeDom = document.querySelector(".badge");
let ShoppingCartIcon = document.querySelector(".shopping-cart");

let products = [
  {
    id: 1,
    title: "headphone item",
    size: "large",
    imageUrl: "images/headphone.jpg",
    qty: 1,
  },
  {
    id: 2,
    title: "laptop item",
    size: "small",
    imageUrl: "images/laptop.jpg",
    qty: 1,
  },
  {
    id: 3,
    title: "watch item",
    size: "medium",
    imageUrl: "images/watch.jpg",
    qty: 1,
  },
  {
    id: 4,
    title: "glasses item",
    size: "large",
    imageUrl: "images/glasses.jpg",
    qty: 1,
  },
];

let drawProductUI;
(drawProductUI = function (products = []) {
  let productUI = products.map((item) => {
    return ` <div class="products">
            <div class="product-item">
                <img src="${item.imageUrl}" alt="image" class="product-item-img"/>
                <div class="product-item-desc">
                  <a onclick="saveItemData(${item.id})">${item.title}</a>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                  <span>Size: ${item.size}</span>
                </div><!-- product item desc -->
                <div class="product-item-actions">
                  <button class="add-to-cart" onclick="addedToCart(${item.id})">Add To Cart</button>
                  <i class="far fa-heart favorite"></i>
                </div><!-- product item actions -->
              </div><!-- product-item -->
          </div><!-- products -->`;
  });

  productsDom.innerHTML = productUI.join``;
})(JSON.parse(localStorage.getItem("productsData")) || products);

let addedItem = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];

let allItems = [];

function addedToCart(id) {
  if (localStorage.getItem("username")) {
    var choosenItem = products.find((item) => item.id === id);
    let item = allItems.find((i) => i.id === choosenItem.id);
    if (item) {
      choosenItem.qty += 1;
    } else {
      allItems.push(choosenItem);
    }
    cartProductDivDom.innerHTML = "";
    allItems.forEach((item) => {
      cartProductDivDom.innerHTML += `<p>${item.title}  <span class="cartBadge">${item.qty}</span></p>`;
    });

    addedItem = [...addedItem, choosenItem];
    localStorage.setItem("productsInCart", JSON.stringify(addedItem));
    var cartProductLength = document.querySelectorAll(".carts-products div p");
    cartLength = addedItem.length;
    localStorage.setItem("cartLength", cartLength);
    badgeDom.style.display = "block";
    badgeDom.innerHTML = cartLength;
  } else {
    window.location = "login.html";
  }
}

ShoppingCartIcon.addEventListener("click", viewProducts);

function viewProducts() {
  if (badgeDom.innerHTML !== "") {
    if (cartProductMenu.style.display === "none") {
      cartProductMenu.style.display = "block";
    } else {
      cartProductMenu.style.display = "none";
    }
  }
}

function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "cartDetails.html";
}

localStorage.setItem("productsData", JSON.stringify(products));

// Search
let input = document.getElementById("search");
input.addEventListener("keyup", function (e) {
  search(e.target.value, products);

  if (e.target.value.trim() === "") {
    drawProductUI(products);
  }
});

function search(title, myArray) {
  let arr = myArray.filter((item) => item.title.indexOf(title) !== -1);
  drawProductUI(arr);
}

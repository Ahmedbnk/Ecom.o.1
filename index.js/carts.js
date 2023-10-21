let productsInCart = localStorage.getItem("productsInCart");
let productsDom = document.querySelector(".products");
let badgeDom = document.querySelector(".badge");
let ShoppingCartIcon = document.querySelector(".shopping-cart");
let cartProductMenu = document.querySelector(".carts-products");
let emptyContainer = document.querySelector(".empty-container");
let cartLength = JSON.parse(localStorage.getItem("cartLength")) || 0;

// Function to initialize the cart
function initializeCart() {
  const cartItems = JSON.parse(localStorage.getItem("productsInCart"));

  if (cartItems) {
    const uniqueItems = new Set();

    const uniqueCartItems = cartItems.filter((item) => {
      if (!uniqueItems.has(item.id)) {
        uniqueItems.add(item.id);
        return true;
      }
      return false;
    });

    badgeDom.style.display = cartLength > 0 ? "block" : "none";
    badgeDom.textContent = cartLength;

    drawCartProductUI(uniqueCartItems);
  }
}

initializeCart();

// Function to draw cart product UI
function drawCartProductUI(products) {
  let productUI = products.map((item) => {
    return `<div class="product-item">
        <img src="${item.imageUrl}" alt="image" class="product-item-img"/>
        <div class="product-item-desc">
          <a onclick="saveItemData(${item.id})">${item.title}</a>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
          <span>Size: ${item.size}</span>
        </div><!-- product item desc -->
        <div class="product-item-actions">
          <button class="add-to-cart" onclick="removeFromCart(${item.id})">Remove From Cart</button>
        </div><!-- product item actions -->
      </div><!-- product-item -->`;
  });

  productsDom.innerHTML = productUI.join("");
  if (productUI == "") {
    emptyContainer.innerHTML = `<div class="empty">There are no products selected</div>`;
  }
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
  const cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  const findItem = cartItems.findIndex((item) => item.id === itemId);

  if (findItem !== -1) {
    cartItems.splice(findItem, 1);
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    // Decrement the cartLength and update the badge
    cartLength = cartItems.length;
    localStorage.setItem("cartLength", cartLength);
    badgeDom.style.display = cartLength > 0 ? "block" : "none";
    badgeDom.textContent = cartLength;

    initializeCart();
  }
}

// Event listener for showing/hiding the cart
ShoppingCartIcon.addEventListener("click", viewProducts);

function viewProducts() {
  if (badgeDom.textContent > 0) {
    if (cartProductMenu.style.display === "none") {
      cartProductMenu.style.display = "block";
    } else {
      cartProductMenu.style.display = "none";
    }
  } else {
    cartProductMenu.style.display = "none";
  }
}

// Function to save item data and redirect to details page
function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "cartDetails.html";
}

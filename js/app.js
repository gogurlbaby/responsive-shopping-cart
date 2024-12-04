const productList = document.querySelector(".product-list-container");
const searchInput = document.getElementById("search-bar");
const cartItems = document.getElementById("cart-modal-items");
const shoppingCartTitle = document.querySelector(".cart-modal-title");
const totalPrice = document.getElementById("cart-modal-total-price");
const productDetailModal = document.querySelector(".product-detail-modal");
const modalContent = document.querySelector(".modal-content");
const modalCloseButton = document.querySelector(".modal-close");
const modalCloseCart = document.querySelector(".modal-cart-close");
const proceedToCheckoutButton = document.getElementById("proceedToCheckoutButton");
const checkoutModal = document.querySelector(".checkout-modal");
const checkoutModalForm = document.getElementById("checkout-modal-form");
const cancelButton = document.getElementById("cancel-button");
const cartModal = document.querySelector(".shopping-cart-modal");
const cartCount = document.getElementById("cart-count");

// Initialize Cart
let cart = [];

// For Cart Persistence
// localStorage.setItem("cart", JSON.stringify(cart)); 
// const savedCart = JSON.parse(localStorage.getItem("cart"));  
// if (savedCart) {
//   cart = savedCart;
// }


// Function to Open Checkout Modal
function openCheckoutModal() {
  checkoutModal.style.display = "flex";
}

// Function to Close Checkout Modal
function closeCheckoutModal() {
  checkoutModal.style.display = "none";
}

// Event Listener for Proceed to Checkout Button
proceedToCheckoutButton.addEventListener("click", function () {
  closeCartModal();
  openCheckoutModal(); 
});

// Event Listener for Checkout Modal Form Submission
checkoutModalForm.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const name = document.getElementById("modal-name").value;
  const email = document.getElementById("modal-email").value;
  const address = document.getElementById("modal-address").value;
  const card = document.getElementById("modal-card").value;

  if (name && email && address && card) {
    // Process Checkout Logic
    alert("Checkout successful!");
    checkoutModalForm.reset(); 
    closeCheckoutModal(); 
    cart = []; 
    updateCart(); 
  } else {
    alert("Please fill out all fields!");
  }
});

// Close Modal when clicking outside of the content
window.addEventListener("click", function (event) {
  if (event.target === checkoutModal) closeCheckoutModal();
});


window.addEventListener("click", function (event) {
  if (event.target === cartModal) closeCartModal();
  if (event.target === productDetailModal) closeModal();
});

// Event Listener for Cart
document
  .querySelector(".cart-container")
  .addEventListener("click", function (e) {
    e.preventDefault();
    openCartModal();
  });

// Function to Open Cart Modal
function openCartModal() {
  cartModal.style.display = "flex";
  updateCart();
}

// Function to Close Cart Modal
function closeCartModal() {
  cartModal.style.display = "none";
}

// Event Listener to Close Cart Modal
modalCloseCart.addEventListener("click", closeCartModal);

function updateCart() {
  cartItems.innerHTML = ""; 

  // Add cart-empty class if cart is empty
  if (cart.length === 0) {
    document.body.classList.add("cart-empty");
    
    // const emptyMessageContainer = document.createElement("div");
    // emptyMessageContainer.className = "empty-items-container";

    // const emptyMessage = document.createElement("p");
    // emptyMessage.className = "empty-message";
    // emptyMessage.textContent = "No items in cart";
    // emptyMessageContainer.appendChild(emptyMessage);

    // const exploreButton = document.createElement("a");
    // exploreButton.href = "#product-list-section";
    // exploreButton.id = "explore-btn";
    // exploreButton.textContent = "Explore Shopping";
    // emptyMessageContainer.appendChild(exploreButton);

    // cartItems.appendChild(emptyMessageContainer);

    totalPrice.textContent = "0.00";
    proceedToCheckoutButton.style.display = "none";  
  } else {
    document.body.classList.remove("cart-empty");

    cart.forEach(function (product, index) {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.setAttribute("role", "listitem");

      const productName = document.createElement("span");
      productName.textContent = product.name;
      cartItem.appendChild(productName);

      const productPrice = document.createElement("span");
      productPrice.textContent = "GH₵" + product.price;
      cartItem.appendChild(productPrice);

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.className = "remove-btn";
      removeButton.setAttribute("aria-label", `Remove GH₵{product.name} from cart`);
      removeButton.addEventListener("click", function () {
        removeFromCart(index);
      });
      cartItem.appendChild(removeButton);

      cartItems.appendChild(cartItem);
    });

    updateTotalPrice();
    updateCartCount();
    proceedToCheckoutButton.style.display = "inline-block";
  }
}


// Function to Update Total Price
function updateTotalPrice() {
  let total = 0;
  cart.forEach(function (product) {
    total += parseFloat(product.price) || 0;
  });
  totalPrice.textContent = total.toFixed(2);
}

// Function to Update Cart Count
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}

cartModal
  .querySelector(".modal-cart-content")
  .addEventListener("click", function (e) {
    e.stopPropagation(); 
  });

// Function to Add to Cart
function addToCart(productId) {
  const product = products.find(function (item) {
    return item.id === productId;
  });
  if (product) {
    cart.push(product);
    updateCart();
    updateTotalPrice();
    updateCartCount();
  }
}

// Function to Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  updateTotalPrice();
}

// Function to Update Cart Modal
function updateCartModal() {
  cartModalItems.innerHTML = "";

  cart.forEach(function (product, index) {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    const productName = document.createElement("span");
    productName.textContent = product.name;
    cartItem.appendChild(productName);

    const productPrice = document.createElement("span");
    productPrice.textContent = "GH₵" + product.price;
    cartItem.appendChild(productPrice);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.setAttribute("aria-label", `Remove GH₵{product.name} from cart`);
    removeButton.addEventListener("click", function () {
      removeFromCart(index);
      updateCartModal();
    });
    cartItem.appendChild(removeButton);

    cartModalItems.appendChild(cartItem);
  });
}

// Function to Display Product Details in a Modal
function showProductDetails(product) {
  modalContent.innerHTML = "";

  // Display  Product Image for Modal
  const productImage = document.createElement("img");
  productImage.src = product.image || "https://via.placeholder.com/150";
  productImage.alt = product.name;

  // Display Product Name for Modal
  const productName = document.createElement("h3");
  productName.textContent = product.name;

  // Display  Product Description for Modal
  const productDescription = document.createElement("h4");
  productDescription.textContent = product.description;

  // Display  Product Price for Modal
  const productPrice = document.createElement("p");
  productPrice.textContent = "Price: GH₵" + product.price;

  // Display Add to Cart Button for Modal
  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.className = "add-to-cart-btn";
  // ARIA label for Add to Cart
  addToCartButton.setAttribute("aria-label", `Add GH₵{product.name} to cart`);
  addToCartButton.addEventListener("click", function () {
    addToCart(product.id);
    closeModal();
  });

  modalContent.appendChild(productImage);
  modalContent.appendChild(productName);
  modalContent.appendChild(productDescription);
  modalContent.appendChild(productPrice);
  modalContent.appendChild(addToCartButton);

  productDetailModal.style.display = "block";
}

// Function to Close Modal Button
function closeModal() {
  productDetailModal.style.display = "none";
}

// Event Listener to Close Modal
modalCloseButton.addEventListener("click", closeModal);

//Function to Filter Products
function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const filterProducts = products.filter(function (product) {
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  });
  displayProducts(filterProducts);
}

// Event Listener for Search Input
searchInput.addEventListener("input", filterProducts);

// Function to Display and Filter Products
function displayProducts(productsToDisplay) {
  productList.innerHTML = "";

  productsToDisplay.forEach(function (product) {
    // Created div for each Product
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    // Created Product Image
    const productImage = document.createElement("img");
    productImage.src = product.image || "https://via.placeholder.com/150";
    productImage.alt = product.name;
    productCard.appendChild(productImage);

    // Created a container for the Text
    const cardTextContainer = document.createElement("div");
    cardTextContainer.className = "card-text-container";

    // Created Product Name
    const productName = document.createElement("h3");
    productName.textContent = product.name;
    cardTextContainer.appendChild(productName);

    // Created Product Description
    const productDescription = document.createElement("h4");
    productDescription.textContent = product.description;
    cardTextContainer.appendChild(productDescription);

    // Created Price
    const productPrice = document.createElement("p");
    productPrice.textContent = "GH₵" + product.price;
    cardTextContainer.appendChild(productPrice);

    // Created a container for the Buttons
    const cardButtonContainer = document.createElement("div");
    cardButtonContainer.className = "card-button-container";

    // Created Add to Cart Button
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.className = "add-to-cart-btn";
    // ARIA label for Add to Cart
    addToCartButton.setAttribute("aria-label", `Add GH₵{product.name} to cart`);
    addToCartButton.addEventListener("click", function () {
      addToCart(product.id);
    });
    cardButtonContainer.appendChild(addToCartButton);

    // View Details Button
    const viewDetailsButton = document.createElement("button");
    viewDetailsButton.textContent = "View Details";
    viewDetailsButton.className = "view-details-btn";
    viewDetailsButton.addEventListener("click", function () {
      showProductDetails(product);
    });
    cardButtonContainer.appendChild(viewDetailsButton);

    cardTextContainer.appendChild(cardButtonContainer);

    productCard.appendChild(cardTextContainer);

    productList.appendChild(productCard);
  });

  // Display Message if no Products are Found
  if (productsToDisplay.length === 0) {
    const noProductsMessage = document.createElement("p");
    noProductsMessage.textContent = "No products match your search criteria.";
    noProductsMessage.className = "no-products-message";
    productList.appendChild(noProductsMessage);
  }
}

displayProducts(products);

// Dynamically Update Year for Copyright Message on Footer
document.getElementById("currentYear").textContent = new Date().getFullYear();
const productList = document.querySelector(".product-list-container");
const searchInput = document.getElementById("search-bar");
const cartItems = document.querySelector(".cart-items");
const totalPrice = document.getElementById("total-price");
const productDetailModal = document.querySelector(".product-detail-modal");
const modalContent = document.querySelector(".modal-content");
const modalCloseButton = document.querySelector(".modal-close");
const checkoutForm = document.getElementById("checkout-form");
const cancelButton = document.getElementById("cancel-button");

let cart = [];

// Function to Update Cart
function updateCart() {
  cartItems.innerHTML = "";

  cart.forEach(function (product, index) {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    // ARIA role for list item
    cartItem.setAttribute("role", "listitem");

    // To Display Product Name and Price
    const productName = document.createElement("span");
    productName.textContent = product.name;
    cartItem.appendChild(productName);

    const productPrice = document.createElement("span");
    productPrice.textContent = "$" + product.price;
    cartItem.appendChild(productPrice);

    // Remove Button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    // ARIA label for removing product
    removeButton.setAttribute("aria-label", `Remove ${product.name} from cart`);
    removeButton.addEventListener("click", function () {
      removeFromCart(index);
    });
    cartItem.appendChild(removeButton);

    cartItems.appendChild(cartItem);
  });

  updateTotalPrice();
}

// Function to Update Total Price
function updateTotalPrice() {
  let total = 0;
  cart.forEach(function (product) {
    total += parseFloat(product.price);
  });
  totalPrice.textContent = total.toFixed(2);
}

// Function to Update Cart Count
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}

// Function to Add to Cart
function addToCart(productId) {
  const product = products.find(function (item) {
    return item.id === productId;
  });
  if (product) {
    cart.push(product);
    updateCart();
    updateCartCount();
  }
}

// Function to Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Function to Display Product Details in a Modal
function showProductDetails(product) {
  modalContent.innerHTML = "";

  // Form Validation for Checkout
  function formValidation(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const shippingAddress = document.getElementById("shippingAddress").value;
    const creditCard = document.getElementById("creditCard").value;

    // To check if all fields are filled
    if (!name || !email || !shippingAddress || !creditCard) {
      alert("Please fill out all fields");
      return;
    }

    // Email Format Validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Form Submission
    alert("Checkout successful!");
    checkoutForm.reset();
  }

  // Event Listener for Form Submission
  checkoutForm.addEventListener("submit", formValidation);

  // Event Listener for Cancel Button to Reset Form
  cancelButton.addEventListener("cancel-button", function () {
    checkoutForm.reset();
  });

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
  productPrice.textContent = "Price: $" + product.price;

  // Display Add to Cart Button for Modal
  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.className = "add-to-cart-btn";
  // ARIA label for Add to Cart
  addToCartButton.setAttribute("aria-label", `Add ${product.name} to cart`);
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

    // Created a container for the text
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
    productPrice.textContent = "$" + product.price;
    cardTextContainer.appendChild(productPrice);

    // Created a container for the buttons
    const cardButtonContainer = document.createElement("div");
    cardButtonContainer.className = "card-button-container";

    // Created Add to Cart Button
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.className = "add-to-cart-btn";
    // ARIA label for Add to Cart
    addToCartButton.setAttribute("aria-label", `Add ${product.name} to cart`);
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
}

displayProducts(products);

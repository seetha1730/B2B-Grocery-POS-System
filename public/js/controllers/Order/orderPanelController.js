// HTML ELEMENTS
const searchForm = document.getElementById("product-search-form");
const searchInput = document.getElementById("product-search");
const searchResultsContainer = document.getElementById("product-container");
const productDisplaySection = document.querySelector(".product-display-section");
const subTotalEle = document.querySelector(".subtotal");
const taxEle = document.querySelector(".tax");
const totalEle = document.querySelector(".total");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

// GLOBAL VARIABLES
let shoppingCart = [];
let subTotal = 0;
let tax = 0;
let total = 0;
let categories = []

// Api call
// Get All Categories from the DB, populate the List
const getCategories = () => {
  APIGetCall(`/category/all`)
    .then((response) => response.json())
    .then(data => {
      renderCategories(data)
      categories = data;
    })
    .catch(console.error);
};

//Functions
function renderCategories(categories) {
  const categoriesSection = document.querySelector(".categories-section");

  categories.categoryList.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category","col-2");
      categoryDiv.innerHTML = `
    <img class="category-img" alt="" src="${category.imageUrl}"/>
        <p>${category.categoryName}</p>
      `;

    categoriesSection.appendChild(categoryDiv);
});
}

// Function to fetch search results and display them
function fetchSearchResults(searchTerm) {
  // Make an AJAX request to the server to fetch search results
  APIGetCall(`/search/${searchTerm}`)
    .then((response) => response.json())
    .then(displaySearchResults)
    .catch(console.error);
}

// Function to update the total based on a product
function updateTotal(product) {
  const productTax = product.productPrice * 0.1; // Assuming 10% tax, adjust as needed
  subTotal += product.productPrice;
  tax += productTax;
  total = subTotal + tax;
  updateCartDisplay();
}

// Function to handle input in the search field
function handleSearchInput(event) {
  const searchTerm = event.target.value.trim();

  if (searchTerm.length >= 3) {
    fetchSearchResults(searchTerm);
  } else {
    clearSearchResults();
  }
}

// Function to display search results
function displaySearchResults(data) {
  clearSearchResults();

  if (data.length > 0) {
    data.forEach((product) => {
      const productCard = createProductCard(product);
      searchResultsContainer.appendChild(productCard);
    });
  } else {
    searchResultsContainer.innerHTML = "<p>No results found.</p>";
  }
}

// Function to create a product card
function createProductCard(product) {
  const productCard = document.createElement("div");
  const productNameCapitalized = product.productName.charAt(0).toUpperCase()+product.productName.slice(1)
  productCard.classList.add("card", "product", "col-lg-3", "col-md-3");
  productCard.innerHTML = `
    <h5 class="card-title product-name">${productNameCapitalized}
    <p class="col-8 product-quantity">${product.quantity}</p></h5>
    <div class="priceAddCart d-flex ">
     
      <p class="card-text product-price col-9">$${product.productPrice}</p>
      <button class="btn addCart bi bi-plus col-3" data-product='${JSON.stringify(
        product
      )}' value="Add"></button>
    </div>
  `;

  const addCartButton = productCard.querySelector(".addCart");
  addCartButton.addEventListener("click", handleAddToCart);

  return productCard;
}

// Function to clear search results
function clearSearchResults() {
  searchResultsContainer.innerHTML = "";
}

// Function to update the cart display
function updateCartDisplay() {
  productDisplaySection.innerHTML = "";

  shoppingCart.forEach((cartItem) => {
    const productItem = createCartItem(cartItem);
    productDisplaySection.appendChild(productItem);
  });

  subTotalEle.innerHTML = `$ ${parseFloat(subTotal).toFixed(2)}`;
  taxEle.innerHTML = `$ ${parseFloat(tax).toFixed(2)}`;
  totalEle.innerHTML = `$ ${parseFloat(total).toFixed(2)}`;
}

// Function to handle adding a product to the cart
function handleAddToCart(event) {
  const productData = JSON.parse(event.target.getAttribute("data-product"));
  const findProduct = shoppingCart.find((item) => item._id === productData._id);

  if (!findProduct) {
    shoppingCart.push({ ...productData, noItems: 1 });
  } else {
    findProduct.noItems++;
  }
  updateTotal(productData);
}

// Function to handle incrementing a cart item
function increment(event) {
  const id = event.target.getAttribute("data-id");
  const findProduct = shoppingCart.find((item) => item._id === id);

  if (findProduct) {
    findProduct.noItems++;
    updateTotal(findProduct);
  }
}

// Function to handle decrementing a cart item
function decrement(event) {
  const id = event.target.getAttribute("data-id");
  const findProduct = shoppingCart.find((item) => item._id === id);

  if (findProduct) {
    if (findProduct.noItems > 1) {
      findProduct.noItems--;
    } else {
      shoppingCart = shoppingCart.filter((item) => item._id !== id);
    }
     const productTax = findProduct.productPrice * 0.1; // Assuming 10% tax, adjust as needed
    subTotal = subTotal - findProduct.productPrice
    tax -= productTax;
     total = subTotal + tax;
  }
  updateCartDisplay();
}

// Function to create a cart item
function createCartItem(cartItem) {
  const productItem = document.createElement("div");
  productItem.classList.add("product-add-section");
  productItem.innerHTML = `
    <div class="product-in-cart">
      <p class="product-name">${cartItem.productName}</p>
      <h4 class="product-price">$${cartItem.productPrice.toFixed(2)}</h4>
    </div>
    <div class="input-group">
      <i class="bi bi-dash decrement" data-id="${cartItem._id}"></i>
      <span class="input-number form-control quantity">${cartItem.noItems}</span>
      <i class="bi bi-plus increment" data-id="${cartItem._id}"></i>
    </div>
  `;

  const incrementButton = productItem.querySelector(".increment");
  incrementButton.addEventListener("click", increment);

  const decrementButton = productItem.querySelector(".decrement");
  decrementButton.addEventListener("click", decrement);

  return productItem;
}

// EVENT LISTENERS
// Prevent the form from submitting
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

prevButton.addEventListener("click", () => {
  document.querySelector('.categories-section').scrollLeft += -500;
});

nextButton.addEventListener("click", () => {

document.querySelector('.categories-section').scrollLeft += 500;

});

// Event listener for the search input field
searchInput.addEventListener("input", handleSearchInput);

getCategories();




/*
-------------------------------- WIP - display categories and products dynamically on the home page ----------------

// Event listener for the category links in the home page
const categoryLinks = document.getElementById(".product-container");
categoryLinks.forEach((categoryLink) => {
  console.log("Entered the categoryLinks part", categoryLink) /////////// TESTING
  categoryLink.addEventListener("click", (event) => {
    event.preventDefault();
    const selectedCategory = event.target.getAttribute(".category-name-carousel");

    // Fetch products based on the selected category
    fetch(`/category/${selectedCategory}`)
      .then((response) => response.json())
      .then((data) => {
        // Display products for the selected category
        console.log("updateProductDisplay function: ", data)
        updateCartDisplay(data);
      })
      .catch((error) => {
        console.log(error)
      });
  });
});
*/






// HTML ELEMENTS
const searchForm = document.getElementById("product-search-form");

const searchInput = document.getElementById("product-search");

const productDisplaySection = document.querySelector(".product-display-section");
const subTotalEle = document.querySelector(".subtotal");
const taxEle = document.querySelector(".tax");
const totalEle = document.querySelector(".total");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const productSection = document.getElementById('product-section');
const clearCartButton = document.getElementById("clearCartBtn");
const searchButton = document.getElementById('searchButton');
const customerIdInput = document.getElementById('customerIdInput');
const customerName = document.getElementById('customer_name')

// GLOBAL VARIABLES
let shoppingCart = [];
let subTotal = 0;
let tax = 0;
let total = 0;
let customer = '';

const COLLECTION_CATEGORY_URL = '/category/all'
const COLLECTION_PRODUCT_URL = '/product/all'


// API CALL


// Get All Categories and all Products from the DB, populate the List
const getCategoriesAndProducts = async () => {
  const [categoryResponse, productResponse] = await Promise.all([APIGetCall(COLLECTION_CATEGORY_URL), APIGetCall(COLLECTION_PRODUCT_URL)])


  const categoryPayload = await categoryResponse.json()
  const productPayload = await productResponse.json()

  const {categoryList} = categoryPayload
  const {productList} = productPayload

  return {categoryList, productList}
};

// Function to fetch search results and display them
function fetchSearchResults(searchTerm) {
  // Make an AJAX request to the server to fetch search results
  
  APIGetCall(`/search/${searchTerm}`)
    .then((response) => response.json())
    .then(displaySearchResults)
    .catch(console.error);
}

function searchCustomerResult() {
  // Make an AJAX request to the server to fetch search results
  APIGetCall(`/search/customer/${customerIdInput.value}`)
    .then((response) => response.json())
    .then(data => {
      customerName.innerText = `${data[0].firstName} ${data[0].lastName}`
    })
    .catch(console.error);
}


// FUNCTIONS

const handleCategoryItemClick = (category, products) => {
  clearProductSection()

  const productRelatedToCategory = products.filter((productItem) => productItem.categoryName === category.categoryName)

  for (const product of productRelatedToCategory) {
    const productElement = createProductCard(product)

    productSection.appendChild(productElement)
  }
}

const renderCategories = (allCategories = [], allProducts = []) => {
  const categoriesSectionElement = document.getElementById("categories-section");

  allCategories.forEach((category) => {
    const categoryItemElement = document.createElement("div");
    // add element properties
    categoryItemElement.classList.add('category','box-shadow', 'col-2', 'category-item' ,'card-img-top')
    categoryItemElement.onclick = () => handleCategoryItemClick(category, allProducts)

    // add content
    const elementContent = `
    <div class="card-body">
      <img class="category-img card-img-top " src="${category.imageUrl || 'images/no-image.png' }" />
      <p class="card-title">${category.categoryName}</p>
      </div>
    `

    categoryItemElement.innerHTML = elementContent

    // Add to category section
    categoriesSectionElement.appendChild(categoryItemElement)
  })
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
    clearProductSection();
  }
}

// Function to display search results
function displaySearchResults(searchResult) {
  clearProductSection();

  if (searchResult.length > 0) {
    searchResult.forEach((product) => {
      const productCard = createProductCard(product)

      productSection.appendChild(productCard)
    });
  } else {
    productSection.innerHTML = "<p>No results found.</p>";
  }
}

const handleAddProductClick = (productEncoded) => {
  const decodeProduct = JSON.parse(decodeURIComponent(productEncoded))

  handleAddToCart(decodeProduct)
}

// Function to create a product card
function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("card", "product", "col-lg-3", "col-md-3");

  const productNameCapitalized = product.productName.charAt(0).toUpperCase() + product.productName.slice(1)
  const encodeProductForArgument = encodeURIComponent(JSON.stringify(product))

  productCard.innerHTML = `

    <h5 class="card-title product-name">${productNameCapitalized}
    
    <p class="col-8 product-quantity">${product.quantity}</p></h5>
    <div class="priceAddCart d-flex">
      
      <p class="card-text product-price col-9">$${product.productPrice}</p>
      <button class="btn addCart bi bi-plus col-3" value="Add" onclick="handleAddProductClick('${encodeProductForArgument}')"></button>

    </div>
  `

  return productCard
}

// Function to clear search results
function clearProductSection() {
  productSection.innerHTML = "";
}

// Function to display the products of a specific category
function displayProductsByCategory(category) {
  const products = [];
  console.log("test 1")
  productSection.innerHTML = "";

  const filteredProducts = products.filter(product => product.category === category);
  console.log("test 2", category)

  filteredProducts.forEach(product => {
    console.log("test 3")
    console.log(product.category)
    const productCard = createProductCard(product);
    productSection.appendChild(productCard);

  });
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
function handleAddToCart(product) {
  const findProduct = shoppingCart.find((item) => item._id === product._id);

  if (!findProduct) {
    shoppingCart.push({...product, noItems: 1});
  } else {
    findProduct.noItems++;
  }

  updateTotal(product);
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



// Function to clear the cart
function clearCart() {
  localStorage.removeItem('cart')
}

// EVENT LISTENERS
// Prevent the form from submitting
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

prevButton.addEventListener("click", () => {
  document.getElementById('categories-section').scrollLeft += -500;
});

nextButton.addEventListener("click", () => {

  document.getElementById('categories-section').scrollLeft += 500;

});

searchInput.addEventListener("input", handleSearchInput);

// Add an event listener to the button
clearCartButton.addEventListener("click", function () {
  // Call a function to clear the cart (you can define this function)
  clearCart();

});


getCategoriesAndProducts().then((result) => {
  const {categoryList, productList} = result

  renderCategories(categoryList, productList)
})

let checkoutBtnCard = document.getElementById("checkoutBtnCard");
let checkoutPopup = document.getElementById("checkout-popup");
let checkoutBtnCash = document.getElementById("checkoutBtnCash");
let close = document.getElementsByClassName("close");
let index= 0;
let checkoutOrderNumber = 0;


// FUNCTIONS

const addItemToPopupCart = (shoppingItem) => {
  const checkTablePopupBody = document.getElementById('checkout-table-popup-body')
  const popupCartItem = document.createElement('tr')

  const productNameFirstLetterUpperCase = `${shoppingItem.productName.charAt(0).toUpperCase()}${shoppingItem.productName.slice(1)}`
  const priceSplitTwoDecimal = Number.parseFloat(shoppingItem.productPrice).toFixed(2) * shoppingItem.noItems

  popupCartItem.innerHTML = `

    <td>${index += 1}</td>
    <td>${productNameFirstLetterUpperCase}</td>
    <td>${shoppingItem.noItems}</td>
    <td>$ ${priceSplitTwoDecimal}</td>

  `

  if (checkTablePopupBody) {
    checkTablePopupBody.appendChild(popupCartItem)
  }
}

//checkout popup card

checkoutBtnCard?.addEventListener("click", function () {
  checkoutPopup.style.display = "block";
  const TAX = 1.1
  const totalPrice = (shoppingCart.reduce((acc, curr) => {
    return acc + curr.productPrice * curr.noItems
  }, 0) * TAX).toFixed(2)

  checkoutPopup.innerHTML = `
     <div class="checkout-content">
        <span class="close">&times;</span>
        <h2>Checkout Order: ${checkoutOrderNumber += 1}</h2>
        <h1>Amount to Pay:<b class="amount-total">$ ${(totalPrice)}</b></h1>

        <p>Cashier: Brenda</p>
        <p>Paying as customer: Guest</p>

        <div class="coupon-section">
          <label for="coupon-code">coupon Code:</label>
          <input type="text" id="coupon-code" class=" form-control" placeholder="Enter your coupon code here" min="4"
            max="100">
          <button id="apply-coupon">Apply</button>
        </div>

        <table id="checkout-table-popup" class="table">
          <thead>
            
          </thead>
          <tbody id="checkout-table-popup-body">
            
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colspan="3">Subtotal:</th>
              <td class="product-total"><span class="checkout-subtotal"><b>$ ${shoppingCart[0].productPrice.toFixed(2)}</b></span></td>
            </tr>
            <tr>
              <th scope="row" colspan="3">Tax:</th>
              <td class="product-total"><span class="checkout-tax"><b>$ ${shoppingCart[0].productPrice.toFixed(2)*TAX} </b></span></td>
            </tr>

            <tr>
              <th scope="row" colspan="3">Total:</th>
              <td class="product-total"><span class="checkout-total"><b>$ ${(totalPrice)}</b></span></td>
            </tr>

          </tfoot>
        </table>

        <button type="button" class="btn btn-primary" id="paymentBtn"> Pay </button>


      </div>`

  shoppingCart.forEach((shoppingItem) => addItemToPopupCart(shoppingItem))

})
close?.addEventListener("click", function () {
  checkoutPopup.style.display = "none";
})

//checkout popup cash

checkoutBtnCash?.addEventListener("click", function () {


  checkoutPopup.style.display = "block";

  checkoutPopup.innerHTML = `
     <div class="checkout-content">
        <span class="close">&times;</span>
        <h2>Checkout Order #3484</h2>
        <h1>Amount to Pay:<b class="amount-total"> $${(shoppingCart.noItems * shoppingCart.productPrice).toFixed(2)}</b></h1>

        <p>Cashier: Brenda</p>
        <p>Paying as customer: Guest</p>

        <div class="coupon-section">
          <label for="coupon-code">coupon Code:</label>
          <input type="text" id="coupon-code" class=" form-control" placeholder="Enter your coupon code here" min="4"
            max="100">
          <button id="apply-coupon">Apply</button>
        </div>

        <table id="checkout-table" class="table">
          <thead>
            <tr>
              <th scope="col">index</th>
              <th scope="col" class="product-name"> ${shoppingCart[0].productName.charAt(0).toUpperCase() + shoppingCart[0].productName.slice(1)}</th>
              <th scope="col"> ${shoppingCart[0].quantity}</th>
              <th scope="col">$ ${shoppingCart[0].productPrice.toFixed(2)}</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colspan="3">Subtotal:</th>
              <td class="product-total"><span class="checkout-subtotal"><b>$ ${shoppingCart[0].productPrice.toFixed(2)}</b></span></td>
            </tr>
            <tr>
              <th scope="row" colspan="3">Tax:</th>
              <td class="product-total"><span class="checkout-tax"><b>$ ${shoppingCart[0].productPrice.toFixed(2) * 0.10}</b></span></td>
            </tr>

            <tr>
              <th scope="row" colspan="3">Total:</th>
              <td class="product-total"><span class="checkout-total"><b>$ ${shoppingCart[0].productPrice.toFixed(2) + shoppingCart[0].productPrice.toFixed(2) * 0.10}</b></span></td>
            </tr>

          </tfoot>
        </table>

        <button type="button" class="btn btn-primary" id="paymentBtn"> Pay </button>


      </div>`


})
close?.addEventListener("click", function () {
  checkoutPopup.style.display = "none";
})

// Discount code
let totalAmount = shoppingCart.reduce((total, item) => total + item.quantity * item.productPrice, 0)

function applyDiscount() {
  const couponCodeInput = document.getElementById("coupon-code")
  const discountCode = couponCodeInput.value;

  if (discountCode === "WELCOME10") {
    const discountAmount = totalAmount * 0.1;

    totalAmount -= discountAmount;

    const amountTotal = document.querySelector(".product-total");
    amountTotal.textContent = `$ ${totalAmount.toFixed(2)}`;
  } else {
    alert("Invalid coupon code. Please try again.")
  }
}

const applyCouponButton = document.getElementById("apply-coupon");
applyCouponButton.addEventListener("click", applyDiscount);


//processing payment popup

const paymentBtn = document.getElementById("paymentBtn");
const paymentPopup = document.getElementById("payment-popup");
const paymentClose = document.querySelector(".payment-close");


paymentBtn?.addEventListener("click", function () {
  paymentPopup.style.display = "block";
  checkoutPopup.style.display = "none";


})
paymentClose?.addEventListener("click", function () {
  paymentPopup.style.display = "none";
})




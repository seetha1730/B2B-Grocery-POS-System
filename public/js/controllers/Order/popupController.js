// HTML ELEMENTS
const checkoutBtnCard = document.getElementById("checkoutBtnCard");
const checkoutPopup = document.getElementById("checkout-popup");
const checkoutBtnCash = document.getElementById("checkoutBtnCash");
const applyCouponButton = document.getElementById("apply-coupon");
const checkTablePopupBody = document.getElementById('checkout-table-popup-body')
const checkTableFooterBody = document.getElementById('checkout-table-footer-body')

// GLOBAL VARIABLES
let index = 0;
let checkoutOrderNumber = 0;

// FUNCTIONS
const addItemToPopupCart = (shoppingItem) => {
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

const applyDiscount = () => {
  const couponCodeInput = document.getElementById("coupon-code")
  const amountToPay = document.getElementById("amount-total")

  let totalAmount = 0
  let discount = 0.10

  const discountCode = couponCodeInput.value;

  shoppingCart.forEach((product) => {
    totalAmount = totalAmount + product.productPrice * product.noItems
  })

  if (discountCode === "WELCOME10") {
    const discountAmount = (totalAmount * discount).toFixed(2);
    console.log(discountAmount)
    const newAmountAfterDiscount = (totalAmount - discountAmount).toFixed(2)

    const discountLine = document.createElement('tr');

    discountLine.innerHTML = `
      <th scope="row"> Discount amount: 
         <td classname = "product-total"> <b> $ ${discountAmount} </b> </td>
      </th>
      <th scope="row"> New total: 
         <td classname = "product-total"> <b> $ ${newAmountAfterDiscount} </b></td>
      </th>
      `

    if (checkTableFooterBody) {
      amountToPay.innerHTML =  `$ ${newAmountAfterDiscount}`
      checkTableFooterBody.appendChild(discountLine)
    }
    // Update the displayed total
    const amountTotal = document.getElementsByClassName("product-total");
    amountTotal.textContent = `$ ${newAmountAfterDiscount}`;
  } else {
    alert("Invalid coupon code. Please try again.");
  }
}

// LISTENERS
checkoutBtnCard?.addEventListener("click", () => {
  checkoutPopup.style.display = "block";

  const TAX = 1.1
  const totalPrice = shoppingCart.reduce((acc, curr) => {
    return acc + curr.productPrice * curr.noItems
  }, 0).toFixed(2)
  const totalPriceWithTax = (totalPrice * TAX).toFixed(2)
  const onlyTax = (totalPriceWithTax - totalPrice).toFixed(2)

  const amountTotalElement = document.getElementById('amount-total')
  const checkoutOrderNumberElement = document.getElementById('checkout-order-popup')
  const totalPriceNoTaxElement = document.getElementById('total-price-no-tax')
  const totalPriceOnlyTaxElement = document.getElementById('total-price-only-tax')
  const totalPriceWithTaxElement = document.getElementById('total-price-with-tax')
  const closeButton = document.getElementById("close");

  amountTotalElement.innerHTML = `$ ${totalPriceWithTax}`
  checkoutOrderNumberElement.innerHTML =  ` ${checkoutOrderNumber + 1}`
  totalPriceNoTaxElement.innerHTML = `$ ${totalPrice}`
  totalPriceOnlyTaxElement.innerHTML = `$ ${onlyTax}`
  totalPriceWithTaxElement.innerHTML = `$ ${totalPriceWithTax}`

  shoppingCart.forEach((shoppingItem) => addItemToPopupCart(shoppingItem))

  closeButton.addEventListener("click", function () {
    checkoutPopup.style.display = "none";
  });
  closeButton.style.cursor = "pointer";
})

checkoutBtnCash?.addEventListener("click", () => {
  checkoutPopup.style.display = "block";

  const TAX = 1.1
  const totalPrice = shoppingCart.reduce((acc, curr) => {
    return acc + curr.productPrice * curr.noItems
  }, 0).toFixed(2)
  const totalPriceWithTax = (totalPrice * TAX).toFixed(2)
  const onlyTax = (totalPriceWithTax - totalPrice).toFixed(2)

  const amountTotalElement = document.getElementById('amount-total')
  const checkoutOrderNumberElement = document.getElementById('checkout-order-popup')
  const totalPriceNoTaxElement = document.getElementById('total-price-no-tax')
  const totalPriceOnlyTaxElement = document.getElementById('total-price-only-tax')
  const totalPriceWithTaxElement = document.getElementById('total-price-with-tax')
  const closeButton = document.getElementById("close");

  amountTotalElement.innerHTML = `$ ${totalPriceWithTax}`
  checkoutOrderNumberElement.innerHTML =  ` ${checkoutOrderNumber + 1}`
  totalPriceNoTaxElement.innerHTML = `$ ${totalPrice}`
  totalPriceOnlyTaxElement.innerHTML = `$ ${onlyTax}`
  totalPriceWithTaxElement.innerHTML = `$ ${totalPriceWithTax}`

  shoppingCart.forEach((shoppingItem) => addItemToPopupCart(shoppingItem))

  closeButton.addEventListener("click", function () {
    checkoutPopup.style.display = "none";
  });
  closeButton.style.cursor = "pointer";
})

applyCouponButton.addEventListener("click", applyDiscount);

//const paymentPopup = document.getElementById("payment-popup");
//const paymentClose = document.querySelector(".payment-close");
//const payButton = document.getElementById("paymentBtn");

/*payButton.addEventListener("click", function () {
  console.log("button clicked")
  paymentPopup.style.display = "block";
  checkoutPopup.style.display = "none";

  const popupMessage = document.createElement("div");
  popupMessage.innerHTML = `
        <h1>Please follow the instructions on the terminal</h1>
    `;


  // Append the pop-up message to the body
  document.body.appendChild(popupMessage);
});

paymentClose?.addEventListener("click", function () {
  paymentPopup.style.display = "none";
})*/



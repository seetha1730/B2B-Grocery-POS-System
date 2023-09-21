// HTML ELEMENTS
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutPopup = document.getElementById("checkout-popup");
const applyCouponButton = document.getElementById("apply-coupon");
const checkTablePopupBody = document.getElementById('checkout-table-popup-body')
const checkTableFooterBody = document.getElementById('checkout-table-footer-body')
const paymentBtnCard = document.getElementById("paymentBtnCard")
const paymentBtnCash = document.getElementById("paymentBtnCash")
const paymentPopUpCard = document.getElementById("card-payment-popup")
const paymentPopUpCash = document.getElementById("cash-payment-popup")
const closeButtonCash = document.querySelector("#cash-payment-popup .close");
const closeButtonCard = document.querySelector("#card-payment-popup .close");


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
         <td classname = "product-total"> <b>  ${discountAmount} </b> </td>
      </th>
      <th scope="row"> New total: 
         <td classname = "product-total"> <b>  ${newAmountAfterDiscount} </b></td>
      </th>
      `

    if (checkTableFooterBody) {
      amountToPay.innerHTML =  ` ${newAmountAfterDiscount}`
      checkTableFooterBody.appendChild(discountLine)
    }
    // Update the displayed total
    const amountTotal = document.getElementsByClassName("product-total");
    amountTotal.textContent = ` ${newAmountAfterDiscount}`;
  } else {
    alert("Invalid coupon code. Please try again.");
  }
}

const closePaymentPopup = () => {
  document.getElementById("card-payment-popup").style.display = "none";
  document.getElementById("cash-payment-popup").style.display = "none";

}

// Function to show payment success message
const showPaymentSuccess = () => {
  const paymentContent = document.getElementById("card-payment-popup");

  paymentContent.innerHTML = `
      <span class="close" onclick="closePaymentPopup()">&times;</span>
      <h2>Payment successful</h2>
      <br/>
      <p>Printing receipt...</p>
    `;

  setTimeout(showDoneMessage, 3000); // 3 seconds (3000 milliseconds)
}

const showDoneMessage = () => {
  const paymentContent = document.getElementById("checkout-content");

  paymentContent.innerHTML = `
      <span class="close" onclick="closePaymentPopup()">&times;</span>
      <h2>Done!</h2>
      <h6> Next customer please</h6>
    `;
}

// Call the function to replace content after 5 seconds
setTimeout(showPaymentSuccess, 5000); // 5 second


// Function to calculate the change
const calculateChange = () => {
  const cashAmountElement = document.getElementById("amountGiven");
  const totalPriceElement = document.getElementById("total-price-with-tax");

  const totalPriceAmount = totalPriceElement.innerHTML.substring(1)
  const amountGiven = parseFloat(cashAmountElement.value);
  const amountToPay = parseFloat(totalPriceAmount);

  const change = amountGiven - amountToPay;

  const changeResult = document.getElementById("changeResult");
  if (isNaN(change) || change < 0) {
    changeResult.textContent = "Insufficient amount given.";
  } else {
    changeResult.textContent = "Change to give: $" + change.toFixed(2);
  }
}

  // LISTENERS
checkoutBtn?.addEventListener("click", () => {
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
  const closeButton = document.querySelector(".close");

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


paymentBtnCard.addEventListener("click", function () {

  console.log("button clicked")
  paymentPopUpCard.style.display = "block";
  checkoutPopup.style.display = "none";

closeButtonCard.addEventListener("click", function () {
  paymentPopUpCard.style.display = "none";
});
})

paymentBtnCash.addEventListener("click", function () {

  console.log("button clicked")
  paymentPopUpCash.style.display = "block";
  checkoutPopup.style.display = "none";

  closeButtonCash.addEventListener("click", function () {
    paymentPopUpCash.style.display = "none";
  });
})


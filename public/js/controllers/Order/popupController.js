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
const products = []; 
const min = 1000; // Minimum 5-digit number (inclusive)
const max = 9999; // Maximum 5-digit number (inclusive)
let orderNumber = Math.floor(Math.random() * (max - min + 1))

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

  cart.shoppingCart.forEach((product) => {
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
  const shoppingCart = JSON.parse(localStorage.getItem("cart")); // Parse the shopping cart data from local storage
 const customer =JSON.parse(localStorage.getItem("customer")); 
  // Map the shopping cart items to the Products array
  const orderData = {
    Products: shoppingCart.shoppingCart.map((item) => ({
      product: item._id,
      productName: item.productName,
      quantity: item.quantity,
    })),
    total:shoppingCart.total,
   customerFirstName: customer?.firstName, 
   customerLastName: customer?.lastName, 
   customerPhoneNumber: customer?.phoneNumber, 
    customerId: customer?.customerId ,
    orderNumber
  };

  fetch("/orderCreate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData)
  })
  .then(response => response.json())
  .then(data => {
    localStorage.removeItem("customer")
    localStorage.removeItem("cart")
    setTimeout(() =>{
      window.location.reload();
    },2000)

    console.log("Order created successfully", data);
  })
  .catch(error => {
    // Handle errors
    console.error("Error creating order", error);
  });

}

// CARD: Function for dummy terminal payment processing
const terminalPaymentLoad = () => {
  const paymentContent = document.getElementById("card-payment-popup");

  paymentContent.innerHTML = `
    <div class="payment-content">
      <span class="close">&times;</span>
      <h2>Payment</h2>
      <br/>
      <div class="animated-gif">
        <h6>Please follow the instructions on the terminal</h6>
        <br/>
        <img src="/images/giphy.gif" alt="animated gif"/>
      </div>
    </div>
    </div>

    `;
}

// CARD: Function to show payment success message
const showPaymentSuccess = () => {
  const paymentContent = document.getElementById("card-payment-popup");

  paymentContent.innerHTML = `
    <div class="payment-content">
      <span class="close" onclick="closePaymentPopup()">&times;</span>
      <h2>Payment successful</h2>
      <br/>
      <p>Printing receipt...</p>
    </div>
    </div>
    `;
}

// CARD: Function to show the payment is completed
const showDoneMessage = () => {
  const paymentContent = document.getElementById("card-payment-popup");

  paymentContent.innerHTML = `
    <div class="payment-content">
      <span class="close" onclick="closePaymentPopup()">&times;</span>
      <h2>Done!</h2>
      <h6> Next customer please</h6>
    </div>
    </div>
    `;

}

// CASH: Function to calculate the change
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
  const totalPrice = cart.shoppingCart.reduce((acc, curr) => {
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
  checkoutOrderNumberElement.innerHTML =`# ${orderNumber}` ;
  totalPriceNoTaxElement.innerHTML = `$ ${totalPrice}`
  totalPriceOnlyTaxElement.innerHTML = `$ ${onlyTax}`
  totalPriceWithTaxElement.innerHTML = `$ ${totalPriceWithTax}`

  cart.shoppingCart.forEach((shoppingItem) => addItemToPopupCart(shoppingItem))

  closeButton.addEventListener("click", function () {
    checkoutPopup.style.display = "none";
  });
  closeButton.style.cursor = "pointer";
})

paymentBtnCard.addEventListener("click", function () {
  terminalPaymentLoad()
  setTimeout(showPaymentSuccess, 3000)
  setTimeout(showDoneMessage, 6000)
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


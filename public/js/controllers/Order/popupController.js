 //checkout popup 
 const checkoutBtn = document.getElementById("checkoutBtn");
 const checkoutPopup = document.getElementById("checkout-popup");
 const close = document.querySelector(".close");

 
 checkoutBtn?.addEventListener("click", function(){
 
 
   checkoutPopup.style.display = "block";
   
   fetchCheckout();


 })
 close?.addEventListener("click", function(){
   checkoutPopup.style.display = "none";
 })

//processing payment popup

 const paymentBtn = document.getElementById("paymentBtn");
 const paymentPopup = document.getElementById("payment-popup");
 const paymentClose = document.querySelector(".payment-close");

 
 paymentBtn?.addEventListener("click", function(){
   paymentPopup.style.display = "block";
   checkoutPopup.style.display = "none";
   


 })
 paymentClose?.addEventListener("click", function(){
   paymentPopup.style.display = "none";
 })




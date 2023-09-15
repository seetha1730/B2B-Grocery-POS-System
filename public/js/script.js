function APIGetCall(link){
  return fetch(link)
}















// Cache out buttons container, and all of the panels
const buttons = document.querySelector('.setting-buttons');
const panels = document.querySelectorAll('.panel');
const search_input = document.getElementById('product-search');



// Add an event listener to the buttons container
buttons?.addEventListener('click', handleClick);
//search_input?.addEventListener("input", handleSearch )


// When a child element of `buttons` is clicked
function handleClick(e) {
  if (e.target.matches('button')) {
    // Hide all panels by removing the 'show' class
    panels.forEach(panel => panel.classList.remove('show'));

    // Extract the 'id' attribute from the clicked button's dataset
    const { id } = e.target.dataset;

    // Construct a CSS selector to select the corresponding panel
    const selector = `.panel[id="${id}"]`;

    // Add the 'show' class to the selected panel to make it visible
    document.querySelector(selector).classList.add('show');
  }
}

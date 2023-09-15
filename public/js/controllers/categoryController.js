const tbody = document.querySelector('#category table tbody')

window.addEventListener("load", (event) => {
  APIGetCall("/category/all")
  .then(response => response.json())
  .then(res => {
    if(res){
    renderCatList(res.categoryList)
    }
  })
});


function renderCatList(categories){

const coulmns = ['imageUrl',]
categories.forEach((item, index) => {

  const tableRow = document.createElement('tr')
  const indexTD = document.createElement('td')
  indexTD.innerText = index+1;
  tableRow.appendChild(indexTD)
  tbody.appendChild(tableRow)
});

}


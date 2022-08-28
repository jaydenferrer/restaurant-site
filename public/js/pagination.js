const paginationNumbers = document.querySelector('#pagination-nums')
const paginatedList = document.querySelector('#paginated-grid')
const gridElements = document.querySelectorAll('.restaurant-grid-element')
const nextButton = document.querySelector('#next-button')
const prevButton = document.querySelector('#prev-button')

// global variables for pagination
const paginationLimit = 16;
// computes the number of pages required
const pageCount = Math.ceil(gridElements.length / paginationLimit);
let currentPage;

// APPEND pageCount number of numbers to the pagination list
function appendPageNumber (index) {
    // create a button
    const pageNumber = document.createElement("button");
    // assign the pageNumber element with the pagination number class
    pageNumber.className = "pagination-number"
    // append/add the passed index as the buttons text (innerHTML)
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    // add the button to the overall pagination parent element
    paginationNumbers.appendChild(pageNumber);
}

// given the number of pages need, display the correct number of pagination numbers (in the list)
function getPaginationNumbers() {
    for (let i = 1 ; i <= pageCount ; i++) {
        // for each pagecount, call the function 
        appendPageNumber(i);
    }
}

// WHENEVER THE WEBPAGE IS LOADED, we want a pagination list to be filled
window.addEventListener('load', () => {
    getPaginationNumbers();
})
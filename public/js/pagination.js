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



// DISPLAY ACTIVE PAGE

// sets the currentPage global variable to whatever pagenum we pass in
const setCurrentPage = (pageNum) => {
    currentPage = pageNum;

    // setting the range for elements to show; page 1: show 1-16, page 2: show 17 - 33
    // lowerbound
    const prevRange = (pageNum - 1) * paginationLimit;
    // upperbound
    const curRange = pageNum * paginationLimit;

    gridElements.forEach((item, index) => {
        // hide every element in the grid
        item.classList.add("hidden");
        // except, don't hide elements with the index that are within our provided ranges 
        if (index >= prevRange && index < curRange) {
            item.classList.remove("hidden");
        }
    })
};


// WHENEVER THE WEBPAGE IS LOADED, we want a pagination list to be filled
window.addEventListener('load', () => {
    getPaginationNumbers();
    // when webpage loads, we want the currentpage to automatically be set to 1
    setCurrentPage(1);
})




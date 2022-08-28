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
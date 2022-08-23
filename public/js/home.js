const allRestaurants = document.querySelectorAll('.restaurant-grid-element')

// want to create an event listener for the specific query selection

// loop through all restaurants in the collection
for (let i = 0 ; i < allRestaurants.length ; i++) {
    // create an event listener for all of them 
    allRestaurants[i].addEventListener('mouseenter', () => {
        console.log("An element has been hovered");
        // i (index) is the element that triggered the 
        // call function that causes the ith element to have the tags displayed
        console.log(i);
        allRestaurants[i].style.cursor = "pointer";
        toggleTags(i);
    })

    allRestaurants[i].addEventListener('mouseleave', () => {
        console.log("An element has been left (no longer hovering)")
        toggleTags(i)
        // call function that causes the ith element to have the tags hidden
        console.log(i);
        
    })
    
}

function toggleTags(index) {
    // want to access the tags and then determine if they contain a class,
    // want to access tags nested within the restaurant-grid element
    // allRestaurants[i].children[0] => tag-heart
    // allRestaurants[i].childrenp[1] => tag-shop
    // attach .classList 
    const tagHeart = allRestaurants[index].children[0];
    const tagShop = allRestaurants[index].children[1];

    // check if tagHeart has class display, means it is being hovered over, then we want to make it hidden
    if (checkClass(tagHeart, 'display')) {
        tagHeart.classList.remove('display');
        tagHeart.classList.add('hidden');
        tagShop.classList.remove('display');
        tagShop.classList.add('hidden');
    }
    else {
        tagHeart.classList.remove('hidden');
        tagHeart.classList.add('display');
        tagShop.classList.remove('hidden');
        tagShop.classList.add('display');
    }
}


function checkClass(element, className) {
   
    if (element.classList.contains(className)) return true;
    else return false;
}
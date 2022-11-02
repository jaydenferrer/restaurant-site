const fetch = require('node-fetch');

let globalBurgerData;

// here we will export data from the restaurant API
// using free-food-menus-api created by https://github.com/igdev116/free-food-menus-api

// function that will get burger data from the called API
// async because fetching from an API can take time
// returns a promise that can be thened or catched
async function getBurgerRestaurantData() {
    try {
        // fetch data from API
        const response = await fetch('https://ig-food-menus.herokuapp.com/burgers');
        // need to parse through the fetched data such that the data is in JSON
        const burgerData = await response.json();
        console.log("Data sucessfully fetched");
        
        return burgerData;
    }
    catch (err) {
        console.log("An error occured, API down or link broken", err);
    }
}

module.exports = getBurgerRestaurantData;



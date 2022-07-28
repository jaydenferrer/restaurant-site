const fetch = require('node-fetch');

let globalBurgerData;

// here we will export data from the restaurant API
// using free-food-menus-api created by https://github.com/igdev116/free-food-menus-api

// returns a promise, so we can use this to then extract data from function and store it somewhere
async function getBurgerRestaurantData() {
    try {
        const response = await fetch('https://ig-food-menus.herokuapp.com/burgers');
        const burgerData = await response.json();
        console.log("Data sucessfully fetched");
        // console.log(burgerData);
        return burgerData;
    }
    catch (err) {
        console.log("An error occured, API down or link broken", err);
    }
}

// getBurgerRestaurantData()
//     .then((burgerData) => {
//         console.log(burgerData[0].name);
//         // module.exports = burgerData;
//     })

module.exports = getBurgerRestaurantData;

// console.log(globalBurgerData[0].country)
// // need a way to extract the burgerData and export it gloabbaly 

// file that seeds the database with initial data
const getBurgerRestaurantData = require('./restaurantAPIData.cjs');

console.log("Running the seeds.js file");

getBurgerRestaurantData()
    .then((burgerData) => {
        console.log("Sucessfully extracted the burger data in the seeds.js file");
        console.log(burgerData[0].name);
         // module.exports = burgerData;
    })


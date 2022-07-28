// export and connect to mongoose
// don't need to connect to express b/c this is a individual file 
const mongoose = require('mongoose');

async function connectMongoose() {
    await mongoose.connect('mongodb://localhost:27017/restaurantSite');
}

connectMongoose()
    .then(() => {
        console.log("Seeds file sucessfully connected to mongodb");
    })
    .catch((err) => {
        console.log("Seeds did not connect to mongo", err);
    })

    
// file that seeds the database with initial data
const getBurgerRestaurantData = require('./restaurantAPIData.cjs');

console.log("Running the seeds.js file");

getBurgerRestaurantData()
    .then((burgerData) => {
        console.log("Sucessfully extracted the burger data in the seeds.js file");
        console.log(burgerData);
         // module.exports = burgerData;
    })


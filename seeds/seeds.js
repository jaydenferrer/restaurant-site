// export and connect to mongoose
// don't need to connect to express b/c this is a individual file 
const mongoose = require('mongoose');
const Restaurant = require('../models/restaurants.cjs');

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

// invoke the function that will get burger data
getBurgerRestaurantData()
    // latch on a .then() to extract data if successful
    .then( async (burgerData) => {
        console.log("Sucessfully extracted the burger data in the seeds.js file");
        console.log(burgerData);
      
         // burgerData stored in an array of objects, we want to iterate through the array for each object 
        // data refers to a single element,
        for (data of burgerData) {
            // destructing each element 
            const {name, img, dsc, rate, country} = data;
            // create new Restaurant using the model 
            const newRestaurant = new Restaurant({
                name,
                img,
                dsc,
                rate,
                country
            })

            // save into the db
            await newRestaurant.save();
        }
    })


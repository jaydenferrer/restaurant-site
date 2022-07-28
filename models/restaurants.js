// don't need to connect to db, all we need is mongoose for access to methods
const mongoose = require('mongoose');
// a file that will contain our models 

// defines our restaurant schema (how data should be stored in the mongo db)
const restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    rate: Number,
    description: String,
    Country: String
})

// create a model using our schema

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
// don't need to connect to db, all we need is mongoose for access to methods
const mongoose = require('mongoose');
// a file that will contain our models 

// defines our restaurant schema (how data should be stored in the mongo db)
const restaurantSchema = new mongoose.Schema({
    name: String,
    img: String,
    rate: Number,
    dsc: String,
    country: String
})

// create a model using our schema

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
// don't need to connect to db, all we need is mongoose for access to methods
const mongoose = require('mongoose');
// a file that will contain our models 

const User = require('../models/users')
// defines our restaurant schema (how data should be stored in the mongo db)
const restaurantSchema = new mongoose.Schema({
    name: String,
    img: String,
    rate: Number,
    dsc: String,
    country: String,
    // author will store the objectid (reference to the user who created the post)
    author: {
        // creating mongoose data relation, will store object id's
        type: mongoose.Schema.Types.ObjectId,
        // will reference the user model
        ref: 'User'
    }
})

// create a model using our schema

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;

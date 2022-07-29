// export the express module 
const express = require('express');
const app = express();
// set up default port of 3000
const port = 3000;

// connect to mongo database using mongoose
const mongoose = require('mongoose');
// create async function that opens a connection to our database 
async function connectMongoose() {
    // returns a promise
    await mongoose.connect('mongodb://localhost:27017/restaurantSite')
}
// call function to try and connect to database, returns a promise, can then and catch
connectMongoose()
    .then(() => {
        console.log("Sucessfully connected to the mongo database, 'restaurantSite'");
    })
    .catch((err) => {
        console.log(err, "Couldn't not sucessfully connect to mongo database");
    })

// export node-fetch
// used to have access to fetch function 
const fetch = require('node-fetch');
// export path module 
const path = require('path');

// set up ejs 
// app.set('view engine', 'ejs');
const ejs = require('ejs');
app.set('views', path.join(__dirname, 'views'));

// to parse request body from form submission data
app.use(express.urlencoded({extended: true}));
// export Restaurants model
const Restaurant = require('./models/restaurants.cjs');
const { findById } = require('./models/restaurants.cjs');












// NOTE NEED TO ADD ERROR HANDLING ETC.


// creates get route handler for path '/'
app.get('/', (req, res) => {
    res.send("Home page");
})

// home route handler
app.get('/restaurants', async (req, res) => {
    // idea: want to go into the database and just extract the entire array that contains the
    // objects 
    // should find all campgrounds
    try {
        let allRestaurants = await Restaurant.find({});
        console.log(allRestaurants);
        console.log("Home route sucessful, rendering page");
        res.render('main_routes/home.ejs', { allRestaurants });
    }
    catch (err) {
        console.log("error", err);
    }
    // pass it to ejs template
})

// CRUD FUNCTIONALITY FOR NEW RESTAURANTS
// menu route handler

// new route: /comments/new
// this is a route to simply render a new form 
app.get('/restaurants/new', (req, res) => {
    // nothing to search for 
    res.render('restaurant_crud/new.ejs');
})

// create route: /comments (post)
// route takes submitted form and creates new restaurants object and adds it to the db
app.post('/restaurants', async (req, res) => {
    console.log(req.body);
    // destructure the request body, or just pass it as a new item we want to add 
    const newRestaurant = new Restaurant(req.body.restaurant);
    console.log(newRestaurant);
    // pass new restaruant in
    const result = await newRestaurant.save();
    console.log(result);
    res.redirect('/restaurants')
})


// individual show route: /restaurants/:id
app.get('/restaurants/:id', async (req, res) => {
    // need to search for restaurant given the id
    const id = req.params.id;
    const foundRestaurant = await Restaurant.findById(id);
    res.render('restaurant_crud/show.ejs', { foundRestaurant })

})


// locations route handler
app.get('/locations', (req, res) => {
    res.render('main_routes/location.ejs');
})

// reservations route handler
app.get('/reservations', (req, res) => {
    res.render('main_routes/reservations.ejs');
})

// order now route handler
app.get('/order', (req, res) => {
    res.render('main_routes/order.ejs');
})

// creating a handler that listens for connections on the specified host and port 
// in our example, listening for connections to localhost, port 3000 (localhost:3000)
app.listen(port, () => {
    console.log("Currently listening on port 3000");
})
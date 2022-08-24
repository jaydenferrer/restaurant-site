const express = require('express');

const router = express.Router();

const Restaurant = require('../models/restaurants.cjs');
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn } = require('../middleware/auth.js');

// home route handler
router.get('/', wrapAsync(async (req, res) => {
    // idea: want to go into the database and just extract the entire array that contains the objects 
    let allRestaurants = await Restaurant.find({});
    res.render('main_routes/home.ejs', { allRestaurants });
}));

//CRUD FUNCTIONALITY FOR NEW RESTAURANTS
//menu route handler

// new route: /comments/new
// this is a route to simply render a new form 
router.get('/new', isLoggedIn, (req, res) => {
    // nothing to search for 
    res.render('restaurant_crud/new.ejs');
})

// create route: /comments (post)
// route takes submitted form and creates new restaurants object and adds it to the db
router.post('/', wrapAsync(async (req, res) => {

    // destructure the request body, or just pass it as a new item we want to add 
    const newRestaurant = new Restaurant(req.body.restaurant);
    // pass new restaruant in
    const result = await newRestaurant.save();
    res.redirect(`/restaurants/${newRestaurant._id}`)
}));


// individual show route: /restaurants/:id
router.get('/:id', wrapAsync(async (req, res, next) => {
    // need to search for restaurant given the id
    const id = req.params.id;
    const foundRestaurant = await Restaurant.findById(id);
    if (!foundRestaurant) {
        // since we have wrapAsync, we can throw our own errors which will get caught 
        throw new AppError("Could not find a restaurant with that ID", 404);
    }
    else {
        res.render('restaurant_crud/show.ejs', { foundRestaurant })
    }
}));

// edit route: /restaurants/:id/edit
// render form 
router.get('/:id/edit', wrapAsync(async (req, res) => {
    const id = req.params.id;
    const foundRestaurant = await Restaurant.findById(id);
    res.render('restaurant_crud/edit.ejs', { foundRestaurant })
}));

router.patch('/:id', wrapAsync(async (req, res) => {
    // console.log("PATCH REQUEST");
    const updatedRestaurant = req.body.restaurant;
    // console.log(updatedRestaurant);
    const id = req.params.id 
    // spread the contents of updatedRestaurant in the current Restaurant model with the given id 
    // replacing the current model's we find properties with the new ones
    // hence, here we could just  spread updatedRestaurant (...updatedRestaurant)
    await Restaurant.findByIdAndUpdate(id, { 
        name: updatedRestaurant.name,
        country: updatedRestaurant.country,
        img : updatedRestaurant.img,
        rate: updatedRestaurant.rate,
        dsc: updatedRestaurant.dsc
    })
    res.redirect(`/restaurants/${id}`);
}));

// delete route 
router.delete('/:id', wrapAsync(async (req, res) => {
    const id = req.params.id;
    await Restaurant.findByIdAndDelete(id);
    res.redirect('/restaurants')
}));

module.exports = router;
// END OF RESTAURANT CRUD 
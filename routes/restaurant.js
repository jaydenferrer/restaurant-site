const express = require('express');

const router = express.Router();

const Restaurant = require('../models/restaurants.cjs');
const User = require('../models/users')
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn, isAuthor } = require('../middleware/auth.js');
// restaurant controller functions
const { homePage, renderNewForm, addNewRestaurant, showRestaurant, renderEditForm, editRestaurant, deleteRestaurant} = require('../controllers/restaurants')
// home route handler
router.get('/', wrapAsync(homePage));

//CRUD FUNCTIONALITY FOR NEW RESTAURANTS
//menu route handler

// new route: /comments/new
// this is a route to simply render a new form 
// ADD BACK ISLOGGEDIN
router.get('/new', renderNewForm)

// create route: /comments (post)
// route takes submitted form and creates new restaurants object and adds it to the db
// also want middleware here b/c someone could send a post request using an external source, so still want to protect it 
// ADD BACK ISLOGGEDIN
router.post('/', wrapAsync(addNewRestaurant));


// individual show route: /restaurants/:id
router.get('/:id', wrapAsync(showRestaurant));

// edit route: /restaurants/:id/edit
// render form 
// ADD BACK ISLOGGEDIN
router.get('/:id/edit', wrapAsync(renderEditForm));

// ADD BACK ISLOGGEDIN
router.patch('/:id', wrapAsync(editRestaurant));

// ADD BACK ISLOGGEDIN
// delete route 
router.delete('/:id', wrapAsync(deleteRestaurant));

module.exports = router;
// END OF RESTAURANT CRUD 
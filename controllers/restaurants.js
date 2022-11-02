// file to store logic for restaurant routes 
const Restaurant = require('../models/restaurants.cjs')
const User = require('../models/users')

// render all restaurants on restaurant page
const homePage = async (req, res) => {
    // idea: want to go into the database and just extract the entire array that contains the objects 
    let allRestaurants = await Restaurant.find({});
    res.render('main_routes/home.ejs', { allRestaurants });
}

// render new restaurant form
const renderNewForm = (req, res) => {
    // nothing to search for 
    res.render('restaurant_crud/new.ejs');
}

// adds new restaurant
const addNewRestaurant = async (req, res) => {

    // destructure the request body, or just pass it as a new item we want to add 
    const newRestaurant = new Restaurant(req.body.restaurant);

    // add new user and link with restaurant
    // create new user object given the details in req.user
    // save the object id of the new object into newRestaurant
    const { username, password, email } = req.user;
    // create new author object with the destructed username, password and email from req.user
    const author = new User({username, password, email});
    newRestaurant.author = req.user._id;

    // save new restaurant into database
    const result = await newRestaurant.save();
    res.redirect(`/restaurants/${newRestaurant._id}`)
}

// renders single restaurant that has been clicked
const showRestaurant = async (req, res, next) => {
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
}

// render edit form
const renderEditForm = async (req, res) => {
    const id = req.params.id;
    const foundRestaurant = await Restaurant.findById(id);
    res.render('restaurant_crud/edit.ejs', { foundRestaurant })
}

// middleware for editing the restaurant
const editRestaurant = async (req, res) => {

    const updatedRestaurant = req.body.restaurant;

    const id = req.params.id 

    // find restaurant in database given the id, update it with the new details from submitted form
    await Restaurant.findByIdAndUpdate(id, { 
        name: updatedRestaurant.name,
        country: updatedRestaurant.country,
        img : updatedRestaurant.img,
        rate: updatedRestaurant.rate,
        dsc: updatedRestaurant.dsc
    })
    res.redirect(`/restaurants/${id}`);
}

// deletes a restaurant
const deleteRestaurant = async (req, res) => {
    const id = req.params.id;
    // find restaurant given its id and deletes it
    await Restaurant.findByIdAndDelete(id);
    res.redirect('/restaurants')
}

module.exports.homePage = homePage;
module.exports.renderNewForm = renderNewForm;
module.exports.addNewRestaurant = addNewRestaurant;
module.exports.showRestaurant = showRestaurant;
module.exports.renderEditForm = renderEditForm;
module.exports.editRestaurant = editRestaurant;
module.exports.deleteRestaurant = deleteRestaurant;
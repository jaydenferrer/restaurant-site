// file to store logic for restaurant routes 
const Restaurant = require('../models/restaurants.cjs')


const homePage = async (req, res) => {
    // idea: want to go into the database and just extract the entire array that contains the objects 
    let allRestaurants = await Restaurant.find({});
    res.render('main_routes/home.ejs', { allRestaurants });
}

const renderNewForm = (req, res) => {
    // nothing to search for 
    res.render('restaurant_crud/new.ejs');
}

const addNewRestaurant = async (req, res) => {

    
    // destructure the request body, or just pass it as a new item we want to add 
    const newRestaurant = new Restaurant(req.body.restaurant);

    // add new user
    // create new user object given the details in req.user
    // save the object id of the new object into newRestaurant

    // ADD BACK AUTHENTICATION STUFF LATER!!!!!!!!!!!!!!!!
    // const { username, password, email } = req.user;
    // // create new author object with the destructed username, password and email from req.user
    // const author = new User({username, password, email});
    
    // console.log(author);
    // newRestaurant.author = author._id;

    // pass new restaruant in
    const result = await newRestaurant.save();
    res.redirect(`/restaurants/${newRestaurant._id}`)
}

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

const renderEditForm = async (req, res) => {
    const id = req.params.id;
    const foundRestaurant = await Restaurant.findById(id);
    res.render('restaurant_crud/edit.ejs', { foundRestaurant })
}

const editRestaurant = async (req, res) => {
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
}

const deleteRestaurant = async (req, res) => {
    const id = req.params.id;
    await Restaurant.findByIdAndDelete(id);
    res.redirect('/restaurants')
}



module.exports.homePage = homePage;
module.exports.renderNewForm = renderNewForm;
module.exports.addNewRestaurant = addNewRestaurant;
module.exports.showRestaurant = showRestaurant;
module.exports.renderEditForm = renderEditForm;
module.exports.editRestaurant = editRestaurant;
module.exports.deleteRestaurant;
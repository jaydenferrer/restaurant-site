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
const ejsMateEngine = require('ejs-mate')
app.engine('ejs', ejsMateEngine);
app.set('views', path.join(__dirname, 'views'));

// to parse request body from form submission data
app.use(express.urlencoded({extended: true}));
// export Restaurants model
const Restaurant = require('./models/restaurants.cjs');
const { findById, update } = require('./models/restaurants.cjs');

// export method-override
// used to send other HTTP verbs in forms 
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.static(__dirname + '/public'));

// export AppError class
const AppError = require('./utils/ExpressError');








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
        // console.log(allRestaurants);
        // console.log("Home route sucessful, rendering page");
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
    // console.log(req.body);
    // destructure the request body, or just pass it as a new item we want to add 
    const newRestaurant = new Restaurant(req.body.restaurant);
    // console.log(newRestaurant);
    // pass new restaruant in
    const result = await newRestaurant.save();
    // console.log(result);
    res.redirect(`/restaurants/${newRestaurant._id}`)
})


// individual show route: /restaurants/:id
app.get('/restaurants/:id', async (req, res, next) => {
    // need to search for restaurant given the id
    try {
        const id = req.params.id;
        const foundRestaurant = await Restaurant.findById(id);
        if (!foundRestaurant) {
            throw new AppError("Could not find a restaurant with that ID", 404);
        }
        else {
            console.log("no error");
            res.render('restaurant_crud/show.ejs', { foundRestaurant })
        }
        

    }
    catch (err) {
        console.log(err);
        // in async functions, need to pass next the err object to run our error middleware 
        next(err);
    }
    

})

// edit route: /restaurants/:id/edit
// render form 
app.get('/restaurants/:id/edit', async (req, res) => {
    const id = req.params.id;
    const foundRestaurant = await Restaurant.findById(id);
    res.render('restaurant_crud/edit.ejs', { foundRestaurant })
})

app.patch('/restaurants/:id', async (req, res) => {
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
})

// delete route 
app.delete('/restaurants/:id', async (req, res) => {
    const id = req.params.id;
    await Restaurant.findByIdAndDelete(id);
    res.redirect('/restaurants')
})

// END OF RESTAURANT CRUD 

// locations route handler
app.get('/locations', (req, res) => {
    res.render('main_routes/location.ejs');
    // throw new AppError('testing error', 404);
})

// reservations route handler
app.get('/reservations', (req, res) => {
    res.render('main_routes/reservations.ejs');
})

// order now route handler
app.get('/order', (req, res) => {
    res.render('main_routes/order.ejs');
})

// will apply to ALL requests ONLY at the end, hence if any routes we search up fail,
// then this route will execute, and all we want is to render an error form 
app.all('*', (req, res, next) => {
    console.log("Reached END of ROUTES")
    const newError = new AppError("Page Not Found", 404);
    
    // call middleware
    next(newError);
})  



// error middleware 
app.use((err, req, res, next) => {
    console.log("***********");
    console.log("***ERROR***");
    console.log("***********");
    console.log("USING ERROR MIDDLEWARE WE DEFINED");
    // console.log(err);
    // set defaults because some errors many not have defined values
    const {message = "An Error Has Occured!", statusCode = 400} = err;
    console.log(message, statusCode);
    res.send(`${message}`).status(statusCode);
})


// creating a handler that listens for connections on the specified host and port 
// in our example, listening for connections to localhost, port 3000 (localhost:3000)
app.listen(port, () => {
    console.log("Currently listening on port 3000");
})
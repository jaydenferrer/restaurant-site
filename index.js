// IMPORTANT AND CONFIGURE DOTENV 
require('dotenv').config();


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
const wrapAsync = require('./utils/wrapAsync');


// ROUTES
const restaurantRoutes = require('./routes/restaurant');
const locationsRoutes = require('./routes/locations');
const reservationsRoutes = require('./routes/reservations');
const orderRoutes = require('./routes/orders')
const userRoutes = require('./routes/users')



// NOTE NEED TO ADD ERROR HANDLING ETC.
// creates get route handler for path '/'
app.get('/', (req, res) => {
    res.send("Home page");
})

// adds prefix /restaurant to routes in restaurantRoutes
app.use('/restaurants', restaurantRoutes);

app.use('/locations', locationsRoutes);

app.use('/reservations', reservationsRoutes);

app.use('/order', orderRoutes);

app.use('/', userRoutes);
// order now route handler


// will apply to ALL requests ONLY at the end, hence if any routes we search up fail,
// then this route will execute, and all we want is to render an error form 
// NOTE: actually i think this route executes always no matter what,
// however if no errors occur in our routes, then we will go to that given route 
// rather than go to the page defined in our middleware
app.all('*', (req, res, next) => {
    // console.log("Reached END of ROUTES")
    // const newError = 
    
    // call middleware
    next(new AppError("Page Not Found", 404));
})  



// error middleware 
app.use((err, req, res, next) => {
    // console.log("USING ERROR MIDDLEWARE WE DEFINED");
    // console.log(err);
    // set defaults because some errors many not have defined values
    const {message = "An Error Has Occured!", statusCode = 400} = err;
    // console.log(message, statusCode);
    res.send(`${message}`).status(statusCode);
})


// creating a handler that listens for connections on the specified host and port 
// in our example, listening for connections to localhost, port 3000 (localhost:3000)
app.listen(port, () => {
    console.log("Currently listening on port 3000");
})
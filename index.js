// IMPORTANT AND CONFIGURE DOTENV 
// configures and loads environment variables from dotenv files
require('dotenv').config();

// export the express module 
const express = require('express');
const app = express();
// set up default port of 3000
// should be environment variable
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
// want access to .fetch() function, not available in Node.js normally
// export npm package that contains .fetch() function 
const fetch = require('node-fetch');

// export path module 
const path = require('path');

// set up ejs 
// app.set('view engine', 'ejs');
const ejs = require('ejs');
const ejsMateEngine = require('ejs-mate')
app.engine('ejs', ejsMateEngine);
// sets up views directory for ejs templates 
app.set('views', path.join(__dirname, 'views'));

// to parse request body from form submission data
app.use(express.urlencoded({extended: true}));

// export Restaurants model
const Restaurant = require('./models/restaurants.cjs');
const { findById, update } = require('./models/restaurants.cjs');

// export method-override
// used to send other HTTP verbs (PUT and DELETE) in forms (where they aren't allowed)
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// set up where static files (HTML, CSS and JavaScipt are stored)
// sets public directory as the directory to search for static files
app.use(express.static(__dirname + '/public'));

// export AppError class
const AppError = require('./utils/ExpressError');

// require express session to allow sessions to be created 
const session = require('express-session');

// middleware that uses the session and also configures it
// can now access session in the request object, req.session
// loads session data and makes it available at req.session 
app.use(session({
    //
    secret: "thisisasecretcode",
    resave: false,
    saveUninitialized: false,
}))


// PASSPORT: middleware for authentication 
// requiring the passport tool
const passport = require('passport');
// requiring the passport local strategy (used to authenticate using only a username and password)
const LocalStrategy = require('passport-local');
// middleware to set up passport 
// initializes passport
app.use(passport.initialize());
// authenticate request based on session data
// if session data contains a logged in user, the data will be available in req.user
app.use(passport.session());

// passport authentication (for passport-local-mongoose)
const User = require('./models/users')
passport.use(new LocalStrategy(User.authenticate()));

// passport serialization and deserialization (for passport-local-mongoose)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// END OF PASSPORT

// can define middleware that is available IN ALL TEMPLATES
app.use((req, res, next) => {
    // all properties we define in res.locals will be available in ALL EJS templates we render with res.render!
    res.locals.currentUser = req.user;
    next();
})

// exporting route handlers code for MAIN APPLICATION routes
const restaurantRoutes = require('./routes/restaurant');
const locationsRoutes = require('./routes/locations');
const reservationsRoutes = require('./routes/reservations');
const orderRoutes = require('./routes/orders')
const userRoutes = require('./routes/users')

// HOME PAGE ROUTE HANDLER
app.get('/', (req, res) => {
    res.render("main_routes/landingPage.ejs")
})

// SET UP MAIN ROUTE HANDLERS
app.use('/restaurants', restaurantRoutes);

app.use('/locations', locationsRoutes);

app.use('/reservations', reservationsRoutes);

app.use('/order', orderRoutes);

app.use('/', userRoutes);

// will apply to ALL requests ONLY at the end, hence if any routes we search up fail,
// then this route will execute, and all we want is to render an error form 
app.all('*', (req, res, next) => { 
    // call next middleware, prevents stopping at this middleware
    // assert new error 
    next(new AppError("Page Not Found", 404));
})  

// error middleware 
app.use((err, req, res, next) => {
   
    // set defaults because some errors many not have defined values
    const {message = "An Error Has Occured!", statusCode = 400} = err;
    res.render('main_routes/error.ejs', {message, statusCode})
    
})

// creating a handler that listens for connections on the specified host and port 
// in our example, listening for connections to localhost, port 3000 (localhost:3000)
app.listen(port, () => {
    console.log("Currently listening on port 3000");
})
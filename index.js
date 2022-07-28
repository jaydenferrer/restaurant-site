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
















// creates get route handler for path '/'
app.get('/', (req, res) => {
    res.send("Home page");
})

// home route handler
app.get('/home', (req, res) => {
    res.send("Actual home page");
})

// menu route handler
app.get("/menu", (req, res) => {
    res.send("menu page");
})

// locations route handler
app.get('/locations', (req, res) => {
    res.send("location page");
})

// reservations route handler
app.get('/reservations', (req, res) => {
    res.send("reservations page");
})

// order now route handler
app.get('/order', (req, res) => {
    res.send("order now page");
})

// creating a handler that listens for connections on the specified host and port 
// in our example, listening for connections to localhost, port 3000 (localhost:3000)
app.listen(port, () => {
    console.log("Currently listening on port 3000");
})
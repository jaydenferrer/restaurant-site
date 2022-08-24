// contains route handlers for authentication

const express = require('express');

const router = express.Router();

// to login in, create two routes
// 1. simply renders a login form
// 2. will take username and password and authenticate and create session
router.get('/login', (req, res) => {
    res.render('auth_routes/login.ejs')
}) 

// route will post the data to db
// authenticate the user with their username and password, connect them with a session
router.post('/login', (req, res) => {

})

// to register, create two routes
// 1. simply renders a register form,
// 2. will take username, email and hashed passport and create a new user, add to db and create session
router.get('/register', (req, res) => {
    res.render('auth_routes/register.ejs')
})

// route will post the data to db
// given the username, email and password, will create a new user
// save it to the database
router.post('/register', (req, res) => {
    // when data is submitted
})

router.get('/logout', (req, res) => {
    res.send("LOGOUT PAGE")
})


module.exports = router;
// contains route handlers for authentication
const User = require('../models/users')
const express = require('express');
const passport = require('passport')

const {isLoggedIn} = require('../middleware/auth')
const {renderRegisterForm, registerUser, renderLoginForm, loginUser} = require('../controllers/users')
const router = express.Router();

// to register, create two routes
// 1. simply renders a register form,
// 2. will take username, email and hashed passport and create a new user, add to db and create session
router.get('/register', renderRegisterForm)

// route will post the data to db
// given the username, email and password, will create a new user
// save it to the database
router.post('/register', registerUser)


// to login in, create two routes
// 1. simply renders a login form
// 2. will take username and password and authenticate and create session
router.get('/login', renderLoginForm) 

// route will post the data to db
// authenticate the user with their username and password, connect them with a session
router.post('/login', 
    // built in middleware in passport, automatically invokes req.login, authenticating the user and loggin them in
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }), 
    // call login user function
    loginUser
)
// logout route
router.get('/logout', isLoggedIn, logOutUser)


module.exports = router;
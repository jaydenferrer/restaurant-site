// contains route handlers for authentication

const express = require('express');

const router = express.Router();

// to login in, create two routes
// 1. simply renders a login form
// 2. will take username and password and authenticate and create session
router.get('/login', (req, res) => {
    // res.render('login.ejs')
}) 

// to register, create two routes
// 1. simply renders a register form,
// 2. will take username, email and hashed passport and create a new user, add to db and create session
router.get('/register', (req, res) => {
    res.send("REGISTER PAGE")
})

router.get('/logout', (req, res) => {
    res.send("LOGOUT PAGE")
})


module.exports = router;
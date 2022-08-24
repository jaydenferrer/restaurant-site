// contains route handlers for authentication

const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
    res.send('LOGIN PAGE');
}) 

router.get('/register', (req, res) => {
    res.send("REGISTER PAGE")
})

router.get('/logout', (req, res) => {
    res.send("LOGOUT PAGE")
})


module.exports = router;
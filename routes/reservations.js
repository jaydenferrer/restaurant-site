const express = require('express');
const router = express.Router();

// reservations route handler
router.get('/', (req, res) => {
    res.render('main_routes/reservations.ejs');
})

module.exports = router;
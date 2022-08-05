const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('main_routes/order.ejs');
})

module.exports = router;
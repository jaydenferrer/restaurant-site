const express = require('express');
const router = express.Router();

// locations route handler
router.get('/', (req, res) => {
    res.render('main_routes/location.ejs');
    // throw new AppError('testing error', 404);
});

module.exports = router;
// isLoggedIn: want to check if a user is logged in or not (is the user authenticated)
// if user is authenticated, want to call next(), proceed to next middleware/route handler
// else want to redirect user to login page and prevent them having access to routes available only for authorized users

function isLoggedIn (req, res, next) { 
    // if user is present, means req is authenicated, call next
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

module.exports.isLoggedIn = isLoggedIn;
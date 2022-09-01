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


// isAuthor: want to check if a user is the author of the given restaurant
// if user is the author, then we want to call next() and proceed to the next middleware/route handler
// if user is NOT the author, then we want to just redirect back to restaurant page and flash a message/tell them person they are not the user

function isAuthor (req, res, next) {
    // req.user is filled when a user logs in 
    // current user is equal to whatever the logged in user is (if there is); but authentication occurs before this
    // hence a user needs to be logged in already
    // if the req.user equals the currentUser, 
    // need to create variable that stores the user, so we need to update the database 
    if (req.user === currentUser) {
        next();
    }
    else {
        console.log("YOU ARE NOT THE AUTHOR")
        res.redirect('/restaurants')
    }
}
module.exports.isLoggedIn = isLoggedIn;
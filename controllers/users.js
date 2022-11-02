// file to store logic for user routes 

const User = require('../models/users')
const passport = require('passport')

// render the register form 
const renderRegisterForm = (req, res) => {
    res.render('auth_routes/register.ejs')
}

// register a user and log user in if validated
const registerUser = async (req, res) => {
 
    // extract data from register form 
    const {username, password, email} = req.body;
    // create new user with the data
    const newUser = new User({username, email})
    
    // use passport to add our password hashed to the newUser object (passport-local-mongoose)
    const registeredUser = await User.register(newUser, password);
   
    // want to also login the user in after they've registered
    // login() function available on req that can be used to establish a login session
    req.login(registeredUser, (err) => {
        // if an error occurs call error handler
        if (err) { return next(err) }
        // if no error occurs, then redirect to restaurants
        // means that a LOGIN SESSION HAS BEEN ESTABLISHED
        else {
            return res.redirect('/restaurants');
        }
    });
}

// render a login form
const renderLoginForm = (req, res) => {
    res.render('auth_routes/login.ejs')
}

// log a user in, simply redirects a user to restaurant
const loginUser = (req, res) => {
    
    // login authentication handled by passport middleware in route handler
    res.redirect('/restaurants')

};

// logs a user out 
const logOutUser = (req, res) => {
    // use the method req.logout
    // want to terminate login session and remove user data from req.user
    req.logout((err) => {
        // if error, call error handler
        if (err) { return next(err) }
        else {
            // should be blank/empty/null if the user is successfully logged out b/c we remove user from req.user
            return res.redirect('/restaurants');
        }
    })
}


module.exports.renderRegisterForm = renderRegisterForm
module.exports.registerUser = registerUser;
module.exports.renderLoginForm = renderLoginForm;
module.exports.loginUser = loginUser;
module.exports.logOutUser = logOutUser;

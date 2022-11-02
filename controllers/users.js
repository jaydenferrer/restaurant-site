// file to store logic for user routes 

const User = require('../models/users')
const passport = require('passport')

const renderRegisterForm = (req, res) => {
    console.log("hellowd");
    res.render('auth_routes/register.ejs')
}

const registerUser = async (req, res) => {
    console.log("hello");
    // when data is submitted, extract username, email and password
    console.log(req.body);
    // destructuring from the req body, contains submitted data
    const {username, password, email} = req.body;
    const newUser = new User({username, email})
    
    // use passport to add our password hashed to the newUser object (passport-local-mongoose)
    // taking current user and just adding the hashed password
    // will autoamtically save into db, so we don't need to call .save()
    const registeredUser = await User.register(newUser, password);
    // registeredUser contains the details we need for the user, save that into the database
    
    // want to also login the user in after they've registered
    // login() function available on req that can be used to establish a login session
    // reason we use req.login in here is mainly when new users register to automatically log the user in if they successfully registered
    req.login(registeredUser, (err) => {
        // if an error occurs call error handler
        if (err) { return next(err) }
        // if no error occurs, then redirect to restaurants
        // means that a LOGIN SESSION HAS BEEN ESTABLISHED
        else {
            console.log("sucessfully registered and login in user!");
            return res.redirect('/restaurants');
        }
    });
}

const renderLoginForm = (req, res) => {
    res.render('auth_routes/login.ejs')
}

const loginUser = (req, res) => {
    // given the username and password, we can use the function passport.authenticate, call this as middleware, 
    // once we gain access to this scope, we just want to redirect the user to restaurants 
    // user has been sucessfully authenticated, redirect them to the page
    console.log("USER LOGGED IN: ", req.user);
    res.redirect('/restaurants')
};

const logOutUser = (req, res) => {
    // use the method req.logout
    // want to terminate login session and remove user data from req.user
    req.logout((err) => {
        // if error, call error handler
        if (err) { return next(err) }
        else {
            // should be blank/empty/null if the user is successfully logged out b/c we remove user from req.user
            console.log("LOGGED OUT USER: ", req.user);
            return res.redirect('/restaurants');
        }
    })
    // res.send("LOGOUT PAGE")
}


module.exports.renderRegisterForm = renderRegisterForm
module.exports.registerUser = registerUser;
module.exports.renderLoginForm = renderLoginForm;
module.exports.loginUser = loginUser;
module.exports.logOutUser = logOutUser;

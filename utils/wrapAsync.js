// we create a function that is going to be used to try and catch any errors

const wrapAsync = function (fn) {
    // returns a function, which just calls the function fn we pass (which in our case will be our callback function)
    return function(req, res, next) {
        // if any errors are caught then we pass it to the error handling middleware
        // if not errors are caught then callback will execute as expected
        fn(req, res, next).catch((err) => {
            console.log("USING WRAPASYNC FN");
            // calling on an async function, so that means that 
            // if an error occurs we pass it to next such that 
            // it can be handled by the middleware
            console.log(err.message, err.statusCode);
            next(err);
        })
    }
}

module.exports = wrapAsync;
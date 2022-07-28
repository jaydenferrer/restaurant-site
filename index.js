// export the express module 
const express = require('express');
const app = express();
// set up default port of 3000
const port = 3000;


// creates get route handler for path '/'
app.get('/', (req, res) => {
    res.send("Home page");
})


// creating a handler that listens for connections on the specified host and port 
// in our example, listening for connections to localhost, port 3000 (localhost:3000)
app.listen(port, () => {
    console.log("Currently listening on port 3000");
})
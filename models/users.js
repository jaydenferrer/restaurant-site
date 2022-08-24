const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose')

// defining user schema for our user model
// will store a username, an email and their password
const userSchema = new Schema({
    // we are using passport-local-mongoose, which will automatically add for us a username and password fields in the object
    // so we don't have to add it ourselves
    email: {
        type: String,
        required: true
    }
})

// passing our userSchema, and including a username and password based on passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

// create model given schema
const User = mongoose.model('User', userSchema);

// export it 
module.exports = User;
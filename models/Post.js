const mongoose = require('mongoose');

//creating a schema for our database:

//basic schema - describing the way we want our data to look in the database:
/*
const PostSchema = mongoose.Schema({
   title: String,
   description: String,
   date: Date.now()
});
 */

//if we wanted authentification:
const PostSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Posts', PostSchema);

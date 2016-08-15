var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    username:{type: String},
    password: {type: String},
    email: {type: String},
    fname: {type: String},
    lname: {type: String},
    institution:{type: String},
    city:{type: String},
    state:{type: String},
    country:{type: String},
    postal_address:{type: String},
    street:{type: String},
    postal_code:{type: String},
    active: {type: Boolean, default:true},
    author:  [String],
    reviewer:  [String],
    chair:  [String],
});

module.exports= mongoose.model('User', userModel);
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var conferenceModel = new Schema({
    title: {type: String},
    chair: {type: String},
    chairEmail: {type: String},
    startdate: {type: String},
    enddate: {type: String},
    conferenceLocation:{type: String},
    status: {type: Boolean, default:false}
});

module.exports= mongoose.model('Conference', conferenceModel);
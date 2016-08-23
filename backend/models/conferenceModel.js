var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var conferenceModel = new Schema({
    title: {type: String},
    chair: {type: String,required:true},
    chairEmail: {type: String,unique:true},
    startdate: {type: Date},
    enddate: {type: Date},
    conferenceLocation:{type: String},
    status: {type: Boolean, default:false},
    reviewPhase:{type:Boolean,default: true}
});

module.exports= mongoose.model('Conference', conferenceModel);
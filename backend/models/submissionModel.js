var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var submissionModel = new Schema({
    title: {type: String},
    abstract: {type: String},
    authorGivenName:{type:String},
    authorFamilyName:{type:String},
    authorEmail:{type:String},
    keywords:[{type:String}],
    status: {type: Boolean, default:false},
    filename:{type:String}
   // submissionId:{type:String} //this is actually meant to be the author
});


module.exports= mongoose.model('Submission', submissionModel);
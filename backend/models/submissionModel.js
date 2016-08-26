var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var submissionModel = new Schema({
    title: {type: String,required:"A title is required"},
    abstract: {type: String},
    authorGivenName:{type:String},
    authorFamilyName:{type:String},
    //authorEmail:{type:String, unique:true},
    keywords:[{type:String}],
    status:{
        type: String,
        enum : ['incompleted', 'completed', 'closed', 'accepted', 'rejected'],
        default : 'incompleted',
        lowercase:true
    },     
   // {type: Boolean, default:false},
    filename:{type:String}
   // submissionId:{type:String} //this is actually meant to be the author
});


module.exports= mongoose.model('Submission', submissionModel);
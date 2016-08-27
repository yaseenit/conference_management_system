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
        trim: true,
        lowercase:true
    },     
   // {type: Boolean, default:false},
    filename:{type:String},
    deadline: {
		type: Date,
		// Create a default 'created' value
		default: +new Date() + 14*24*60*60*1000
	}
});


module.exports= mongoose.model('Submission', submissionModel);
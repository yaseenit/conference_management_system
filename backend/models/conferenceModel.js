var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define 'TaskSchema'
var taskSchema = new mongoose.Schema({ //assign papers to reviewers
	taskName: {
		type: String, required: true
	},
	taskDesc: String,
	createdOn: { type: Date, default: Date.now },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User',
		required: true
	},
	modifiedOn: Date
	//	assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});


var conferenceModel = new Schema({
    title: {type: String},
    chair: {type: String,required:true},
    startdate: {type: Date},
    enddate: {type: Date},
    conferenceLocation:{type: String},
    status: {type: Boolean, default:false},
    authors: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    tasks: [taskSchema]
});

module.exports= mongoose.model('Conference', conferenceModel);
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var conferenceModel = new Schema({
    title: {type: String},
	chair: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User',
		required: true
	},
    startdate: {type: Date},
    enddate: {type: Date},
    conferenceLocation:{type: String},
    status: {type: Boolean, default:false},
    authors: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports= mongoose.model('Conference', conferenceModel);
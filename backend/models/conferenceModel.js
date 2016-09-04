var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var ConferenceSchema = new Schema({
    title: {type: String},
	// chair: {
	// 	type: mongoose.Schema.Types.ObjectId, ref: 'User',
	// 	required: true
	// },
    startdate: {type: Date},
    enddate: {type: Date},
    conferenceLocation:{type: String},
    status: {type: Boolean, default:false}
   // authors: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});


// ConferenceSchema.pre('save', function (next) {
// 	if (this.chair) {
    // update chair conference array

// 	}
// 	next();
// });
module.exports= mongoose.model('Conference', ConferenceSchema);
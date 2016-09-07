var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var reviewModel = new Schema({
    expertise: {
        type: Number,
        min: 1, // 1 not familiar ..5 expert
        max: 5,
        default: 1
    },
    overallEvaluation: {
        type: Number,
        min: 1,  //1 strong reject .. 5 strong accept
        max: 5,
        default: 1,
        required: 'overall evaluation is required'
    },
    summary: {
        type: String, required: ' Review Summary is required'},
    strongPoints: { type: String },
        weakPoints: { type: String },
        detailedComments: { type: String, required: 'Detailed Comments are required' },
    createdBy: {
        type: String,
        required: true
    },
    conferenceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conference',required: 'conferece id is required.' },
    submissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission',required: 'submission id is required.' }
    });


module.exports = mongoose.model('Review', reviewModel);
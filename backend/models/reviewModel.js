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
        deadline: {
            type: Date,
            // Create a default 'created' value
            default: +new Date() + 14 * 24 * 60 * 60 * 1000
        },
        //review phase i moved it to the conference model
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    conferenceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conference' }, // it takes null if tasktype is reviewing
    submissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission' } // it takes null if tasktype is submitting
    
    });


module.exports = mongoose.model('Review', reviewModel);
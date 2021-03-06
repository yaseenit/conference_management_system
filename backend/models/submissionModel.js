var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var taskSchema = require('../models/taskModel');
var uploadedFilesPath = require('../config/configurations').uploadedFilesPath;

  

var paperAuthor = new mongoose.Schema({
    familyName: {
        type: String
    },
    givenName: String,
    email: String

});

var submissionSchema = new Schema({
    title: { type: String, required: "A title is required" },
    abstract: { type: String },
    keywords: [{ type: String }],
    status: {
        type: String,
        enum: ['incompleted', 'completed', 'closed', 'accepted', 'rejected'],
        default: 'incompleted',
        trim: true,
        lowercase: true
    },
    fileName: { type: String },
    generatedFileName: { type: String },
    deadline: {
        type: Date,
        // Create a default 'created' value
        default: +new Date() + 14 * 24 * 60 * 60 * 1000
    },
    createdOn: { type: Date, default: Date.now },
    authorList: [paperAuthor],
    conferenceId:{ type: String, required: "ConferenceId is required" },
    reviewers: [{type: String}],
    createdBy:{ type: String, required: "Submission Creater Email Address is required" }
 //   reviewers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]//list of users who are allowed to review this submission. this list is filled by the chair


});
submissionSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    taskSchema.remove({submissionId: this._id}).exec();
    //Submission.remove({client_id: this._id}).exec();
    fs.unlink(uploadedFilesPath + this.generatedFileName);
    next();
});

module.exports = mongoose.model('Submission', submissionSchema);
// Invoke 'strict' JavaScript mode
'use strict';
// Load the module dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Email = require('../models/emailModel');

// Define 'TaskSchema'
var taskSchema = new mongoose.Schema({ //assign papers to reviewers
    taskType: {
        type: String, required: true,
        enum: ['submitting', 'reviewing']

    },
    taskDesc: String,
    createdOn: { type: Date, default: Date.now },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    conferenceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conference' }, // it takes null if tasktype is reviewing
    submissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }, // it takes null if tasktype is submitting
    assignedTo: {// assignee email addrees 
        type: String, required: true
    },
    isUserNotified: { type: Boolean, default: false }
});

taskSchema.pre('save', function (next) {
    if (!this.isUserNotified) {
        // If the task was deleted successfully 
        Email.to = this.assignedTo;
        var name = this.assignedTo.substring(0, this.assignedTo.lastIndexOf("@"));
        Email.subject = "CMS New Task has been assigned to you";
        Email.html = "<p>Dear Mr/Ms " + name + ",<br>Please login/register using this email address to get more information <br>Thank you.</p>";
        var emailController = require('../controllers/emailController')(Email);
        this.isUserNotified = true;
    }
    next();
});

module.exports = mongoose.model('Task', taskSchema);


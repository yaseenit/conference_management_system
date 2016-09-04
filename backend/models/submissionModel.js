var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


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
    // {type: Boolean, default:false},
    fileName: { type: String },
    generatedFileName: { type: String },
    deadline: {
        type: Date,
        // Create a default 'created' value
        default: +new Date() + 14 * 24 * 60 * 60 * 1000
    },
    createdOn: { type: Date, default: Date.now },
    authorList: [paperAuthor],
 //   reviewers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]//list of users who are allowed to review this submission. this list is filled by the chair


});


module.exports = mongoose.model('Submission', submissionSchema);
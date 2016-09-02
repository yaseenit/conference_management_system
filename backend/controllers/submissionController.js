var Email = require('../models/emailModel');
var fs = require("fs");
var uploadedFilesPath = require('../config/configurations').uploadedFilesPath;
var randomstring = require("randomstring");

var patg
var submissionController = function (Submission) {

    var post = function (req, res) {
        console.log(req.body);
        var submission = new Submission(req.body);

        fs.writeFile(uploadedFilesPath + randomstring.generate(), new Buffer(req.body.based64_data, 'base64'), function (err) {
            if (err) {
                res.status(500).send(err);
                console.log(err);
            }
            else {
                submission.save(function (err) {
                    if (err) {
                        res.status(500).send(err);
                        console.log(err);
                        return;
                    }
                    else {
                        var user = req.user;
                        user.submissions.push(submission._id);
                        user.save(function (err, user) {
                            if (err) {
                                submission.remove();
                                res.status(500).send(err);
                                return;
                            }
                            else {
                                res.status(201);
                                res.send(submission);
                                Email.to = user.username;
                                Email.subject = "CMS Submission Confirmation mail";
                                Email.text = "Dear Mr/Ms " + req.body.authorFamilyName + "you've successfully submitted a new pape with title " + req.body.title;
                                Email.html = "<p>Dear Mr/Ms " + req.body.authorFamilyName + ",<br>You have successfully submitted a new paper with title " + req.body.title + "<br>Best of luck with the Review Process</p>";
                                // res.send(submission._id);
                                var emailController = require('../controllers/emailController')(Email);
                            }
                        });

                    }
                }
                );
            }
        });
        //res.json({ message: "file uploaded." });



        // }
    }

    var get = function (req, res) {

        var query = {};

        if (req.query._Id) {
            query._Id = req.query._Id;
        }
        Submission.find(query, function (err, submissions) {
            if (err)
                res.status(500).send(err);
            else
                res.json(submissions);
        });
    }




    var getone = function (req, res) {
        // var subid=req.params.submissionId;
        //console.log(subid+'helloo');
        Submission.findById(req.params.submissionId, function (err, submission) {
            if (err)
                res.status(500).send(err);
            else if (submission) {
                req.submission = submission;
                res.json(submission);
                // next();
            }
            else {
                res.status(404).send('no submission for the requested submissionId is found');
            }
        });
    }

    var put = function (req, res) {
        req.submission.title = req.body.title;
        req.submission.authorGivenName = req.body.authorGivenName;
        req.submission.authorFamilyName = req.body.authorFamilyName;
        req.submission.authorEmail = req.body.authorEmail;
        //  req.submission.submissionId=req.body.submissionId;
        req.submission.keywords = req.body.keywords;
        req.submission.status = req.body.status;
        req.submission.save(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.json(req.submission);
            }
        });
    }

    var patch = function (req, res) {
        if (req.body._id)
            delete req.body._id;

        for (var p in req.body) {
            req.submission[p] = req.body[p];
        }

        req.submission.save(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.json(req.submission);
            }
        });
    }

    var removed = function (req, res) {
        Submission.findById(req.params.submissionId, function (err, submission) {
            if (err)
                res.status(500).send(err);
            else if (submission) {
                req.submission = submission;
                req.submission.remove(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else {
                        var user = req.user;
                        user.submissions.pull(submission._id);
                        user.save(function (err, user) {
                            if (err) {
                                req.submission.save();
                                res.status(500).send(err);
                                return;
                            }
                            else {
                                res.status(204).json({ message: "Submission has be deleted.", code: 204 });
                            }
                        });
                    }
                });
            }
            else {
                var user = req.user;
                user.submissions.pull(submission._id);
                user.save(function (err, user) {
                    if (err) {
                        req.submission.save();
                        res.status(500).send(err);
                        return;
                    }
                    else {
                        res.status(204).json({ message: "Submission has be deleted.", code: 204 });
                    }
                });
                res.status(404).send('no submission for the requested submissionId is found to be deleted');
            }
        });
    }

    return {
        post: post,
        get: get,
        getone: getone,
        put: put,
        removed: removed,
        patch: patch

    }
}

module.exports = submissionController;
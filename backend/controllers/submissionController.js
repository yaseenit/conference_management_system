var Email = require('../models/emailModel');
var fs = require("fs");
var uploadedFilesPath = require('../config/configurations').uploadedFilesPath;
var randomstring = require("randomstring");

var submissionController = function (Submission) {

    var post = function (req, res) {
        var conferenceId = req.params.conferenceId;
        var submission = new Submission(req.body);
        submission.conferenceId = conferenceId;// we need to add this submission to conference
        submission.createdBy = req.user.username;
        var generatedFileName = randomstring.generate();
        submission.generatedFileName = generatedFileName;

        fs.writeFile(uploadedFilesPath + generatedFileName, new Buffer(req.body.based64_data, 'base64'), function (err) {
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
                                fs.unlink(uploadedFilesPath + generatedFileName);
                                res.status(500).send(err);
                                return;
                            }
                            else {
                                res.status(201);
                                res.send(submission);
                                Email.to = user.username;
                                var name = user.username.substring(0, user.username.lastIndexOf("@"));
                                if (user.familyName) {
                                    name = user.familyName;
                                }
                                Email.subject = "CMS Submission Confirmation mail";
                                Email.html = "<p>Dear Mr/Ms " + name + ",<br>You have successfully submitted a new paper with title " + req.body.title + "<br>Best of luck with the reviewing process. Thank you.</p>";
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

        var query = {
            createdBy: req.user.username
        };
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
                res.status(404).json({ message: 'no submission for the requested submissionId is found', code: 404 });
            }
        });
    }

    var put = function (req, res) {
        var data = req.body;
        delete data.status;
        delete data.fileName;
        delete data.generatedFileName;
        delete data.deadline;
        delete data.createdOn;
        delete data.conferenceId;
        delete data.reviewers;
        delete data.createdBy;

        var id = req.body._id;
        delete data._id;

        Submission.findOneAndUpdate({ _id: id }, data, function (err, submission) {
            if (err)
                res.status(500).send(err);
            else if (!submission) {
                res.status(400).send({ message: "given submission id does not existed ", code: 400 });
            }
            else {
                res.json(submission);
            }
        });
    }
    var editStatus = function (req, res) {
        var data;
        if (req.body.status)
            data.status = req.body.status;
        if (req.body.deadline)
            data.deadline = new Date(req.body.deadline)
        var id = req.body._id || '';
        if (id && data) {
                        console.log("data");
            console.log(data);
            Submission.findOneAndUpdate({ _id: id }, data, function (err, submission) {
                if (err)
                    res.status(500).send(err);
                else if (!submission) {
                    res.status(400).send({ message: "given submission id does not existed ", code: 400 });
                }
                else {
                    res.json(submission);
                }
            });
        } else {
            res.status(400).send({ message: "submission id and data should be provided.", code: 400 });
        }
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
                        //TODO remove reviews and paper

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
        patch: patch,
        editStatus: editStatus
    }
}

module.exports = submissionController;
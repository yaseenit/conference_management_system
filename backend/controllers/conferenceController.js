var Conference = require('../models/conferenceModel');
var Email = require('../models/emailModel');
var User = require('../models/userModel');
var Task = require('../models/taskModel');


var conferenceController = function () {

    var post = function (req, res) {
        var conference = new Conference(req.body);

        conference.save(function (err) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                var user = req.user;
                user.conferences.push(conference._id);
                user.save(function (err, user) {
                    if (err) {
                        conference.remove();
                        res.status(500).send(err);
                        return;
                    }
                    else {
                        res.status(201);
                        res.json(conference);
                        Email.to = user.username;
                        var name = user.username.substring(0, user.username.lastIndexOf("@"));
                        if (user.familyName) {
                            name = user.familyName;
                        }
                        Email.subject = "CMS Conference has beeb created successfully";
                        Email.html = "<p>Dear Mr/Ms " + name + ",<br>You have successfully created a new conference with title " + req.body.title + "<br>Best of luck with your conferece. Thank you.</p>";
                        var emailController = require('../controllers/emailController')(Email);
                    }
                });
            }
        });

    }

    var getAll = function (req, res) {
        Conference.find({}, function (err, conferences) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(conferences);
            }
        });

    }
    var getById = function (req, res) {
        var conferenceId = req.params.conferenceId;
        if (req.user.conferences.indexOf(conferenceId) > -1) {
            Conference.findById(conferenceId, function (err, conference) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                else if (!conference) {
                    res.status(404).json({ message: "conferende not found!", code: 404 });
                    return;
                }
                else {
                    res.json(conference);
                }
            });
        }
        else {
            res.status(403);
            res.json({
                "status": 404,
                "message": "Sorry! you can not see this content."
            });
            return;
        }
    }
    var addAuthor = function (req, res) {
        var conferenceId = req.params.conferenceId;
        var newAuthor = req.body.username || '';
        if (newAuthor == '') {
            res.status(400);
            res.json({
                "status": 400,
                "message": "author email is missing"
            });
            return;
        }
        else {
            // I am assumeing that the user is authorized
            Conference.findById(conferenceId, function (err, conference) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                else if (!conference) {
                    res.status(404).json({ message: "conferende not found!", code: 404 });
                    return;
                }
                else {
                    if (conference.authors.indexOf(newAuthor) > -1) {
                        res.status(409).json({ message: "this author has been already added.", code: 409 });
                    }
                    else {
                        conference.authors.push(newAuthor);
                        conference.save(function (err, user) {
                            if (err) {
                                res.status(500).send(err);
                                return;
                            }
                            else {
                                var newTask = new Task({
                                    taskType: "submitting",
                                    taskDesc: conference.title,
                                    createdBy: req.user._id,
                                    conferenceId: conference._id,
                                    assignedTo: newAuthor
                                });
                                newTask.save(function (err) {
                                    if (err) {
                                        return res.status(500).json({ "message": err, code: 500 });//TODO revert
                                    } else {
                                        var query = { username: newAuthor };
                                        User.findOne(query, function (err, user) {
                                            if (err)
                                                res.status(500).send(err);
                                            else if (!user) {
                                                // If it is a new user  
                                                Email.to = newUser.username;
                                                var name = newUser.username.substring(0, newUser.username.lastIndexOf("@"));
                                                Email.subject = "CMS Invitation To Conference Mail";
                                                Email.html = "<p>Dear Mr/Ms " + name + ",<br>You have been added to conference titled " + conference.title + "<br>Please go to the website ang register with this email address to be able to do the submission.<br> Best of luck with the submitting process.  Thank you.</p>";
                                                var emailController = require('../controllers/emailController')(Email);
                                            } else { // user already existed
                                                user.tasks.push(newTask.id);
                                                user.save(function (err) {
                                                    // If an error occurs
                                                    if (err) {
                                                        return res.status(500).json({ "message": err, code: 500 });
                                                    } else {
                                                        // If the already existed user was assigned successfully 
                                                        Email.to = user.username;
                                                        var name = user.username.substring(0, user.username.lastIndexOf("@"));
                                                        Email.subject = "CMS Invitation To Submission Mail";
                                                        Email.html = "<p>Dear Mr/Ms " + name + ",<br>You have been added to conference titled " + conference.title + "<br>Best of luck with the submitting process. Thank you.</p>";
                                                        var emailController = require('../controllers/emailController')(Email);
                                                    }
                                                });
                                            }
                                            // reply 
                                            res.json(conference);
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    }
    var removeAuthor = function (req, res) {
        var conferenceId = req.params.conferenceId;
        var authorToBeDeleted = req.body.username || '';
        if (authorToBeDeleted == '') {
            res.status(400);
            res.json({
                "status": 400,
                "message": "author email is missing"
            });
            return;
        }
        else {
            // I am assumeing that the user is authorized
            Conference.findById(conferenceId, function (err, conference) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                else if (!conference) {
                    res.status(404).json({ message: "conferende not found!", code: 404 });
                    return;
                }
                else {
                    if (conference.authors.indexOf(authorToBeDeleted) > -1) {
                        conference.authors.pull(authorToBeDeleted);
                        conference.save(function (err, user) {
                            if (err) {
                                res.status(500).send(err);
                                return;
                            }
                            else {

                                Task.remove({ assignedTo: authorToBeDeleted, 'conferenceId': conferenceId }, function (err, deletedTask) {
                                    if (err) {
                                        return res.status(500).json({ "message": err, code: 500 });
                                    }
                                    else {
                                        var query = { username: authorToBeDeleted };
                                        User.findOne(query, function (err, user) {
                                            if (err)
                                                res.status(500).send(err);
                                            else if (user) { // user is existed
                                                user.tasks.pull(deletedTask.id);//TODO 
                                                user.save(function (err) {
                                                    // If an error occurs
                                                    if (err) {
                                                        return res.status(500).json({ "message": err, code: 500 });
                                                    } else {
                                                        // If the task was deleted successfully 
                                                        Email.to = user.username;
                                                        var name = user.username.substring(0, user.username.lastIndexOf("@"));
                                                        Email.subject = "CMS Submission Revoking Mail";
                                                        Email.html = "<p>Dear Mr/Ms " + name + ",<br>Your submission privilege has been revoked to conference titled." + conference.title + "<br>Thank you.</p>";
                                                        var emailController = require('../controllers/emailController')(Email);
                                                    }
                                                });
                                            }
                                            // reply 
                                            res.json(conference);
                                        });
                                    }
                                });
                            }//delete the task
                        });

                    }
                    else {
                        res.status(409).json({ message: "this author dose not belong to this conference anyway.", code: 409 });
                    }
                }
            });
        }

    }
    return {
        post: post,
        getAll: getAll,
        getById: getById,
        addAuthor: addAuthor,
        removeAuthor: removeAuthor
    }
}

module.exports = conferenceController;
var Conference = require('../models/conferenceModel');
var Email = require('../models/emailModel');


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

    var get = function (req, res) {
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
                        res.status(409).json({ message: "this author already has been added.", code: 409 });
                    }
                    else {
                        conference.authors.push(newAuthor);
                        conference.save(function (err, user) {
                            if (err) {
                                res.status(500).send(err);
                                return;
                            }
                            else {
                                var newTask = {
                                    taskType: "submitting",
                                    taskDesc: conference.title,
                                    createdBy: req.user._id,
                                    confenrenceId: conference._id
                                }
                                var query = { username: newAuthor };
                                User.findOne(query, function (err, user) {
                                    if (err)
                                        res.status(500).send(err);
                                    else if (!user) {
                                        // Create a new 'User' model instance
                                        var newUser = new User({ username: newAuthor });
                                        newUser.tasks.push(newTask);
                                        newUser.save(function (err) {
                                            // If an error occurs
                                            if (err) {
                                                return res.status(500).json({ "message": err, code: 500 });
                                            }
                                            // reply 
                                            res.json(conference);
                                            //You will receive a confirmation e-mail. Your account will be activated once you visit the link specified in the message.
                                            // If the user was created successfully 
                                            Email.to = newUser.username;
                                            var name = newUser.username.substring(0, newUser.username.lastIndexOf("@"));
                                            Email.subject = "CMS Invitation To Submission Mail";
                                            Email.html = "<p>Dear Mr/Ms " + name + ",<br>You have been added to conference titled " + conference.title + "<br>Best of luck with the submitting process. Thank you.</p>";
                                            var emailController = require('../controllers/emailController')(Email);
                                        });
                                    } else { // user already existed
                                        user.tasks.push(newTask);
                                        user.save(function (err) {
                                            // If an error occurs
                                            if (err) {
                                                return res.status(500).json({ "message": err, code: 500 });
                                            }
                                            // reply 
                                            res.json(conference);
                                            //You will receive a confirmation e-mail. Your account will be activated once you visit the link specified in the message.
                                            // If the user was created successfully 
                                            Email.to = user.username;
                                            var name = newUser.username.substring(0, user.username.lastIndexOf("@"));
                                            Email.subject = "CMS Invitation To Submission Mail";
                                            Email.html = "<p>Dear Mr/Ms " + name + ",<br>You have been added to conference titled " + conference.title + "<br>Best of luck with the submitting process. Thank you.</p>";
                                            var emailController = require('../controllers/emailController')(Email);

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
    return {
        post: post,
        get: get,
        addAuthor: addAuthor
    }
}

module.exports = conferenceController;
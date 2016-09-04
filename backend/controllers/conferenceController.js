var Conference = require('../models/conferenceModel');


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

    return {
        post: post,
        get: get
    }
}

module.exports = conferenceController;
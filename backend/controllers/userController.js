var Submission = require('../models/submissionModel');


var userController = function (User) {

    var post = function (req, res) {
        var user = new User(req.body);

        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        }
        else {
            user.save();
            res.status(201);
            res.send(user);
        }
    }


    var getAllAuthors = function (req, res) {
        var query = {};
        query.role = "AUTHOR";
        User.find(query, function (err, authors) {
            if (err)
                res.status(500).send(err);
            else
                res.json(authors);
        });

    }
    var getAllReviewers = function (req, res) {
        var query = {};
        query.role = "REVIEWER";
        User.find(query, function (err, reviewers) {
            if (err)
                res.status(500).send(err);
            else
                res.json(reviewers);
        });

    }
    var getAllReviews = function (req, res) {
        var query = {};
        User.find(query)
            .populate('reviews') //,'reviewerEmail ...')
            .exec(function (err, reviews) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(reviews);
            });
    }
    var getAllSubmissions = function (req, res) {
        var conferenceId = req.params.conferenceId;
        var query = {
            'conferenceId': conferenceId
        };
        Submission.find(query)
            // .populate('submissions') //,'attribure attribure ...')
            .exec(function (err, submissions) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(submissions);
            });
    }
    var createTask = function (req, res) {
        if (!req.body.username) {
            res.status(400);
            res.send('username is required.');
        }
        else {
            var query = {};
            query.username = req.body.username;
            User.findOne(query, 'tasks',
                function (err, assignedUser) {
                    if (!err) {
                        console.log(assignedUser);
                        assignedUser.tasks.push({
                            taskName: req.body.taskName,
                            taskDesc: req.body.taskDesc,
                            createdBy: req.user // chair id
                        });
                        assignedUser.save(function (err) {
                            if (err) {
                                res.status(500).send(err);//({ message: err, code: "500" });
                            } else {
                                console.log('Task saved: ' + req.body.taskName);
                                res.status(201).json({ message: assignedUser, code: "201" });
                            }
                        });
                    }
                    else {
                        res.status(500).send(err);
                    }
                }
            );
        }
    }

    var getAllTasks = function (req, res) {
        var query = {};
        User.find(query, 'username tasks',
            function (err, tasks) {
                if (!err) {
                    res.status(200).json(tasks);
                }
                else {
                    res.status(500).json({ message: err, code: "500" });
                }
            }
        );
    }

    var editTask = function (req, res) {
        console.log(req.body.username);
        if (!req.body.username) {
            res.status(400);
            res.json({ message: 'username is required.', code: 400 });
        }
        else {
            var taskId = req.params.taskId;
            var query = { username: req.body.username }
            User.findOne(query, function (err, user) {
                if (err)
                    res.status(500).send(err);
                else if (user) {
                    var thisTask = user.tasks.id(taskId);
                    console.log(thisTask);
                    if (thisTask) {
                        if (req.body.task.taskName) {
                            thisTask.taskName = req.body.task.taskName;
                        }
                        if (req.body.task.type) {
                            thisTask.type = req.body.task.type;
                        }
                        if (req.body.task.taskDesc) {
                            thisTask.taskDesc = req.body.task.taskDesc;
                        }
                        thisTask.modifiedOn = Date.now();
                        user.save(function (err) {
                            if (err) {
                                res.status(500).send(err);
                            }
                            else {
                                res.json(thisTask);
                            }
                        })
                    } else {
                        res.status(404).json({ message: 'no task found!', code: 404 });
                    }
                }
                else {
                    res.status(404).send('no user found!');
                }
            });
        }
    }

    var getProfile = function (req, res) {
        // var get = function (req, res) {

        //     var query = {};

        //     if (req.query.genre) {
        //         query.genre = req.query.genre;
        //     }
        //     User.find(query, function (err, users) {
        //         if (err)
        //             res.status(500).send(err);
        //         else
        //             res.json(users);
        //     });
        // }
        if (req.user) {
            User.findById(req.user._id)
                .populate('reviews')//,'submissions') TODO
                .populate('conferences')
                .populate('submissions')
                .populate('tasks')
                .exec(function (err, user) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(user);
                });
        } else {//should not reach here
            res.status(500).json({ message: "request for unlogged in user", code: 500 })
        }


    }
    var editProfile = function (req, res) {
        if (req.body.givenName)
            req.user.givenName = req.body.givenName;
        if (req.body.familyName)
            req.user.familyName = req.body.familyName;
        if (req.body.institute)
            req.user.institute = req.body.institute;
        if (req.body.city)
            req.user.city = req.body.city;
        if (req.body.state)
            req.user.state = req.body.state;
        if (req.body.country)
            req.user.country = req.body.country;
        if (req.body.zipCode)
            req.user.zipCode = req.body.zipCode;
        if (req.body.address)
            req.user.address = req.body.address;



        req.user.save(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.json(req.user);
            }
        });
    }
    var deleteProfile = function (req, res) {

        var username = req.user.username;
        if (req.user.role.toLowerCase().localeCompare("chair") == 0) {
            res.status(403).json({ message: "Chair user can not be removed! please refere to the adminstrator.", code: 403 });
        }
        else {
            req.user.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).json({ message: username + " has been removed successfully.", code: 204 });
                }
            });
        }
    }

    var changeProfilePassword = function (req, res) {
        var oldPassword = req.body.oldPassword || '';
        var newPassword = req.body.newPassword || '';

        if (newPassword == '' || oldPassword == '') {
            res.status(400);
            res.json({
                "status": 400,
                "message": "both old and new passwords must be provided."
            });
            return;
        }
    if (req.user.authenticate(oldPassword)) {
        req.user.password = newPassword;
        req.user.save(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.json(req.user);
            }
        });

    }
    else {
        res.status(400);
        res.json({
            "status": 400,
            "message": "wrong password."
        });
    }
}
return {
    post: post,
    getAllAuthors: getAllAuthors,
    getAllReviewers: getAllReviewers,
    getAllReviews: getAllReviews,
    getAllSubmissions: getAllSubmissions,
    createTask: createTask,
    getAllTasks: getAllTasks,
    editTask: editTask,


    getProfile: getProfile,
    editProfile: editProfile,
    deleteProfile: deleteProfile,
        changeProfilePassword : changeProfilePassword
}
}

module.exports = userController;
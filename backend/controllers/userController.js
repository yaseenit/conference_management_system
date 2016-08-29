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

    var get = function (req, res) {

        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        User.find(query, function (err, users) {
            if (err)
                res.status(500).send(err);
            else
                res.json(users);
        });
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
        var query = {};
        User.find(query)
            .populate('submissions') //,'attribure attribure ...')
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
            var query = {username:req.body.username }
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
    return {
        post: post,
        get: get,
        getAllAuthors: getAllAuthors,
        getAllReviewers: getAllReviewers,
        getAllReviews: getAllReviews,
        getAllSubmissions: getAllSubmissions,
        createTask: createTask,
        getAllTasks: getAllTasks,
        editTask: editTask
    }
}

module.exports = userController;
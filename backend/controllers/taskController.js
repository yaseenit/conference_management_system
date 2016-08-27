var User = require('../models/userModel');

var taskController = function () {

    var createTask = function (req, res) {
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
    return {
        createTask: createTask,
        getAllTasks: getAllTasks
    }
}
module.exports = taskController;
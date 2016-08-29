var User = require('../models/userModel');

var taskController = function () {
    var get = function (req, res) {
        if (req.user.username) {
            var query = { username: req.user.username };
            User.findOne(query,"username tasks", function (err, users) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(users);
            });
        }
        else {
            res.status(500).json({ message: "very odd thing has occuried! username is missing in you request!!", code: 500 });
        }
    }
    return {
        get: get
    }
}
module.exports = taskController;
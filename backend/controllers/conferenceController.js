var Conference = require('../models/conferenceModel');


var conferenceController = function () {

    var post = function (req, res) {
        var conference = new Conference(req.body);

        conference.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201);
                res.json(conference);
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
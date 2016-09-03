var Conference = require('../models/ConferenceModel');


var conferenceController = function(){

    var post = function(req, res){
        var conference = new Conference(req.body);

            conference.save();
            res.status(201);
            res.json(conference);
    }

    var get = function(req,res){
    }

    return {
        post: post,
        get:get
    }
}

module.exports = conferenceController;

var User = require('../models/userModel');
var fs = require('fs');
var uploadedFilesPath = require('../config/configurations').uploadedFilesPath;


var downloadController = function (app) {

    var get = function (req, res) {
        var filename = req.params.fileID;

        fs.stat(uploadedFilesPath + filename, function (err, stat) {
            if (err == null) {//TODO urgent
                if (true)//(req.user.role.toLowerCase() == 'chair') //|| req.user.submissions.contains.contains(filename) || reviwes.contains(filename) ) // TODO check if the user have access to this file
                {

                    res.download(uploadedFilesPath + filename, filename, function (err) {
                        if (err) {
                            // Handle error, but keep in mind the response may be partially-sent
                            // so check res.headersSent
                            console.log(err);
                        } else {
                            // decrement a download credit, etc.
                        }
                    });
                }
                // else {
                //     res.status(403).json({ message: "Sorry! you can't see that.", code: 403 });
                // }
            } else if (err.code == 'ENOENT') {
                res.status(404).json({ message: "requested file does not exsited.", code: 404 });
            } else {
                res.status(500).send(err);
            }
        });
        // if (req.user.username) {
        //     var query = { username: req.user.username };
        //     User.findOne(query,"username tasks", function (err, users) {
        //         if (err)
        //             res.status(500).send(err);
        //         else
        //             res.json(users);
        //     });
        // }
        // else {
        //     res.status(500).json({ message: "very odd thing has occuried! username is missing in you request!!", code: 500 });
        // }
    }// end of get

    return {
        getFile: get
    }
}
module.exports = downloadController;
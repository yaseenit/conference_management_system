

var jwt = require('jwt-simple');
//var validateUser = require('../routes/auth').validateUser;
var User = require('mongoose').model('User')

module.exports = function (req, res, next) {
    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe. 
    // We skip the token outh for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if (token) {
        try {
            var decoded = jwt.decode(token, require('../config/jwt_secret.js')());
        } catch (err) {
            res.status(500);
            res.json({
                "status": 500,
                "message": "Oops something went wrong",
                "error": err
            });
        }
        if (decoded.exp <= Date.now()) {
            res.status(400);
            res.json({
                "status": 400,
                "message": "Token Expired"
            });
            return;
        }
        // Authorize the user to see if s/he can access our resources
        //var dbUser = User.findByid(decoded.userid); //the logged in user's username

        User.findTheUserByUsername(decoded.userid, function (err, user, message) {
            if (err) {
                res.status(500);
                res.json({
                    "status": 500,
                    "message": message.message
                });
                return;
            }
            if (user) {
                if ((req.url.indexOf('chair') >= 0 && user.role == 'chair') || (req.url.indexOf('chair') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
                    next(); // To move to next middleware
                } else {
                    res.status(403);
                    res.json({
                        "status": 403,
                        "message": "Not Authorized"
                    });
                }
            } else {
                // No user with this name exists, respond back with a 401
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid User"
                });
                return;
            }
        });

    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid Token or Key"
        });
        return;
    }
};
var jwt = require('jwt-simple');
var User = require('mongoose').model('User')
var Email = require('../models/emailModel');
var async = require('async');


var auth = {

  login: function (req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
      res.status(400);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
    User.isRegisteredUser(username, password, function (err, user, message) {
      if (err) {
        res.status(500);
        res.json({
          "status": 500,
          "message": message.message
        });
      }
      if (!user) {
        res.json({
          "status": 401,
          "message": message.message
        });
      }
      if (user) {
        var response = genToken(user);
        console.log(response);
        res.json(response);
      }
      //This code gets run after the async operation gets run
    });

  },// end of login

  register: function (req, res) {
    // If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
    console.log(req.user);
    if (!req.user) {
      // Create a new 'User' model instance
      var user = new User(req.body);
      var message = null;

      // Set the user provider property
      user.provider = 'local';

      // Try saving the new user document
      user.save(function (err) {
        // If an error occurs, use flash messages to report the error
        if (err) {
          return res.status(400).json({ "message": err });
        }

        // If the user was created successfully 
        sendConfirmationEmail(user,req.headers.host);
        // reply 
        res.json(genToken(user));;
      });
    }

  },// end of register

  confirm_registertion: function (req, res) {
    var token = req.params.token;
    var errorMessage;
    if (token) {
      try {
        var decoded = jwt.decode(token, require('../config/jwt_secret.js')());
      } catch (err) {
        res.status(500);
        res.json({
          "status": 500,
          "message": "Oops something went wrong with token decoding. Void token!",
          "error": err
        });
        return;
      }

      User.findOneAndUpdate({ 'username': decoded.userid }, { 'is_confirmed': true }, { upsert: false }, function (err, user) {
        if (err) {
          res.status(500);
          res.json({
            "status": 500,
            "message": "Oops something went wrong",
            "error": err
          });
          return;
        }
        if (!user) {
          res.status(500);
          res.json({
            "status": 500,
            "message": "User not found!",
          });
          return;
        }
        html_code = "<html><head><title>Confirmation has been done successfully!</title></head>\
                    <body>\
                      <h2>Thank you for your confirmation!</h2>\
                    </body></html>";
        res.send(html_code);
      });

    } else {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Missing Token!",
      });
    }
  }//end of confirm_registertion
}


// As for using a random authentication token instead of login+password for each request,
// there are two main reasons for that:
// Performance: an authentication token can be verified safely 
//with a simple hash, which will be vastly more efficient than a heavy bcrypt call.
// You want to keep your precious CPU cycles for when they are really useful, 
//in particular when applying bcrypt to an actual human-managed password.
// Client-side storage: the authentication token will be stored on the client as 
//a cookie value. If the login and password are sent back with every request, 
//then they are stored as a cookie on the client. 
//People get nervous when their passwords are written to files 
//-- and such storage is not equivalent (from a security point of view) 
//to the storage of an authentication token, because human user are on the (bad) 
//habit of reusing their passwords for multiple systems, whereas authentication tokens 
//are inherently server-specific.
//Also, authentication tokens can have a short lifespan. 
//Asking the user to re-authenticate once a day or once a week doesn't seem too bad.
// But if you ask him to change his password once a day or week he won't be happy

// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires,
    userid: user.username // add the user object to the token
  }, require('../config/jwt_secret')());
  userToReturn = {

  }
  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}


function sendConfirmationEmail(user,host) {
  Email.to = user.username;
  Email.subject = "CMS: Registration Confirmation";
  var name = user.username.substring(0, user.username.lastIndexOf("@"));
  if (user.familyName) {
    name = user.familyName;
  }
  //req.headers.host
  confirm_link = 'http://'+ host + '/confirm_registertion/' + genToken(user).token;
  Email.html = "<p>Dear Mr/Ms " + name + ",<br>You've successfully registered! please confirm your email by clicking on the following link:   " 
    + confirm_link + "<br>Thank you</p>";
  var emailController = require('../controllers/emailController')(Email);
};

module.exports = auth;
var jwt = require('jwt-simple');
var User = require('mongoose').model('User')

var auth = {

  login: function (req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
    findTheUser = function (username, password, done) {
      // Use the 'User' model 'findOne' method to find a user with the current username
      User.findOne({
        username: username
      }, function (err, user) {
        // If an error occurs continue to the next middleware
        if (err) {
          return done(err);
        }
        // If a user was not found, continue to the next middleware with an error message
        if (!user) {
          return done(null, false, {
            message: 'Unknown user'
          });
        }
        // If the passport is incorrect, continue to the next middleware with an error message
        if (!user.authenticate(password)) {
          return done(null, false, {
            message: 'Invalid password'
          });
        }
        // Otherwise, continue to the next middleware with the user object
        return done(null, user);
      });
    };

    findTheUser(username, password, function (err, user, message) {
      if (err) {
        res.status(500);
        res.json({
          "status": 500,
          "message":message.message
        });
      }
      if (!user) {
        res.status(401);
        res.json({
          "status": 401,
          "message":message.message
        });
      }
      if (user) {
        res.json(genToken(user));
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
          // Use the error handling method to get the error message
          var message = getErrorMessage(err);

          // Set the flash messages
          //req.flash('error', message);

          // Redirect the user back to the signup page
          return res.status(400).json({ "message": message });
        }

        // // If the user was created successfully use the Passport 'login' method to login
        // req.login(user, function(err) {
        // 	// If a login error occurs move to the next middleware
        // 	if (err) return next(err);

        // 	// Redirect the user back to the main application page
        // 	return res.redirect('/');
        // });
        res.json(genToken(user));;
      });
    }

  },// end of register
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
  }, require('../config/secret')());
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
// Create a new error handling controller method
function getErrorMessage(err) {
  // Define the error message variable
  var message = '';

  // If an internal MongoDB error occurs get the error message
  if (err.code) {
    switch (err.code) {
      // If a unique index error occurs set the message error
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      // If a general error occurs set the message error
      default:
        message = 'Something went wrong';
    }
  } else {
    // Grab the first error message from a list of possible errors
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  // Return the message error
  return message;
};

module.exports = auth;
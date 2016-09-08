// Invoke 'strict' JavaScript mode
'use strict';
// Load the module dependencies
var mongoose = require('mongoose'),
	//	crypto = require('crypto'),
    // bcrypt = require('bcrypt'),
    // SALT_WORK_FACTOR = 10,
	Schema = mongoose.Schema;
var taskSchema = require('../models/taskModel');
var submissionSchema = require('../models/submissionModel');
var conferenceSchema = require('../models/conferenceModel');
var reviewSchema = require('../models/reviewModel');

// Define a new 'UserSchema'
var UserSchema = new Schema({
	username: {
		type: String,
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"],
		// Set a unique 'username' index
		//unique: true,
		// Validate 'username' value existance
		required: 'Username is required',
		// Trim the 'username' field
		trim: true,
		index: { unique: true },
		lowercase: true
	},
	password: {
		type: String,
		// Validate the 'password' value length
		validate: [
			function (password) {
				return password && password.length > 6;
			}, 'Password should be longer'
		]
	},
	role: {
        type: String,
        enum: ['user', 'reviewer', 'author', 'chair'],
        default: 'user',
		lowercase: true
    },
	givenName: String,
	familyName: String,
	institute: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
	zipCode: { type: String },
	address: { type: String },
	// salt: {
	// 	type: String
	// }
	//,
	// provider: {
	// 	type: String,
	// 	// Validate 'provider' value existance
	// 	required: 'Provider is required'
	// },
	// providerId: String,
	// providerData: {},
	created: {
		type: Date,
		// Create a default 'created' value
		default: Date.now
	},
	is_confirmed: { type: Boolean, default: false },// get true value if the user confirms their 
	// registration by clicking on a registration 
	// link sent via email
	reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],//review id 
	submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }],// a submission id here that this user is author for this submission
    conferences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conference' }],
	tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]

});

// Set the 'fullname' virtual property
// UserSchema.virtual('fullName').get(function() {
// 	return this.firstName + ' ' + this.lastName;
// }).set(function(fullName) {
// 	var splitName = fullName.split(' ');
// 	this.firstName = splitName[0] || '';
// 	this.lastName = splitName[1] || '';
// });
// UserSchema.virtual('user_postal_address').get(function() {
//      return this.user_street + ' ' + this.user_postal_code + ' ' + this.user_city+ ' ' + this.user_state + ' ' + this.user_country;
// });
// UserSchema.virtual('institution_postal_address').get(function() {
//      return this.institution_street + ' ' + this.institution_postal_code + ' ' + this.institution_city+ ' ' + this.institution_state + ' ' + this.institution_country;
// });
// Use a pre-save middleware to hash the password
// UserSchema.pre('save', function (next) {
// 	if (this.password) {
// 		//this.salt = //new Buffer(crypto.randomBytes(16)).toString('base64');
// 		this.password = this.hashPassword(this.password);
// 	}

// 	next();
// });


UserSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();



	user.password = new Buffer(user.password).toString('base64');
	next();
    // // generate a salt
    // bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    //     if (err) return next(err);

    //     // hash the password using our new salt
    //     bcrypt.hash(user.password, salt, function (err, hash) {
    //         if (err) return next(err);

    //         // override the cleartext password with the hashed one
    //         user.password = hash;
    //         next();
    //     });
    // });
});

UserSchema.methods.authenticate = function (candidatePassword) {
	return (new Buffer(candidatePassword).toString('base64') === this.password)
	//return bcrypt.compareSync(candidatePassword, this.password);
};



// // Create an instance method for hashing a password
// UserSchema.methods.hashPassword = function (password) {
// 	//console.log("salt " + this.salt);
// 	return crypto.pbkdf2Sync(password, require('../config/jwt_secret.js')(), 500, 64, 'sha512').toString('base64');
// };
//instance method
// Create an instance method for authenticating user
// UserSchema.methods.authenticate = function (password) {
// 	console.log("input password " + password)
// 	console.log("saverd password " + this.password)
// 	console.log("hashed password " + this.hashPassword(password))


// 	return this.password === this.hashPassword(password);
// };


// // Find possible not used username
// UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
// 	var _this = this;

// 	// Add a 'username' suffix
// 	var possibleUsername = username + (suffix || '');

// 	// Use the 'User' model 'findOne' method to find an available unique username
// 	_this.findOne({
// 		username: possibleUsername
// 	}, function(err, user) {
// 		// If an error occurs call the callback with a null value, otherwise find find an available unique username
// 		if (!err) {
// 			// If an available unique username was found call the callback method, otherwise call the 'findUniqueUsername' method again with a new suffix
// 			if (!user) {
// 				callback(possibleUsername);
// 			} else {
// 				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
// 			}
// 		} else {
// 			callback(null);
// 		}
// 	});
// };

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set('toJSON', {
	getters: true,
	virtuals: true,
    transform: function (doc, ret, options) {
        delete ret.password;
		//delete ret.salt;
        delete ret.__v;
        return ret;
    }
});
// UPDATE - You might want to use a white list:
// UserSchema.set('toJSON', {
//     transform: function(doc, ret, options) {
//         var retJson = {
//             email: ret.email,
//             registered: ret.registered,
//             modified: ret.modified
//         };
//         return retJson;
//     }
// });

//class methods
UserSchema.statics.isRegisteredUser = function (username, password, done) {
	// Use the 'User' model 'findOne' method to find a user with the current username
	this.findOne({
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
		// If the password is incorrect, continue to the next middleware with an error message
		if (!user.authenticate(password)) {
			return done(null, false, {
				message: 'Invalid password'
			});
		}
		// Otherwise, continue to the next middleware with the user object
		return done(null, user);
	});
};
UserSchema.statics.findTheUserByUsername = function (username, done) {
	// Use the 'User' model 'findOne' method to find a user with the current username
	this.findOne({
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
		return done(null, user);
	});
};


UserSchema.pre('remove', function (next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    taskSchema.remove({ assignedTo: this.username }).exec();
	submissionSchema.remove({ createdBy: this.username }).exec();
	conferenceSchema.remove({ chair: this._id }).exec();
	reviewSchema.remove({ createdBy: this.username }).exec();
    next();
});


// Create the 'User' model out of the 'UserSchema'
module.exports = mongoose.model('User', UserSchema);
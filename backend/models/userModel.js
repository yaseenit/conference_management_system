// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

// Define a new 'UserSchema'
var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	username: {
		type: String,
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"],
		// Set a unique 'username' index
		unique: true,
		// Validate 'username' value existance
		required: 'Username is required',
		// Trim the 'username' field
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		// Validate the 'password' value length
		validate: [
			function(password) {
				return password && password.length > 6;
			}, 'Password should be longer'
		]
	},
	role: {
        type: String,
        enum : ['USER','REVIWER','AUTHOR','CHAIR'],
        default : 'USER'
    },
	institution:{type: String},
	institution_city:{type: String},
    institution_state:{type: String},
    institution_country:{type: String},
    institution_postal_code:{type: String},
	institution_street:{type: String},
    user_city:{type: String},
    user_state:{type: String},
    user_country:{type: String},
	user_postal_code:{type: String},
	user_street:{type: String},
	salt: {
		type: String
	},
	provider: {
		type: String,
		// Validate 'provider' value existance
		required: 'Provider is required'
	},
	providerId: String,
	providerData: {},
	created: {
		type: Date,
		// Create a default 'created' value
		default: Date.now
	}
});

// Set the 'fullname' virtual property
UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});
UserSchema.virtual('user_postal_address').get(function() {
     return this.user_street + ' ' + this.user_postal_code + ' ' + this.user_city+ ' ' + this.user_state + ' ' + this.user_country;
});
UserSchema.virtual('institution_postal_address').get(function() {
     return this.institution_street + ' ' + this.institution_postal_code + ' ' + this.institution_city+ ' ' + this.institution_state + ' ' + this.institution_country;
});
// Use a pre-save middleware to hash the password
UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

// Create an instance method for hashing a password
UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

// Create an instance method for authenticating user
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

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
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('User', UserSchema);
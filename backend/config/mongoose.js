// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
	mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function () {
	// Use Mongoose to connect to MongoDB
	var db = mongoose.connect(config.db);

	// Define connection events
	mongoose.connection.on('connected', function () {
		console.log('Mongoose connected to ' + config.db);
	});

	mongoose.connection.on('error', function (err) {
		console.log('Mongoose connection error: ' + err);
	});

	mongoose.connection.on('disconnected', function () {
		console.log('Mongoose disconnected');
	});

	process.on('SIGINT', function () {
		mongoose.connection.close(function () {
			console.log('Mongoose disconnected through app termination');
			process.exit(0);
		});
	});

	// Load the application models 
	require('../models/userModel');
	require('../models/articleModel');
	require('../models/submissionModel');
	require('../models/conferenceModel');
	require('../models/reviewModel');
	// Return the Mongoose connection instance
	return db;
};
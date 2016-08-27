// Invoke 'strict' JavaScript mode
'use strict';


var express = require('express');
var User = require('../models/userModel');
var userController = require('../controllers/userController')(User);

var userRoutes = function (app) {

	var getOne = userController.getone;
	var getAll = userController.get;
	var create = userController.post;
	// var update=userController.put;
	// var remove=userController.remove;
	// var patch=userController.patch;
	var getAllAuthors = userController.getAllAuthors;
	var getAllReviewers = userController.getAllReviewers;
	var getAllReviews = userController.getAllReviews;
	var getAllSubmissions = userController.getAllSubmissions;

    return {
        getOne: getOne,
        getAll: getAll,
        create: create,
        // update: update,
        // remove: remove,
        // patch: patch,
		getAllAuthors: getAllAuthors,
		getAllReviewers: getAllReviewers,
		getAllReviews: getAllReviews,
		getAllSubmissions: getAllSubmissions
    }
}
module.exports = userController;


// // Load the module dependencies
// var usersController = require('../controllers/usersController'),
// 	passport = require('passport');

// // Define the routes module' method
// module.exports = function(app) {
// 	// Set up the 'signup' routes 
// 	app.route('/signup')
// 	   .get(usersController.renderSignup)
// 	   .post(usersController.signup);

// 	// Set up the 'signin' routes 
// 	app.route('/signin')
// 	   .get(usersController.renderSignin)
// 	   .post(passport.authenticate('local', {
// 			successRedirect: '/',
// 			failureRedirect: '/signin',
// 			failureFlash: true
// 	   }));

// 	// Set up the Facebook OAuth routes 
// 	app.get('/oauth/facebook', passport.authenticate('facebook', {
// 		failureRedirect: '/signin'
// 	}));
// 	app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
// 		failureRedirect: '/signin',
// 		successRedirect: '/'
// 	}));

// 	// Set up the Twitter OAuth routes 
// 	app.get('/oauth/twitter', passport.authenticate('twitter', {
// 		failureRedirect: '/signin'
// 	}));
// 	app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
// 		failureRedirect: '/signin',
// 		successRedirect: '/'
// 	}));

// 	// Set up the Google OAuth routes 
// 	app.get('/oauth/google', passport.authenticate('google', {
// 		scope: [
// 			'https://www.googleapis.com/auth/userinfo.profile',
// 			'https://www.googleapis.com/auth/userinfo.email'
// 		],
// 		failureRedirect: '/signin'
// 	}));
// 	app.get('/oauth/google/callback', passport.authenticate('google', {
// 		failureRedirect: '/signin',
// 		successRedirect: '/'
// 	}));

// 	// Set up the 'signout' route
// 	app.get('/signout', usersController.signout);
// };
// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {
	// Load the 'index' controller
	var index = require('../controllers/indexController');

	var auth = require('./auth.js');
	var submissionRoutes = require('./submissionRoutes')(app);
	var reviewRoutes=require('./reviewRoutes')(app);
	var userRoutes = require('./usersRoutes');
    var uploadroutes=require('./uploadRoutes')(app);
	//var user = require('./users.js');




	/*
	* Routes that can be accessed by any one
	*/
	app.get('/', function (req, res) { // welcoming
		var welcome = {
			message: "Hooray! welcome to our CMS API.",
			code: 200
		};
		res.json(welcome);
	});

	app.get('/ping', function (req, res) {// pong
		var pong = {
			message: "Welcome to CMS API. Server is up & running!",
			code: 200
		};
		res.json(pong);
	});

	app.post('/login', auth.login);
	app.post('/register', auth.register);
	app.get('/confirm_registertion/:token', auth.confirm_registertion);

	/****************************************************/

	//var Review = require('../models/reviewModel');
//	var reviewController = require('../controllers/reviewController')(Review)
	app.post('/api/v1/review/', reviewRoutes.create);
    app.get('/api/v1/review/',reviewRoutes.getAll);
	app.delete('/api/v1/review/:reviewId',reviewRoutes.remove);
	app.get('/api/v1/submissions/:reviewId', submissionRoutes.getOne);
	// /*
	// * Routes that can be accessed only by autheticated users
	// */
	app.get('/api/v1/submissions/', submissionRoutes.getAll);
	app.post('/api/v1/submissions/', submissionRoutes.create);
	 app.get('/api/v1/submissions/:submissionId', submissionRoutes.getOne);
	// app.put('/api/v1/submissions/:submissionId',submissionRoutes.update);
    app.delete('/api/v1/submissions/:submissionId',submissionRoutes.remove);
	// app.patch('/api/v1/submissions/:submissionId',submissionRoutes.patch);
	// app.get('/api/v1/submission/:id', products.getOne);
	// app.post('/api/v1/submission/', products.create);
	// app.put('/api/v1/submission/:id', products.update);
	// app.delete('/api/v1/submission/:id', products.delete);

	// /*
	// * Routes that can be accessed only by authenticated & authorized users
	// */

	app.get('/api/v1/chair/submissions', userRoutes.getAllSubmissions);
	app.get('/api/v1/chair/authors', userRoutes.getAllAuthors);
	app.get('/api/v1/chair/reviewers', userRoutes.getAllReviewers);
	app.get('/api/v1/chair/reviews', userRoutes.getAllReviews);

    // app.get('/api/v1/chair/users', user.getAll);
	// app.get('/api/v1/chair/user/:id', user.getOne);
	// app.post('/api/v1/chair/user/', user.create);
	// app.put('/api/v1/chair/user/:id', user.update);
	// app.delete('/api/v1/chair/user/:id', user.delete);

};
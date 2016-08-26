// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function(app) {
	// Load the 'index' controller
	var index = require('../controllers/indexController');
	var user = require('../controllers/userController');

	var auth = require('./auth.js');
	var submissionRoutes = require('./submissionRoutes')(app);
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

	
	// /*
	// * Routes that can be accessed only by autheticated users
	// */
	app.get('/api/v1/submissions/',submissionRoutes.getAll);
	app.post('/api/v1/submissions/',submissionRoutes.create);
	// app.get('/api/v1/submissions/:submissionId', submissionRoutes.getOne);
	// app.put('/api/v1/submissions/:submissionId',submissionRoutes.update);
	// app.delete('/api/v1/submissions/:submissionId',submissionRoutes.remove);
	// app.patch('/api/v1/submissions/:submissionId',submissionRoutes.patch);
	// app.get('/api/v1/submission/:id', products.getOne);
	// app.post('/api/v1/submission/', products.create);
	// app.put('/api/v1/submission/:id', products.update);
	// app.delete('/api/v1/submission/:id', products.delete);
	
	// /*
	// * Routes that can be accessed only by authenticated & authorized users
	// */

    app.get('/api/v1/chair/submissions', user.getAllSubmissions);
	app.get('/api/v1/chair/authors', user.getAllAuthors);
	app.get('/api/v1/chair/reviewers', user.getAllReviewers);
	app.get('/api/v1/chair/reviews', user.getAllReviews);

    // app.get('/api/v1/chair/users', user.getAll);
	// app.get('/api/v1/chair/user/:id', user.getOne);
	// app.post('/api/v1/chair/user/', user.create);
	// app.put('/api/v1/chair/user/:id', user.update);
	// app.delete('/api/v1/chair/user/:id', user.delete);

};
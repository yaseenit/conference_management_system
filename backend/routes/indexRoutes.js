// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function(app) {
	// Load the 'index' controller
	var index = require('../controllers/indexController');

	// app.get('/ping',function(req, res){
    //     res.json(ping);
    //       });

	var auth = require('./auth.js');
	//var products = require('./products.js');
	//var user = require('./users.js');
	



	/*
	* Routes that can be accessed by any one
	*/
	app.get('/', function (req, res) { // welcoming
	var welcome = {
		message: "Welcome to CMS API.",
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

/****************************************************/

	
	// /*
	// * Routes that can be accessed only by autheticated users
	// */
	// app.get('/api/v1/submission', products.getAll);
	// app.get('/api/v1/submission/:id', products.getOne);
	// app.post('/api/v1/submission/', products.create);
	// app.put('/api/v1/submission/:id', products.update);
	// app.delete('/api/v1/submission/:id', products.delete);
	
	// /*
	// * Routes that can be accessed only by authenticated & authorized users
	// */
	// app.get('/api/v1/chair/users', user.getAll);
	// app.get('/api/v1/chair/user/:id', user.getOne);
	// app.post('/api/v1/chair/user/', user.create);
	// app.put('/api/v1/chair/user/:id', user.update);
	// app.delete('/api/v1/chair/user/:id', user.delete);

};
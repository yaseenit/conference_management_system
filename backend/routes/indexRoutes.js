// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function(app) {
	// Load the 'index' controller
	var index = require('../controllers/indexController');

	var ping = {
		message: "Welcome to CMS API.",
		code: 200
	};

	// Mount the 'index' controller's 'render' method
	app.get('/ping',function(req, res){
        res.json(ping);
          });

	// var auth = require('./auth.js');
	// var products = require('./products.js');
	// var user = require('./users.js');
	
	// /*
	// * Routes that can be accessed by any one
	// */
	// router.post('/login', auth.login);
	
	// /*
	// * Routes that can be accessed only by autheticated users
	// */
	// router.get('/api/v1/products', products.getAll);
	// router.get('/api/v1/product/:id', products.getOne);
	// router.post('/api/v1/product/', products.create);
	// router.put('/api/v1/product/:id', products.update);
	// router.delete('/api/v1/product/:id', products.delete);
	
	// /*
	// * Routes that can be accessed only by authenticated & authorized users
	// */
	// router.get('/api/v1/admin/users', user.getAll);
	// router.get('/api/v1/admin/user/:id', user.getOne);
	// router.post('/api/v1/admin/user/', user.create);
	// router.put('/api/v1/admin/user/:id', user.update);
	// router.delete('/api/v1/admin/user/:id', user.delete);

};
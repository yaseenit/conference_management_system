// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../controllers/usersController'),
	articles = require('../controllers/articlesController');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'articles' base routes 
	app.route('/api/articles')
	   .get(articles.list)
	   .post(users.requiresLogin, articles.create);
	
	// Set up the 'articles' parameterized routes
	app.route('/api/articles/:articleId')
	   .get(articles.read)
	   .put(users.requiresLogin, articles.hasAuthorization, articles.update)
	   .delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

	// Set up the 'articleId' parameter middleware   
	app.param('articleId', articles.articleByID);
};
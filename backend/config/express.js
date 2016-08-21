// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
	http = require('http'),
	//socketio = require('socket.io'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	//session = require('express-session'),
	//MongoStore = require('connect-mongo')(session),
	//flash = require('connect-flash'),
	//passport = require('passport'),
    multer = require('multer');


// Define the Express configuration method
module.exports = function (db) {
	// Create a new Express application instance
	var app = express();

	// Create a new HTTP server
    var server = http.createServer(app);

    // Create a new Socket.io server
    //var io = socketio.listen(server);

	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	// Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());


	// Configure the 'session' middleware
	// app.use(session({
	// 	saveUninitialized: true,
	// 	resave: true,
	// 	secret: config.sessionSecret,
	// }));

	// Set the application view engine and 'views' folder
	//app.set('views', './app/views');
	//app.set('view engine', 'ejs');

	// Configure the flash messages middleware
	//app.use(flash());

	// Configure the Passport middleware
	//app.use(passport.initialize());
	//app.use(passport.session());


	app.all('/*', function (req, res, next) {
		// CORS headers
		res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
		// Set custom headers for CORS
		res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token');
		if (req.method == 'OPTIONS') {
			res.status(200).end();
		} else {
			next();
		}
	});

	// Load the routing files
	require('../routes/indexRoutes.js')(app);
	//require('../routes/usersRoutes.js')(app);
	require('../routes/articlesRoutes.js')(app);
	require('../routes/uploadRoutes')(app);
	require('../routes/submissionRoutes')(app);
	require('../routes/auth');

	// Auth Middleware - This will check if the token is valid
	// Only the requests that start with /api/v1/* will be checked for the token.
	// Any URL's that do not follow the below pattern should be avoided unless you 
	// are sure that authentication is not needed
	app.all('/api/v1/*', [require('../middlewares/validateRequest')]);//The middleware to authenticate 
	//and authorize the request.

	//app.use('/', require('../routes'));

	// If no route is matched by now, it must be a 404
	app.use(function (req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});


	//var Book = require('./models/bookModel');
    //bookRouter = require('./Routes/bookRoutes')(Book);
    //app.use('/api/books', bookRouter);

	// Configure static file serving
	//app.use(express.static('./public'));


	// Load the Socket.io configuration
	//require('./socketio')(server, io);

	// Return the Server instance
	return server;
};
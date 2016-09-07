// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {
	// Load the 'index' controller
	var index = require('../controllers/indexController');

	var auth = require('./auth.js');
	var submissionRoutes = require('./submissionRoutes')(app);
	var reviewRoutes = require('./reviewRoutes')(app);
	var userRoutes = require('./usersRoutes');
	var taskController = require('../controllers/taskController')();
	var downloadController = require('../controllers/downloadFileController')(app);
    var reportingController = require('../controllers/reportingController')();
    var conferenceController = require('../controllers/conferenceController')();



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
	app.post('/isRegister', auth.is_register);
	app.get('/confirm_registertion/:token', auth.confirm_registertion);

	/****************************************************/
    // var multer = require('multer');
	// app.post('/api/v1/upload/', function (req, res) {
	// 	console.log(req.body);
	// 	console.log(randomstring.generate());
	// 	require("fs").writeFile("./submissions/"+randomstring.generate(), new Buffer( req.body.based64_data, 'base64'), function (err) {
	// 		console.log(err);
	// 	});
	// 	res.json({ message: "file uploaded." });
	// });

	//  multer({ dest: './submissions/' }).single('uploadedfile'), function (req, res) {
	// 	var response = req.file;
	// 	res.status(201).json(response); //send id 
	// });

    // var express = require('express');
	// app.use('/api/v1/download/', express.static('/home/yassin/iptk-ss2016-team-november/backend/submissions/'));


	app.get('/api/v1/download/:fileID', downloadController.getFile);



	//var Review = require('../models/reviewModel');
	//	var reviewController = require('../controllers/reviewController')(Review)
    app.get('/api/v1/profile/', userRoutes.getProfile);// contains all user conferences
    app.post('/api/v1/profile/', userRoutes.editProfile);
	app.delete('/api/v1/profile/', userRoutes.deleteProfile);


   app.post('/api/v1/conference/',conferenceController.post);
   app.get('/api/v1/conference/:conferenceId',conferenceController.getById);
   app.get('/api/v1/conference/',conferenceController.getAll);



   
   app.post('/api/v1/:conferenceId/chair/addAuthor',conferenceController.addAuthor);
   app.post('/api/v1/:conferenceId/chair/removeAuthor',conferenceController.removeAuthor);

   app.post('/api/v1/:conferenceId/chair/addReviewer',conferenceController.addReviewer);
   app.post('/api/v1/:conferenceId/chair/removeReviewer',conferenceController.removeReviewer);




	app.post('/api/v1/review/', reviewRoutes.create);
    app.get('/api/v1/review/', reviewRoutes.getAll);
	app.delete('/api/v1/review/:reviewId', reviewRoutes.remove);
	app.get('/api/v1/review/:reviewId', reviewRoutes.getOne);




	// /*
	// * Routes that can be accessed only by autheticated users
	// */
	app.get('/api/v1/submissions/', submissionRoutes.getAll);
	//ahmed
	app.get('/api/v1/submissionsrev/',submissionRoutes.getRev);
	app.post('/api/v1/:conferenceId/submissions/', submissionRoutes.create);
	app.get('/api/v1/submissions/:submissionId', submissionRoutes.getOne);
	// app.put('/api/v1/submissions/:submissionId',submissionRoutes.update);
    app.delete('/api/v1/submissions/:submissionId', submissionRoutes.remove);
	// app.patch('/api/v1/submissions/:submissionId',submissionRoutes.patch);
	// app.get('/api/v1/submission/:id', products.getOne);
	// app.post('/api/v1/submission/', products.create);
	// app.put('/api/v1/submission/:id', products.update);
	// app.delete('/api/v1/submission/:id', products.delete);

   	app.get('/api/v1/tasks/', taskController.get);



	// /*
	// * Routes that can be accessed only by authenticated & authorized users
	// */

	app.get('/api/v1/:conferenceId/chair/submissions', userRoutes.getAllSubmissions);

	//	app.post('/api/v1/chair/submissions/:submissionId', userRoutes.editSubmission);//status and deadline

	//	app.get('/api/v1/:conferenceId/chair/', userRoutes.getAllReviews);



	app.get('/api/v1/chair/authors', userRoutes.getAllAuthors);
	app.get('/api/v1/chair/reviewers', userRoutes.getAllReviewers);
	app.get('/api/v1/chair/reviews', userRoutes.getAllReviews);


	//	app.get('/api/v1/chair/task/:taskID', userRoutes.getTask);
    app.post('/api/v1/chair/tasks/', userRoutes.createTask);
	app.get('/api/v1/chair/tasks/', userRoutes.getAllTasks);
	app.put('/api/v1/chair/tasks/:taskId', userRoutes.editTask);


	app.get('/api/v1/report', reportingController.getReport);

	//	app.put('/api/v1/chair/task/:taskID', userRoutes.doEditTask);
	//   app.delete('/api/v1/chair/task/:taskID', userRoutes.deleteTask);

	//	app.get('/api/v1/chair/users', user.getAll);
	// app.get('/api/v1/chair/user/:id', user.getOne);
	// app.post('/api/v1/chair/user/', user.create);
	// app.put('/api/v1/chair/user/:id', user.update);
	// app.delete('/api/v1/chair/user/:id', user.delete);

};
var express =require('express');
var multer  = require('multer');
//var Email=require('../models/emailModel');

var uproutes = function(app){
//set your Email Configuration

//commented

 //The view for the WebApp not relevant for Restful API
/*app.set('view engine', 'pug');
app.get('/api/upload', function (req, res) {
 res.render('index', {});
});*/ 
	app.post('/api/v1/upload/', multer({ dest: './submissions/'}).single('uploadedfile'), function(req,res){
	console.log(req.body); //form fields
	/* example output:
	{ title: 'abc' }
	 */
	console.log(req.file); //form files
	/* example output:
            { fieldname: 'upl',
              originalname: 'grumpy.png',
              encoding: '7bit',
              mimetype: 'image/png',
              destination: './uploads/',
              filename: '436ec561793aa4dc475a88e84776b1b9',
              path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
              size: 277056 }
	 */
	var response=req.file;

	
            res.end(JSON.stringify(response)); //send id 
//var emailController=require('../controllers/emailController')(Email);
	res.status(201).end();
});
  
};
module.exports = uproutes;

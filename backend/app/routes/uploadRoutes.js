var express =require('express');
var multer  = require('multer');
var Email=require('../models/emailModel');

var uproutes = function(app){
//set your Email Configuration
Email.service="Gmail";
Email.auth.user="tkproject2016@gmail.com";
Email.auth.pass="TKproject.2016";
Email.from="CMS<tkproject2016@gmail.com";
Email.to="ahmed.mamdouh1512@gmail.com";
Email.subject="CMS Confirmation mail";
Email.text="Dear Author you've successfully submitted a paper";
Email.html="<p>Dear Author,<br>You have successfully submitted a paper<br>Best of luck with the Review Process</p>";


 //The view for the WebApp not relevant for Restful API
/*app.set('view engine', 'pug');
app.get('/api/upload', function (req, res) {
 res.render('index', {});
});*/ 
	app.post('/api/upload', multer({ dest: './submissions/'}).single('uploadedfile'), function(req,res){
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
	var response ={
		id:{type:String}
}
response.id='123'
	res.status(201);
            res.end(response); //send id 
var emailController=require('../Controllers/emailController')(Email);
	res.status(204).end();
});
  
};
module.exports = uproutes;

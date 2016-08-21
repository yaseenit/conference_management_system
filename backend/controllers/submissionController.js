var Email=require('../models/emailModel');
var submissionController = function(Submission){

    var post = function(req, res){
        var submission = new Submission(req.body);

        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        }
        else {
            submission.save();
            res.status(201);
            res.send(submission);
            Email.to=req.body.authorEmail;
           Email.subject="CMS Submission Confirmation mail";
           Email.text="Dear Mr/Ms "+ req.body.authorFamilyName+ "you've successfully submitted a new pape with title "+req.body.title;
          Email.html="<p>Dear Mr/Ms "+req.body.authorFamilyName+",<br>You have successfully submitted a new paper with title " +req.body.title+"<br>Best of luck with the Review Process</p>";
           // res.send(submission._id);
           var emailController=require('../controllers/emailController')(Email);
        }
    }

    var get = function(req,res){

        var query = {};

        if(req.query._Id)
        {
            query._Id = req.query._Id;
        }
        Submission.find(query, function(err,submissions){
            if(err)
                res.status(500).send(err);
            else
                res.json(submissions);
        });
    }

    return {
        post: post,
        get:get
    }
}

module.exports = submissionController;
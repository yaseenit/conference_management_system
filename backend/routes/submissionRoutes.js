var express = require('express');
var Submission=require('../models/submissionModel');



module.exports = function(app){
  //  var submissionRouter = express.Router();
var submissionController = require('../controllers/submissionController')(Submission)

    app.route('/api/v1/submissions/')
        .post(submissionController.post)
        .get(submissionController.get);

    app.use('/api/v1/submissions/:submissionId', function(req,res,next){
        Submission.findById(req.params.submissionId, function(err,submission){
            if(err)
                res.status(500).send(err);
            else if(submission)
            {
                req.submission = submission;
                next();
            }
            else
            {
                res.status(404).send('no submission for the requested submissionId is found');
            }
        });
    });
    app.route('/api/v1/submissions/:submissionId')
        .get(function(req,res){

            res.json(req.submission);

        })
        .put(function(req,res){
            req.submission.title = req.body.title;
            req.submission.authorGivenName = req.body.authorGivenName;
            req.submission.authorFamilyName= req.body.authorFamilyName;
            req.submission.authorEmail= req.body.authorEmail;
          //  req.submission.submissionId=req.body.submissionId;
            req.submission.keywords = req.body.keywords;
            req.submission.status = req.body.status;
            req.submission.save(function(err){  
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.submission);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.submission[p] = req.body[p];
            }

            req.submission.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.submission);
                }
            });
        })
        .delete(function(req,res){
            req.submission.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
};

var express = require('express');
var Submission=require('../models/submissionModel');



  //  var submissionRouter = express.Router();
var submissionController = require('../controllers/submissionController')(Submission)


var submissionRoutes = function (app){

var getOne = submissionController.getone;
var getAll=submissionController.get;
var create=submissionController.post;
var update=submissionController.put;
var remove=submissionController.removed;
var patch=submissionController.patch;
var getRev=submissionController.getAllUserReviews;
    return {
        getOne: getOne,
        getAll: getAll,
        create: create,
        update: update,
        remove: remove,
        patch: patch,
        getRev:getRev
    }
}



  // app.route('/api/v1/submissions/')
       // app.post(submissionController.post)
       // app.get(submissionController.get);
//submissionController.getone
 //   app.use('/api/v1/submissions/:submissionId',submissionController.getone);
   // app.route('/api/v1/submissions/:submissionId')
     //   .get(function(req,res){

       //     res.json(req.submission);

       // })
        // .put(function(req,res){
        //     req.submission.title = req.body.title;
        //     req.submission.authorGivenName = req.body.authorGivenName;
        //     req.submission.authorFamilyName= req.body.authorFamilyName;
        //     req.submission.authorEmail= req.body.authorEmail;
        //   //  req.submission.submissionId=req.body.submissionId;
        //     req.submission.keywords = req.body.keywords;
        //     req.submission.status = req.body.status;
        //     req.submission.save(function(err){  
        //         if(err)
        //             res.status(500).send(err);
        //         else{
        //             res.json(req.submission);
        //         }
        //     });
        // })
        // .patch(function(req,res){
        //     if(req.body._id)
        //         delete req.body._id;

        //     for(var p in req.body)
        //     {
        //         req.submission[p] = req.body[p];
        //     }

        //     req.submission.save(function(err){
        //         if(err)
        //             res.status(500).send(err);
        //         else{
        //             res.json(req.submission);
        //         }
        //     });
        // })
        // .delete(function(req,res){
        //     req.submission.remove(function(err){
        //         if(err)
        //             res.status(500).send(err);
        //         else{
        //             res.status(204).send('Removed');
        //         }
        //     });
        // });


module.exports = submissionRoutes;
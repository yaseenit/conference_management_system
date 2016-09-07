var express = require('express');
var Review = require('../models/reviewModel');

var reviewController = require('../controllers/reviewController')(Review);
var reviewRoutes = function (app) {
    //  var reviewRouter = express.Router();
    var getOne = reviewController.getone;
    var getAll = reviewController.get;
    var create = reviewController.post;
    var update = reviewController.put;
    var remove = reviewController.remove;
    var patch = reviewController.patch;
    var getReiewBySubmissionId = reviewController.getReiewBySubmissionId;

    return {
        getOne: getOne,
        getAll: getAll,
        create: create,
        update: update,
        remove: remove,
        patch: patch,
        getReiewBySubmissionId:getReiewBySubmissionId

    }
}

module.exports = reviewRoutes;;

//     app.route('/api/v1/review/')
//         .post(reviewController.post)
//         .get(reviewController.get);

//     app.use('/api/v1/review/:reviewId', function(req,res,next){
//         Review.findById(req.params.reviewId, function(err,review){
//             if(err)
//                 res.status(500).send(err);
//             else if(review)
//             {
//                 req.review = review;
//                 next();
//             }
//             else
//             {
//                 res.status(404).send('no review for the requested reviewId is found');
//             }
//         });
//     });
//     app.route('/api/v1/review/:reviewId')
//         .get(function(req,res){

//             res.json(req.review);

//         })
//         .put(function(req,res){
//             req.review.expertise = req.body.expertise;
//             req.review.overallEvaluation = req.body.overallEvaluation;
//             req.review.summary= req.body.summary;
//             req.review.strongPoints= req.body.strongPoints;
//           //  req.review.reviewId=req.body.reviewId;
//             req.review.weakPoints= req.body.weakPoints;
//             req.review.detailedComments = req.body.detailedComments;
//             req.review.fileName=req.body.detailedComments; //this should be linked with the same fileName field in the submission

//             for(var r in req.body.reviewers)
//             {
//                 req.review.reviewers[r]=req.body.reviewers[r];
//             }
//             req.review.reviewerEmail=req.body.reviewerEmail;

//             req.review.save(function(err){  
//                 if(err)
//                     res.status(500).send(err);
//                 else{
//                     res.json(req.review);
//                 }
//             });
//         })
//         .patch(function(req,res){
//             if(req.body._id)
//                 delete req.body._id;

//             for(var p in req.body)
//             {
//                 req.review[p] = req.body[p];
//             }

//             req.review.save(function(err){
//                 if(err)
//                     res.status(500).send(err);
//                 else{
//                     res.json(req.review);
//                 }
//             });
//         })
//         .delete(function(req,res){
//             req.review.remove(function(err){
//                 if(err)
//                     res.status(500).send(err);
//                 else{
//                     res.status(204).send('Removed');
//                 }
//             });
//         });
// };

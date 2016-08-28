var Email = require('../models/emailModel');

var reviewController = function (Review) {

    var post = function (req, res) {
        var review = new Review(req.body);

        // if (!req.body.summary) {
        //     res.status(400);
        //     var summaryError = {
        //         "Error": "No Summary for the Review!"
        //     };
        //     res.send(summaryError);
        // }
        // else if (!req.body.detailedComments) {
        //     res.status(400);
        //     var detailedcommentError = {
        //         "Error": "No detailed Comments are given"
        //     };
        //     res.send(detailedcommentError);
        // }
        // else {
        review.save(function (err) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            else {
                var user = req.user;
                user.reviews.push(review._id);
                user.save(function (err, user) {
                    if (err) {
                        review.remove();
                        res.status(500).send(err);
                        return;
                    }
                    else {
                        res.status(201);
                        res.send(review);
                        Email.to = user.username;
                        Email.subject = "CMS Review Delivery Confirmation mail";
                        Email.text = "Dear Reviewer,you've successfully reviewed a submission ";//+req.body.title;
                        Email.html = "<p>Dear Reviewer,<br>You have successfully reviewed a new paper. <br> Thanks a lot </p>"; //with title " +req.body.title+"<br>Best of luck with the Review Process</p>";
                        // res.send(review._id);
                        var emailController = require('../controllers/emailController')(Email);
                    }
                });
            }

        });

    }

    var get = function (req, res) {

        var query = {};

        if (req.query._Id) {
            query._Id = req.query._Id;
        }
        Review.find(query, function (err, reviews) {
            if (err)
                res.status(500).send(err);
            else
                res.json(reviews);
        });
    }

 var getone = function (req, res, next) {
        Review.findById(req.params.reviewId, function (err, review) {
            if (err)
                res.status(500).send(err);
            else if (review) {
                req.review = review;
                next();
            }
            else {
                res.status(404).send('no review for the requested review Id is found');
            }
        });
    }

 var remove = function (req, res) {
        req.review.remove(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                var user = req.user;
                user.reviews.pull(review._id);
                user.save(function (err, user) {
                    if (err) {
                        req.review.save();
                        res.status(500).send(err);
                        return;
                    }
                    else {
                        res.status(204).json({message:"Review has be deleted.",code:204});
                    }
                });
            }
        });
    };
    return {
        post: post,
        get: get,
        getone: getone,
        remove: remove

    }
}

module.exports = reviewController;
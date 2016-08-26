var Email = require('../models/emailModel');
var reviewController = function (Review) {

    var post = function (req, res) {
        var review = new Review(req.body);

        if (!req.body.summary) {
            res.status(400);
            var summaryError = {
                "Error": "No Summary for the Review!"
            };
            res.send(summaryError);
        }
        else if (!req.body.detailedComments) {
            res.status(400);
            var detailedcommentError = {
                "Error": "No detailed Comments are given"
            };
            res.send(detailedcommentError);
        }
        else {
            review.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                    //console.log(err);
                }
                else {
                    res.status(201);
                    res.send(review);
                    Email.to = req.body.reviewerEmail;
                    Email.subject = "CMS Review Delivery Confirmation mail";
                    Email.text = "Dear Reviewer,you've successfully reviewed a submission ";//+req.body.title;
                    Email.html = "<p>Dear Reviewer,<br>You have successfully reviewed a new paper. <br> Thanks a lot </p>"; //with title " +req.body.title+"<br>Best of luck with the Review Process</p>";
                    // res.send(review._id);
                    var emailController = require('../controllers/emailController')(Email);


                }
            });
        }
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

    return {
        post: post,
        get: get
    }
}

module.exports = reviewController;
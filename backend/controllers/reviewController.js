var Email = require('../models/emailModel');

var reviewController = function (Review) {





    var post = function (req, res) {
        var review = new Review(req.body);
        review.createdBy = req.user.username;

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
                        Email.html = "<p>Dear Reviewer,<br>You have successfully reviewed a paper. <br> Thanks a lot.</p>";
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




    var getone = function (req, res) {
        Review.findById(req.params.reviewId, function (err, review) {
            if (err)
                res.status(500).send(err);
            else if (review) {
                req.review = review;
                res.json(review);

            }
            else {
                res.status(404).send('no review for the requested review Id is found');
            }
        });
    }


    var remove = function (req, res) {
        Review.findById(req.params.reviewId, function (err, review) {
            if (err)
                res.status(500).send(err);
            else if (review) {
                req.review = review;
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
                                res.status(204).json({ message: "review has be deleted.", code: 204 });
                            }
                        });
                    }
                });
            }
            else {
                res.status(404).send('no review for the requested submissionId is found to be deleted');
            }
        });
    }
    var getReiewBySubmissionId = function (req, res) {
        var submissionId = req.params.submissionId;
        Review.findOne({ conferenceId: req.params.conferenceId, submissionId: submissionId, createdBy: req.user.username }, function (err, review) {
            if (err)
                res.status(500).send(err);
            else if (!review) {
                res.status(400).send({ message: "You have not submitted any review to this submission in this conference. ", code: 400 });
            }
            else {
                res.json(review);
            }
        });
    }

    var getRviewsBySubmissionId = function (req, res) {
        if (req.isChair) {
            var submissionId = req.params.submissionId;
            Review.find({ conferenceId: req.params.conferenceId, submissionId: submissionId }, function (err, reviews) {
                if (err)
                    res.status(500).send(err);
                // else if (!review) {
                //     res.status(400).send({ message: "There are no reviewes for this submission in this conference. ", code: 400 });
                // }
                else {
                    res.json(reviews);
                }
            });
        } else {
            res.status(403).send({ message: "Sorry! you can not see this content ", code: 403 });
        }
    }
    var edit = function (req, res) {
        var data = req.body;
        delete data.createdBy;
        delete data.conferenceId;
        delete data.submissionId;

        var id = req.body._id;
        delete data._id;

        Review.findOneAndUpdate({ _id: id }, data, function (err, review) {
            if (err)
                res.status(500).send(err);
            else if (!review) {
                res.status(400).send({ message: "given review id does not existed ", code: 400 });
            }
            else {
                res.json(review);
            }
        });
    }
    return {
        post: post,
        get: get,
        getone: getone,
        remove: remove,
        getReiewBySubmissionId: getReiewBySubmissionId,
        getRviewsBySubmissionId: getRviewsBySubmissionId,
        edit: edit

    }
}

module.exports = reviewController;
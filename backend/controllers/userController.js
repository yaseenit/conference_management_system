var userController = function (User) {

    var post = function (req, res) {
        var user = new User(req.body);

        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        }
        else {
            user.save();
            res.status(201);
            res.send(user);
        }
    }

    var get = function (req, res) {

        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        User.find(query, function (err, users) {
            if (err)
                res.status(500).send(err);
            else
                res.json(users);
        });
    }
    var getAllAuthors = function (req, res) {
        var query = {};
        query.role = "AUTHOR";
        User.find(query, function (err, authors) {
            if (err)
                res.status(500).send(err);
            else
                res.json(authors);
        });

    }
    var getAllReviewers = function (req, res) {
        var query = {};
        query.role = "REVIEWER";
        User.find(query, function (err, reviewers) {
            if (err)
                res.status(500).send(err);
            else
                res.json(reviewers);
        });

    }
    var getAllReviews = function (req, res) {

        var query = {};
        User.find(query)
            .populate('reviews') //,'reviewerEmail ...')
            .exec(function (err, reviews) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(reviews);
            });
    }
    var getAllSubmissions = function (req, res) {
        var query = {};
        User.find(query)
            .populate('submissions') //,'attribure attribure ...')
            .exec(function (err, submissions) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(submissions);
            });
    }


    return {
        post: post,
        get: get,
        getAllAuthors: getAllAuthors,
        getAllReviewers: getAllReviewers,
        getAllReviews: getAllReviews,
        getAllSubmissions: getAllSubmissions

    }
}

module.exports = userController;
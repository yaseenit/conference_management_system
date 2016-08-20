var userController = function(User){

    var post = function(req, res){
        var user = new User(req.body);

        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        }
        else {
            user.save();
            res.status(201);
            res.send(user);
        }
    }

    var get = function(req,res){

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        User.find(query, function(err,users){
            if(err)
                res.status(500).send(err);
            else
                res.json(users);
        });
    }

    return {
        post: post,
        get:get
    }
}

module.exports = userController;
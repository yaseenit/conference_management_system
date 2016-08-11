var express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
   // passport = require('./config/passport'),
    session = require('express-session');



var db;
console.log('Hello');
if(process.env.ENV == 'Test'){

    db = mongoose.connect('mongodb://localhost/cmsAPI_test');
}

else{
    db= mongoose.connect('mongodb://localhost/cmsAPI');
}

var User = require('./models/userModel');

var app = express();

//var passport = passport(User);

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

userRouter = require('./Routes/userRoutes')(User);


app.use('/api/users', userRouter); 


app.get('/', function(req, res){
    res.send('welcome to my API!');
});
//////////Session/////////
app.use(session({
       saveUninitialized: true,
       resave: true,
       secret: "myBigSecret:)"
}));
//////////passport////////////
//var passport = require('passport');
//app.use(passport.initialize());
//app.use(passport.session());


app.listen(port, function(){
    console.log('Gulp is running my app on  PORT: ' + port);
});

module.exports = app;
var nodemailer = require('nodemailer');
var emailController = function(Email){
	var smtpTransport = nodemailer.createTransport("SMTP",{
    service: Email.service,
    auth: {
        user: Email.auth.user,
        pass: Email.auth.pass
    }
});
	var mailOptions = {
    from: Email.from, // sender address
    to:Email.to, // list of receivers
    subject: Email.subject, // Subject line
    text: Email.text, // plaintext body
    html: Email.html // html body
}

smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});


}
module.exports=emailController;
var Email = {
    service: {type: String},
     auth: {
        user:{type:String,unique:true},
        pass:{type:String}
    },
    from:{type:String}, // sender address
    to: {type:String}, // list of receivers
    subject:{type:String}, // Subject line
    text: {type:String}, // plaintext body
    html: {type:String} // html body
}


module.exports= Email;
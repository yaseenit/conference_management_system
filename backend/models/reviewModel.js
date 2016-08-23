var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var reviewModel = new Schema({
    expertise:  {
        type: Number,
        min:1, // 1 not familiar ..5 expert
        max:5,
        default : 1
    },
    overallEvaluation:{
        type: Number,
        min:1,  //1 strong reject .. 5 strong accept
        max:5,
        default : 1,
        required:true
    },
    summary:{type:String},
    strongPoints:{type:String},
    weakPoints:{type:String},
    detailedComments:{type:String},
    fileName:{type:String},
    reviewers:[
        {type:String}
        ],
    reviewerEmail:{type:String, unique:true}
    //review phase i moved it to the conference model
});


module.exports= mongoose.model('Review',reviewModel);
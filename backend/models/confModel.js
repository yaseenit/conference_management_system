var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var confModel = new Schema({
    title: {type: String},
    chair: {type: String},
    chairEmail: {type: String},
    startdate: {type: String},
    enddate: {type: String},
    confLocation:{type: String},
    status: {type: Boolean, default:false}
});

module.exports= mongoose.model('Conf', confModel);
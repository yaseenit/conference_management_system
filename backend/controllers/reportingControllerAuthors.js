var Conference = require('../models/conferenceModel');
var reportingControllerAuthors = function () {

    var get = function (req, res) {
      var agg= [
         { $match: { /* Query can go here, if you want to filter results. */ } } ,
   { $project: { authors: 1 } } 
  , { $unwind: '$authors' } /* this converts arrays into unique documents for counting */
  , { $group: { /* execute 'grouping' */
          _id: { conftitle:'$title',authors: '$authors'} /* using the 'token' value as the _id */
        , count: { $sum: 1 } /* create a sum value */
      }
    }
         












      ];
        Conference.aggregate(agg,function(err,aggregated){
            if(err){ res.status(500).send(err);
                }
else res.json(aggregated);

        })

    }

    return {
        getReport: get
    }
}

module.exports = reportingControllerAuthors;
var User = require('../models/userModel');
var reportingController = function () {

    var get = function (req, res) {
      var agg= [
          {
              $group:{
                   _id:{
                       country:'$country'
                    },
                    count:{
                         $sum:1
                        }
                } 
     }

      ];
        User.aggregate(agg,function(err,aggregated){
            if(err){ res.status(500).send(err);
                }
else res.json(aggregated);

        })

        //total submission, acceptances, topics, countries
        // var data = {
        //     totalSubmission: 15,
        //     acceptances: 10,
        //     rejected: 5,
        //     topics: [
        //         'Dance',
        //         'Dark matter',
        //         'Data',
        //         'Death',
        //         'Debate',
        //         'Decision-making',
        //         'Deextinction',
        //         'Demo',
        //         'Democracy',
        //         'Depression',
        //         'Design',
        //         'Development',
        //         'Dinosaurs',
        //         'Disability',
        //         'Disaster relief',
        //         'Discovery',
        //         'Disease',
        //         'DNA',
        //         'Drone'
        //     ],
        //     countries: [
        //         {
        //             name: 'Germany',
        //             totalSubmission: 5,
        //             acceptances: 4,
        //             rejected: 1

        //         },
        //         {
        //             name: 'USA',
        //             totalSubmission: 6,
        //             acceptances: 3,
        //             rejected: 3

        //         },
        //         {
        //             name: 'Israel',
        //             totalSubmission: 4,
        //             acceptances: 4,
        //             rejected: 0

        //         }

        //     ]
        // }
       // res.json(data);
    }

    return {
        getReport: get
    }
}

module.exports = reportingController;
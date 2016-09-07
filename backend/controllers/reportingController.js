var reportingController = function () {

    var get = function (req, res) {



        //total submission, acceptances, topics, countries
        var data = {
            totalSubmission: 15,
            acceptances: 10,
            rejected: 5,
            topics: [
                'Dance',
                'Dark matter',
                'Data',
                'Death',
                'Debate',
                'Decision-making',
                'Deextinction',
                'Demo',
                'Democracy',
                'Depression',
                'Design',
                'Development',
                'Dinosaurs',
                'Disability',
                'Disaster relief',
                'Discovery',
                'Disease',
                'DNA',
                'Drone'
            ],
            countries: [
                {
                    name: 'Germany',
                    totalSubmission: 5,
                    acceptances: 4,
                    rejected: 1

                },
                {
                    name: 'USA',
                    totalSubmission: 6,
                    acceptances: 3,
                    rejected: 3

                },
                {
                    name: 'Israel',
                    totalSubmission: 4,
                    acceptances: 4,
                    rejected: 0

                }

            ]
        }
        res.json(data);
    }

    return {
        getReport: get
    }
}

module.exports = reportingController;
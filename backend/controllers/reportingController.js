var reportingController = function () {

    var get = function (req, res) {



         //total submission, acceptances, topics, countries

        res.json({ message: "report", code: 200 })
    }

    return {
        getReport: get
    }
}

module.exports = reportingController;
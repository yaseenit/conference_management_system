System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ConferenceModel, Task, Chair, Paper, PaperAuthor, Review, User;
    return {
        setters:[],
        execute: function() {
            ConferenceModel = (function () {
                function ConferenceModel() {
                    this.title = "";
                    this.chair = new Chair();
                    this.startdate = new Date();
                    this.enddate = new Date();
                    this.conferenceLocation = "";
                    this.status = true;
                    this.authors = [];
                    this.tasks = [];
                }
                return ConferenceModel;
            }());
            exports_1("ConferenceModel", ConferenceModel);
            Task = (function () {
                function Task() {
                    this.taskType = "";
                    this.taskDesc = "";
                    this.assignedTo = "";
                    this.submissionId = "";
                    this.conferenceId = "";
                }
                return Task;
            }());
            exports_1("Task", Task);
            Chair = (function () {
                function Chair() {
                    this.username = "";
                    this._id = "";
                }
                return Chair;
            }());
            exports_1("Chair", Chair);
            Paper = (function () {
                //
                function Paper() {
                    this.title = "";
                    this.id = 0;
                    this.status = "";
                    this.author = "";
                    this.fileId = "";
                    this.authorList = [];
                    this.keywords = [];
                    this.submissionDate = new Date();
                    this.userId = "";
                    this.abstract = "";
                    this.deadline = "";
                    this.createdOn = "";
                    this.generatedFileName = "";
                    this.conferenceId = "";
                    this.reviewers = [];
                    //for review
                    this.review = [];
                }
                return Paper;
            }());
            exports_1("Paper", Paper);
            PaperAuthor = (function () {
                function PaperAuthor(_givenName, _familyName, _email) {
                    this.givenName = "";
                    this.familyName = "";
                    this.email = "";
                    this.givenName = _givenName;
                    this.familyName = _familyName;
                    this.email = _email;
                }
                return PaperAuthor;
            }());
            exports_1("PaperAuthor", PaperAuthor);
            Review = (function () {
                function Review(_expertise, _evaluation, _summary, _strongPoints, _weakPoints, _comments) {
                    this.expertise = "";
                    this.evaluation = "";
                    this.summary = "";
                    this.strongPoints = "";
                    this.weakPoints = "";
                    this.comments = "";
                    this.expertise = _expertise;
                    this.evaluation = _evaluation;
                    this.strongPoints = _strongPoints;
                    this.weakPoints = _weakPoints;
                    this.comments = _comments;
                }
                return Review;
            }());
            exports_1("Review", Review);
            User = (function () {
                function User() {
                    this.username = "";
                    this.password = "";
                    this.id = 0;
                    this.givenName = "";
                    this.familyName = "";
                    this.address = "";
                    this.city = "";
                    this.state = "";
                    this.zipCode = "";
                    this.country = "";
                    this.institute = "";
                    this.tasks = [];
                }
                return User;
            }());
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=app.interface.js.map
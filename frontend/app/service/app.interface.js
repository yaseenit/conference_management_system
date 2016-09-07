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
                    this.id = "";
                    this.status = "";
                    this.author = "";
                    this.fileId = "";
                    this.authorList = [];
                    this.keywords = [];
                    this.submissionDate = new Date();
                    this.userId = "";
                    this.abstract = "";
                    this.deadline = new Date();
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
                function Review() {
                    this._id = "";
                    this.expertise = 0;
                    this.overallEvaluation = 0;
                    this.summary = "";
                    this.strongPoints = "";
                    this.weakPoints = "";
                    this.detailedComments = "";
                    this.createdBy = "";
                    this.conferenceId = "";
                    this.submissionId = "";
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
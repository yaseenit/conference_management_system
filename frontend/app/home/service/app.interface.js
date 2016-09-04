System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ConferenceModel, Paper, PaperAuthor, User;
    return {
        setters:[],
        execute: function() {
            ConferenceModel = (function () {
                function ConferenceModel() {
                    this.title = "";
                    this.chair = "";
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
            ;
            Paper = (function () {
                function Paper() {
                    this.title = "";
                    this._id = "";
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
                    this.fileName = "";
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
                }
                return User;
            }());
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=app.interface.js.map
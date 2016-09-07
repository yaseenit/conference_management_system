System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', 'angular2/router', './headers', './file.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1, router_1, headers_1, file_service_1;
    var AppService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (headers_1_1) {
                headers_1 = headers_1_1;
            },
            function (file_service_1_1) {
                file_service_1 = file_service_1_1;
            }],
        execute: function() {
            AppService = (function () {
                function AppService(_http, _router, jsonp) {
                    this._http = _http;
                    this._router = _router;
                    this.jsonp = jsonp;
                    this._rootUrl = "http://myremoteserverwg117.ddns.net:3000/";
                    this._apiUrl = this._rootUrl + "api/v1/";
                    this._taskUrl = this._apiUrl + "chair/tasks/";
                    // private _inviteUrl = this._apiUrl + "/addAuthor/";
                    //private _paperUrl=this._apiUrl+'submissions/';
                    this._paperUrl = this._apiUrl + 'submissions/';
                    this._profileUrl = this._apiUrl + 'profile/';
                    this._uploadUrl = this._apiUrl + 'submissions/';
                    this._conferenceUrl = this._apiUrl + "conference/";
                    this._chairConferenceUrl = this._apiUrl + "chair/conference/";
                    this._userLogInUrl = this._rootUrl + "login";
                    this._getFileUrl = this._rootUrl + "api/v1/download/";
                    this._signupUrl = this._rootUrl + "register";
                    this._isRegisterUrl = this._rootUrl + "isRegister";
                }
                AppService.prototype.getPapers = function () {
                    return this._http.get(this._paperUrl, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.getPaper = function (id) {
                    console.log(id);
                    return this._http.get(this._paperUrl + id, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.getUserConference = function () {
                    return this._http.get(this._profileUrl, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.getAllConference = function () {
                    return this._http.get(this._conferenceUrl, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.getConferenceSubmission = function (conferenceId) {
                    return this._http.get(this._apiUrl + conferenceId + "/chair/submissions", { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.getFiles = function (generatedFileName, fileName) {
                    var req = new XMLHttpRequest();
                    req.open('get', this._getFileUrl + generatedFileName);
                    req.setRequestHeader('x-access-token', localStorage.getItem("token"));
                    req.responseType = "arraybuffer";
                    req.onreadystatechange = function () {
                        if (req.readyState == 4 && req.status == 200) {
                            // observer.next(req.response);
                            //  observer.complete();
                            var blob = new Blob([this.response], { type: "application/octet-stream" });
                            saveAs(blob, fileName);
                        }
                    };
                    req.send();
                };
                AppService.prototype.getReview = function (conferenceId, submissionId) {
                    return this._http.get(this._apiUrl + conferenceId + "/review/" + submissionId, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.submitReview = function (review) {
                    var expertise = review.expertise;
                    var overallEvaluation = review.overallEvaluation;
                    var summary = review.summary;
                    var strongPoints = review.strongPoints;
                    var weakPoints = review.weakPoints;
                    var detailedComments = review.detailedComments;
                    var conferenceId = review.conferenceId;
                    var submissionId = review.submissionId;
                    var body = JSON.stringify({ expertise: expertise, overallEvaluation: overallEvaluation, summary: summary, strongPoints: strongPoints, weakPoints: weakPoints, detailedComments: detailedComments, conferenceId: conferenceId, submissionId: submissionId });
                    console.log(body);
                    return this._http.post(this._apiUrl + review.conferenceId + "/review", body, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || error);
                };
                AppService.prototype.assignReviewers = function (username, submissionId, conferenceId) {
                    var body = JSON.stringify({ username: username, submissionId: submissionId });
                    console.log(body);
                    return this._http.post(this._apiUrl + conferenceId + "/chair/addReviewer", body, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.removeReviewers = function (username, submissionId, conferenceId) {
                    var body = JSON.stringify({ username: username, submissionId: submissionId });
                    console.log(body);
                    return this._http.post(this._apiUrl + conferenceId + "/chair/removeReviewer", body, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.inviteAuthor = function (username, conferencId) {
                    var body = JSON.stringify({ username: username });
                    console.log(body);
                    return this._http.post(this._apiUrl + conferencId + "/chair/addAuthor", body, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.removeAuthor = function (username, conferencId) {
                    var body = JSON.stringify({ username: username });
                    console.log(body);
                    return this._http.post(this._apiUrl + conferencId + "/chair/removeAuthor", body, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.getConferenceDetails = function (conferencId) {
                    return this.getAllConference()
                        .map(function (conf) { return conf.find(function (p) { return p._id == conferencId; }); });
                };
                AppService.prototype.paperSubmission = function (_paper, attFile) {
                    var result = 0;
                    var uploadedFile = attFile;
                    console.log(uploadedFile[0]);
                    var size = uploadedFile[0].size;
                    var fileName = uploadedFile[0].name;
                    var jsonBody;
                    var reader = new FileReader();
                    var ready = false;
                    var xx = this;
                    file_service_1.FileService.getFileByte(uploadedFile[0], function (based64_data) {
                        var title = _paper.title;
                        var authorList = _paper.authorList;
                        var abstract = _paper.abstract;
                        var keywords = _paper.keywords;
                        var conferenceId = _paper.conferenceId;
                        var body = JSON.stringify({ title: title, abstract: abstract, authorList: authorList, keywords: keywords, based64_data: based64_data, size: size, fileName: fileName, conferenceId: conferenceId });
                        // console.log(body);
                        xx._http.post(xx._apiUrl + conferenceId + '/submissions/create', body, { headers: headers_1.ContentHeaders })
                            .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                            .subscribe(function (response) {
                            result = 1;
                        }, function (error) {
                            console.log(error.json().status);
                            result = 0;
                        });
                    });
                    return result;
                };
                //Edit Paper submission
                AppService.prototype.paperSubmissionEdit = function (_paper) {
                    var title = _paper.title;
                    var authorList = _paper.authorList;
                    var abstract = _paper.abstract;
                    var keywords = _paper.keywords;
                    var conferenceId = _paper.conferenceId;
                    var _id = _paper.id;
                    var body = JSON.stringify({ title: title, abstract: abstract, authorList: authorList, keywords: keywords, _id: _id });
                    // console.log(body);
                    return this._http.post(this._apiUrl + conferenceId + '/submissions/edit', body, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                //
                AppService.prototype.submissionUpdateStatus = function (status, _id, conferenceId) {
                    var body = JSON.stringify({ status: status, _id: _id });
                    // console.log(body);
                    return this._http.post(this._apiUrl + conferenceId + '/submissions/editStatus', body, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.editDeadline = function (deadline, _id, conferenceId) {
                    var body = JSON.stringify({ deadline: deadline, _id: _id });
                    // console.log(body);
                    return this._http.post(this._apiUrl + conferenceId + '/submissions/editStatus', body, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.createConference = function (_conf) {
                    var result;
                    var title = _conf.title;
                    var chair = localStorage.getItem("_id");
                    var conferenceLocation = _conf.conferenceLocation;
                    var startdate = _conf.startdate;
                    var enddate = _conf.enddate;
                    var body = JSON.stringify({ title: title, chair: chair, conferenceLocation: conferenceLocation, enddate: enddate, startdate: startdate });
                    console.log(body);
                    return this._http.post(this._conferenceUrl, body, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + data); })
                        .catch(this.handleError);
                };
                AppService.prototype.changePassword = function (newPassword, oldPassword) {
                    var body = JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword });
                    console.log(body);
                    return this._http.post(this._profileUrl + "changePassword", body, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .catch(this.handleError)
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); });
                };
                AppService.prototype.getUserProfile = function () {
                    var _token = this.getToken();
                    var token = JSON.stringify({ _token: _token });
                    return this._http.get(this._profileUrl, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .catch(this.handleError).do(function (data) { return console.log("All:" + JSON.stringify(data)); });
                };
                AppService.prototype.updateProfile = function (_user) {
                    var familyName = _user.familyName;
                    var givenName = _user.givenName;
                    var country = _user.country;
                    var institute = _user.institute;
                    var city = _user.city;
                    var zipCode = _user.zipCode;
                    var state = _user.state;
                    var address = _user.address;
                    var body = JSON.stringify({ familyName: familyName, givenName: givenName, institute: institute, country: country, state: state, city: city, zipCode: zipCode, address: address });
                    return this._http.post(this._profileUrl, body, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                AppService.prototype.signup = function (_user) {
                    var result;
                    var username = _user.username;
                    var password = _user.password;
                    var familyName = _user.familyName;
                    var givenName = _user.givenName;
                    var country = _user.country;
                    var institute = _user.institute;
                    var city = _user.city;
                    var zipCode = _user.zipCode;
                    var state = _user.state;
                    var address = _user.address;
                    var body = JSON.stringify({ username: username, password: password, familyName: familyName, givenName: givenName, institute: institute, country: country, state: state, city: city, zipCode: zipCode, address: address });
                    return this._http.post(this._signupUrl, body, { headers: headers_1.ContentHeadersWithoutToken })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.isRegister = function (username) {
                    var body = JSON.stringify({ username: username });
                    return this._http.post(this._isRegisterUrl, body, { headers: headers_1.ContentHeadersWithoutToken })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.login = function (email, password) {
                    var _logInCode = '';
                    var username = email;
                    var body = JSON.stringify({ username: username, password: password });
                    return this._http.post(this._userLogInUrl, body, { headers: headers_1.ContentHeadersWithoutToken })
                        .map(function (response) { return response.json(); }).catch(this.handleError);
                };
                AppService.prototype.searchWiki = function (term) {
                    var search = new http_1.URLSearchParams();
                    search.set('action', 'opensearch');
                    search.set('search', term);
                    search.set('format', 'json');
                    return this.jsonp.get('https://en.wikipedia.org/w/api.php?search=' + term + '&action=opensearch&format=json&callback=JSONP_CALLBACK')
                        .map(function (request) { return request.json()[1]; });
                };
                AppService.prototype.checkCredentials = function () {
                    if (localStorage.getItem("token") == null) {
                        this._router.navigate(['Welcome']);
                    }
                };
                AppService.prototype.isLog = function () {
                    if (localStorage.getItem("token") == null)
                        return false;
                    else
                        return true;
                };
                AppService.prototype.getCurrentUserEmail = function () {
                    if (localStorage.getItem("token") != null)
                        return localStorage.getItem("username");
                    else
                        return null;
                };
                AppService.prototype.getToken = function () {
                    if (localStorage.getItem("token") != null)
                        return localStorage.getItem("token");
                    else
                        return null;
                };
                AppService.prototype.logout = function () {
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                    localStorage.removeItem("_id");
                    this._router.navigate(['Welcome']);
                };
                AppService._base64_data = "";
                AppService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router, http_1.Jsonp])
                ], AppService);
                return AppService;
            }());
            exports_1("AppService", AppService);
        }
    }
});
//# sourceMappingURL=app.service.js.map
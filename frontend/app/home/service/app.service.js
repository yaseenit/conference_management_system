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
                    this._apiUrl = "http://myremoteserverwg117.ddns.net:3000/api/v1/";
                    this._taskUrl = this._apiUrl + "chair/tasks/";
                    this._invitUrl = this._apiUrl + "chair/invit/";
                    this._paperUrl = this._apiUrl + 'submissions/';
                    this._profileUrl = this._apiUrl + 'profile/';
                    this._uploadUrl = this._apiUrl + 'submissions/';
                    this._conferenceUrl = this._apiUrl + "conference/";
                    this._userLogInUrl = "http://myremoteserverwg117.ddns.net:3000/login";
                    this._getFileUrl = "http://myremoteserverwg117.ddns.net:3000/api/v1/download/";
                    this._signupUrl = "http://myremoteserverwg117.ddns.net:3000/register";
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
                AppService.prototype.getFiles = function (generatedFileName, fileName) {
                    //  console.log('mmmm');
                    //   console.log('mmmm');
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
                AppService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || error);
                };
                AppService.prototype.assignReviewers = function (reviewer, submissionId) {
                    var body = JSON.stringify({ reviewer: reviewer, submissionId: submissionId });
                    return this._http.post(this._taskUrl, body, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.invitAuthor = function (userName, conferencId) {
                    var body = JSON.stringify({ userName: userName, conferencId: conferencId });
                    console.log(body);
                    return this._http.post(this._invitUrl, body, { headers: headers_1.ContentHeaders })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                AppService.prototype.paperSubmission = function (_paper, attFile) {
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
                        console.log(localStorage.getItem("token"));
                        var body = JSON.stringify({ title: title, abstract: abstract, authorList: authorList, keywords: keywords, based64_data: based64_data, size: size, fileName: fileName });
                        //  console.log(body);
                        return xx._http.post(xx._uploadUrl, body, { headers: headers_1.ContentHeaders })
                            .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                            .subscribe(function (response) {
                        }, function (error) {
                            console.log(error.json().status);
                        });
                    });
                };
                AppService.prototype.changePassword = function (password, oldPassword) {
                    var body = JSON.stringify({ oldPassword: oldPassword, password: password });
                    this._http.post("", body, { headers: headers_1.ContentHeaders })
                        .do(function (data) { return console.log("All:" + JSON.stringify(data)); })
                        .subscribe(function (response) {
                        //   this._router.navigate(['Welcome']);
                    }, function (error) {
                        // alert(error.text());
                        console.log(error.json().status);
                    });
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
                        .catch(this.handleError);
                };
                AppService.prototype.createConference = function (_conf) {
                    var result;
                    var title = _conf.title;
                    var chair = this.getCurrentUserEmail();
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
                AppService.prototype.login = function (email, password) {
                    var _logInCode = '';
                    var username = email;
                    var body = '{  "username": "fadi.boutros@awicompany.com",  "password": "P@ssw0rd"}';
                    // JSON.stringify({ username, password });   
                    //  console.log(body);
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
                        this._router.navigate(['LogIn']);
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
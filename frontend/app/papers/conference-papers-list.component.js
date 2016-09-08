System.register(['angular2/core', '../service/app.service', 'angular2/router', '../shared/result-message.component'], function(exports_1, context_1) {
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
    var core_1, app_service_1, router_1, router_2, result_message_component_1;
    var ConferencePaperComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (result_message_component_1_1) {
                result_message_component_1 = result_message_component_1_1;
            }],
        execute: function() {
            ConferencePaperComponent = (function () {
                function ConferencePaperComponent(_paperService, _router, _routeParams) {
                    this._paperService = _paperService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.imageWidth = 50;
                    this.imageHeight = 40;
                    this.showFile = false;
                    this.listFilter = '';
                    this.resultMessage = "";
                    this.messageType = "";
                }
                ConferencePaperComponent.prototype.toggleFile = function () {
                    this.showFile = !this.showFile;
                };
                ConferencePaperComponent.prototype.ngOnInit = function () {
                    console.log('init page');
                    this.conferenceId = this._routeParams.get('id');
                    this.fillPaperList();
                };
                ConferencePaperComponent.prototype.fillPaperList = function () {
                    var _this = this;
                    this.pageTitle = 'Submission in Conference: ' + this._routeParams.get('title');
                    this._paperService.getConferenceSubmission(this.conferenceId).subscribe(function (papers) {
                        _this.papers = papers;
                        if (_this.papers.length == 0) {
                            _this.messageType = "alert";
                            _this.resultMessage = "there are no available submission";
                        }
                    }, function (error) {
                        _this.messageType = "error";
                        _this.resultMessage = error["message"];
                    });
                };
                ConferencePaperComponent.prototype.stringAsDate = function (dateStr) {
                    return new Date(dateStr);
                };
                ConferencePaperComponent.prototype.getSubmissionStatus = function (status) {
                    if (status == "completed") {
                        return true;
                    }
                    else
                        return false;
                };
                ConferencePaperComponent.prototype.getSubmissionIncompletedStatus = function (status) {
                    if (status == "incompleted")
                        return false;
                    else
                        return true;
                };
                ConferencePaperComponent.prototype.getFile = function (event, generatedFileName, fileName) {
                    event.preventDefault();
                    this._paperService.getFiles(generatedFileName, fileName);
                };
                ConferencePaperComponent.prototype.updateStatus = function (event, status, submissionId) {
                    var _this = this;
                    event.preventDefault();
                    this._paperService.submissionUpdateStatus(status, submissionId, this.conferenceId).subscribe(function (response) {
                        console.log(response);
                        _this.messageType = "success";
                        _this.resultMessage = "Submission " + status + " successfully";
                        _this.fillPaperList();
                    }, function (error) {
                        _this.messageType = "error";
                        _this.resultMessage = error["message"];
                    });
                };
                ConferencePaperComponent.prototype.onBack = function () {
                    this._router.navigate(['Conference']);
                };
                ConferencePaperComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/papers/conference-papers-list.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES, result_message_component_1.ResultMessagesComponent]
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService, router_2.Router, router_2.RouteParams])
                ], ConferencePaperComponent);
                return ConferencePaperComponent;
            }());
            exports_1("ConferencePaperComponent", ConferencePaperComponent);
        }
    }
});
//# sourceMappingURL=conference-papers-list.component.js.map
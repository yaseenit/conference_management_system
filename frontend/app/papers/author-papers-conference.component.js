System.register(['angular2/core', './paper-filter.pipe', '../service/app.service', 'angular2/router', '../shared/result-message.component'], function(exports_1, context_1) {
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
    var core_1, paper_filter_pipe_1, app_service_1, router_1, router_2, result_message_component_1;
    var AuthorPapersConferenceComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (paper_filter_pipe_1_1) {
                paper_filter_pipe_1 = paper_filter_pipe_1_1;
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
            AuthorPapersConferenceComponent = (function () {
                function AuthorPapersConferenceComponent(_paperService, _router, _routeParams) {
                    this._paperService = _paperService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.imageWidth = 50;
                    this.imageHeight = 40;
                    this.showFile = false;
                    this.listFilter = '';
                    this.resultMessage = "";
                    this.messageType = "";
                    this.checkConferenceEndDate = false;
                }
                AuthorPapersConferenceComponent.prototype.toggleFile = function () {
                    this.showFile = !this.showFile;
                };
                AuthorPapersConferenceComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log('init page');
                    this.conferenceId = this._routeParams.get('id');
                    this.pageTitle = 'Conference: ' + this._routeParams.get('title');
                    this._paperService.getPapers().subscribe(function (papers) {
                        _this.papers = papers.filter(function (pap) {
                            return pap.conferenceId.indexOf(_this.conferenceId) != -1;
                        });
                        if (_this.papers.length == 0) {
                            _this.messageType = "alert";
                            _this.resultMessage = "these are no submission";
                        }
                        console.log(_this.papers.length != 0);
                    }, function (error) {
                        _this.messageType = "erro";
                        _this.resultMessage = error["message"];
                    });
                    this._paperService.getConferenceDetails(this.conferenceId).subscribe(function (response) {
                        _this.checkConferenceDate(response.enddate);
                    }, function (error) {
                        _this.messageType = "erro";
                        _this.resultMessage = error["message"];
                    });
                };
                AuthorPapersConferenceComponent.prototype.checkConferenceDate = function (endate) {
                    var current = new Date();
                    if (new Date(endate).getTime() < current.getTime()) {
                        this.resultMessage = "you  cann't make new submission after conference end date";
                        this.messageType = "alert ";
                        this.checkConferenceEndDate = false;
                    }
                    else
                        this.checkConferenceEndDate = true;
                };
                AuthorPapersConferenceComponent.prototype.stringAsDate = function (dateStr) {
                    return new Date(dateStr);
                };
                AuthorPapersConferenceComponent.prototype.checkSubmissionStatus = function (status, deadline) {
                    if (status == "rejected") {
                        // this.resultMessage="Cann't assigned reviewer to rejected paper";
                        //   this.messageType="error";
                        return false;
                    }
                    else {
                        var current = new Date();
                        if (new Date(deadline).getTime() < current.getTime()) {
                            //    this.resultMessage="Cann't assigned reviewer, paper reach deadline" + deadline ;
                            //     this.messageType="error";
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                };
                AuthorPapersConferenceComponent.prototype.getFile = function (event, generatedFileName, fileName) {
                    event.preventDefault();
                    this._paperService.getFiles(generatedFileName, fileName);
                };
                AuthorPapersConferenceComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/papers/author-papers-conference.component.html',
                        pipes: [paper_filter_pipe_1.PaperFilterPipe],
                        directives: [router_1.ROUTER_DIRECTIVES, result_message_component_1.ResultMessagesComponent]
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService, router_2.Router, router_2.RouteParams])
                ], AuthorPapersConferenceComponent);
                return AuthorPapersConferenceComponent;
            }());
            exports_1("AuthorPapersConferenceComponent", AuthorPapersConferenceComponent);
        }
    }
});
//# sourceMappingURL=author-papers-conference.component.js.map
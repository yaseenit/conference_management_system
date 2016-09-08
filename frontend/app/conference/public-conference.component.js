System.register(['angular2/core', '../service/app.service', 'angular2/router', './conference-filter.pipe', '../shared/result-message.component'], function(exports_1, context_1) {
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
    var core_1, app_service_1, router_1, conference_filter_pipe_1, result_message_component_1;
    var PublicConferenceComponent;
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
            },
            function (conference_filter_pipe_1_1) {
                conference_filter_pipe_1 = conference_filter_pipe_1_1;
            },
            function (result_message_component_1_1) {
                result_message_component_1 = result_message_component_1_1;
            }],
        execute: function() {
            PublicConferenceComponent = (function () {
                function PublicConferenceComponent(_service, _router) {
                    this._service = _service;
                    this._router = _router;
                    this.conferences = [];
                    this.resultMessage = "";
                    this.messageType = "";
                }
                PublicConferenceComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log("dddd");
                    this.pageTitle = "Assigned Conference";
                    this.username = this._service.getCurrentUserEmail();
                    this._service.getAllConference().subscribe(function (response) {
                        console.log(response);
                        _this.conferences = response.filter(function (con) {
                            return con.authors.indexOf(_this.username) != -1;
                        });
                        ;
                        if (_this.conferences.length == 0) {
                            _this.messageType = "alert";
                            _this.resultMessage = "you didn't enrolled in any conference";
                        }
                        console.log(_this.conferences.length != 0);
                    }, function (error) {
                        _this.messageType = "erro";
                        _this.resultMessage = error["message"];
                    });
                };
                PublicConferenceComponent.prototype.stringAsDate = function (dateStr) {
                    return new Date(dateStr);
                };
                PublicConferenceComponent.prototype.onBack = function () {
                    this._router.navigate(['Welcome']);
                };
                PublicConferenceComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/conference/public-conference.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES, result_message_component_1.ResultMessagesComponent],
                        pipes: [conference_filter_pipe_1.ConferenceFilterPipe],
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService, router_1.Router])
                ], PublicConferenceComponent);
                return PublicConferenceComponent;
            }());
            exports_1("PublicConferenceComponent", PublicConferenceComponent);
        }
    }
});
//# sourceMappingURL=public-conference.component.js.map
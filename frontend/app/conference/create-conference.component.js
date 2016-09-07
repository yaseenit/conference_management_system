System.register(['angular2/core', '../service/app.service', 'angular2/common', '../shared/control-message.component', '../shared/result-message.component', '../service/app.interface'], function(exports_1, context_1) {
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
    var core_1, app_service_1, common_1, control_message_component_1, result_message_component_1, app_interface_1;
    var CreateConferenceComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (control_message_component_1_1) {
                control_message_component_1 = control_message_component_1_1;
            },
            function (result_message_component_1_1) {
                result_message_component_1 = result_message_component_1_1;
            },
            function (app_interface_1_1) {
                app_interface_1 = app_interface_1_1;
            }],
        execute: function() {
            CreateConferenceComponent = (function () {
                function CreateConferenceComponent(_fb, _service) {
                    this._service = _service;
                    this.resultMessage = "";
                    this.messageType = "";
                    this._conference = new app_interface_1.ConferenceModel();
                    this.form = _fb.group({
                        title: ['', common_1.Validators.required],
                        startdate: ['', common_1.Validators.required],
                        enddate: ['', common_1.Validators.required],
                        conferenceLocation: ['', common_1.Validators.required],
                    });
                }
                CreateConferenceComponent.prototype.ngOnInit = function () {
                    this._conference.enddate = new Date();
                };
                CreateConferenceComponent.prototype.checkConferenceDate = function (startdate, enddate) {
                    var current = new Date();
                    console.log(startdate >= current);
                    console.log(new Date(startdate).getTime());
                    if (new Date(startdate).getTime() >= current.getTime() && new Date(enddate).getTime() > new Date(startdate).getTime()) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                CreateConferenceComponent.prototype.submit = function (event, value) {
                    var _this = this;
                    this._conference = new app_interface_1.ConferenceModel();
                    this._conference.authors = this._service.getCurrentUserEmail();
                    this._conference.conferenceLocation = value.conferenceLocation;
                    this._conference.enddate = value.enddate;
                    this._conference.startdate = value.startdate;
                    this._conference.status = true;
                    this._conference.title = value.title;
                    if (this.checkConferenceDate(value.startdate, value.enddate)) {
                        this._service.createConference(this._conference).subscribe(function (response) {
                            console.log(response);
                            _this.resultMessage = "New conference has been created you can invite autho from ";
                            _this.messageType = "success";
                        }, function (error) {
                            _this.resultMessage = "Error , please try again later";
                            _this.messageType = "error";
                        });
                    }
                    else {
                        this.resultMessage = " conference start date should be less than end date and equal or more than current date  ";
                        this.messageType = "error";
                    }
                };
                CreateConferenceComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/conference/create-conference.component.html',
                        directives: [control_message_component_1.ControlMessagesComponent, result_message_component_1.ResultMessagesComponent],
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, app_service_1.AppService])
                ], CreateConferenceComponent);
                return CreateConferenceComponent;
            }());
            exports_1("CreateConferenceComponent", CreateConferenceComponent);
        }
    }
});
//# sourceMappingURL=create-conference.component.js.map
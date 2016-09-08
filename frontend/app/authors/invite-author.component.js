System.register(['angular2/core', 'angular2/router', '../service/app.service', '../directives/googleplace.directive', 'angular2/common', '../shared/control-message.component', '../service/validation.service', '../shared/result-message.component'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, app_service_1, googleplace_directive_1, common_1, control_message_component_1, validation_service_1, result_message_component_1;
    var InviteAuthorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (googleplace_directive_1_1) {
                googleplace_directive_1 = googleplace_directive_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (control_message_component_1_1) {
                control_message_component_1 = control_message_component_1_1;
            },
            function (validation_service_1_1) {
                validation_service_1 = validation_service_1_1;
            },
            function (result_message_component_1_1) {
                result_message_component_1 = result_message_component_1_1;
            }],
        execute: function() {
            InviteAuthorComponent = (function () {
                function InviteAuthorComponent(_fb, _service, _router, _routeParams) {
                    this._service = _service;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.arrayIndex = 0;
                    this.authorList = [];
                    this.ConferenceId = 10;
                    this.resultMessage = "";
                    this.messageType = "";
                    this.chkDate = false;
                    this.form = _fb.group({
                        userName: ['', common_1.Validators.compose([validation_service_1.ValidationService.emailValidator, common_1.Validators.required])]
                    });
                }
                InviteAuthorComponent.prototype.ngOnInit = function () {
                    this.ConferenceId = this._routeParams.get('id');
                    this.getConferenceDetails(this.ConferenceId);
                };
                InviteAuthorComponent.prototype.getConferenceDetails = function (id) {
                    var _this = this;
                    this.chairUserName = this._service.getCurrentUserEmail();
                    this._service.getConferenceDetails(id).subscribe(function (response) {
                        _this.authorList = response.authors;
                        _this.checkConferenceDate(response.startdate, response.enddate);
                    }, function (error) {
                        _this.messageType = "error";
                        _this.resultMessage = error["message"];
                    });
                };
                InviteAuthorComponent.prototype.checkConferenceDate = function (startdate, enddate) {
                    var current = new Date();
                    if (new Date(enddate).getTime() >= current.getTime()) {
                        this.chkDate = true;
                    }
                    else {
                        this.chkDate = false;
                    }
                };
                InviteAuthorComponent.prototype.Invite = function (event, value) {
                    var _this = this;
                    event.preventDefault();
                    if (this.chairUserName != value.userName) {
                        this.messageType = "";
                        this.resultMessage = "";
                        if (this.checkAuthor(value.userName)) {
                            this.authorList[this.arrayIndex] = value.userName;
                            this.arrayIndex++;
                            //   console.log(value.email);
                            // this.clearForm();
                            this._service.inviteAuthor(value.userName, this.ConferenceId).subscribe(function (response) {
                                _this.authorList = response.authors;
                                _this.resultMessage = "author" + value.userName + " has been invited";
                                _this.messageType = "success";
                                console.log(response);
                                _this.clearForm();
                            }, function (error) {
                                _this.resultMessage = "Error " + error["message"];
                                _this.messageType = "error";
                            });
                        }
                        else {
                            this.resultMessage = 'Author email already exists';
                            this.messageType = "error";
                        }
                    }
                    else {
                        this.resultMessage = 'As a chair,you are not allowed to participate in this conference ';
                        this.messageType = "error";
                    }
                };
                InviteAuthorComponent.prototype.clearForm = function () {
                    for (var name in this.form.controls) {
                        this.form.controls[name].updateValue('');
                    }
                };
                InviteAuthorComponent.prototype.checkAuthor = function (_userName) {
                    console.log(this.authorList.length);
                    for (var i = 0; i < this.authorList.length; i++) {
                        if (this.authorList[i] == _userName)
                            return false;
                    }
                    return true;
                };
                InviteAuthorComponent.prototype.removeAuthor = function (_userName) {
                    var _this = this;
                    event.preventDefault();
                    this._service.removeAuthor(_userName, this.ConferenceId).subscribe(function (response) {
                        _this.authorList = response.authors;
                        _this.resultMessage = "author" + _userName + " has been removed";
                        _this.messageType = "success";
                        console.log(response);
                    }, function (error) {
                        _this.resultMessage = "Error " + error["message"];
                        _this.messageType = "error";
                    });
                };
                InviteAuthorComponent.prototype.onBack = function () {
                    this._router.navigate(['Conference']);
                };
                InviteAuthorComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/authors/invite-author.component.html',
                        directives: [router_2.ROUTER_DIRECTIVES, googleplace_directive_1.GoogleplaceDirective, control_message_component_1.ControlMessagesComponent, result_message_component_1.ResultMessagesComponent],
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, app_service_1.AppService, router_1.Router, router_1.RouteParams])
                ], InviteAuthorComponent);
                return InviteAuthorComponent;
            }());
            exports_1("InviteAuthorComponent", InviteAuthorComponent);
        }
    }
});
//# sourceMappingURL=invite-author.component.js.map
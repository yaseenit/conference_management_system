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
    var AssigReviewComponent;
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
            AssigReviewComponent = (function () {
                function AssigReviewComponent(_fb, _reviewerService, _routeParams) {
                    this._reviewerService = _reviewerService;
                    this._routeParams = _routeParams;
                    this.arrayIndex = 0;
                    this.PaperReviewers = [];
                    this.resultMessage = "";
                    this.messageType = "";
                    this.conferenceId = "";
                    this.form = _fb.group({
                        userName: ['', common_1.Validators.compose([validation_service_1.ValidationService.emailValidator, common_1.Validators.required])]
                    });
                }
                AssigReviewComponent.prototype.ngOnInit = function () {
                    if (this.PaperReviewers) {
                        this.submissionId = this._routeParams.get('id');
                        this.getReviewer(this.submissionId);
                    }
                };
                AssigReviewComponent.prototype.getReviewer = function (id) {
                    var _this = this;
                    this._reviewerService.getPaper(id).subscribe(function (respone) {
                        _this.PaperReviewers = respone.reviewers;
                        _this.conferenceId = respone.conferenceId;
                    }, function (error) {
                        _this.resultMessage = "Error , please try again later";
                        _this.messageType = "error";
                    });
                };
                AssigReviewComponent.prototype.assign = function (event, value) {
                    var _this = this;
                    this.messageType = "";
                    this.resultMessage = "";
                    event.preventDefault();
                    if (this.checkReviewer(value.userName)) {
                        this._reviewerService.assignReviewers(value.userName, this.submissionId, this.conferenceId).subscribe(function (response) {
                            _this.PaperReviewers = response.reviewers;
                            _this.resultMessage = "Reviewer Has been assigned";
                            _this.messageType = "success";
                            _this.clearForm();
                        }, function (error) {
                            if (error["message"] == null) {
                                _this.resultMessage = " please try again later";
                                _this.messageType = "error";
                            }
                            else {
                                _this.resultMessage = error["message"];
                                _this.messageType = "error";
                            }
                        });
                    }
                    else
                        this.errorMessage = 'reviewer email already assigned';
                };
                AssigReviewComponent.prototype.clearForm = function () {
                    for (var name in this.form.controls) {
                        this.form.controls[name].updateValue('');
                    }
                };
                AssigReviewComponent.prototype.checkReviewer = function (_userName) {
                    if (this.PaperReviewers) {
                        for (var i = 0; i < this.PaperReviewers.length; i++) {
                            if (this.PaperReviewers[i] == _userName)
                                return false;
                        }
                        return true;
                    }
                    else
                        return true;
                };
                AssigReviewComponent.prototype.removeReviewer = function (_userName) {
                    var _this = this;
                    this._reviewerService.removeReviewers(_userName, this.submissionId, this.conferenceId).subscribe(function (response) {
                        console.log(response);
                        _this.PaperReviewers = response.reviewers;
                        _this.resultMessage = "Reviewer Has been Removed";
                        _this.messageType = "success";
                        // this.clearForm()
                    }, function (error) {
                        if (error["message"] == null) {
                            _this.resultMessage = " please try again later";
                            _this.messageType = "error";
                        }
                        else {
                            _this.resultMessage = error["message"];
                            _this.messageType = "error";
                        }
                    });
                };
                AssigReviewComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/reviewers/assign-review.component.html',
                        directives: [router_2.ROUTER_DIRECTIVES, googleplace_directive_1.GoogleplaceDirective, control_message_component_1.ControlMessagesComponent, result_message_component_1.ResultMessagesComponent],
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, app_service_1.AppService, router_1.RouteParams])
                ], AssigReviewComponent);
                return AssigReviewComponent;
            }());
            exports_1("AssigReviewComponent", AssigReviewComponent);
        }
    }
});
//# sourceMappingURL=assign-review.component.js.map
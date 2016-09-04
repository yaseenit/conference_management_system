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
                    this.submissionId = 10;
                    this.resultMessage = "";
                    this.messageType = "";
                    this.form = _fb.group({
                        userName: ['', common_1.Validators.compose([validation_service_1.ValidationService.emailValidator, common_1.Validators.required])]
                    });
                }
                AssigReviewComponent.prototype.ngOnInit = function () {
                    if (this.PaperReviewers) {
                        this.submissionId = +this._routeParams.get('id');
                        this.getReviewer(this.submissionId);
                    }
                };
                AssigReviewComponent.prototype.getReviewer = function (id) {
                };
                AssigReviewComponent.prototype.assign = function (event, value) {
                    var _this = this;
                    this.messageType = "";
                    this.resultMessage = "";
                    event.preventDefault();
                    if (this.checkReviewer(value.userName)) {
                        this.PaperReviewers[this.arrayIndex] = value.userName;
                        this.arrayIndex++;
                        console.log(value.email);
                        // this.clearForm();
                        this._reviewerService.assignReviewers(value.userName, this.submissionId).subscribe(function (response) {
                            _this.resultMessage = "author Has been invited";
                            _this.messageType = "success";
                            console.log(response);
                        }, function (error) {
                            if (error["status"] == null) {
                                _this.resultMessage = "Error , please try again later";
                                _this.messageType = "error";
                            }
                            (function (error) { });
                        });
                    }
                    else
                        this.errorMessage = 'reviewer email already assigned';
                };
                AssigReviewComponent.prototype.clearForm = function () {
                    for (var name in this.form.controls) {
                        this.form.controls[name].updateValue("");
                        this.form.controls[name].touched = false;
                    }
                };
                AssigReviewComponent.prototype.checkReviewer = function (_userName) {
                    console.log(this.PaperReviewers.length);
                    for (var i = 0; i < this.PaperReviewers.length; i++) {
                        if (this.PaperReviewers[i] == _userName)
                            return false;
                    }
                    return true;
                };
                AssigReviewComponent.prototype.removeReviewer = function (_userName) {
                    for (var i = 0; i < this.PaperReviewers.length; i++) {
                        if (this.PaperReviewers[i] == _userName) {
                            this.PaperReviewers.splice(i, 1);
                            this.arrayIndex--;
                            console.log('delete item');
                        }
                    }
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
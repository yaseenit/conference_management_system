System.register(['angular2/core', 'angular2/router', '../service/app.service', '../service/app.interface', 'angular2/common', '../shared/control-message.component', '../shared/result-message.component', '../shared/rating.component'], function(exports_1, context_1) {
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
    var core_1, router_1, app_service_1, app_interface_1, router_2, common_1, control_message_component_1, result_message_component_1, rating_component_1;
    var ReviewDetailComponent;
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
            function (app_interface_1_1) {
                app_interface_1 = app_interface_1_1;
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
            function (rating_component_1_1) {
                rating_component_1 = rating_component_1_1;
            }],
        execute: function() {
            ReviewDetailComponent = (function () {
                function ReviewDetailComponent(_paperService, _routeParams, _router, _fb) {
                    this._paperService = _paperService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.imageWidth = 50;
                    this.imageHeight = 40;
                    this.isRatingReadonly = false;
                    this.maxRateValue = 5;
                    this.resultMessage = "";
                    this.messageType = "";
                    this.hasReview = false;
                }
                ;
                ReviewDetailComponent.prototype.resetRatingStar = function () {
                    this.overStar = null;
                };
                ReviewDetailComponent.prototype.resetRatingStarEva = function () {
                    this.overStarEvaluation = null;
                };
                ReviewDetailComponent.prototype.overStarEva = function (value) {
                    this.overStarEvaluation = value;
                    this.ratingPercentEvaluation = 100 * (value / this.maxRateValue);
                };
                ;
                //call this method when over a star
                ReviewDetailComponent.prototype.overStarDoSomething = function (value) {
                    this.overStar = value;
                    this.ratingPercent = 100 * (value / this.maxRateValue);
                };
                ;
                ReviewDetailComponent.prototype.ngOnInit = function () {
                    if (!this.paper) {
                        this.pageTitle = "Submission Review";
                        this.review = new app_interface_1.Review();
                        //   this.review.expertise = 1;
                        //    this.review.overallEvaluation = 1;
                        var id = this._routeParams.get('id');
                        this.getPaper(id);
                    }
                };
                ReviewDetailComponent.prototype.stringAsDate = function (dateStr) {
                    return new Date(dateStr);
                };
                ReviewDetailComponent.prototype.getFile = function (event, generatedFileName, fileName) {
                    event.preventDefault();
                    this._paperService.getFiles(generatedFileName, fileName);
                };
                ReviewDetailComponent.prototype.getPaper = function (id) {
                    var _this = this;
                    this._paperService.getPaper(id)
                        .subscribe(function (paper) {
                        _this.paper = paper;
                        _this.review.submissionId = paper.id;
                        _this.review.conferenceId = paper.conferenceId;
                        _this._paperService.getReview(paper.conferenceId, id).subscribe(function (rs) {
                            if (rs._id != null) {
                                _this.review = rs;
                                _this.hasReview = true;
                            }
                        });
                    }, function (error) { return _this.errorMessage = error; });
                };
                ReviewDetailComponent.prototype.onRatingClicked = function (message) {
                    //
                    console.log(message);
                };
                ReviewDetailComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/review/review-detail.component.html',
                        directives: [router_2.ROUTER_DIRECTIVES, control_message_component_1.ControlMessagesComponent, result_message_component_1.ResultMessagesComponent, rating_component_1.Rating]
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService, router_1.RouteParams, router_1.Router, common_1.FormBuilder])
                ], ReviewDetailComponent);
                return ReviewDetailComponent;
            }());
            exports_1("ReviewDetailComponent", ReviewDetailComponent);
        }
    }
});
//# sourceMappingURL=review-detail.component.js.map
System.register(['angular2/core', 'angular2/router', '../service/app.service', '../service/app.interface', 'angular2/common', '../shared/control-message.component', '../shared/star.component', '../shared/rating.component'], function(exports_1, context_1) {
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
    var core_1, router_1, app_service_1, app_interface_1, router_2, common_1, control_message_component_1, star_component_1, rating_component_1;
    var ReviewCreateComponent;
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
            function (star_component_1_1) {
                star_component_1 = star_component_1_1;
            },
            function (rating_component_1_1) {
                rating_component_1 = rating_component_1_1;
            }],
        execute: function() {
            ReviewCreateComponent = (function () {
                function ReviewCreateComponent(_paperService, _routeParams, _router, _fb) {
                    this._paperService = _paperService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.imageWidth = 50;
                    this.imageHeight = 40;
                    this.isRatingReadonly = false;
                    this.maxRateValue = 5;
                    this.reviewForm = _fb.group({
                        summary: ['', common_1.Validators.required],
                        strongPoints: ['', common_1.Validators.required],
                        weakPoints: ['', common_1.Validators.required],
                        detailedComments: ['', common_1.Validators.required],
                    });
                }
                ReviewCreateComponent.prototype.resetRatingStar = function () {
                    this.overStar = null;
                };
                //call this method when over a star
                ReviewCreateComponent.prototype.overStarDoSomething = function (value) {
                    this.overStar = value;
                    this.ratingPercent = 100 * (value / this.maxRateValue);
                };
                ;
                ReviewCreateComponent.prototype.ngOnInit = function () {
                    if (!this.paper) {
                        this.review = new app_interface_1.Review();
                        this.review.overallEvaluation = 1;
                        var id = this._routeParams.get('id');
                        this.getPaper(id);
                    }
                };
                ReviewCreateComponent.prototype.stringAsDate = function (dateStr) {
                    return new Date(dateStr);
                };
                ReviewCreateComponent.prototype.getFile = function (event, generatedFileName, fileName) {
                    event.preventDefault();
                    this._paperService.getFiles(generatedFileName, fileName);
                };
                ReviewCreateComponent.prototype.getPaper = function (id) {
                    var _this = this;
                    this._paperService.getPaper(id)
                        .subscribe(function (paper) { return _this.paper = paper; }, function (error) { return _this.errorMessage = error; });
                };
                ReviewCreateComponent.prototype.onRatingClicked = function (message) {
                    //
                    console.log(message);
                };
                ReviewCreateComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/review/review-create.component.html',
                        directives: [router_2.ROUTER_DIRECTIVES, control_message_component_1.ControlMessagesComponent, star_component_1.StarComponent, rating_component_1.Rating]
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService, router_1.RouteParams, router_1.Router, common_1.FormBuilder])
                ], ReviewCreateComponent);
                return ReviewCreateComponent;
            }());
            exports_1("ReviewCreateComponent", ReviewCreateComponent);
        }
    }
});
//# sourceMappingURL=review-create.component.js.map
System.register(['angular2/core', '../service/app.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, app_service_1, router_1, router_2;
    var ReviewListComponent;
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
            }],
        execute: function() {
            ReviewListComponent = (function () {
                function ReviewListComponent(_paperService, _routeParams) {
                    this._paperService = _paperService;
                    this._routeParams = _routeParams;
                    this.pageTitle = 'Assigned Papers for Review';
                    this.imageWidth = 50;
                    this.imageHeight = 40;
                }
                ReviewListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log('init page');
                    //this._paperService.getReviewList().subscribe(
                    this._paperService.getPapers().subscribe(function (rpapers) { return _this.rpapers = rpapers; }, function (error) { return _this.errorMessage = error; });
                };
                ReviewListComponent = __decorate([
                    core_1.Component({
                        selector: 'rv-papers',
                        templateUrl: 'app/review/review-list.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService, router_2.RouteParams])
                ], ReviewListComponent);
                return ReviewListComponent;
            }());
            exports_1("ReviewListComponent", ReviewListComponent);
        }
    }
});
//# sourceMappingURL=review-list.component.js.map
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
    var core_1, app_service_1, router_1;
    var PaperDetailComponent;
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
            }],
        execute: function() {
            PaperDetailComponent = (function () {
                function PaperDetailComponent(_paperService, _routeParams, _router) {
                    this._paperService = _paperService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.pageTitle = 'Paper Detail';
                    //  let id=+this._routeParams.get('id');
                    //  this.pageTitle += `: ${id}`;
                }
                PaperDetailComponent.prototype.ngOnInit = function () {
                    if (!this.paper) {
                        var id = +this._routeParams.get('id');
                        // this.pageTitle += `: ${id}`;
                        this.getPaper(id);
                    }
                };
                PaperDetailComponent.prototype.getPaper = function (id) {
                    var _this = this;
                    this._paperService.getPaper(id)
                        .subscribe(function (paper) { return _this.paper = paper; }, function (error) { return _this.errorMessage = error; });
                };
                PaperDetailComponent.prototype.onBack = function () {
                    this._router.navigate(['Papers']);
                };
                PaperDetailComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/papers/paper-detail.component.html'
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService, router_1.RouteParams, router_1.Router])
                ], PaperDetailComponent);
                return PaperDetailComponent;
            }());
            exports_1("PaperDetailComponent", PaperDetailComponent);
        }
    }
});
//# sourceMappingURL=paper-detail.component.js.map
System.register(['angular2/core', '../service/app.service', 'angular2/router', '../shared/result-message.component'], function(exports_1, context_1) {
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
    var core_1, app_service_1, router_1, router_2, result_message_component_1;
    var ReviewerPaperComponent;
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
            },
            function (result_message_component_1_1) {
                result_message_component_1 = result_message_component_1_1;
            }],
        execute: function() {
            ReviewerPaperComponent = (function () {
                function ReviewerPaperComponent(_paperService, _router, _routeParams) {
                    this._paperService = _paperService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.showFile = false;
                    this.listFilter = '';
                    this.resultMessage = "";
                    this.messageType = "";
                }
                ReviewerPaperComponent.prototype.toggleFile = function () {
                    this.showFile = !this.showFile;
                };
                ReviewerPaperComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log('init page');
                    this.pageTitle = 'Reviews';
                    this._paperService.getUserProfile().subscribe(function (response) {
                        _this.tasks = response.tasks.filter(function (tsk) {
                            return tsk.taskType.indexOf("reviewing") != -1;
                        });
                        if (_this.tasks.length == 0) {
                            _this.messageType = "alert";
                            _this.resultMessage = "there are no available any assigned submission for review";
                        }
                    }, function (error) {
                        _this.messageType = "error";
                        _this.resultMessage = error["message"];
                    });
                };
                ReviewerPaperComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/papers/reviewer-papers.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES, result_message_component_1.ResultMessagesComponent]
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService, router_2.Router, router_2.RouteParams])
                ], ReviewerPaperComponent);
                return ReviewerPaperComponent;
            }());
            exports_1("ReviewerPaperComponent", ReviewerPaperComponent);
        }
    }
});
//# sourceMappingURL=reviewer-papers.component.js.map
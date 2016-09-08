System.register(['angular2/core', 'angular2/router', '../service/app.service', '../service/app.interface', 'angular2/common', '../shared/control-message.component'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, app_service_1, app_interface_1, common_1, control_message_component_1;
    var PublicProfileComponent;
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
            }],
        execute: function() {
            PublicProfileComponent = (function () {
                function PublicProfileComponent(_fb, _profileService, _router, _routerParams) {
                    this._profileService = _profileService;
                    this._router = _router;
                    this._routerParams = _routerParams;
                    this.valid = false;
                    this.country = '';
                    this._user = new app_interface_1.User();
                }
                PublicProfileComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var username = this._routerParams.get('username');
                    this._profileService.getPublicProfile(username).subscribe(function (_userProfile) { return _this._user = _userProfile; });
                };
                PublicProfileComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/profile/public-profile.component.html',
                        directives: [router_2.ROUTER_DIRECTIVES, control_message_component_1.ControlMessagesComponent],
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, app_service_1.AppService, router_1.Router, router_1.RouteParams])
                ], PublicProfileComponent);
                return PublicProfileComponent;
            }());
            exports_1("PublicProfileComponent", PublicProfileComponent);
        }
    }
});
//# sourceMappingURL=public-profile.component.js.map
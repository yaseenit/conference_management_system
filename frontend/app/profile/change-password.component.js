System.register(['angular2/core', 'angular2/router', '../service/app.service', 'angular2/common', '../shared/control-message.component', '../service/validation.service', '../shared/result-message.component'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, app_service_1, common_1, control_message_component_1, validation_service_1, result_message_component_1;
    var ChangePasswordComponent;
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
            ChangePasswordComponent = (function () {
                function ChangePasswordComponent(_fb, _service, _router) {
                    this._service = _service;
                    this._router = _router;
                    this.valid = false;
                    this.resultMessage = "";
                    this.messageType = "";
                    this.form = _fb.group({
                        oldPassword: ['', common_1.Validators.compose([common_1.Validators.required, validation_service_1.ValidationService.passwordValidator])],
                        password: ['', common_1.Validators.compose([common_1.Validators.required, validation_service_1.ValidationService.passwordValidator])],
                        rePassword: ['', common_1.Validators.required]
                    }, { validator: validation_service_1.ValidationService.checkEqualPassword });
                }
                ChangePasswordComponent.prototype.changePassword = function (event, value) {
                    var _this = this;
                    event.preventDefault();
                    this._service.changePassword(value.password, value.oldPassword).subscribe(function (response) {
                        _this.resultMessage = "Your password has been changed";
                        _this.messageType = "success";
                    }, function (error) {
                        _this.resultMessage = error["_body"].message;
                        _this.messageType = "error";
                    });
                    console.log('presssss');
                };
                ChangePasswordComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/profile/change-password.component.html',
                        directives: [router_2.ROUTER_DIRECTIVES, control_message_component_1.ControlMessagesComponent, result_message_component_1.ResultMessagesComponent]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, app_service_1.AppService, router_1.Router])
                ], ChangePasswordComponent);
                return ChangePasswordComponent;
            }());
            exports_1("ChangePasswordComponent", ChangePasswordComponent);
        }
    }
});
//# sourceMappingURL=change-password.component.js.map
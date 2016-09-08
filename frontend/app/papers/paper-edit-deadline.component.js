System.register(['angular2/core', '../service/app.service', 'angular2/common', '../shared/control-message.component', '../shared/result-message.component', 'angular2/router', '../datepicker/datepicker'], function(exports_1, context_1) {
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
    var core_1, app_service_1, common_1, control_message_component_1, result_message_component_1, router_1, datepicker_1;
    var EditDeadLineComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
            function (result_message_component_1_1) {
                result_message_component_1 = result_message_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (datepicker_1_1) {
                datepicker_1 = datepicker_1_1;
            }],
        execute: function() {
            EditDeadLineComponent = (function () {
                function EditDeadLineComponent(_fb, _service, _router, _routeParams) {
                    this._service = _service;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.resultMessage = "";
                    this.messageType = "";
                    this.form = _fb.group({
                        deadline: ['', common_1.Validators.required]
                    });
                }
                EditDeadLineComponent.prototype.ngOnInit = function () {
                    this.minDate = new Date();
                    this.deadline = new Date();
                    this.id = this._routeParams.get('id');
                    this.conferenceId = this._routeParams.get('conferenceId');
                };
                EditDeadLineComponent.prototype.submit = function (event, value) {
                    var _this = this;
                    this._service.editDeadline(value.deadline, this.id, this.conferenceId).subscribe(function (response) {
                        console.log(response);
                        _this.resultMessage = "New conference has been created you can invite autho from ";
                        _this.messageType = "success";
                    }, function (error) {
                        _this.resultMessage = "Error , please try again later";
                        _this.messageType = "error";
                    });
                };
                EditDeadLineComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/papers/paper-edit-deadline.component.html',
                        directives: [control_message_component_1.ControlMessagesComponent, result_message_component_1.ResultMessagesComponent, datepicker_1.DatePicker]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, app_service_1.AppService, router_1.Router, router_1.RouteParams])
                ], EditDeadLineComponent);
                return EditDeadLineComponent;
            }());
            exports_1("EditDeadLineComponent", EditDeadLineComponent);
        }
    }
});
//# sourceMappingURL=paper-edit-deadline.component.js.map
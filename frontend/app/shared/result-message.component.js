System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var ResultMessagesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ResultMessagesComponent = (function () {
                function ResultMessagesComponent() {
                }
                Object.defineProperty(ResultMessagesComponent.prototype, "messageClass", {
                    get: function () {
                        if (this.messageType == "success")
                            return "alert alert-success fade i";
                        else if (this.messageType == "error")
                            return "alert alert-danger fade in";
                        else
                            return "alert alert-info fade in";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ResultMessagesComponent.prototype, "result", {
                    get: function () {
                        if (this.message != "")
                            return this.message;
                        else
                            return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ResultMessagesComponent.prototype, "essageType", {
                    get: function () {
                        if (this.messageType == "success")
                            return "success";
                        else if (this.messageType == "error")
                            return "error";
                        else
                            return "alert";
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ResultMessagesComponent.prototype, "message", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], ResultMessagesComponent.prototype, "messageType", void 0);
                ResultMessagesComponent = __decorate([
                    core_1.Component({
                        selector: 'result-messages',
                        template: " <div [ngClass]=\"messageClass\" *ngIf=\"result !== null\" class=\"alert alert-info fade in\" style=\"margin-top : 10px;\">\n        <a href=\"#\" class=\"close\" data-dismiss=\"alert\">&times;</a>\n        <strong>{{messageType}}!</strong> {{result}}.\n    </div><div ></div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], ResultMessagesComponent);
                return ResultMessagesComponent;
            }());
            exports_1("ResultMessagesComponent", ResultMessagesComponent);
        }
    }
});
//# sourceMappingURL=result-message.component.js.map
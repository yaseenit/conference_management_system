System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ValidationService;
    return {
        setters:[],
        execute: function() {
            ValidationService = (function () {
                function ValidationService() {
                }
                ValidationService.getValidatorErrorMessage = function (validatorName, validatorValue) {
                    var config = {
                        'required': 'Required',
                        'invalidEmailAddress': 'Invalid email address',
                        'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
                        'minlength': "Minimum length " + validatorValue.requiredLength,
                        'passwordNotMatch': 'Password not match',
                        'invalidFileFormat': 'Invalid File Format - Select only files with .pdf extension'
                    };
                    return config[validatorName];
                };
                ValidationService.emailValidator = function (control) {
                    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
                        return null;
                    }
                    else {
                        return { 'invalidEmailAddress': true };
                    }
                };
                ValidationService.passwordValidator = function (control) {
                    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
                        return null;
                    }
                    else {
                        return { 'invalidPassword': true };
                    }
                };
                ValidationService.fileValidator = function (control) {
                    if (control.value.match(/^.+\.([pP][dD][fF])$/)) {
                        return null;
                    }
                    else {
                        return { 'invalidFileFormat': true };
                    }
                };
                ValidationService.checkEqualPassword = function (group) {
                    if (group.controls['password'].value != group.controls['rePassword'].value) {
                        return {
                            passwordNotMatch: true
                        };
                    }
                    else
                        return null;
                };
                return ValidationService;
            }());
            exports_1("ValidationService", ValidationService);
        }
    }
});
//# sourceMappingURL=validation.service.js.map
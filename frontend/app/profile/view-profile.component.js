System.register(['angular2/core', 'angular2/router', '../service/app.service', '../service/app.interface', '../directives/googleplace.directive', 'angular2/common', '../shared/control-message.component', '../service/validation.service'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, app_service_1, app_interface_1, googleplace_directive_1, common_1, control_message_component_1, validation_service_1;
    var ViewProfileComponent;
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
            function (googleplace_directive_1_1) {
                googleplace_directive_1 = googleplace_directive_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (control_message_component_1_1) {
                control_message_component_1 = control_message_component_1_1;
            },
            function (validation_service_1_1) {
                validation_service_1 = validation_service_1_1;
            }],
        execute: function() {
            ViewProfileComponent = (function () {
                function ViewProfileComponent(_fb, _profileService, _router) {
                    this._profileService = _profileService;
                    this._router = _router;
                    this.valid = false;
                    this.country = '';
                    this._user = new app_interface_1.User();
                    this.form = _fb.group({
                        givenName: ['', common_1.Validators.required],
                        familyName: ['', common_1.Validators.required],
                        institute: ['', common_1.Validators.required],
                        email: ['', common_1.Validators.compose([validation_service_1.ValidationService.emailValidator, common_1.Validators.required])],
                        address: ['', common_1.Validators.required],
                        country: [''],
                        city: [''],
                        state: [''],
                        zipCode: ['']
                    });
                }
                ViewProfileComponent.prototype.update = function (event, value) {
                    event.preventDefault();
                    this._user = new app_interface_1.User();
                    this._user.address = value.address;
                    this._user.city = value.city;
                    this._user.country = value.country;
                    this._user.username = value.email;
                    this._user.familyName = value.familyName;
                    this._user.givenName = value.givenName;
                    this._user.institute = value.institute;
                    this._user.password = value.password;
                    this._user.state = value.state;
                    this._user.zipCode = value.zipCode;
                    this._profileService.updateProfile(this._user);
                    console.log('presssss');
                };
                ViewProfileComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log('init page');
                    this._profileService.getUserProfile().subscribe(function (_userProfile) { return _this._user = _userProfile; });
                    this.address = this._user.address;
                };
                ViewProfileComponent.prototype.getAddress = function (place) {
                    this.address = place['formatted_address'];
                    var location = place['geometry']['location'];
                    var lat = location.lat();
                    var lng = location.lng();
                    console.log("Address Object", place);
                    console.log(place['address_components'][0].long_name);
                    //this._user.address =place['address_components'][0].long_name;
                    for (var i = 0; i < place['address_components'].length; i++) {
                        var addressType = place['address_components'][i].types[0];
                        if (addressType == "country") {
                            this.form.controls["country"].updateValue(place['address_components'][i].long_name);
                        }
                        if (addressType == "administrative_area_level_1") {
                            this.form.controls["state"].updateValue(place['address_components'][i].long_name);
                        }
                        if (addressType == "postal_code") {
                            this.form.controls["zipCode"].updateValue(place['address_components'][i].long_name);
                        }
                        if (addressType == "locality") {
                            this.form.controls["city"].updateValue(place['address_components'][i].long_name);
                        }
                    }
                };
                ViewProfileComponent.prototype.EditProfile = function () {
                    this._router.navigate(['EditProfile']);
                };
                ViewProfileComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/profile/view-profile.component.html',
                        directives: [router_2.ROUTER_DIRECTIVES, googleplace_directive_1.GoogleplaceDirective, control_message_component_1.ControlMessagesComponent],
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, app_service_1.AppService, router_1.Router])
                ], ViewProfileComponent);
                return ViewProfileComponent;
            }());
            exports_1("ViewProfileComponent", ViewProfileComponent);
        }
    }
});
//# sourceMappingURL=view-profile.component.js.map
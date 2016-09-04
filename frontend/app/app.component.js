System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', 'rxjs/add/operator/map', 'angular2/router', 'angular2/common', './papers/paper-list.component', './papers/paper-detail.component', './papers/paper-create.component', './review/review-list.component', './review/review-detail.component', './home/welcome.component', './login/login.component', './signup/signup.component', './reviewers/assign-review.component', './authors/invit-author.component', './service/app.service', './service/validation.service', './profile/edit-profile.component', './shared/control-message.component', './shared/result-message.component', './profile/view-profile.component', './profile/change-password.component', "./service/confirm.service", "./shared/confirm.component", "./conference/create-conference.component"], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, common_1, paper_list_component_1, paper_detail_component_1, paper_create_component_1, review_list_component_1, review_detail_component_1, welcome_component_1, login_component_1, signup_component_1, assign_review_component_1, invit_author_component_1, app_service_1, validation_service_1, edit_profile_component_1, control_message_component_1, result_message_component_1, view_profile_component_1, change_password_component_1, router_2, confirm_service_1, confirm_component_1, create_conference_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (paper_list_component_1_1) {
                paper_list_component_1 = paper_list_component_1_1;
            },
            function (paper_detail_component_1_1) {
                paper_detail_component_1 = paper_detail_component_1_1;
            },
            function (paper_create_component_1_1) {
                paper_create_component_1 = paper_create_component_1_1;
            },
            function (review_list_component_1_1) {
                review_list_component_1 = review_list_component_1_1;
            },
            function (review_detail_component_1_1) {
                review_detail_component_1 = review_detail_component_1_1;
            },
            function (welcome_component_1_1) {
                welcome_component_1 = welcome_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (signup_component_1_1) {
                signup_component_1 = signup_component_1_1;
            },
            function (assign_review_component_1_1) {
                assign_review_component_1 = assign_review_component_1_1;
            },
            function (invit_author_component_1_1) {
                invit_author_component_1 = invit_author_component_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (validation_service_1_1) {
                validation_service_1 = validation_service_1_1;
            },
            function (edit_profile_component_1_1) {
                edit_profile_component_1 = edit_profile_component_1_1;
            },
            function (control_message_component_1_1) {
                control_message_component_1 = control_message_component_1_1;
            },
            function (result_message_component_1_1) {
                result_message_component_1 = result_message_component_1_1;
            },
            function (view_profile_component_1_1) {
                view_profile_component_1 = view_profile_component_1_1;
            },
            function (change_password_component_1_1) {
                change_password_component_1 = change_password_component_1_1;
            },
            function (confirm_service_1_1) {
                confirm_service_1 = confirm_service_1_1;
            },
            function (confirm_component_1_1) {
                confirm_component_1 = confirm_component_1_1;
            },
            function (create_conference_component_1_1) {
                create_conference_component_1 = create_conference_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                //
                function AppComponent(_logInService, fb, _router, _confirmService) {
                    this._logInService = _logInService;
                    this._router = _router;
                    this._confirmService = _confirmService;
                    this.pageTitle = "Conference Mangment";
                    this.resultMessage = "";
                    this.messageType = "";
                    this.isActive = false;
                    this.form = fb.group({
                        email: ['', common_1.Validators.compose([validation_service_1.ValidationService.emailValidator, common_1.Validators.required])],
                        password: ['', common_1.Validators.required]
                    });
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.messageType = "";
                    this.resultMessage = "";
                    this.isLog = this._logInService.isLog();
                    if (this.isLog)
                        this.currentUser = this._logInService.getCurrentUserEmail();
                    console.log(this.currentUser);
                    //   componentHandler.upgradeDom();
                };
                AppComponent.prototype.removeProfile = function (event) {
                    event.preventDefault();
                    this._confirmService.activate("Are you sure to remove your Profile?")
                        .then(function (res) {
                        if (res)
                            console.log("Confirmed: " + res);
                        else
                            console.log("NOOOOOOOOOOOOOOOOOOOOOOOO");
                    });
                };
                AppComponent.prototype.logOut = function () {
                    this._logInService.logout();
                };
                AppComponent.prototype.toggledClass = function (event) {
                    event.preventDefault();
                    this.isActive = !this.isActive;
                };
                AppComponent.prototype.login = function (event, value) {
                    var _this = this;
                    this.messageType = "";
                    this.resultMessage = "";
                    event.preventDefault();
                    this._logInService.login(value.email, value.password).subscribe(function (loginResponse) {
                        console.log(loginResponse);
                        if (loginResponse["token"] != null) {
                            if (loginResponse["user"].is_confirmed == false) {
                                _this.resultMessage = "please check your email for activation link";
                                _this.messageType = "error";
                            }
                            else {
                                localStorage.setItem('token', loginResponse["token"]);
                                localStorage.setItem('username', loginResponse["user"].username);
                                _this.isLog = _this._logInService.isLog();
                                _this.currentUser = _this._logInService.getCurrentUserEmail();
                            }
                        }
                        else {
                            _this.resultMessage = loginResponse["message"];
                            _this.messageType = "error";
                        }
                    }, function (error) {
                        _this.resultMessage = error["message"];
                        _this.messageType = "error";
                        _this.loginError = error;
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'pm-app',
                        templateUrl: 'app/app.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES, control_message_component_1.ControlMessagesComponent, result_message_component_1.ResultMessagesComponent, confirm_component_1.ConfirmComponent],
                        providers: [app_service_1.AppService, http_1.JSONP_PROVIDERS, validation_service_1.ValidationService,
                            http_1.HTTP_PROVIDERS,
                            router_1.ROUTER_PROVIDERS, confirm_service_1.ConfirmService]
                    }),
                    router_1.RouteConfig([
                        { path: '/welcome', name: 'Welcome', component: welcome_component_1.WelcomeComponent, useAsDefault: true },
                        { path: '/papers', name: 'Papers', component: paper_list_component_1.PaperListComponent },
                        { path: '/paper/:_id', name: 'PaperDetail', component: paper_detail_component_1.PaperDetailComponent },
                        { path: '/login', name: 'LogIn', component: login_component_1.LogInComponent },
                        { path: '/papercreate', name: 'PaperCreate', component: paper_create_component_1.PaperCreateComponent },
                        //for review
                        { path: '/review', name: 'Review', component: review_list_component_1.ReviewListComponent },
                        { path: '/review/:id', name: 'ReviewDetail', component: review_detail_component_1.ReviewDetailComponent },
                        //
                        { path: '/signup', name: 'SignUp', component: signup_component_1.SignUpComponent },
                        { path: '/editProfile', name: 'EditProfile', component: edit_profile_component_1.EditProfileComponent },
                        { path: '/viewProfile', name: 'ViewProfile', component: view_profile_component_1.ViewProfileComponent },
                        { path: '/assignReview/:id', name: 'AssigReview', component: assign_review_component_1.AssigReviewComponent },
                        { path: '/invitAuthor/:id', name: 'InvitAuthor', component: invit_author_component_1.InvitAuthorComponent },
                        { path: '/changePassword', name: 'ChangePassword', component: change_password_component_1.ChangePasswordComponent },
                        { path: '/createconference', name: 'CreateConference', component: create_conference_component_1.CreateConferenceComponent }
                    ]), 
                    __metadata('design:paramtypes', [app_service_1.AppService, common_1.FormBuilder, router_2.Router, confirm_service_1.ConfirmService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map
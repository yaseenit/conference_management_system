System.register(['angular2/core', 'angular2/router', '../service/app.service', '../service/app.interface', 'angular2/common', '../shared/control-message.component', '../service/validation.service', '../shared/result-message.component'], function(exports_1, context_1) {
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
    var core_1, router_1, app_service_1, app_interface_1, common_1, control_message_component_1, validation_service_1, result_message_component_1;
    var PaperCreateComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
            },
            function (validation_service_1_1) {
                validation_service_1 = validation_service_1_1;
            },
            function (result_message_component_1_1) {
                result_message_component_1 = result_message_component_1_1;
            }],
        execute: function() {
            PaperCreateComponent = (function () {
                function PaperCreateComponent(fb, kf, ff, _Element, _paperService, _routeParams) {
                    this._paperService = _paperService;
                    this._routeParams = _routeParams;
                    this.paperAuthors = [];
                    this.keywords = [];
                    this.arrayIndex = 0;
                    this.arrayIndexKeyword = 0;
                    this.keyword = '';
                    this.query = '';
                    this.resultMessage = "";
                    this.messageType = "";
                    this.checkKey = true;
                    this.elementRef = _Element;
                    this.selectedIdx = -1;
                    this.keywordForm = kf.group({
                        keyword: ['', common_1.Validators.required]
                    });
                    this.fileForm = ff.group({
                        abstract: ['', common_1.Validators.required],
                        attFile: [''],
                        title: ['', common_1.Validators.required]
                    });
                    this.authorForm = fb.group({
                        email: ['', common_1.Validators.compose([validation_service_1.ValidationService.emailValidator, common_1.Validators.required])],
                        givenName: ['', common_1.Validators.required],
                        familyName: ['', common_1.Validators.required]
                    });
                }
                PaperCreateComponent.prototype.ngOnInit = function () {
                    this.conferenceId = this._routeParams.get('id');
                };
                PaperCreateComponent.prototype.addAuthor = function (event, value) {
                    event.preventDefault();
                    if (this.checkAuthor(value.email)) {
                        this.paperAuthors[this.arrayIndex] = new app_interface_1.PaperAuthor(value.givenName, value.familyName, value.email);
                        this.arrayIndex++;
                        console.log(value.email);
                        this.clearAuthorForm();
                    }
                    else
                        this.errorMessage = 'Email Address already exists';
                    this.checkKey = false;
                };
                PaperCreateComponent.prototype.clearAuthorForm = function () {
                    for (var name in this.authorForm.controls) {
                        this.authorForm.controls[name].updateValue("");
                        //this.authorForm.controls[name].setErrors(null);
                        this.checkKey = true;
                        this.errorMessage = '';
                    }
                };
                PaperCreateComponent.prototype.checkAuthor = function (email) {
                    for (var i = 0; i < this.paperAuthors.length; i++) {
                        if (this.paperAuthors[i].email == email)
                            return false;
                    }
                    return true;
                };
                PaperCreateComponent.prototype.removeAuthor = function (email) {
                    console.log(this.paperAuthors.length);
                    for (var i = 0; i < this.paperAuthors.length; i++) {
                        if (this.paperAuthors[i].email == email) {
                            this.paperAuthors.splice(i, 1);
                            this.arrayIndex--;
                            console.log('delete item');
                        }
                    }
                    console.log(this.paperAuthors.length);
                };
                // end author
                //keyword bll
                PaperCreateComponent.prototype.addkeyword = function (event, value) {
                    event.preventDefault();
                    if (this.checkKeyword(value.keyword)) {
                        this.keywords[this.arrayIndexKeyword] = value.keyword;
                        this.arrayIndexKeyword++;
                        console.log(value.email);
                        this.clearKeywordForm();
                    }
                    else
                        this.errorMessage = 'Keyword already exists';
                    this.checkKey = false;
                };
                PaperCreateComponent.prototype.clearKeywordForm = function () {
                    for (var name_1 in this.keywordForm.controls) {
                        this.keywordForm.controls[name_1].updateValue('');
                        //this.keywordForm.controls[name].setErrors(null);
                        this.checkKey = true;
                        this.errorMessage = '';
                    }
                };
                PaperCreateComponent.prototype.checkKeyword = function (_keyword) {
                    for (var i = 0; i < this.keywords.length; i++) {
                        if (this.keywords[i] == _keyword)
                            return false;
                    }
                    return true;
                };
                PaperCreateComponent.prototype.removeKeyword = function (_keyword) {
                    console.log(this.keywords.length);
                    for (var i = 0; i < this.keywords.length; i++) {
                        if (this.keywords[i] == _keyword) {
                            this.keywords.splice(i, 1);
                            this.arrayIndexKeyword--;
                            console.log('delete item');
                        }
                    }
                    console.log(this.keywords.length);
                };
                //end 
                PaperCreateComponent.prototype.search = function (_keyword) {
                    var _this = this;
                    this._paperService.searchWiki(this.keyword).subscribe(function (filteredList) { return _this.filteredList = filteredList; }, function (error) { return _this.errorMessage = error; });
                };
                PaperCreateComponent.prototype.select = function (item) {
                    console.log(item);
                    this.keyword = item;
                    this.filteredList = null;
                    this.selectedIdx = -1;
                };
                PaperCreateComponent.prototype.onChange = function (event) {
                    console.log('onChange');
                    this.files = event.srcElement.files;
                    console.log(this.files);
                    //this.files[0].name;
                    if (this.files) {
                        if (validation_service_1.ValidationService.fileValidator(this.files[0].name)) {
                            this.resultMessage = "file extention should be pdf";
                            this.messageType = "error";
                        }
                    }
                };
                PaperCreateComponent.prototype.create = function (event, value) {
                    event.preventDefault();
                    this.paper = new app_interface_1.Paper();
                    this.paper.authorList = [];
                    this.paper.authorList = this.paperAuthors;
                    this.paper.keywords = this.keywords;
                    this.paper.abstract = value.abstract;
                    this.paper.title = value.title;
                    this.paper.conferenceId = this.conferenceId;
                    var check = true;
                    if (this.paperAuthors.length <= 0) {
                        this.resultMessage = "Please add the Authors";
                        this.messageType = "error";
                        check = false;
                        return;
                    }
                    console.log(this.keywords.length);
                    if (this.paper.keywords.length <= 0) {
                        this.resultMessage = "Please add the Keywords";
                        this.messageType = "error";
                        check = false;
                        return;
                    }
                    if (!this.files) {
                        this.resultMessage = "Please choose file";
                        this.messageType = "error";
                        check = false;
                        return;
                    }
                    if (check) {
                        try {
                            this._paperService.paperSubmission(this.paper, this.files);
                            this.resultMessage = "Paper has been submitted Successfully";
                            this.messageType = "success";
                        }
                        catch (err) {
                            this.resultMessage = "An error ,please try again later";
                            this.messageType = "error";
                        }
                    }
                };
                PaperCreateComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/papers/paper-create.component.html',
                        directives: [result_message_component_1.ResultMessagesComponent, control_message_component_1.ControlMessagesComponent]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, common_1.FormBuilder, common_1.FormBuilder, core_1.ElementRef, app_service_1.AppService, router_1.RouteParams])
                ], PaperCreateComponent);
                return PaperCreateComponent;
            }());
            exports_1("PaperCreateComponent", PaperCreateComponent);
        }
    }
});
//# sourceMappingURL=edit-paper.component.js.map
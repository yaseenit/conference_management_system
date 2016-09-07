System.register(['angular2/core', 'angular2/router', '../service/app.service', 'angular2/common', './review-detail.pipe'], function(exports_1, context_1) {
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
    var core_1, router_1, app_service_1, common_1, review_detail_pipe_1, common_2;
    var Expertise, Evaluation, ReviewDetailComponent;
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
            function (common_1_1) {
                common_1 = common_1_1;
                common_2 = common_1_1;
            },
            function (review_detail_pipe_1_1) {
                review_detail_pipe_1 = review_detail_pipe_1_1;
            }],
        execute: function() {
            //import {NgbButtonCheckbox, NgbButtonRadio} from '../service/button';
            (function (Expertise) {
                Expertise[Expertise["notFamiliar"] = 1] = "notFamiliar";
                Expertise[Expertise["low"] = 2] = "low";
                Expertise[Expertise["moderate"] = 3] = "moderate";
                Expertise[Expertise["high"] = 4] = "high";
                Expertise[Expertise["expert"] = 5] = "expert";
            })(Expertise || (Expertise = {}));
            exports_1("Expertise", Expertise);
            (function (Evaluation) {
                Evaluation[Evaluation["strongReject"] = 1] = "strongReject";
                Evaluation[Evaluation["reject"] = 2] = "reject";
                Evaluation[Evaluation["borderlinePaper"] = 3] = "borderlinePaper";
                Evaluation[Evaluation["accept"] = 4] = "accept";
                Evaluation[Evaluation["strongAccept"] = 5] = "strongAccept";
            })(Evaluation || (Evaluation = {}));
            exports_1("Evaluation", Evaluation);
            ReviewDetailComponent = (function () {
                function ReviewDetailComponent(_reviewService, _routeParams, _router, fb) {
                    this._reviewService = _reviewService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.pageTitle = 'Paper Detail for Review';
                    this.arrayIndex = 0;
                    this.reviewForm = fb.group({
                        expertise: ['', common_1.Validators.required],
                        evaluation: ['', common_1.Validators.required],
                        expertiseReview: ['', common_1.Validators.required],
                        evaluationReview: ['', common_1.Validators.required],
                        summary: ['', common_1.Validators.required],
                        strongPoints: ['', common_1.Validators.required],
                        weakPoints: ['', common_1.Validators.required],
                        comments: ['', common_1.Validators.required]
                    });
                    this.expertiseReview = { val: "" };
                    this.evaluationReview = { eval: "" };
                    var id = +this._routeParams.get('id');
                    this.pageTitle += ": " + id;
                }
                ReviewDetailComponent.prototype.ngOnInit = function () {
                    if (!this.paper) {
                        var id = +this._routeParams.get('id');
                        // this.pageTitle += `: ${id}`;
                        this.getPaper(id);
                    }
                };
                ReviewDetailComponent.prototype.checkEdit = function () {
                    if (this.paper.status == "complete")
                        return true;
                    else
                        return false;
                };
                ReviewDetailComponent.prototype.getPaper = function (id) {
                    var _this = this;
                    this._reviewService.getReview(id)
                        .subscribe(
                    //   paper => this.paper = paper,
                    function (error) { return _this.errorMessage = error; });
                };
                /* getReviews(id: number) {
                     this._reviewService.getReview(id)
             
                         .subscribe(
                         reviewEdit => this.reviewEdit = reviewEdit,
                         error => this.errorMessage = <any>error);
                 }*/
                // used for Get and Post
                ReviewDetailComponent.prototype.addReviews = function (event, value) {
                    event.preventDefault();
                    var id = +this._routeParams.get('id');
                    this._reviewService.addReview(id, this.expertiseReview.val, this.evaluationReview.eval, value.summary, value.strongPoints, value.weakPoints, value.comments),
                        function (error) { return console.log("Error HTTP Post Service"); },
                        console.log("Job Done Post !");
                };
                ReviewDetailComponent.prototype.onBack = function () {
                    this._router.navigate(['Review']);
                };
                ReviewDetailComponent.prototype.onReview = function () {
                    this._router.navigate(['ReviewCreate', { id: this.paper.id }]);
                };
                ReviewDetailComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/review/review-detail.component.html',
                        pipes: [review_detail_pipe_1.KeysPipe],
                        directives: [common_2.NgSwitch, common_2.NgSwitchWhen, common_2.NgSwitchDefault]
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService, router_1.RouteParams, router_1.Router, common_1.FormBuilder])
                ], ReviewDetailComponent);
                return ReviewDetailComponent;
            }());
            exports_1("ReviewDetailComponent", ReviewDetailComponent);
        }
    }
});
//# sourceMappingURL=review-detail.component.js.map
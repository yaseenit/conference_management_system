System.register(['angular2/core', './paper-filter.pipe', '../shared/star.component', '../service/app.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, paper_filter_pipe_1, star_component_1, app_service_1, router_1;
    var PaperListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (paper_filter_pipe_1_1) {
                paper_filter_pipe_1 = paper_filter_pipe_1_1;
            },
            function (star_component_1_1) {
                star_component_1 = star_component_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            PaperListComponent = (function () {
                function PaperListComponent(_paperService) {
                    this._paperService = _paperService;
                    this.pageTitle = 'Paper List';
                    this.imageWidth = 50;
                    this.imageHeight = 40;
                    this.showFile = false;
                    this.listFilter = '';
                }
                PaperListComponent.prototype.toggleFile = function () {
                    this.showFile = !this.showFile;
                };
                PaperListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log('init page');
                    // this._paperService.getFile();
                    this._paperService.getPapers().subscribe(function (papers) { return _this.papers = papers; }, function (error) { return _this.errorMessage = error; });
                };
                PaperListComponent.prototype.getFile = function (event, generatedFileName, fileName) {
                    event.preventDefault();
                    this._paperService.getFiles(generatedFileName, fileName);
                };
                PaperListComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/papers/user-paper-list.component.html',
                        pipes: [paper_filter_pipe_1.PaperFilterPipe],
                        directives: [star_component_1.StarComponent, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService])
                ], PaperListComponent);
                return PaperListComponent;
            }());
            exports_1("PaperListComponent", PaperListComponent);
        }
    }
});
//# sourceMappingURL=user-paper-list.component.js.map
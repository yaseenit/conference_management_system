System.register(['angular2/core', '../service/app.service', '../directives/google-chart.directive'], function(exports_1, context_1) {
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
    var core_1, app_service_1, google_chart_directive_1;
    var ChartComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (google_chart_directive_1_1) {
                google_chart_directive_1 = google_chart_directive_1_1;
            }],
        execute: function() {
            ChartComponent = (function () {
                function ChartComponent(_service) {
                    this._service = _service;
                    this.conferences = [];
                    this.timeline_ChartOptions = {
                        title: 'Conference Timeline',
                        height: 180
                    };
                    this.pie_ChartOptions = {
                        title: 'My Submissions',
                        width: 900,
                        height: 500
                    };
                    this.column_ChartOptions = {
                        title: 'Number of Users based on Countries',
                        chartArea: { width: '50%' },
                        hAxis: {
                            title: 'Countries',
                            textStyle: {
                                bold: true,
                                fontSize: 14,
                                color: '#848484'
                            },
                            titleTextStyle: {
                                bold: true,
                                fontSize: 14,
                                color: '#848484'
                            }
                        },
                        vAxis: {
                            title: 'Users',
                            minValue: 0,
                            textStyle: {
                                fontSize: 12,
                                bold: true,
                                color: '#4d4d4d'
                            },
                            titleTextStyle: {
                                fontSize: 18,
                                bold: true,
                                color: '#4d4d4d'
                            }
                        }
                    };
                    this.bar_ChartOptions = {
                        title: 'Number of Papers based on Topics',
                        chartArea: { width: '50%' },
                        hAxis: {
                            title: 'Papers',
                            minValue: 0,
                            textStyle: {
                                bold: true,
                                fontSize: 12,
                                color: '#4d4d4d'
                            },
                            titleTextStyle: {
                                bold: true,
                                fontSize: 18,
                                color: '#4d4d4d'
                            }
                        },
                        vAxis: {
                            title: 'Topics',
                            textStyle: {
                                fontSize: 14,
                                bold: true,
                                color: '#848484'
                            },
                            titleTextStyle: {
                                fontSize: 14,
                                bold: true,
                                color: '#848484'
                            }
                        }
                    };
                }
                ChartComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.pageTitle = "Charts";
                    this._service.getUserConference().subscribe(function (response) {
                        _this.conferences = response["conferences"];
                    }, function (error) { return _this.errorMessage = error; });
                    this._service.getStatusChart().subscribe(function (statusChartData) { return _this.statusChartData = statusChartData; }, function (error) { return _this.errorMessage = error; });
                    this._service.getTopicChart().subscribe(function (topicChartData) { return _this.topicChartData = topicChartData; }, function (error) { return _this.errorMessage = error; });
                    this._service.getReportChart().subscribe(function (userChartData) { return _this.userChartData = userChartData; }, function (error) { return _this.errorMessage = error; });
                };
                //timeline starts
                ChartComponent.prototype.setTimelineChart = function (conferences) {
                    var timelineChartData;
                    timelineChartData = [['Conference', 'Start', 'End']];
                    for (var i = 0; i < conferences.length; i++) {
                        timelineChartData[i + 1] = [conferences[i].title, this.stringToDate(conferences[i].startdate.toString()), this.stringToDate(conferences[i].enddate.toString())];
                    }
                    return timelineChartData;
                };
                ChartComponent.prototype.stringToDate = function (v) {
                    var actualParsedDate = v ? new Date(v) : new Date();
                    var normalizedParsedDate = new Date(actualParsedDate.getTime() + (actualParsedDate.getTimezoneOffset() * 60000));
                    return normalizedParsedDate;
                };
                //timeline ends
                //piechart starts
                ChartComponent.prototype.setStatusChart = function (statusChartData) {
                    return [
                        ['Status', 'Total'],
                        ['Incompleted', this.getStatusCount(statusChartData, 'incompleted')],
                        ['Completed', this.getStatusCount(statusChartData, 'completed')],
                        ['Closed', this.getStatusCount(statusChartData, 'closed')],
                        ['Accepted', this.getStatusCount(statusChartData, 'accepted')],
                        ['Rejected', this.getStatusCount(statusChartData, 'rejected')]];
                };
                ChartComponent.prototype.getStatusCount = function (statusChartData, status) {
                    for (var i = 0; i < statusChartData.length; i++) {
                        if (statusChartData[i].status === status) {
                            return statusChartData[i].counter;
                        }
                        else {
                            return 0;
                        }
                    }
                };
                //piechart ends
                //column chart starts
                ChartComponent.prototype.setCountryChart = function (userChartData) {
                    var columnChartData;
                    columnChartData = [
                        ['Country', 'Users']];
                    for (var i = 0; i < userChartData.length; i++) {
                        columnChartData[i + 1] = [userChartData[i]._id.country, userChartData[i].count];
                    }
                    return columnChartData;
                };
                //column chart ends
                //bar chart starts 
                ChartComponent.prototype.setTopicChart = function (topicChartData) {
                    var barChartData;
                    barChartData = [['Topic', 'Papers']];
                    for (var i = 0; i < topicChartData.length; i++) {
                        barChartData[i + 1] = [topicChartData[i].keywords.toString(), topicChartData[i].counter];
                    }
                    return barChartData;
                };
                ChartComponent = __decorate([
                    core_1.Component({
                        selector: 'chart-app',
                        directives: [google_chart_directive_1.GoogleChart],
                        templateUrl: 'app/chart/chart.component.html'
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService])
                ], ChartComponent);
                return ChartComponent;
            }());
            exports_1("ChartComponent", ChartComponent);
        }
    }
});
//# sourceMappingURL=chart.component.js.map
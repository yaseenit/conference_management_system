System.register(['angular2/core', 'angular2/common', './datepicker-container'], function(exports_1, context_1) {
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
    var core_1, common_1, datepicker_container_1;
    var MonthPicker;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (datepicker_container_1_1) {
                datepicker_container_1 = datepicker_container_1_1;
            }],
        execute: function() {
            MonthPicker = (function () {
                function MonthPicker(datePicker) {
                    this.datePicker = datePicker;
                    this.rows = [];
                }
                MonthPicker.prototype.ngOnInit = function () {
                    var self = this;
                    this.datePicker.stepMonth = { years: 1 };
                    this.datePicker.setRefreshViewHandler(function () {
                        var months = new Array(12);
                        var year = this.activeDate.getFullYear();
                        var date;
                        for (var i = 0; i < 12; i++) {
                            date = new Date(year, i, 1);
                            this.fixTimeZone(date);
                            months[i] = this.createDateObject(date, this.formatMonth);
                            months[i].uid = this.uniqueId + '-' + i;
                        }
                        self.title = this.dateFilter(this.activeDate, this.formatMonthTitle);
                        self.rows = this.split(months, 3);
                    }, 'month');
                    this.datePicker.setCompareHandler(function (date1, date2) {
                        var d1 = new Date(date1.getFullYear(), date1.getMonth());
                        var d2 = new Date(date2.getFullYear(), date2.getMonth());
                        return d1.getTime() - d2.getTime();
                    }, 'month');
                    this.datePicker.refreshView();
                };
                MonthPicker = __decorate([
                    core_1.Component({
                        selector: 'monthpicker, [monthpicker]',
                        template: "\n                <table [hidden]=\"datePicker.datepickerMode!=='month'\" role=\"grid\">\n                  <thead>\n                    <tr>\n                      <th>\n                        <button type=\"button\" class=\"btn btn-default btn-sm pull-left\"\n                                (click)=\"datePicker.move(-1)\" tabindex=\"-1\">\n                          <i class=\"glyphicon glyphicon-chevron-left\"></i>\n                        </button></th>\n                      <th>\n                        <button [id]=\"uniqueId + '-title'\"\n                                type=\"button\" class=\"btn btn-default btn-sm\"\n                                (click)=\"datePicker.toggleMode()\"\n                                [disabled]=\"datePicker.datepickerMode === maxMode\"\n                                [ngClass]=\"{disabled: datePicker.datepickerMode === maxMode}\" tabindex=\"-1\" style=\"width:100%;\">\n                          <strong>{{title}}</strong>\n                        </button>\n                      </th>\n                      <th>\n                        <button type=\"button\" class=\"btn btn-default btn-sm pull-right\"\n                                (click)=\"datePicker.move(1)\" tabindex=\"-1\">\n                          <i class=\"glyphicon glyphicon-chevron-right\"></i>\n                        </button>\n                      </th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr *ngFor=\"#rowz of rows\">\n                      <td *ngFor=\"#dtz of rowz\" class=\"text-center\" role=\"gridcell\" id=\"{{dtz.uid}}\" [ngClass]=\"dtz.customClass\">\n                        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default\"\n                                [ngClass]=\"{'btn-info': dtz.selected, active: datePicker.isActive(dtz), disabled: dtz.disabled}\"\n                                [disabled]=\"dtz.disabled\"\n                                (click)=\"datePicker.select(dtz.date)\" tabindex=\"-1\"><span [ngClass]=\"{'text-info': dtz.current}\">{{dtz.label}}</span></button>\n\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n  ",
                        directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.NgClass]
                    }), 
                    __metadata('design:paramtypes', [datepicker_container_1.DatePickerInner])
                ], MonthPicker);
                return MonthPicker;
            }());
            exports_1("MonthPicker", MonthPicker);
        }
    }
});
//# sourceMappingURL=monthpicker.js.map
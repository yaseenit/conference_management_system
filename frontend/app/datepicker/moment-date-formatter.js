System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DateFormatter;
    return {
        setters:[],
        execute: function() {
            DateFormatter = (function () {
                function DateFormatter() {
                }
                DateFormatter.prototype.format = function (date, format) {
                    return moment(date.getTime()).format(format);
                    //return  date.getTime().toString() ;
                };
                return DateFormatter;
            }());
            exports_1("DateFormatter", DateFormatter);
        }
    }
});
//# sourceMappingURL=moment-date-formatter.js.map
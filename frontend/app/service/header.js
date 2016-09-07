System.register(['angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1;
    var ContentHeaders;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            exports_1("ContentHeaders", ContentHeaders = new http_1.Headers());
            ContentHeaders.append('Accept', 'application/json');
            ContentHeaders.append('Content-Type', 'application/json');
        }
    }
});
//# sourceMappingURL=header.js.map
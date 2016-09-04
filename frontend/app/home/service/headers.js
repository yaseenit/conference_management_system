System.register(['angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1;
    var ContentHeaders, ContentHeaderOnlyToken, ContentHeadersFile, ContentHeadersWithoutToken;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            exports_1("ContentHeaders", ContentHeaders = new http_1.Headers());
            ContentHeaders.append('Accept', '*/*');
            ContentHeaders.append('Content-Type', 'application/json');
            ContentHeaders.append('x-access-token', localStorage.getItem("token"));
            exports_1("ContentHeaderOnlyToken", ContentHeaderOnlyToken = new http_1.Headers());
            ContentHeaderOnlyToken.append('x-access-token', localStorage.getItem("token"));
            exports_1("ContentHeadersFile", ContentHeadersFile = new http_1.Headers());
            ContentHeadersFile.append('x-access-token', localStorage.getItem("token"));
            ContentHeaders.append('Accept', 'application/pdf;charset=UTF-8');
            ContentHeaders.append('Content-Type', 'application/json');
            ContentHeaders.append('Accept', 'application/json');
            exports_1("ContentHeadersWithoutToken", ContentHeadersWithoutToken = new http_1.Headers());
            ContentHeadersWithoutToken.append('Accept', 'application/json');
            ContentHeadersWithoutToken.append('Content-Type', 'application/json');
        }
    }
});
//# sourceMappingURL=headers.js.map
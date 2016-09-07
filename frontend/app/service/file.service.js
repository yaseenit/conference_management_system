System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FileService;
    return {
        setters:[],
        execute: function() {
            FileService = (function () {
                function FileService() {
                }
                FileService.getFileByte = function (file, callback) {
                    var reader = new FileReader();
                    var base64_data;
                    reader.onload = function (readerEvt) {
                        var binaryString = reader.result; //readerEvt.target["result"];
                        // AppService._base64_data= btoa(binaryString);
                        base64_data = btoa(binaryString);
                        callback(base64_data);
                    };
                    reader.readAsBinaryString(file);
                    reader.onloadend = function () {
                        // base64_data;
                    };
                };
                return FileService;
            }());
            exports_1("FileService", FileService);
        }
    }
});
//# sourceMappingURL=file.service.js.map
export  class FileService
{
  static getFileByte(file: any,callback)
  {
      var reader = new FileReader();
      var base64_data;
      reader.onload= function(readerEvt) {
         var binaryString =reader.result; //readerEvt.target["result"];
           // AppService._base64_data= btoa(binaryString);
         base64_data=btoa(binaryString);
         callback(base64_data);
        };
          reader.readAsBinaryString(file);
         reader.onloadend=function()
        {
            // base64_data;
        };


  }
}
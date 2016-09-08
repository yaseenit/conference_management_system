import { Component,OnInit } from  'angular2/core' ;
import {IPaper,ICountry} from '../service/app.interface';
import { PaperFilterPipe } from  './paper-filter.pipe' ;
import { StarComponent } from  '../shared/star.component' ;
import  {AppService} from '../service/app.service'
import { ROUTER_DIRECTIVES } from  'angular2/router' ;
import { ResultMessagesComponent } from '../shared/result-message.component';

@Component(
    {
        selector : 'pm-papers',
        templateUrl: 'app/papers/paper-list.component.html',
        styleUrls:['app/papers/paper-list.component.css'],
        pipes:[PaperFilterPipe],
        directives:[StarComponent,ROUTER_DIRECTIVES,ResultMessagesComponent]
    }
)
export class PaperListComponent implements OnInit
{
    pageTitle : string ='Paper List';
    errorMessage : string;
    imageWidth:number=50;
    imageHeight:number=40;
    showFile :boolean=false;
    listFilter:string='';
    papers : IPaper[];
    lstPaper:any[];
     resultMessage: string = "";
    messageType: string = "";
    toggleFile() :void{
        this.showFile=!this.showFile;
    }
    country:any[];
    pinApi:any[];
    ngOnInit():void{
        console.log('init page');
       // this._paperService.getFile();
        this._paperService.getPapers().subscribe(
            papers => {this.papers=papers
                    if(this.papers.length==0)
            {
                this.messageType="alert";
                this.resultMessage="there are no available submission";
                
            }  },
            error =>{
                 this.messageType="error";
                this.resultMessage=error["message"];
             }
        );
    /* this._paperService.getCountry().subscribe(
            country => this.country=country,
            error => this.errorMessage=<any>error
        );*/
        
     

    }
       stringAsDate(dateStr) {
        return new Date(dateStr);
    }
 getFile(event,generatedFileName,fileName)
 {
         event.preventDefault();
         this._paperService.getFiles(generatedFileName,fileName);
 }
    constructor(private _paperService :AppService)
    {
    }
}
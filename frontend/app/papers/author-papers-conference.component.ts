import { Component,OnInit } from  'angular2/core' ;
import {IPaper} from '../service/app.interface';
import { PaperFilterPipe } from  './paper-filter.pipe' ;
import  {AppService} from '../service/app.service'
import { ROUTER_DIRECTIVES } from  'angular2/router' ;
import {RouteParams,Router} from 'angular2/router';
import { ResultMessagesComponent } from '../shared/result-message.component';

@Component(
    {
        templateUrl: 'app/papers/author-papers-conference.component.html',
        pipes:[PaperFilterPipe],
        directives:[ROUTER_DIRECTIVES,ResultMessagesComponent]
    }
)
export class AuthorPapersConferenceComponent implements OnInit
{
    pageTitle : string;
    errorMessage : string;
    imageWidth:number=50;
    imageHeight:number=40;
    showFile :boolean=false;
    listFilter:string='';
    papers : IPaper[];
    lstPaper:any[];
    conferenceId:string;
    resultMessage: string = "";
    messageType: string = "";

    toggleFile() :void{
        this.showFile=!this.showFile;
    }
    country:any[];
    pinApi:any[];
    ngOnInit():void{
        console.log('init page');
         this.conferenceId= this._routeParams.get('id');
         this.pageTitle ='Conference: '+this._routeParams.get('title');
         this._paperService.getPapers().subscribe(
            papers =>{ this.papers=papers.filter((con : IPaper) =>
            con.conferenceId.indexOf(this.conferenceId) !=-1);
        
                  if(this.papers.length==0)
            {
                this.messageType="alert";
                this.resultMessage="these are no submission";
                
            }
              console.log(this.papers.length!=0);

        },
            error => {
                   this.messageType="erro";
                this.resultMessage=error["message"];
           }
        );

        
     

    }
 getFile(event,generatedFileName,fileName)
 {
         event.preventDefault();
         this._paperService.getFiles(generatedFileName,fileName);
 }
    constructor(private _paperService :AppService,private _router :Router,private _routeParams:RouteParams)
    {
    }
}
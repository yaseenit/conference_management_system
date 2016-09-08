import { Component,OnInit } from  'angular2/core' ;
import {IPaper} from '../service/app.interface';
import  {AppService} from '../service/app.service'
import { ROUTER_DIRECTIVES } from  'angular2/router' ;
import {RouteParams,Router} from 'angular2/router';
import { ResultMessagesComponent } from '../shared/result-message.component';

@Component(
    {
        templateUrl: 'app/papers/conference-papers-list.component.html',
        directives:[ROUTER_DIRECTIVES,ResultMessagesComponent]
    }
)
export class ConferencePaperComponent implements OnInit
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
          this.fillPaperList();
    }
     
     fillPaperList()
     {     this.pageTitle ='Submission in Conference: '+this._routeParams.get('title');
         this._paperService.getConferenceSubmission(this.conferenceId).subscribe(
            papers => {this.papers=papers;
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

     }
       stringAsDate(dateStr) {
        return new Date(dateStr);
    }

    getSubmissionStatus(status:string)
    {
        if(status=="completed")
        {
            return true;
        }
        else
        return false;
    }
    getSubmissionIncompletedStatus(status:string)
    {
      if(status=="incompleted")        
            return false;     
        else
        return true;
    }
 getFile(event,generatedFileName,fileName)
 {
            event.preventDefault();
         this._paperService.getFiles(generatedFileName,fileName);
 }
 updateStatus(event,status:string,submissionId:string)
 { 
      event.preventDefault();
     this._paperService.submissionUpdateStatus(status,submissionId,this.conferenceId).subscribe(
            response => {

               console.log(response);
                this.messageType="success";
                this.resultMessage="Submission "+ status+" successfully";
                          this.fillPaperList();

                
             },
            error =>{
                 this.messageType="error";
                this.resultMessage=error["message"];
             }
        );
     
 }
    constructor(private _paperService :AppService,private _router :Router,private _routeParams:RouteParams)
    {
    }

     onBack(): void{
            this._router.navigate(['Conference']);
        }
}
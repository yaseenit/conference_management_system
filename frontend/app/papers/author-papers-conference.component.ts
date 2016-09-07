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
    checkConferenceEndDate:boolean=false;
    ngOnInit():void{
        console.log('init page');
         this.conferenceId= this._routeParams.get('id');
         this.pageTitle ='Conference: '+this._routeParams.get('title');
         this.fillPaperList();

        
     

    }

    fillPaperList()
    {        this._paperService.getPapers().subscribe(
            papers =>{ this.papers=papers.filter((pap : IPaper) =>
            pap.conferenceId.indexOf(this.conferenceId) !=-1);
        
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

        this._paperService.getConferenceDetails(this.conferenceId).subscribe(
            response=>{
              this.checkConferenceDate(response.enddate);
            },
            error =>{
                    this.messageType="erro";
                this.resultMessage=error["message"];
            }
        );

    }
    checkConferenceDate(endate:any)
    {
        var current = new Date();
           if( new Date(endate).getTime()<current.getTime())
           {
              this.resultMessage="you  cann't make new submission after conference end date";
             this.messageType="alert ";
              this.checkConferenceEndDate= false;

           }
           else
            this.checkConferenceEndDate= true;
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

   stringAsDate(dateStr) {
        return new Date(dateStr);
    }
  checkSubmissionStatus(status:string,deadline:any):boolean
    {
      if(status!="incompleted")
      {
          // this.resultMessage="Cann't assigned reviewer to rejected paper";
         //   this.messageType="error";
            return false;
      }
      else
      {
           var current = new Date();
           if( new Date(deadline).getTime()<current.getTime())
           {
        //    this.resultMessage="Cann't assigned reviewer, paper reach deadline" + deadline ;
       //     this.messageType="error";
            return false;

           }
           else
           { 
               return true;

           }
      }
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
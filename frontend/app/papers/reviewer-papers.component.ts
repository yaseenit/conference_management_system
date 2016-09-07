import { Component,OnInit } from  'angular2/core' ;
import {IPaper,ITask,Task} from '../service/app.interface';
import  {AppService} from '../service/app.service'
import { ROUTER_DIRECTIVES } from  'angular2/router' ;
import {RouteParams,Router} from 'angular2/router';
import { ResultMessagesComponent } from '../shared/result-message.component';

@Component(
    {
        templateUrl: 'app/papers/reviewer-papers.component.html',
        directives:[ROUTER_DIRECTIVES,ResultMessagesComponent]
    }
)
export class ReviewerPaperComponent implements OnInit
{
    pageTitle : string;

    showFile :boolean=false;
    listFilter:string='';
    tasks : Task[];
    resultMessage: string = "";
    messageType: string = "";
    toggleFile() :void{
        this.showFile=!this.showFile;
    }
    country:any[];
    pinApi:any[];
    ngOnInit():void{
        console.log('init page');
         this.pageTitle ='Reviews';
         this._paperService.getUserProfile().subscribe(
            response => {this.tasks=response.tasks.filter((tsk : ITask) =>
            tsk.taskType.indexOf("reviewing") !=-1);
              if(this.tasks.length==0)
            {
                this.messageType="alert";
                this.resultMessage="there are no available any assigned submission for review";
                
            }
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
}
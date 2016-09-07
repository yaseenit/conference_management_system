import { Component,OnInit } from  'angular2/core' ;
import {ConferenceModel} from '../service/app.interface';
import  {AppService} from '../service/app.service'
import { ROUTER_DIRECTIVES } from  'angular2/router' ;
import  {ConferenceFilterPipe} from './conference-filter.pipe'
import { ResultMessagesComponent } from '../shared/result-message.component';

@Component(
    {
        templateUrl: 'app/conference/public-conference.component.html',
        directives:[ROUTER_DIRECTIVES,ResultMessagesComponent],
         pipes:[ConferenceFilterPipe],

    }
)


export class PublicConferenceComponent implements OnInit
{
    conferences:ConferenceModel[]=[];
    pageTitle:string;
    errorMessage:string;
    username:string;
        resultMessage: string = "";
    messageType: string = "";
    ngOnInit():void{
        console.log("dddd");
        this.pageTitle="Assigned Conference";
        this.username=this._service.getCurrentUserEmail();  
           this._service.getAllConference().subscribe(  
            response =>{ 
            console.log(response);
              this.conferences=<ConferenceModel[]>response.filter((con : ConferenceModel) =>
            con.authors.indexOf(this.username) !=-1);;
                   if(this.conferences.length==0)
            {
                this.messageType="alert";
                this.resultMessage="you didn't enrolled in any conference";
                
            }
              console.log(this.conferences.length!=0);

        },
            error => {
                   this.messageType="erro";
                this.resultMessage=error["message"];
           }
        );
        
    }
    stringAsDate(dateStr:any) {
        return new Date(dateStr);
    }
    constructor(private _service :AppService)
    {

    }
}
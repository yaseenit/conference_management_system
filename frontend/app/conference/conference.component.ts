import { Component,OnInit } from  'angular2/core' ;
import {ConferenceModel} from '../service/app.interface';
import  {AppService} from '../service/app.service'
import { ROUTER_DIRECTIVES } from  'angular2/router' ;

@Component(
    {
        templateUrl: 'app/conference/conference.component.html',
        directives:[ROUTER_DIRECTIVES]
    }
)


export class ConferenceComponent implements OnInit
{
    conferences:ConferenceModel[]=[];
    pageTitle:string;
    errorMessage:string;
    ngOnInit():void{
        console.log("dddd");
        this.pageTitle="My conference";
      
              this._service.getUserConference().subscribe(
               
            response =>{ 
            console.log(response);
              this.conferences=<ConferenceModel[]>response["conferences"];
        },
            error => this.errorMessage=<any>error
        );
        
    }
 
    constructor(private _service :AppService)
    {

    }
}
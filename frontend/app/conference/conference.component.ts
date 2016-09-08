import { Component, OnInit } from  'angular2/core';
import {ConferenceModel} from '../service/app.interface';
import {AppService} from '../service/app.service'
import { ROUTER_DIRECTIVES,Router } from  'angular2/router';
import { ResultMessagesComponent } from '../shared/result-message.component';
@Component(
    {
        templateUrl: 'app/conference/conference.component.html',
        directives: [ROUTER_DIRECTIVES, ResultMessagesComponent]
    }
)

export class ConferenceComponent implements OnInit {
    conferences: ConferenceModel[] = [];
    pageTitle: string;
    errorMessage: string;
    resultMessage: string = "";
    messageType: string = "";
    ngOnInit(): void {
        console.log("dddd");
        this.pageTitle = "My conferences";
        this._service.getUserConference().subscribe(
            response => {
                this.conferences = <ConferenceModel[]>response["conferences"];
                if (this.conferences.length == 0) {
                    this.messageType = "alert";
                    this.resultMessage = "you didn't create  any conference";

                }
                console.log(this.conferences.length != 0);

            },
            error => {
                this.messageType = "erro";
                this.resultMessage = error["message"];
            }
        );
    }
    stringAsDate(dateStr) {
        return new Date(dateStr);
    }
    constructor(private _service: AppService,private _router:Router) {

    }
      onBack(): void{
            this._router.navigate(['Welcome']);
        }
}
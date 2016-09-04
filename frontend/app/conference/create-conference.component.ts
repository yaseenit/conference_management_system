import {Component} from 'angular2/core';
import {AppService} from '../service/app.service'
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES} from 'angular2/common';
import { ControlMessagesComponent } from '../shared/control-message.component';
import { ValidationService } from '../service/validation.service';
import { ResultMessagesComponent } from '../shared/result-message.component';
import  {ConferenceModel} from '../service/app.interface';

@Component(
    {
        templateUrl: 'app/conference/create-conference.component.html',

        directives: [ControlMessagesComponent,ResultMessagesComponent],
    })


export class CreateConferenceComponent {
    resultMessage:string="";
     messageType:string="";
     form: ControlGroup;
    _conference:ConferenceModel;

 constructor(_fb: FormBuilder, private _service: AppService) {

        this.form = _fb.group({
            title: ['', Validators.required],
            startdate: ['', Validators.required],
            enddate: ['', Validators.required],
            conferenceLocation: ['',Validators.required],    
        });
    }


    submit(event,value)
    {
    this._conference=new ConferenceModel();
    this._conference.authors=this._service.getCurrentUserEmail();
    this._conference.conferenceLocation=value.conferenceLocation;
    this._conference.enddate=value.enddate;
    this._conference.startdate=value.startdate;
    this._conference.status=true;
    this._conference.title=value.title;

      this._service.createConference(this._conference).subscribe(
            response => {
            console.log(response);  
         this.resultMessage="New conference has been created you can invite autho from ";
         this.messageType="success";
        },
             error => {
        this.resultMessage="Error , please try again later";
           this.messageType="error";                 
       }
       ); 
    }





}
import {Component, OnInit} from 'angular2/core';
import {AppService} from '../service/app.service'
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES} from 'angular2/common';
import { ControlMessagesComponent } from '../shared/control-message.component';
import { ValidationService } from '../service/validation.service';
import { ResultMessagesComponent } from '../shared/result-message.component';
import {ConferenceModel} from '../service/app.interface';
import {RouteParams,Router} from 'angular2/router';



@Component(
    {
        templateUrl: 'app/papers/paper-edit-deadline.component.html',

        directives: [ControlMessagesComponent, ResultMessagesComponent],
    })


export class EditDeadLineComponent implements OnInit {
    resultMessage: string = "";
    messageType: string = "";
    deadline: Date;
    form: ControlGroup;
    conferenceId:string;
    id:string;

    ngOnInit(): void {
        this.deadline = new Date();
          this.id = this._routeParams.get('id');
                    this.conferenceId = this._routeParams.get('conferenceId');

    }
    constructor(_fb: FormBuilder, private _service: AppService ,private _router :Router,private _routeParams:RouteParams) {

        this.form = _fb.group({
            deadline: ['', Validators.required],
        });
    }

    submit(event, value) {
        let _conference = new ConferenceModel();


       this._service.editDeadline(value.deadline,this.id,this.conferenceId).subscribe(
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
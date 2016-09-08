import {Component, OnInit} from 'angular2/core';
import {AppService} from '../service/app.service'
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES} from 'angular2/common';
import { ControlMessagesComponent } from '../shared/control-message.component';
import { ValidationService } from '../service/validation.service';
import { ResultMessagesComponent } from '../shared/result-message.component';
import {ConferenceModel} from '../service/app.interface';
import {DatePicker} from '../datepicker/datepicker';


@Component(
    {
        templateUrl: 'app/conference/create-conference.component.html',

        directives: [ControlMessagesComponent, ResultMessagesComponent,DatePicker],
    })


export class CreateConferenceComponent implements OnInit {
    resultMessage: string = "";
    messageType: string = "";
    form: ControlGroup;
    minDate:Date;


    _conference: ConferenceModel = new ConferenceModel();
    ngOnInit(): void {
                this.minDate=new Date();

        this._conference.enddate = new Date();
    }
    constructor(_fb: FormBuilder, private _service: AppService) {

        this.form = _fb.group({
            title: ['', Validators.required],
            startdate: ['', Validators.required],
            enddate: ['', Validators.required],
            conferenceLocation: ['', Validators.required],
        });
    }
    checkConferenceDate(startdate: any, enddate: any): boolean {
        var current = new Date();
        console.log(startdate >= current);
        console.log(new Date(startdate).getTime());

        if (new Date(startdate).getTime() >= current.getTime() && new Date(enddate).getTime() > new Date(startdate).getTime()) {
            return true;
        }
        else
        { return false; }
    }

    submit(event, value) {
        this._conference = new ConferenceModel();
        this._conference.authors = this._service.getCurrentUserEmail();
        this._conference.conferenceLocation = value.conferenceLocation;
        this._conference.enddate = value.enddate;
        this._conference.startdate = value.startdate;
        this._conference.status = true;
        this._conference.title = value.title;
        if (this.checkConferenceDate(value.startdate, value.enddate)) {
            this._service.createConference(this._conference).subscribe(
                response => {
                    console.log(response);
                    this.resultMessage = "New conference has been created you can invite autho ";
                    this.messageType = "success";
                },
                error => {
                    this.resultMessage = "Error , please try again later";
                    this.messageType = "error";
                }
            );
        }
        else {
        this.resultMessage = " conference start date should be less than end date and equal or more than current date  ";
            this.messageType = "error";
        }
    }





}
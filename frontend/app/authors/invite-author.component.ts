import {Component} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import { ROUTER_DIRECTIVES } from  'angular2/router';
import {AppService} from '../service/app.service'
import {User,IUser} from '../service/app.interface';
import {GoogleplaceDirective} from '../directives/googleplace.directive';

import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES} from 'angular2/common';
import { ControlMessagesComponent } from '../shared/control-message.component';
import { ValidationService } from '../service/validation.service';
import { ResultMessagesComponent } from '../shared/result-message.component';


@Component(
    {
        templateUrl: 'app/authors/invite-author.component.html',

        directives: [ROUTER_DIRECTIVES,GoogleplaceDirective,ControlMessagesComponent,ResultMessagesComponent],
    })
    export class InviteAuthorComponent
    {
        form: ControlGroup;
        errorMessage:string;
        arrayIndex:number=0;
        authorList:string[]=[];
        ConferenceId:any=10;
        resultMessage:string="";
        messageType:string="";
        chkDate:boolean=false;
        constructor(_fb: FormBuilder, private _service: AppService, private _router: Router,  private _routeParams:RouteParams ) {
        this.form = _fb.group({
            userName: ['', Validators.compose([ValidationService.emailValidator,Validators.required])]
        });
    }
        ngOnInit() {
            this.ConferenceId = this._routeParams.get('id');
            this.getConferenceDetails(this.ConferenceId);       
    }
    getConferenceDetails(id)
    {
        this._service.getConferenceDetails(id).subscribe(
            response=>{
                this.authorList=response.authors;
                this.checkConferenceDate(response.startdate,response.enddate);
            }
            ,error =>
            {
                this.messageType="error";
                this.resultMessage=error["message"];
            }
        );
    }
    checkConferenceDate(startdate:any,enddate:any)
    {
        var current = new Date();
     

        if( new Date(enddate).getTime()>=current.getTime())
     {   
        this.chkDate= true;  }
    else
        {  this.chkDate= false; }
    }
    Invite(event:any,value: any ) {
        event.preventDefault();
        this.messageType="";
        this.resultMessage="";
        if(this.checkAuthor(value.userName))
        {
         this.authorList[this.arrayIndex]=value.userName;
         this.arrayIndex++;
      //   console.log(value.email);
        // this.clearForm();
         this._service.inviteAuthor(value.userName,this.ConferenceId).subscribe(
            response => {
          this.authorList=response.authors;
         this.resultMessage="author"+value.userName +" has been invited";
         this.messageType="success";
         console.log(response);
          this.clearForm();
        },
             error => {
     
         this.resultMessage="Error " + error["message"];
         this.messageType="error";
      
      
                 
        }
       );  
  
        }
        else{
         this.resultMessage='Author email already exists';
                  this.messageType="error";

        }
      }
      clearForm():void
      {
         for(var name in this.form.controls) {
       (<Control>this.form.controls[name]).updateValue('');

        //(<Control>this.form.controls[name]).valid=false;
        }
      }
      checkAuthor(_userName:string):boolean
      {
          console.log(this.authorList.length);
        for(var i=0;i<this.authorList.length;i++)
         {
             if(this.authorList[i]==_userName)
                 return false;
          }
             return true;
      }

   removeAuthor(_userName:string):void
  {
              event.preventDefault();
      this._service.removeAuthor(_userName,this.ConferenceId).subscribe(
            response => {
          this.authorList=response.authors;
         this.resultMessage="author"+_userName+" has been removed";
         this.messageType="success";
         console.log(response);
        },
             error => {
     
         this.resultMessage="Error " + error["message"];
         this.messageType="error";
      
      
                 
        }
       );  
   }


    }

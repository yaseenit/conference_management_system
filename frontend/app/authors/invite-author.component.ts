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
        meeageType:string="";
        constructor(_fb: FormBuilder, private _service: AppService,  private _routeParams:RouteParams ) {
        this.form = _fb.group({
            userName: ['', Validators.compose([ValidationService.emailValidator,Validators.required])]
        });
    }
        ngOnInit() {
        if (this.authorList) {
            this.ConferenceId = this._routeParams.get('id');
            this.getAuthor(this.ConferenceId);
        }
    }
    getAuthor(id)
    {
        
    }
    Invit(event:any,value: any ) {
        this.meeageType="";
        this.resultMessage="";
        event.preventDefault();
        if(this.checkAuthor(value.userName))
        {
         this.authorList[this.arrayIndex]=value.userName;
         this.arrayIndex++;
      //   console.log(value.email);
        // this.clearForm();
         this._service.inviteAuthor(value.userName,this.ConferenceId).subscribe(
            response => {
         this.authorList=response["authors"];
         this.resultMessage="author"+value.userName +" has been invited";
         this.meeageType="success";
         console.log(response);
        },
             error => {
     
         this.resultMessage="Error , please try again later";
         this.meeageType="error";
      
      
                 
        }
       );  
  
        }
        else
         this.errorMessage='Author email already assigned';
      }
      clearForm():void
      {
         for(var name in this.form.controls) {
       (<Control>this.form.controls[name]).updateValue("");
        (<Control>this.form.controls[name]).touched=false;
        //(<Control>this.form.controls[name]).valid=false;
        (<Control>this.form.controls[name]).setErrors(null);
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
    for(var i=0;i<this.authorList.length;i++)
        {
        if(this.authorList[i]==_userName)
            {
                this.authorList.splice(i,1);
                this.arrayIndex--;
                console.log('delete item');
            }
        }
    }


    }

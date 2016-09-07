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
        templateUrl: 'app/reviewers/assign-review.component.html',

        directives: [ROUTER_DIRECTIVES,GoogleplaceDirective,ControlMessagesComponent,ResultMessagesComponent],
    })
    export class AssigReviewComponent
    {
        form: ControlGroup;
        errorMessage:string;
        arrayIndex:number=0;
        PaperReviewers:string[]=[];
        submissionId:any=10;
        resultMessage:string="";
        messageType:string="";
        constructor(_fb: FormBuilder, private _reviewerService: AppService,  private _routeParams:RouteParams ) {
        this.form = _fb.group({
            userName: ['', Validators.compose([ValidationService.emailValidator,Validators.required])]
        });
    }
        ngOnInit() {
        if (this.PaperReviewers) {
            this.submissionId = +this._routeParams.get('id');
            this.getReviewer(this.submissionId);
        }
    }
    getReviewer(id)
    {

    }
    assign(event,value: any ) {
        this.messageType="";
        this.resultMessage="";
        event.preventDefault();
        if(this.checkReviewer(value.userName))
        {
         this.PaperReviewers[this.arrayIndex]=value.userName;
         this.arrayIndex++;
         console.log(value.email);
        // this.clearForm();
        this._reviewerService.assignReviewers(value.userName,this.submissionId).subscribe(
            response => {
        
         this.resultMessage="author Has been invited";
         this.messageType="success";
         console.log(response);
        },
             error => {
       if(error["status"]==null)
      {
         this.resultMessage="Error , please try again later";
         this.messageType="error";
      
      }
            error => {}
                 
        }
       );  
        }
        else
         this.errorMessage='reviewer email already assigned';
      }
      clearForm():void
      {
         for(var name in this.form.controls) {
       (<Control>this.form.controls[name]).updateValue("");
        (<Control>this.form.controls[name]).touched=false;
            //(<Control>this.form.controls[name]).valid=false;

       // (<Control>this.form.controls[name]).setErrors(null);
        }
      }
      checkReviewer(_userName:string):boolean
      {
          console.log(this.PaperReviewers.length);
        for(var i=0;i<this.PaperReviewers.length;i++)
         {
             if(this.PaperReviewers[i]==_userName)
                 return false;
          }
             return true;
      }

   removeReviewer(_userName:string):void
  {
    for(var i=0;i<this.PaperReviewers.length;i++)
        {
        if(this.PaperReviewers[i]==_userName)
            {
                this.PaperReviewers.splice(i,1);
                this.arrayIndex--;
                console.log('delete item');
            }
        }
    }


    }

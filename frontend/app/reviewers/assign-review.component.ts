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
        submissionId:string;
        resultMessage:string="";
        messageType:string="";
        conferenceId:string="";
        constructor(_fb: FormBuilder, private _reviewerService: AppService,  private _routeParams:RouteParams ) {
        this.form = _fb.group({
            userName: ['', Validators.compose([ValidationService.emailValidator,Validators.required])]
        });
    }
        ngOnInit() {
        if (this.PaperReviewers) {
            this.submissionId = this._routeParams.get('id');
            this.getReviewer(this.submissionId);
        }
    }
    getReviewer(id)
    {
        this._reviewerService.getPaper(id).subscribe(
            respone => {
                this.PaperReviewers=respone.reviewers;
                this.conferenceId=respone.conferenceId;


            },
            error =>
            {
             this.resultMessage="Error , please try again later";
             this.messageType="error";
            }
        );
    }
    assign(event,value: any ) {
        this.messageType="";
        this.resultMessage="";
        event.preventDefault();
        if(this.checkReviewer(value.userName))
        {
        this._reviewerService.assignReviewers(value.userName,this.submissionId,this.conferenceId).subscribe(
            response => {
          this.PaperReviewers=response.reviewers;
         this.resultMessage="Reviewer Has been assigned";
         this.messageType="success";
         this.clearForm()
        },
             error => {
       if(error["message"]==null)
      {
         this.resultMessage=" please try again later";
         this.messageType="error";
      
      }else
      { 
          this.resultMessage=error["message"];
         this.messageType="error";

      }
  }
       );  
        }
        else
         this.errorMessage='reviewer email already assigned';
      }
      clearForm():void
      {
         for(var name in this.form.controls) {
       (<Control>this.form.controls[name]).updateValue('');
           
        }
      }
      checkReviewer(_userName:string):boolean
      {
        if(this.PaperReviewers)
        {
        for(var i=0;i<this.PaperReviewers.length;i++)
         {
             if(this.PaperReviewers[i]==_userName)
                 return false;
          }
             return true;
        }
        else
    return true;
      }

   removeReviewer(_userName:string):void
  {
      this._reviewerService.removeReviewers(_userName,this.submissionId,this.conferenceId).subscribe(
            response => {
                console.log(response);
          this.PaperReviewers=response.reviewers;
         this.resultMessage="Reviewer Has been Removed";
         this.messageType="success";
        // this.clearForm()
        },
             error => {
       if(error["message"]==null)
      {
         this.resultMessage=" please try again later";
         this.messageType="error";
      
      }else
      { 
          this.resultMessage=error["message"];
         this.messageType="error";

      }
  }
       );  
    }


    }

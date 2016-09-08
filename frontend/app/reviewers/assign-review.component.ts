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
        chkSubmissionStatus:boolean=false;
        authorUserName:string;
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
                this.authorUserName=respone.createdBy;
                this.conferenceId=respone.conferenceId;
  this.checkSubmissionStatus(respone.status,respone.deadline);

            },
            error =>
            {
             this.resultMessage="Error , please try again later";
             this.messageType="error";
            }
        );
    }
    checkSubmissionStatus(status:string,deadline:any)
    {
      if(status=="rejected")
      {
           this.chkSubmissionStatus=false;
           this.resultMessage="Cann't assigned reviewer to rejected paper";
            this.messageType="error";
      }
      else
      {
           var current = new Date();
           if( new Date(deadline).getTime()<current.getTime())
           {
            this.resultMessage="Cann't assigned reviewer, paper reach deadline" + deadline ;
            this.messageType="error";
           this.chkSubmissionStatus=false;

           }
           else
           {
                          this.chkSubmissionStatus=true;

           }
      }
    }
    assign(event,value: any ) {
        event.preventDefault();
        if(this.authorUserName!=value.userName)
        {
        this.messageType="";
        this.resultMessage="";
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
        else
        {
         this.resultMessage="The reviewer of submission cann't be the author";
         this.messageType="error";
        }
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

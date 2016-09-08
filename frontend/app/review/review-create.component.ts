import {Component, ElementRef, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {AppService} from '../service/app.service';
import {IPaper, IReview, Review} from '../service/app.interface';
import { ROUTER_DIRECTIVES } from  'angular2/router';
import { FormBuilder, Validators, ControlGroup, Control } from 'angular2/common';
import { ControlMessagesComponent } from '../shared/control-message.component';
import { ValidationService } from '../service/validation.service';
import { ResultMessagesComponent } from '../shared/result-message.component';
import {Rating} from '../shared/rating.component';


@Component(
    {
        templateUrl: 'app/review/review-create.component.html',

        directives: [ROUTER_DIRECTIVES, ControlMessagesComponent,ResultMessagesComponent, Rating]
    })

export class ReviewCreateComponent implements OnInit {
    reviewForm: ControlGroup;
    paper: IPaper;
    errorMessage: string;
    imageWidth: number = 50;
    imageHeight: number = 40;
    review: Review;
    pageTitle: string;
    private isRatingReadonly: boolean = false;
    private maxRateValue: number = 5;
    private overStar: number;
    private overStarEvaluation: number;
    private ratingPercent: number;
    private ratingPercentEvaluation: number;
    resultMessage: string = "";
    messageType: string = "";
    allowReview:boolean=false;
    private resetRatingStar() {
        this.overStar = null;
    }
    private resetRatingStarEva() {
        this.overStarEvaluation = null;
    }

    private overStarEva(value: number): void {
        this.overStarEvaluation = value;
        this.ratingPercentEvaluation = 100 * (value / this.maxRateValue);
    };
    //call this method when over a star
    private overStarDoSomething(value: number): void {
        this.overStar = value;
        this.ratingPercent = 100 * (value / this.maxRateValue);
    };
    ngOnInit() {
        if (!this.paper) {
            this.pageTitle="Submission Review"
            this.review = new Review();
            this.review.expertise = 1;
            this.review.overallEvaluation = 1;

            let id = this._routeParams.get('id');
            this.getPaper(id);
        }
    }
    stringAsDate(dateStr) {
        return new Date(dateStr);
    }
    getFile(event, generatedFileName, fileName) {
        event.preventDefault();
        this._paperService.getFiles(generatedFileName, fileName);
    }
    getPaper(id: string) {
        this._paperService.getPaper(id)
            .subscribe(
            paper =>{ this.paper = paper;
                 this.review.submissionId=id;
                this.review.conferenceId=paper.conferenceId;
                  this.review.conferenceId = paper.conferenceId;
                                           this.checkPaperStatus(paper.deadline);

                 this._paperService.getReview(paper.conferenceId,id).subscribe(
                     rs=>{
                         if(rs._id!=null)
                         this.review=rs;
                        }
                 );
            },
            error => this.errorMessage = <any>error);
    }

    checkPaperStatus(deadline:any)
    {
            var current = new Date();
           if( new Date(deadline).getTime()<current.getTime())
           {
             this.resultMessage="cann't create or edit review after deadline:" + deadline ;
              this.messageType="error";
            this.allowReview =false;

           }
           else
           { 
            this.allowReview =true;

           }
    }
    onRatingClicked(message: string): void {
        //
        console.log(message);
    }
    constructor(private _paperService: AppService, private _routeParams: RouteParams, private _router: Router, _fb: FormBuilder) {
        this.reviewForm = _fb.group({
            summary: ['', Validators.required],
            strongPoints: ['', Validators.required],
            weakPoints: ['', Validators.required],
            detailedComments: ['', Validators.required],

        });
    }
    submitReview(event:any,value:any)
    {
     event.preventDefault();
     let flag=0;
     if(this.review._id!=null)
     flag=1;

            this._paperService.submitReview(this.review,flag).subscribe(
                response => {
                this.resultMessage = "Review submitted successfully";
                this.messageType = "success";
            },
            error => {
                
                    this.resultMessage = "Error , please try again later";
                    this.messageType = error["_body"].message;           
             

            }
        );

    }

}


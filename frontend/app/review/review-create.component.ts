import {Component, ElementRef, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {AppService} from '../service/app.service';
import {IPaper, IReview, Review} from '../service/app.interface';
import { ROUTER_DIRECTIVES } from  'angular2/router';
import { FormBuilder, Validators, ControlGroup, Control } from 'angular2/common';
import { ControlMessagesComponent } from '../shared/control-message.component';
import { ValidationService } from '../service/validation.service';
import { ResultMessagesComponent } from '../shared/result-message.component';
import { StarComponent } from  '../shared/star.component';
import {Rating} from '../shared/rating.component';


@Component(
    {
        templateUrl: 'app/review/review-create.component.html',

        directives: [ROUTER_DIRECTIVES, ControlMessagesComponent, StarComponent,Rating]
    })

export class ReviewCreateComponent implements OnInit {
    reviewForm: ControlGroup;
    paper: IPaper;
    errorMessage: string;
    imageWidth: number = 50;
    imageHeight: number = 40;
    review: Review;
        private isRatingReadonly:boolean = false;
    private maxRateValue:number = 5;
        private overStar:number;
    private ratingPercent:number;

 private resetRatingStar() {
        this.overStar = null;
    }
    //call this method when over a star
    private overStarDoSomething(value:number):void {
        this.overStar = value;
        this.ratingPercent = 100 * (value / this.maxRateValue);
    };
    ngOnInit() {
        if (!this.paper) {
            this.review = new Review();
            this.review.overallEvaluation=1;
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
            paper => this.paper = paper,
            error => this.errorMessage = <any>error);
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

}


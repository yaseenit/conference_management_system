import {Component, ElementRef} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {AppService} from '../service/app.service';
import {IPaper, IReview, Review} from '../service/app.interface';
import { ROUTER_DIRECTIVES } from  'angular2/router';
import { FormBuilder, Validators, ControlGroup, Control } from 'angular2/common';
import { KeysPipe } from './review-detail.pipe';
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common';
//import {NgbButtonCheckbox, NgbButtonRadio} from '../service/button';


export enum Expertise {
    notFamiliar = 1,
    low = 2,
    moderate = 3,
    high = 4,
    expert = 5
}

export enum Evaluation {
    strongReject = 1,
    reject = 2,
    borderlinePaper = 3,
    accept = 4,
    strongAccept = 5
}

@Component({
    templateUrl: 'app/review/review-detail.component.html',
    pipes: [KeysPipe],
    directives: [NgSwitch, NgSwitchWhen, NgSwitchDefault]
})

export class ReviewDetailComponent {
    pageTitle: string = 'Paper Detail for Review';
    paper: IPaper;
   
    //for creating review
    reviewEdit: Review;
    reviewForm: ControlGroup;
    errorMessage: string;
    arrayIndex: number = 0;
    expReview;
    evalReview;
    expertiseReview;
    evaluationReview;
    constructor(private _reviewService: AppService, private _routeParams: RouteParams, private _router: Router, fb: FormBuilder) {
        this.reviewForm = fb.group({
          
            expertise: ['', Validators.required],
            evaluation: ['', Validators.required],
            expertiseReview: ['', Validators.required],
            evaluationReview: ['', Validators.required],
            summary: ['', Validators.required],
            strongPoints: ['', Validators.required],
            weakPoints: ['', Validators.required],
            comments: ['', Validators.required]
        });

        this.expertiseReview = { val: "" };
        this.evaluationReview = { eval: "" };
        let id = +this._routeParams.get('id');
        this.pageTitle += `: ${id}`;

    }
    ngOnInit() {
        if (!this.paper) {
            let id = +this._routeParams.get('id');
            // this.pageTitle += `: ${id}`;
            this.getPaper(id);
        }

    }
    checkEdit(): boolean {
        if (this.paper.status == "complete")
            return true;
        else
            return false;
    }
    getPaper(id: number) {
        this._reviewService.getReview(id)
            .subscribe(
         //   paper => this.paper = paper,
            error => this.errorMessage = <any>error);
    }

   /* getReviews(id: number) {
        this._reviewService.getReview(id)

            .subscribe(
            reviewEdit => this.reviewEdit = reviewEdit,
            error => this.errorMessage = <any>error);
    }*/
    // used for Get and Post
    addReviews(event, value: any) {
        event.preventDefault();
        let id = +this._routeParams.get('id');
        this._reviewService.addReview(id, this.expertiseReview.val, this.evaluationReview.eval, value.summary, value.strongPoints, value.weakPoints, value.comments),
            error => console.log("Error HTTP Post Service"),
            console.log("Job Done Post !")
    }

    onBack(): void {
        this._router.navigate(['Review']);
    }

    onReview(): void {
        this._router.navigate(['ReviewCreate', { id: this.paper.id }]);
    }

}




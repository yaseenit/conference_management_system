import { Component, OnInit } from  'angular2/core';
import {IPaper,IReview,Review} from '../service/app.interface';
import {AppService} from '../service/app.service'
import { ROUTER_DIRECTIVES } from  'angular2/router';
import {RouteParams,Router} from 'angular2/router';

@Component(
    {
        selector: 'rv-papers',
        templateUrl: 'app/review/review-list.component.html',
        directives: [ROUTER_DIRECTIVES]
    }
)
export class ReviewListComponent implements OnInit {
    pageTitle: string = 'Assigned Papers for Review';
    errorMessage: string;
    imageWidth: number = 50;
    imageHeight: number = 40;
    rpapers: IPaper[];
    constructor(private _paperService: AppService, private _routeParams: RouteParams) {
    }
    ngOnInit(): void {
        console.log('init page');
       //this._paperService.getReviewList().subscribe(
          this._paperService.getPapers().subscribe(
            rpapers => this.rpapers = rpapers,
            error => this.errorMessage = <any>error
        );

}
    

}
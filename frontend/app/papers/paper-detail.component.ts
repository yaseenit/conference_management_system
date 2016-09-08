import {Component} from 'angular2/core';
import  {AppService} from '../service/app.service';


import {Rating} from '../shared/rating.component';
import {RouteParams, Router,ROUTER_DIRECTIVES} from 'angular2/router';
import {IPaper,Review} from '../service/app.interface';

@Component({
        templateUrl: 'app/papers/paper-detail.component.html',
                directives: [Rating,ROUTER_DIRECTIVES]

    })

    export class PaperDetailComponent
    {
        pageTitle: string='Paper Detail';
        paper: IPaper;
        errorMessage: string;
        imageWidth:number=50;
        imageHeight:number=40;
        reviews:Review[];
        constructor(private _paperService: AppService,
            private _routeParams:RouteParams ,private _router :Router)
        {
        
        }
         ngOnInit() {
        if (!this.paper) {
            let id = this._routeParams.get('id');
            // this.pageTitle += `: ${id}`;
            this.getPaper(id);
        }
    }

       stringAsDate(dateStr) {
        return new Date(dateStr);
    }
getFile(event,generatedFileName,fileName)
 {
         event.preventDefault();
         this._paperService.getFiles(generatedFileName,fileName);
 }
    getPaper(id: string) {
        this._paperService.getPaper(id)
            .subscribe(
            paper => {this.paper = paper;
                  this._paperService.getAllReview(this.paper.conferenceId,id).subscribe(
                     rs=>{
                         this.reviews=rs;
                     }
                 );},
            error => this.errorMessage = <any>error);


                  
    }
        onBack(): void{
  window.history.back();
        }
    }

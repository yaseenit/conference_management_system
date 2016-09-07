import {Component} from 'angular2/core';
import  {AppService} from '../service/app.service';




import {RouteParams,Router} from 'angular2/router';
import {IPaper} from '../service/app.interface';

@Component({
        templateUrl: 'app/papers/paper-detail.component.html'
    })

    export class PaperDetailComponent
    {
        pageTitle: string='Paper Detail';
        paper: IPaper;
         errorMessage: string;
          imageWidth:number=50;
    imageHeight:number=40;
        constructor(private _paperService: AppService,
            private _routeParams:RouteParams ,private _router :Router)
        {
          //  let id=+this._routeParams.get('id');
          //  this.pageTitle += `: ${id}`;
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
            paper => this.paper = paper,
            error => this.errorMessage = <any>error);
    }
        onBack(): void{
            this._router.navigate(['Papers']);
        }
    }

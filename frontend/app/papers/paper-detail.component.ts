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
        constructor(private _paperService: AppService,
        private _routeParams:RouteParams ,private _router :Router)
        {
        }
         ngOnInit() {
        if (!this.paper) {
            
            let id = this._routeParams.get('_id');
                //    console.log(id);
            this.getPaper(id);
        }
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

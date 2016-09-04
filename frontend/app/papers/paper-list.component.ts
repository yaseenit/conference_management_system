import { Component,OnInit } from  'angular2/core' ;
import {IPaper,ICountry} from '../service/app.interface';
import { PaperFilterPipe } from  './paper-filter.pipe' ;
import { StarComponent } from  '../shared/star.component' ;
import  {AppService} from '../service/app.service'
import { ROUTER_DIRECTIVES } from  'angular2/router' ;

@Component(
    {
        selector : 'pm-papers',
        templateUrl: 'app/papers/paper-list.component.html',
        styleUrls:['app/papers/paper-list.component.css'],
        pipes:[PaperFilterPipe],
        directives:[StarComponent,ROUTER_DIRECTIVES]
    }
)
export class PaperListComponent implements OnInit
{
    pageTitle : string ='Paper List';
    errorMessage : string;
    imageWidth:number=50;
    imageHeight:number=40;
    showFile :boolean=false;
    listFilter:string='';
    papers : IPaper[];
    lstPaper:any[];
    toggleFile() :void{
        this.showFile=!this.showFile;
    }
    country:any[];
    pinApi:any[];
    ngOnInit():void{
        console.log('init page');
       // this._paperService.getFile();
        this._paperService.getPapers().subscribe(
            papers => this.papers=papers,
            error => this.errorMessage=<any>error
        );
    /* this._paperService.getCountry().subscribe(
            country => this.country=country,
            error => this.errorMessage=<any>error
        );*/
        
     

    }
 getFile(event,fileName)
 {
         event.preventDefault();
         this._paperService.getFile(fileName);
 }
    constructor(private _paperService :AppService)
    {
    }
}
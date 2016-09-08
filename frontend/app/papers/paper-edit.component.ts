import {Component, ElementRef,OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {AppService} from '../service/app.service';
import {IPaper, IPaperAuthor, PaperAuthor, Paper} from '../service/app.interface';
import { FormBuilder, Validators, ControlGroup, Control } from 'angular2/common';

import {Observable} from 'rxjs/Observable';
import { ControlMessagesComponent } from '../shared/control-message.component';
import { ValidationService } from '../service/validation.service';
import { ResultMessagesComponent } from '../shared/result-message.component';


@Component({

  templateUrl: 'app/papers/paper-edit.component.html',
  directives: [ResultMessagesComponent, ControlMessagesComponent]


})
export class PaperEditComponent implements OnInit {
  paperAuthors: PaperAuthor[] = [];
  keywords: string[] = [];
  authorForm: ControlGroup;
  keywordForm: ControlGroup;
  fileForm: ControlGroup;
  arrayIndex: number = 0;
  arrayIndexKeyword: number = 0;
  errorMessage: string;
  keyword: string = '';
  public filteredList: string[];
  public elementRef;
  selectedIdx: number;
  public query = '';
  paper: IPaper;
  files: any[];
  resultMessage: string = "";
  messageType: string = "";
  checkKey = true;
  conferenceId:string;
  id:string;
   ngOnInit():void{
          //    this.conferenceId= this._routeParams.get('id');
           if(!this.paper)
           {
             this.paper=new Paper();
            this.id = this._routeParams.get('id');
            // this.pageTitle += `: ${id}`;
            this.getPaper(this.id);
           }
       

   }
   // get submission details from api
    getPaper(id: string) {
        this._paperService.getPaper(id)
            .subscribe(
           paper =>{ this.paper = paper;
             this.keywords=paper.keywords;
            this.paperAuthors=paper.authorList;
            this.arrayIndex=this.paperAuthors.length;
            this.arrayIndexKeyword=this.keywords.length;
           }
          ,
            error => this.errorMessage = <any>error);
            
    }
// add author to paperAuthor Array
  addAuthor(event, value: any) {
    event.preventDefault();
    if (this.checkAuthor(value.email)) {
      this.paperAuthors[this.arrayIndex] = new PaperAuthor(value.givenName, value.familyName, value.email);
      this.arrayIndex++;
      console.log(value.email);
      this.clearAuthorForm();
    }
    else
      this.errorMessage = 'Email Address already exists';
       this.checkKey = false;
  }

// clear author form after adding author to array 
  clearAuthorForm(): void {
    for (var name in this.authorForm.controls) {
      (<Control>this.authorForm.controls[name]).updateValue("");
      //this.authorForm.controls[name].setErrors(null);
      this.checkKey = true;
      this.errorMessage = '';
    }
  }
  checkAuthor(email: string): boolean {
    for (var i = 0; i < this.paperAuthors.length; i++) {
      if (this.paperAuthors[i].email == email)
        return false;
    }
    return true;
  }
  removeAuthor(email: string): void {
    console.log(this.paperAuthors.length);

    for (var i = 0; i < this.paperAuthors.length; i++) {
      if (this.paperAuthors[i].email == email) {
        this.paperAuthors.splice(i, 1);
        this.arrayIndex--;
        console.log('delete item');
      }
    }
    console.log(this.paperAuthors.length);
  }

  // end author
  //keyword bll
  addkeyword(event, value: any) {

    event.preventDefault();
    if (this.checkKeyword(value.keyword)) {
      this.keywords[this.arrayIndexKeyword] = value.keyword;
      this.arrayIndexKeyword++;
      console.log(value.email);
      this.clearKeywordForm();
    }
    else
      this.errorMessage = 'Keyword already exists';
      this.checkKey = false;
  }
  clearKeywordForm(): void {

    for (let name in this.keywordForm.controls) {

      (<Control>this.keywordForm.controls[name]).updateValue('');
      //this.keywordForm.controls[name].setErrors(null);
      this.checkKey = true;
      this.errorMessage = '';
      
    }
  }

  checkKeyword(_keyword: string): boolean {
    for (var i = 0; i < this.keywords.length; i++) {
      if (this.keywords[i] == _keyword)
        return false;
    }
    return true;
  }

  removeKeyword(_keyword: string): void {
    console.log(this.keywords.length);

    for (var i = 0; i < this.keywords.length; i++) {
      if (this.keywords[i] == _keyword) {
        this.keywords.splice(i, 1);
        this.arrayIndexKeyword--;
        console.log('delete item');
      }
    }
    console.log(this.keywords.length);
  }

  //end 

  search(_keyword: string) {
    this._paperService.searchWiki(this.keyword).subscribe(
      filteredList => this.filteredList = filteredList,
      error => this.errorMessage = <any>error
    );
  }
  select(item) {
    console.log(item);
    this.keyword = item;
    this.filteredList = null;
    this.selectedIdx = -1;
  }


  onChange(event) {
    console.log('onChange');
    this.files = event.srcElement.files;
    console.log(this.files);
    //this.files[0].name;
   
    if(this.files)
    {
      if( ValidationService.fileValidator(this.files[0].name))
      {
       this.resultMessage = "file extention should be pdf";
      this.messageType = "error";
      }
    }
    
  }

  edit(event, value: any) {
    event.preventDefault();
   // this.paper = new Paper();
    this.paper.authorList = [];
  
    this.paper.authorList = this.paperAuthors;
    this.paper.keywords = this.keywords;
    this.paper.abstract = value.abstract;
    this.paper.title = value.title;
    let check = true;

    if (this.paperAuthors.length <= 0) {
      this.resultMessage = "Please add the Authors";
      this.messageType = "error";
      check = false;
      return;
    }
    console.log(this.keywords.length);

    if (this.paper.keywords.length <= 0) {
      this.resultMessage = "Please add the Keywords";
      this.messageType = "error";
      check = false;
      return;
    }
 


    if (check) {
      try{
            this.paper.id=this.id;
console.log(this.paper.id);
      this._paperService.paperSubmissionEdit(<Paper>this.paper).subscribe(
            response => {
                this.messageType="success";
                this.resultMessage="submission updated successfully";
                
            
          },
            error =>{
                 this.messageType="error";
                this.resultMessage=error["message"];
             }
        );
     
      
   
      }
      catch(err)
      { this.resultMessage = "An error ,please try again later";
      this.messageType = "error";

      }
    }

  }




  constructor(fb: FormBuilder, kf: FormBuilder, ff: FormBuilder, _Element: ElementRef, private _paperService: AppService,private _routeParams:RouteParams) {
    this.elementRef = _Element;
    this.selectedIdx = -1;
    this.keywordForm = kf.group({
      keyword: ['', Validators.required]
    });
    this.fileForm = ff.group({
      abstract: ['', Validators.required],
      title: ['',Validators.required]

    });

    this.authorForm = fb.group({
      email: ['', Validators.compose([ValidationService.emailValidator, Validators.required])],
      givenName: ['', Validators.required],
      familyName: ['', Validators.required]
    });
  }
}
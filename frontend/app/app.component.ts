import {Component, OnInit} from 'angular2/core';

import {HTTP_PROVIDERS, JSONP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx'; //load all features

import 'rxjs/add/operator/map';

import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import { ControlGroup, FormBuilder, Validators } from 'angular2/common';


import {PaperListComponent} from './papers/paper-list.component';
import {PaperDetailComponent} from './papers/paper-detail.component';
import {PaperCreateComponent} from './papers/paper-create.component';


import {WelcomeComponent} from './home/welcome.component';
import {LogInComponent} from './login/login.component';
import {SignUpComponent} from './signup/signup.component';

import {AssigReviewComponent} from './reviewers/assign-review.component';
import {InviteAuthorComponent} from './authors/invite-author.component';

import {AppService} from './service/app.service';
import { ValidationService } from './service/validation.service';
import {EditProfileComponent} from './profile/edit-profile.component';
import { ControlMessagesComponent } from './shared/control-message.component';
import { ResultMessagesComponent } from './shared/result-message.component';
import {ViewProfileComponent} from './profile/view-profile.component';
import {ChangePasswordComponent} from './profile/change-password.component';
import {Router} from 'angular2/router';

import {ConfirmService} from "./service/confirm.service";
import {ConfirmComponent} from "./shared/confirm.component";

import {CreateConferenceComponent} from "./conference/create-conference.component";
import {ConferenceComponent} from "./conference/conference.component";

import {PublicConferenceComponent} from './conference/public-conference.component';
import {AuthorPapersConferenceComponent} from './papers/author-papers-conference.component';
import {ConferencePaperComponent} from './papers/conference-papers-list.component';
import {ReviewerPaperComponent} from './papers/reviewer-papers.component';

import {PaperEditComponent} from './papers/paper-edit.component';

import {ReviewCreateComponent} from './review/review-create.component';
import {ReviewDetailComponent} from './review/review-detail.component';

import {EditDeadLineComponent} from './papers/paper-edit-deadline.component';

import {ChartComponent} from './chart/chart.component'

import {PublicProfileComponent} from './profile/public-profile.component';
@Component({
  selector: 'pm-app',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES, ControlMessagesComponent, ResultMessagesComponent, ConfirmComponent],
  providers: [AppService, JSONP_PROVIDERS, ValidationService
    , HTTP_PROVIDERS,
    ROUTER_PROVIDERS, ConfirmService]
})

@RouteConfig(
  [
    { path: '/welcome', name: 'Welcome', component: WelcomeComponent, useAsDefault: true },
    { path: '/papers/', name: 'Papers', component: PaperListComponent },
    { path: '/paper/:id', name: 'PaperDetail', component: PaperDetailComponent },
    { path: '/login', name: 'LogIn', component: LogInComponent },
    { path: '/papercreate/:id', name: 'PaperCreate', component: PaperCreateComponent },


    { path: '/signup', name: 'SignUp', component: SignUpComponent },
    { path: '/editProfile', name: 'EditProfile', component: EditProfileComponent },
    { path: '/viewProfile', name: 'ViewProfile', component: ViewProfileComponent },
    { path: '/assignReview/:id', name: 'AssigReview', component: AssigReviewComponent },
    { path: '/inviteAuthor/:id', name: 'InviteAuthor', component: InviteAuthorComponent },
    { path: '/changePassword', name: 'ChangePassword', component: ChangePasswordComponent },
    { path: '/conference', name: 'Conference', component: ConferenceComponent },
    { path: '/createconference', name: 'CreateConference', component: CreateConferenceComponent },
    { path: '/conferenceSubmission', name: 'ConferenceSubmission', component: PublicConferenceComponent },
    { path: '/authorPapersConference/:id/:title', name: 'AuthorPapersConference', component: AuthorPapersConferenceComponent },
    { path: '/conferencePaper/:id/:title', name: 'ConferencePapers', component: ConferencePaperComponent },
    { path: '/reviewerPapers', name: 'ReviewerPapers', component: ReviewerPaperComponent },
    { path: '/paperEdit/:id', name: 'PaperEdit', component: PaperEditComponent },
    { path: '/reviewCreate/:id', name: 'ReviewCreate', component: ReviewCreateComponent },
    { path: '/reviewDetail/:id', name: 'ReviewDetail', component: ReviewDetailComponent },
     { path: '/editDeadline/:id/:conferenceId', name: 'EditDeadline', component: EditDeadLineComponent },
     { path: '/chart', name: 'Chart', component: ChartComponent },
    { path: '/publicProfile/:username', name: 'PublicProfile', component: PublicProfileComponent }

    



  ]
)


export class AppComponent implements OnInit {
  pageTitle: string = "Conference Mangment";
  isLog: boolean;
  currentUser: string;
  form: any;
  errorMessage: string;
  loginError: any[];
  loginResponse: any[];
  resultMessage: string = "";
  messageType: string = "";
  isActive = false;

  //for review
  getReviewList: string;
  token: string;
  email: string;
  //
  constructor(private _logInService: AppService, fb: FormBuilder, private _router: Router, private _confirmService: ConfirmService) {
    this.form = fb.group({
      email: ['', Validators.compose([ValidationService.emailValidator, Validators.required])],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): any {
    this._logInService.checkCredentials();
    this.messageType = "";
    this.resultMessage = "";
    this.isLog = this._logInService.isLog();
    if (this.isLog)
      this.currentUser = this._logInService.getCurrentUserEmail();
    console.log(this.currentUser);

  }
  removeProfile(event) {
    event.preventDefault(); 
     this._logInService.removeProfile().subscribe(
    response => {
       this._logInService.logout();
        window.location.reload();

      }, error => {
        this.resultMessage = error["message"];
        this.messageType = "error";});

        
     
      
  }
  logOut() {
    this._logInService.logout();
  }
  toggledClass(event) {
    event.preventDefault();

    this.isActive = !this.isActive;
  }
  login(event, value: any) {
    this.messageType = "";
    this.resultMessage = "";
    event.preventDefault();
    this._logInService.login(value.email, value.password).subscribe(
      loginResponse => {
        console.log(loginResponse);
        if (loginResponse["token"] != null) {
          if (loginResponse["user"].is_confirmed == false) {
            this.resultMessage = "please check your email for activation link";
            this.messageType = "error";
          }
          else {
            localStorage.setItem('token', loginResponse["token"]);
            localStorage.setItem('username', loginResponse["user"].username);
            localStorage.setItem('_id', loginResponse["user"]._id);
            this.isLog = this._logInService.isLog();
            this.currentUser = this._logInService.getCurrentUserEmail();
            window.location.reload();
          }
        }
        else {
          this.resultMessage = loginResponse["message"];
          this.messageType = "error";
        }

      },
      error => {
        this.resultMessage = error["message"];
        this.messageType = "error";
        this.loginError = <any>error
      }
    );

  }

}
import {Component, OnInit} from 'angular2/core';

import {HTTP_PROVIDERS, JSONP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx'; //load all features

import 'rxjs/add/operator/map';

import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import { ControlGroup, FormBuilder, Validators } from 'angular2/common';


import {PaperListComponent} from './papers/paper-list.component';
import {PaperDetailComponent} from './papers/paper-detail.component';
import {PaperCreateComponent} from './papers/paper-create.component';

//for review
import {ReviewListComponent} from './review/review-list.component';
import {ReviewDetailComponent} from './review/review-detail.component';
//
import {WelcomeComponent} from './home/welcome.component';
import {LogInComponent} from './login/login.component';
import {SignUpComponent} from './signup/signup.component';

import {AssigReviewComponent} from './reviewers/assign-review.component';
import {InvitAuthorComponent} from './authors/invit-author.component';

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
import  {CreateConferenceComponent} from "./conference/create-conference.component";


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
    { path: '/papers', name: 'Papers', component: PaperListComponent },
    { path: '/paper/:_id', name: 'PaperDetail', component: PaperDetailComponent },
    { path: '/login', name: 'LogIn', component: LogInComponent },
    { path: '/papercreate', name: 'PaperCreate', component: PaperCreateComponent },
    //for review
    { path :'/review',name: 'Review',component:ReviewListComponent},
    { path :'/review/:id',name: 'ReviewDetail',component:ReviewDetailComponent},
    //
    { path: '/signup', name: 'SignUp', component: SignUpComponent },
    { path: '/editProfile', name: 'EditProfile', component: EditProfileComponent },
    { path: '/viewProfile', name: 'ViewProfile', component: ViewProfileComponent }, 
    { path: '/assignReview/:id', name: 'AssigReview', component: AssigReviewComponent },
    { path: '/invitAuthor/:id', name: 'InvitAuthor', component: InvitAuthorComponent },
    { path: '/changePassword', name: 'ChangePassword', component: ChangePasswordComponent }
{path :'/createconference',name: 'CreateConference',component:CreateConferenceComponent}

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
    getReviewList:string;
    token:string;
    email:string;
  //
  constructor(private _logInService: AppService, fb: FormBuilder, private _router: Router, private _confirmService: ConfirmService) {
    this.form = fb.group({
      email: ['', Validators.compose([ValidationService.emailValidator, Validators.required])],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): any {
    this.messageType = "";
    this.resultMessage = "";
    this.isLog = this._logInService.isLog();
    if (this.isLog)
      this.currentUser = this._logInService.getCurrentUserEmail();
    console.log(this.currentUser);
    //   componentHandler.upgradeDom();


  }
  removeProfile(event) {
    event.preventDefault();
    this._confirmService.activate("Are you sure to remove your Profile?")
      .then(res => {
        if (res)
          console.log(`Confirmed: ${res}`);
        else
          console.log("NOOOOOOOOOOOOOOOOOOOOOOOO")
      });
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

            this.isLog = this._logInService.isLog();
            this.currentUser = this._logInService.getCurrentUserEmail();
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
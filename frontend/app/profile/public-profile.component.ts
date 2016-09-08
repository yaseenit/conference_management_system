import {Component} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import { ROUTER_DIRECTIVES } from  'angular2/router';
import {AppService} from '../service/app.service'
import {User, IUser} from '../service/app.interface';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES} from 'angular2/common';
import { ControlMessagesComponent } from '../shared/control-message.component';
import { ValidationService } from '../service/validation.service';
@Component(
    {
        templateUrl: 'app/profile/public-profile.component.html',

        directives: [ROUTER_DIRECTIVES, ControlMessagesComponent],
    })
export class PublicProfileComponent {
    form: ControlGroup;
    _user: User;
    valid: boolean = false;
    country: string = '';
    _userProfile: any[];

    constructor(_fb: FormBuilder, private _profileService: AppService, private _router: Router,private _routerParams :RouteParams) {
        this._user = new User();


    }
    ngOnInit(): void {

         let username = this._routerParams.get('username');
        this._profileService.getPublicProfile(username).subscribe(
            _userProfile => this._user = _userProfile

        );
    }
}





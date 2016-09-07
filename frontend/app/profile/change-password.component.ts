import {Component} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import { ROUTER_DIRECTIVES } from  'angular2/router';
import {AppService} from '../service/app.service'
import {User,IUser} from '../service/app.interface';

import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES} from 'angular2/common';
import { ControlMessagesComponent } from '../shared/control-message.component';
import { ValidationService } from '../service/validation.service';
import { ResultMessagesComponent } from '../shared/result-message.component';




@Component(
    {
            templateUrl: 'app/profile/change-password.component.html',

            directives: [ROUTER_DIRECTIVES,ControlMessagesComponent,ResultMessagesComponent]
    })
    

export class ChangePasswordComponent {
    form: ControlGroup;
    _user: User;
    valid: boolean = false;
  resultMessage: string = "";
    messageType: string = "";
    changePassword(event, value: any) {

        event.preventDefault();
      
        this._service.changePassword(value.password,value.oldPassword).subscribe(response => {
                this.resultMessage = "Thanks for registration please check your email for activation";
                this.messageType = "success";



            },
            error => {
                
                    this.resultMessage =error["_body"].message;
                    this.messageType = "error";
            }
        );
        console.log('presssss');

    }
    constructor(_fb: FormBuilder, private _service: AppService,private _router :Router) {

        this.form = _fb.group({
            oldPassword:  ['',Validators.compose([ Validators.required,ValidationService.passwordValidator])],
            password: ['',Validators.compose([ Validators.required,ValidationService.passwordValidator])],
            rePassword: ['', Validators.required]
            
        }, { validator:  ValidationService.checkEqualPassword});
    }

  

}





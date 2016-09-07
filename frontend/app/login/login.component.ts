import {Component} from 'angular2/core';
import {RouteParams,Router} from 'angular2/router';
import { ROUTER_DIRECTIVES } from  'angular2/router' ;
import  {AppService} from '../service/app.service'
import {IUser} from '../service/app.interface';
import {GoogleplaceDirective} from '../directives/googleplace.directive';
import { FormBuilder, Validators,ControlGroup } from 'angular2/common';

@Component(
    {
      selector : 'nav-signin',
      templateUrl: 'app/login/login.component.html',
    directives:[ROUTER_DIRECTIVES],
    styleUrls:['app/login/login.component.css']
    })

export class LogInComponent 
{
     form: ControlGroup;
     login(event,value: any ) {
         event.preventDefault();
          this._logInService.login(value.email,value.password);
           console.log('presssss');
     }
    constructor(fb: FormBuilder,private _logInService :AppService)
    {
     this.form = fb.group({
      email:  ['', Validators.required],
      password:  ['', Validators.required]
    });  
    }

}




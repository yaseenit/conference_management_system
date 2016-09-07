import {Component} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import { ROUTER_DIRECTIVES } from  'angular2/router';
import {AppService} from '../service/app.service'
import {User,IUser} from '../service/app.interface';
import {GoogleplaceDirective} from '../directives/googleplace.directive';

import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES} from 'angular2/common';
import { ControlMessagesComponent } from '../shared/control-message.component';
import { ValidationService } from '../service/validation.service';
import { ResultMessagesComponent } from '../shared/result-message.component';


@Component(
    {
        templateUrl: 'app/profile/edit-profile.component.html',

        directives: [ROUTER_DIRECTIVES,GoogleplaceDirective,ControlMessagesComponent,ResultMessagesComponent],
    })

export class EditProfileComponent {
    form: ControlGroup;
    _user: User;
    valid: boolean = false;
    country:string='';
    _userProfile:any[];
    resultMessage:string="";
     messageType:string="";
    update(event, value: any) {
      event.preventDefault();
        this._user=new User();
       this._user.address=value.address;
        this._user.city=value.city;
       this._user.country=value.country;
       this._user.username=value.email;
       this._user.familyName=value.familyName;
       this._user.givenName=value.givenName;
       this._user.institute=value.institute;
       this._user.password=value.password;
       this._user.state=value.state;
       this._user.zipCode=value.zipCode;
      

       this._profileService.updateProfile(this._user).subscribe(
            response => {
            //    console.log(response["status"]);
              // this.signupResult=response;
         
         this.resultMessage="profile updated successfully";
         this.messageType="success";
       
      

        },
            
                   
            error => {  this.resultMessage="Error , please try again later";
         this.messageType="error";}
                 
        
       ); 

        console.log('presssss');
    }
    constructor(_fb: FormBuilder, private _profileService: AppService) {
        this._user=new User();

        this.form = _fb.group({
            givenName: ['', Validators.required],
            familyName: ['', Validators.required],
            institute: ['', Validators.required],
            email: ['', Validators.compose([ValidationService.emailValidator,Validators.required])],    
           
            address:['', Validators.required],
            country:[''],
            city:[''],
            state:[''],
            zipCode:['']


        });
        
    }
      ngOnInit():void{
   this._profileService.getUserProfile().subscribe(
            _userProfile=>this._user=_userProfile
           
       );
     this.address=this._user.address;
     }


    // reference  https://github.com/rajan-g/angular2-google-place-autocomplete
    //https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform

  public address : Object;
       getAddress(place:Object) {       
           this.address = place['formatted_address'];
           var location = place['geometry']['location'];
           var lat =  location.lat();
           var lng = location.lng();
           console.log("Address Object", place);
                       console.log( place['address_components'][0].long_name);
        //this._user.address =place['address_components'][0].long_name;
            for (var i = 0; i < place['address_components'].length; i++) {
          var addressType = place['address_components'][i].types[0];
          if (addressType=="country") {
              (<Control>this.form.controls["country"]).updateValue(place['address_components'][i].long_name);
          }
           if (addressType=="administrative_area_level_1") {
              (<Control>this.form.controls["state"]).updateValue(place['address_components'][i].long_name);
          }
            if (addressType=="postal_code") {
              (<Control>this.form.controls["zipCode"]).updateValue(place['address_components'][i].long_name);
          }
           if (addressType=="locality") {
              (<Control>this.form.controls["city"]).updateValue(place['address_components'][i].long_name);
          }
        }
           
       }
}





import { Component, Input } from 'angular2/core';
@Component({
  selector: 'result-messages',
  template: ` <div [ngClass]="messageClass" *ngIf="result !== null" class="alert alert-info fade in" style="margin-top : 10px;">
        <a href="#" class="close" data-dismiss="alert">&times;</a>
        <strong>{{messageType}}!</strong> {{result}}.
    </div><div ></div>`
})
export class ResultMessagesComponent {
  @Input() message: string ;
  @Input() messageType:string;
   constructor() { }
  get messageClass()
  {
    if(this.messageType=="success")
    return "alert alert-success fade i";
    else if(this.messageType=="error")
    return "alert alert-danger fade in";
    else
    return "alert alert-info fade in"
  }
  get result()
  {
      if(this.message!="")
      return this.message;
      else
      return null;
  }
  get essageType()
  {
     if(this.messageType=="success")
    return "success";
    else if(this.messageType=="error")
    return "error";
    else
    return "alert";
  }

}
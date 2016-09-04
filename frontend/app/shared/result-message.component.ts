import { Component, Input } from 'angular2/core';
@Component({
  selector: 'result-messages',
  template: `<div [ngClass]="messageClass" *ngIf="result !== null">{{result}}</div>`
})
export class ResultMessagesComponent {
  @Input() message: string ;
  @Input() messageType:string;
   constructor() { }
  get messageClass()
  {
    if(this.messageType=="success")
    return "successMessage";
    else 
    return "alerMessage";
  }
  get result()
  {
      if(this.message!="")
      return this.message;
      else
      return null;
  }

}
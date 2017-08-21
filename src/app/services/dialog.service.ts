import { Component } from '@angular/core';
import { Params } from 'angular2-onsenui';

@Component({
  template: `
    <ons-alert-dialog modifier="material" #alert>
      <div class="alert-dialog-title">{{title}}</div>
      <div class="alert-dialog-content">
        <div [innerHTML]="message"></div>
      </div>
      <div class="alert-dialog-footer">
        <button class="alert-dialog-button" (click)="result(0); alert.hide()">OK</button>
        <button class="alert-dialog-button" (click)="result(-1); alert.hide()">Cancel</button>
      </div>
    </ons-alert-dialog>
  `
})
export class AlertDialogComponent {
  private callback: any;
  
  public title: String;
  public message: String;

  constructor(params: Params) {
	this.title = <string>params.at('title');
    this.message = <string>params.at('message');
    this.callback = params.at('callback');
  }
  
  result( n ){
	  this.callback(n);
  }
}
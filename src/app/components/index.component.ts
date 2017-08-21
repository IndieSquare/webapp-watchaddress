import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { IndieSquareActivity } from '../extends/indiesquare.extend';
import {
  ComponentRef,
  AlertDialogFactory,
  Params,
  onsNotification
} from 'angular2-onsenui';

@Component({
  selector: 'application',
  templateUrl: '../templates/index.template.html',
  styleUrls: ['../sass/index.scss']
})
export class IndexComponent extends IndieSquareActivity {
	constructor( router: Router, el: ElementRef ){
		super(router);
	}
	
	add() {
		let self = this;
	    onsNotification.prompt({
		  modifier: 'material',
	      message: 'Please enter the address you want to watch',
	      callback: address => {
	        if( address != null && address.length > 0 ){
		        this.idb.add('list', { 'address':address }, function(result, error){
					if( error ){
						console.error(error);
						return;
					}
					console.log('add it!');
					self.idb.update('current', { 'id': 1, 'address': address }, function(result, error){
						console.log('update:'+result+'; error='+error);
						self.router.navigate(['balance']);
					});
				});
		    }
	      }
	    });
	}
}
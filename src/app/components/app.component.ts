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
  templateUrl: '../templates/app.template.html',
  styleUrls: ['../sass/app.scss']
})
export class AppComponent extends IndieSquareActivity {
	private _el;
	public title = 'Watch Address';
  
  	constructor( router: Router, el: ElementRef ){
		super(router);
		console.log('AppComponent');
		
		this._el = el.nativeElement;
		
		let self = this;
		let loading = setInterval(function(){
			if( self.idb.prepared ){
				console.log('IDB prepared');
				clearInterval(loading);
				self.start();
			}
		}, 100);
	}
	
	add() {
		let self = this;
	    onsNotification.prompt({
		  modifier: 'material',
	      message: 'Please enter the address you want to watch',
	      cancelable: true,
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
						self.start();
					});
			  }
	      }
	    });
	}
	
	event(n){
		console.log(n);	
	}
	
	listUpdate( addresses ){
		let self = this;
		
		this._el.querySelector('.address-list').innerHTML = '';
		for( let i = 0; i < addresses.length; i++ ){
			let address = addresses[i].address;
			this._el.querySelector('.address-list').innerHTML += `
			    <li>
				  <a md-ink-ripple class="addressid${i}">${address}</a>
				</li>`;
		}
		for( let i = 0; i < addresses.length; i++ ){
			let address = addresses[i].address;
		    this._el.querySelector('.addressid' + i).addEventListener('click', function(){
		        self.idb.update('current', { 'id': 1, 'address': address }, function(result, error){
					console.log('update:'+result+'; error='+error);
					location.reload();
				});
	        });
	    }
	}
	
	start(){
		let self = this;
		this.idb.getAll('list', function(addresses, error){
			if( error ){
				console.error(error);
				return;
			}
			console.dir(addresses);
			if( addresses.length <= 0 ){
				self.router.navigate(['index']);
			}
			else{
				self.listUpdate(addresses);
				self.router.navigate(['balance']);
			}
		});
	}
}
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
  templateUrl: '../templates/balance.template.html',
  styleUrls: ['../sass/balance.scss']
})
export class BalanceComponent extends IndieSquareActivity {
	private _el: HTMLElement;
	
	private currentAddress = null;
	
	public isShowLoading: Boolean;
	
	constructor( router: Router, el: ElementRef ){
		super(router);
		console.log('BalanceComponent');
		
		this._el = el.nativeElement;
		this.isShowLoading = false;
		
		let self = this;
		let loading = setInterval(function(){
			if( self.idb.prepared ){
				console.log('IDB prepared');
				clearInterval(loading);
				self.showBalances();
			}
		}, 100);
	}
	
	listUpdate( balances ){
		this.isShowLoading = false;
		console.dir(balances);
		for( let i = 0; i < balances.length; i++ ){
			let data = balances[i];
			
			let token = data.token;
			let balance = data.balance;
			let unconfirmed_balance = data.unconfirmed_balance;
			let image = 'https://api.indiesquare.me/v2/tokens/' + token + '/image';
			
			if( token === 'BTC' || token === 'XCP' ) image = './assets/asset_' + token + '.png';
			
			if( unconfirmed_balance != 0 ){
				unconfirmed_balance = '(' + unconfirmed_balance + ')';
			}
			else unconfirmed_balance = '';
			
			this._el.querySelector('.content-list').innerHTML += `
			    <ons-list-item >
			      <div class="left">
			        <img class="list-item__thumbnail" src="${image}">
			      </div>
			      <div class="center">
			        <span class="list-item__title">${token}</span><span class="list-item__subtitle">${balance} ${unconfirmed_balance}</span>
			      </div>
			    </ons-list-item>`;
		}
	}
	
	showBalances(){
		let self = this;
		
		this.isShowLoading = true;
		this.idb.getByKey('current', function(result, error){
			console.log(result);
			self.currentAddress = result.address;
			self.idb.getAll('list', function(data, error){
				self._el.querySelector('#address').textContent = self.currentAddress;
				
				let indiesquare = self.IndiesquareSDK;
				indiesquare.getBalances({'source': self.currentAddress }, function(balances, error) {
					self.listUpdate(balances);
				});
			});
		});
	}
}
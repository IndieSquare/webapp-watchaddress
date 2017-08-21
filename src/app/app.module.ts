import { RouterModule, Routes }   from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { OnsenModule } from 'angular2-onsenui';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app.component';
import { IndexComponent } from './components/index.component';
import { BalanceComponent } from './components/balance.component';

import { AlertDialogComponent } from './services/dialog.service';

const appRoutes: Routes = [
	{ path: 'balance', component: BalanceComponent },
	{ path: 'index', component: IndexComponent },
	{ path: '', component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BalanceComponent,
    AlertDialogComponent
  ],
  imports: [
	OnsenModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [],
  bootstrap: [
  	AppComponent
  ],
  entryComponents: [
	AlertDialogComponent
  ],
  schemas: [
  	CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }

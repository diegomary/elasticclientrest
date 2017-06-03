import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ElclientComponent } from './elclient/elclient.component';
import { ObserveComponent } from './observe/observe.component';
import { AuthComponent } from './auth/auth.component';
import { UtilityComponent } from './utility/utility.component';
import {VideoComponent } from './video/video.component';
import {BooksComponent } from './books/books.component';

@NgModule({
  declarations: [ElclientComponent,ObserveComponent,AuthComponent,UtilityComponent,VideoComponent,BooksComponent],
  imports: [BrowserModule,FormsModule,HttpModule],
  providers: [],// Providers named here are global for the module
  bootstrap: [ElclientComponent]
})
export class AppModule { }

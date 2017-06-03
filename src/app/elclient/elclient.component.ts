// for bulk loads
// cat file.json | ./jq.exe -c '{"index": {}}, .' > test.json

import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { ElasticService } from '../services/elasticservice';
import $ from 'jquery/dist/jquery';
@Component({
  selector: 'app-elclient',
  providers: [ElasticService],
  templateUrl: './elclient.component.html',
  styleUrls: ['./elclient.component.css']
})
export class ElclientComponent implements OnInit, AfterViewInit  {

  constructor(private elasticservice: ElasticService,private http: Http) { }
  jqueryversion = `This site is using Jquery ${$.fn.jquery}`;
  username = "";
  queryPayload = ""
  password = "";
  authHeader = '';
  elasticserver = "http://localhost:9200/";
  postParameter = "";
  putParameter = "";
  deleteParameter = "";
  elasticresponse = "";
  getParameter = "";
  noAuth = false;
  authmode = "Auth";
  requestCheck = "";
  catTutorial = "to create a bulk file download jq and then run: cat origin.json | .\/jq.exe -c \'{\"index\": {}}, .\' > bulkfile.json"

  ngAfterViewInit() {}
  ngOnInit() { }
  cht() { this.authmode = this.noAuth === false? "Auth" :"Connect";  }
  queryChange(newValue) {
    try { let theJson = $.parseJSON(newValue); this.requestCheck = "goodRequest";}
    catch(err) {this.requestCheck = ""; console.log(err.message);}
  }
  bulkFilesChange(event)  {
    let fullUrlwitParam = this.elasticserver + this.postParameter;
    let files = event.target.files;
       if (files.length > 0) {
       let headers = new Headers();
       this.authHeader = "Basic " + btoa(this.username + ":" + this.password);
       if(!this.noAuth) headers.set("Authorization", this.authHeader);
       headers.set('Content-Type', 'multipart/form-data');
       let options = new RequestOptions({ headers: headers });
       this.http.post(fullUrlwitParam, files[0], options)
           .map(res => res.json())
           .catch(error => Observable.throw(error))
           .subscribe(
           data => {
              this.elasticresponse = JSON.stringify(data,undefined,4);
           },
           error => console.log(error),
           () => {}
         );}
  }
  authenticate() {
      // Unsafe no auth
      if(this.noAuth){
        this.elasticservice.authenticateServiceUnsafe(this.elasticserver)
        .subscribe( data => {
                  this.elasticresponse = JSON.stringify(data,undefined,4);
                }, (err) => { this.elasticresponse = err; } );
        return;
      }

      // SAfe Basic Auth
      if(!this.username || !this.password) return;

      this.authHeader = "Basic " + btoa(this.username + ":" + this.password);
      this.elasticservice.authenticateService(this.authHeader,this.elasticserver)
      .subscribe( data => {
                this.elasticresponse = JSON.stringify(data,undefined,4);
              }, (err) => { this.elasticresponse = err; } );
    }
  postQuery() {
    let fullUrlwitParam = this.elasticserver + this.postParameter;
      // Unsafe no auth
      if(this.noAuth){
        this.elasticservice.postVerbUnsafe(fullUrlwitParam, this.queryPayload)
        .subscribe( data => {
                  this.elasticresponse = JSON.stringify(data,undefined,4);
                }, (err) => { this.elasticresponse = err; } );
        return;
      }
      // SAfe Basic Auth
      if(!this.username || !this.password) return;
      this.authHeader = "Basic " + btoa(this.username + ":" + this.password);
      this.elasticservice.postVerb(this.authHeader, fullUrlwitParam, this.queryPayload)
      .subscribe( data => {
                this.elasticresponse = JSON.stringify(data,undefined,4);
              }, (err) => { this.elasticresponse = err; } );
    }
  putQuery() {
    let fullUrlwitParam = this.elasticserver + this.putParameter;
      // Unsafe no auth
      if(this.noAuth){
        this.elasticservice.putVerbUnsafe(fullUrlwitParam, this.queryPayload)
        .subscribe( data => {
                  this.elasticresponse = JSON.stringify(data,undefined,4);
                }, (err) => { this.elasticresponse = err; } );
        return;
      }
      // SAfe Basic Auth
      if(!this.username || !this.password) return;
      this.authHeader = "Basic " + btoa(this.username + ":" + this.password);
      this.elasticservice.putVerb(this.authHeader, fullUrlwitParam, this.queryPayload)
      .subscribe( data => {
                this.elasticresponse = JSON.stringify(data,undefined,4);
              }, (err) => { this.elasticresponse = err; } );
    }
  deleteQuery() {

    let fullUrlwitParam = this.elasticserver + this.deleteParameter;
      // Unsafe no auth
      if(this.noAuth){
        this.elasticservice.deleteVerbUnsafe(fullUrlwitParam, this.queryPayload)
        .subscribe( data => {
                  this.elasticresponse = JSON.stringify(data,undefined,4);
                }, (err) => { this.elasticresponse = err; } );
        return;
      }
      // SAfe Basic Auth
      if(!this.username || !this.password) return;
      this.authHeader = "Basic " + btoa(this.username + ":" + this.password);
      this.elasticservice.deleteVerb(this.authHeader, fullUrlwitParam, this.queryPayload)
      .subscribe( data => {
                this.elasticresponse = JSON.stringify(data,undefined,4);
              }, (err) => { this.elasticresponse = err; } );

  }
  getQuery() {
    let fullUrlwitParam = this.elasticserver + this.getParameter;
    // Unsafe no auth
    if(this.noAuth){
      this.elasticservice.getVerbUnsafe(fullUrlwitParam)
      .subscribe( data => {
                this.elasticresponse = JSON.stringify(data,undefined,4);
              }, (err) => { this.elasticresponse = err; } );
      return;
    }

    // SAfe Basic Auth
    if(!this.username || !this.password) return;

    this.authHeader = "Basic " + btoa(this.username + ":" + this.password);
    this.elasticservice.getVerb(this.authHeader,fullUrlwitParam)
    .subscribe( data => {
              this.elasticresponse = JSON.stringify(data,undefined,4);
            }, (err) => { this.elasticresponse = err; } );

  }

}

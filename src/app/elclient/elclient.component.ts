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
  binaryParameter = "";
  noAuth = false;
  authmode = "Auth";
  requestCheck = "";
  visitsLoaded = false;
  visitCount = 0;
  elasticLoading = true;
  elasticTutorials="";
  catTutorial = "";
  bulkTutorialFocus(){
    this.elasticTutorials= "How to build a bulk file. (a file with multiple documents)\r\n\r\nThe bulk operation is particularly delicate because the bulk file\r\nmust be prepared in the right way for the bulk to be successful.\r\nThe first thing to do is to create a file with the following format:\r\n\r\n{\"index\":{}}\r\n{\"name\":\"david\",\"email\":\"david@dmm888.com\"}\r\n{\"index\":{}}\r\n{\"name\":\"maria\",\"email\":\"maria@dgmail.com\"}\r\n{\"index\":{}}\r\n............\r\nThen we can use the following parameter in the query:\r\nindexname\/typename\/_bulk.\r\n\r\nIn order to produce the right bulk file just download the JQ tool from \r\nhttps:\/\/stedolan.github.io\/jq\/\r\n\r\nuse Jq for bulk in the following way run:\r\ncat origin.json | .\/jq.exe -c \'{\"index\": {}}, .\' > bulkfile.json\r\n";
  }
  deleteTutorialFocus(){
    this.elasticTutorials="delete tutorial";
  }
  getTutorialFocus(){
    this.elasticTutorials="get tutorial";
  }
  postTutorialFocus(){
    this.elasticTutorials="post tutorial";
  }
  putTutorialFocus(){
    this.elasticTutorials="put tutorial";
  }
  ngAfterViewInit() {

    this.elasticservice.manageVisits('https://jwt-diegomary.rhcloud.com/writevisit')
    .subscribe( data => {
      this.elasticservice.manageVisits('https://jwt-diegomary.rhcloud.com/getvisits')
      .subscribe( counter => {
          this.visitCount = JSON.parse(counter._body).counter;
          this.visitsLoaded = true;
          this.elasticLoading = false;
              }, (err) => { this.elasticresponse = err; this.elasticLoading = false; } );
      return;
            }, (err) => { this.elasticresponse = err; this.elasticLoading = false;} );
    return;

  }
  ngOnInit() {}
  cht() { this.authmode = this.noAuth === false? "Auth" :"Connect";  }
  queryChange(newValue) {
    try { let theJson = $.parseJSON(newValue); this.requestCheck = "goodRequest";}
    catch(err) {this.requestCheck = ""; console.log(err.message);}
  }
  bulkFilesChange(event)  {
    if(!this.binaryParameter) {this.elasticresponse = "no parameter supplied please specify for example  ->   indexname/typename/_bulk"; return;}
    this.elasticLoading = true;
    let fullUrlwitParam = this.elasticserver + this.binaryParameter;
    let files = event.target.files;
       if (files.length > 0) {
       let headers = new Headers();
       if(!this.noAuth){
          if(!this.username || !this.password) {this.elasticresponse = "Please authenticate first and leave credentials in the login panel";this.elasticLoading = false;return;}
          this.authHeader = "Basic " + btoa(this.username + ":" + this.password);
          headers.set("Authorization", this.authHeader);
         }
       headers.set('Content-Type', 'multipart/form-data');
       let options = new RequestOptions({ headers: headers });
       this.http.post(fullUrlwitParam, files[0], options)
           .map(res => res.json())
           .catch(error => Observable.throw(error))
           .subscribe(
           data => {
              this.elasticresponse = JSON.stringify(data,undefined,4);
              this.elasticLoading = false;
           },
           error => { console.log(error); this.elasticLoading = false;},
           () => {}
         );}
  }
  authenticate() {
      // Unsafe no auth
      this.elasticLoading = true;
      if(this.noAuth){
        this.elasticservice.authenticateServiceUnsafe(this.elasticserver)
        .subscribe( data => {
                  this.elasticresponse = JSON.stringify(data,undefined,4);
                  this.elasticLoading = false;
                }, (err) => { this.elasticresponse = err; this.elasticLoading = false;} );
        return;
      }

      // SAfe Basic Auth
      if(!this.username || !this.password) {this.elasticresponse = "Please provide valid credentials and leave them in the login panel";this.elasticLoading = false;return;}

      this.authHeader = "Basic " + btoa(this.username + ":" + this.password);
      this.elasticservice.authenticateService(this.authHeader,this.elasticserver)
      .subscribe( data => {
                this.elasticresponse = JSON.stringify(data,undefined,4);
                this.elasticLoading = false;
              }, (err) => { this.elasticresponse = err; this.elasticLoading = false; } );
    }
  postQuery() {
    if(!this.postParameter) {this.elasticresponse = "no parameter supplied please specify for example  ->   indexname/typename   and then provide a request query"; return;}
    let fullUrlwitParam = this.elasticserver + this.postParameter;
    this.elasticLoading = true;
      // Unsafe no auth

      if(this.noAuth){
        this.elasticservice.postVerbUnsafe(fullUrlwitParam, this.queryPayload)
        .subscribe( data => {
                  this.elasticresponse = JSON.stringify(data,undefined,4);
                  this.elasticLoading = false;
                }, (err) => { this.elasticresponse = err;this.elasticLoading = false;} );
        return;
      }
      // SAfe Basic Auth
      if(!this.username || !this.password) {this.elasticresponse = "Please authenticate first and leave credentials in the login panel";this.elasticLoading = false;return;}
      this.authHeader = "Basic " + btoa(this.username + ":" + this.password);
      this.elasticservice.postVerb(this.authHeader, fullUrlwitParam, this.queryPayload)
      .subscribe( data => {
                this.elasticresponse = JSON.stringify(data,undefined,4);
                this.elasticLoading = false;
              }, (err) => { this.elasticresponse = err;this.elasticLoading = false; } );
    }
  putQuery() {
    if(!this.putParameter) {this.elasticresponse = "no parameter supplied please specify for example  ->   indexname/typename   and then provide a request query"; return;}
    let fullUrlwitParam = this.elasticserver + this.putParameter;
      // Unsafe no auth
      this.elasticLoading = true;
      if(this.noAuth){
        this.elasticservice.putVerbUnsafe(fullUrlwitParam, this.queryPayload)
        .subscribe( data => {
                  this.elasticresponse = JSON.stringify(data,undefined,4);
                  this.elasticLoading = false;
                }, (err) => { this.elasticresponse = err; this.elasticLoading = false;} );
        return;
      }
      // SAfe Basic Auth
      if(!this.username || !this.password) {this.elasticresponse = "Please authenticate first and leave credentials in the login panel";this.elasticLoading = false;return;}
      this.authHeader = "Basic " + btoa(this.username + ":" + this.password);
      this.elasticservice.putVerb(this.authHeader, fullUrlwitParam, this.queryPayload)
      .subscribe( data => {
                this.elasticresponse = JSON.stringify(data,undefined,4);
                this.elasticLoading = false;
              }, (err) => { this.elasticresponse = err;this.elasticLoading = false; } );
    }
  deleteQuery() {
    if(!this.deleteParameter) {this.elasticresponse = "no parameter supplied please specify for example  ->   indexname"; return;}
    let fullUrlwitParam = this.elasticserver + this.deleteParameter;
      // Unsafe no auth
      this.elasticLoading = true;
      if(this.noAuth){
        this.elasticservice.deleteVerbUnsafe(fullUrlwitParam, this.queryPayload)
        .subscribe(data => {
                  this.elasticresponse = JSON.stringify(data,undefined,4);
                  this.elasticLoading = false;
                }, (err) => { this.elasticresponse = err;this.elasticLoading = false; } );
        return;
      }
      // SAfe Basic Auth
      if(!this.username || !this.password) {this.elasticresponse = "Please authenticate first and leave credentials in the login panel";this.elasticLoading = false;return;}
      this.authHeader = "Basic " + btoa(this.username + ":" + this.password);
      this.elasticservice.deleteVerb(this.authHeader, fullUrlwitParam, this.queryPayload)
      .subscribe( data => {
                this.elasticresponse = JSON.stringify(data,undefined,4);
                this.elasticLoading = false;
              }, (err) => { this.elasticresponse = err;this.elasticLoading = false; } );
  }
  getQuery() {
    if(!this.getParameter) {this.elasticresponse = "no parameter supplied please specify for example  ->   indexname/typename/_search"; return;}
    let fullUrlwitParam = this.elasticserver + this.getParameter;
    // Unsafe no auth
    this.elasticLoading = true;
    if(this.noAuth){
      this.elasticservice.getVerbUnsafe(fullUrlwitParam)
      .subscribe( data => {
                this.elasticresponse = JSON.stringify(data,undefined,4);
                this.elasticLoading = false;
              }, (err) => { this.elasticresponse = err; this.elasticLoading = false;} );
      return;
    }
    // SAfe Basic Auth
    if(!this.username || !this.password) {this.elasticresponse = "Please authenticate first and leave credentials in the login panel";this.elasticLoading = false;return;}
    this.authHeader = "Basic " + btoa(this.username + ":" + this.password);
    this.elasticservice.getVerb(this.authHeader,fullUrlwitParam)
    .subscribe( data => {
              this.elasticresponse = JSON.stringify(data,undefined,4);
              this.elasticLoading = false;
            }, (err) => { this.elasticresponse = err; this.elasticLoading = false;} );

  }

}

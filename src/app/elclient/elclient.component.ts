import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ElasticService } from '../services/elasticservice';
import $ from 'jquery/dist/jquery';
@Component({
  selector: 'app-elclient',
  providers: [ElasticService],
  templateUrl: './elclient.component.html',
  styleUrls: ['./elclient.component.css']
})
export class ElclientComponent implements OnInit, AfterViewInit  {

  constructor(private elasticservice: ElasticService) { }

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
  noAuth = false;
  authmode = "Auth";
  requestCheck = "";

  ngAfterViewInit() {}
  ngOnInit() {}
  cht() { this.authmode = this.noAuth === false? "Auth" :"Connect";  }
  queryChange(newValue) {
    try { let theJson = $.parseJSON(newValue); this.requestCheck = "goodRequest";}
    catch(err) {this.requestCheck = ""; console.log(err.message);}
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
}

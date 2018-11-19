import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import * as d3 from 'd3';
import { ElasticService } from '../services/elasticservice';
import $ from 'jquery/dist/jquery';
import {VideoComponent} from '../video/video.component'

@Component({
  selector: 'app-elclient',
  providers: [ElasticService],
  templateUrl: './elclient.component.html',
  styleUrls: ['./elclient.component.css']
})
export class ElclientComponent implements OnInit, AfterViewInit  {

  public constructor(private elasticservice: ElasticService,private http: Http) { }
  public childmessage : string = "I am passed from Parent to child component";
  public jqueryversion:string = `This site is using Jquery ${$.fn.jquery}`;
  public username = "elastic";
  public password = "changeme";
  public queryPayload = "";
  public authHeader:string = '';
  public elasticserver:string = "http://localhost:9200/";
  public postParameter:string = "";
  public putParameter:string = "";
  public deleteParameter:string = "";
  public elasticresponse:string = "";
  public getParameter:string = "";
  public binaryParameter:string = "";
  public noAuth:boolean = false;
  public authmode:string = "Auth";
  public requestCheck:string = "";
  public infoVisible:boolean = false;
  public visitsLoaded:boolean = false;
  public visitCount:number = 0;
  public elasticLoading:boolean = true;
  public elasticTutorials:string="";
  public catTutorial:string = "";
  public bulkTutorialFocus(){
    this.elasticTutorials= "How to build a bulk file. (a file with multiple documents)\r\n\r\nThe bulk operation is particularly delicate because the bulk file\r\nmust be prepared in the right way for the bulk to be successful.\r\nThe first thing to do is to create a file with the following format:\r\n\r\n{\"index\":{}}\r\n{\"name\":\"david\",\"email\":\"david@dmm888.com\"}\r\n{\"index\":{}}\r\n{\"name\":\"maria\",\"email\":\"maria@dgmail.com\"}\r\n{\"index\":{}}\r\n............\r\nThen we can use the following parameter in the query:\r\nindexname\/typename\/_bulk.\r\n\r\nIn order to produce the right bulk file just download the JQ tool from \r\nhttps:\/\/stedolan.github.io\/jq\/\r\n\r\nuse Jq for bulk in the following way run:\r\ncat origin.json | .\/jq.exe -c \'{\"index\": {}}, .\' > bulkfile.json\r\n";
  }
  public deleteTutorialFocus():void{
    this.elasticTutorials="delete tutorial";
  }
  public getTutorialFocus():void{
    this.elasticTutorials="get tutorial";
  }
  public postTutorialFocus():void{
    this.elasticTutorials="post tutorial";
  }
  public putTutorialFocus():void{
    this.elasticTutorials="put tutorial";
  }
  public ngAfterViewInit():void {


//setInterval(() => this.childmessage = new Date().toUTCString(), 500);

    /* this.elasticservice.manageVisits('https://jwt-diegomary.rhcloud.com/writevisit')
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
 */
  }
  public ngOnInit():void {

    var dv = d3.select(".bar")
    .selectAll("div")
    .data([12, 15, 8])
    dv.enter().append("div")
    //.text(function(d) { return d; })
    .attr("class","isto")
    .style("display","inline-block")
    .style("background-color","white")
    .style("vertical-align","bottom")
    .style("margin-right","2px")
    .style("width","100px")
    .style("height", function(d) {
					var barHeight = d * 5;
					return barHeight + "px";
				});
    dv.exit().remove();
  }
  public hideInfo():void {this.infoVisible = false;}
  public showInfo():void {this.infoVisible = true;}
  public cht():void { this.authmode = this.noAuth === false? "Auth" :"Connect";  }
  public queryChange(newValue:string):void {
    try { let theJson = $.parseJSON(newValue); this.requestCheck = "goodRequest";}
    catch(err) {this.requestCheck = ""; console.log(err.message);}
  }
  public bulkFilesChange(event:any) :void {
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
  public authenticate():void {
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
  public postQuery():void {
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
  public putQuery():void {
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
  public deleteQuery():void {
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
  public getQuery():void {
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

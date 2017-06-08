import { Injectable }  from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ElasticService {

  private headers:Headers;
  public constructor (private http: Http) { this.headers = new Headers(); }

  public manageVisits(apiVisits:string):any {
    return this.http.get(apiVisits)
      .map( res => { return res;})
      .catch(  (error) => {
        return Observable.throw(error);
       })
  }
  public authenticateService(basictoken:string, elasticserver:string):any {
    this.headers.set("Authorization",basictoken);
    return this.http.get(elasticserver,{headers:this.headers})

      .map( res => { return res.json();})
      .catch(  (error) => {
          if (error.status === 401) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
       })
  }
  public authenticateServiceUnsafe(elasticserver:string):any {
    return this.http.get(elasticserver)
      .map( res => { return res.json();})
      .catch(  (error) => {
          if (error.status === 401) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
       })
  }
  public postVerb(basictoken:string, elasticserver:string, rawData:string):any {

    this.headers.set("Authorization",basictoken);
    this.headers.set("Content-Type",'application/x-www-form-urlencoded');

    return this.http.post(elasticserver,rawData, {headers:this.headers})
      .map( res => { return res.json();})
      .catch(  (error) => {
          if (error.status === 401) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
       })
  }
  public postVerbUnsafe(elasticserver:string, rawData:string):any {
    this.headers.delete("Authorization");
    this.headers.set("Content-Type",'application/x-www-form-urlencoded');
    return this.http.post(elasticserver,rawData, {headers:this.headers})
      .map( res => { return res.json();})
      .catch(  (error) => {
          if (error.status === 401) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
       })
  }
  public putVerb(basictoken:string, elasticserver:string, rawData:string):any {

    this.headers.set("Authorization",basictoken);
    this.headers.set("Content-Type",'application/x-www-form-urlencoded');

    return this.http.put(elasticserver,rawData, {headers:this.headers})
      .map( res => { return res.json();})
      .catch(  (error) => {
          if (error.status === 401) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
       })
  }
  public putVerbUnsafe(elasticserver:string, rawData:string):any {
    this.headers.delete("Authorization");
    this.headers.set("Content-Type",'application/x-www-form-urlencoded');
    return this.http.put(elasticserver,rawData, {headers:this.headers})
      .map( res => { return res.json();})
      .catch(  (error) => {
          if (error.status === 401) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
       })
  }
  public deleteVerb(basictoken:string, elasticserver:string, rawData:string):any {

    this.headers.set("Authorization",basictoken);
    this.headers.set("Content-Type",'application/x-www-form-urlencoded');
    let reqOptions = new RequestOptions({
      headers: this.headers,
      body: rawData
    })

    return this.http.delete(elasticserver,reqOptions)
      .map( res => { return res.json();})
      .catch(  (error) => {
          if (error.status === 401) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
       })
  }
  public deleteVerbUnsafe(elasticserver:string, rawData:string):any {
    this.headers.delete("Authorization");
    this.headers.set("Content-Type",'application/x-www-form-urlencoded');
    let reqOptions = new RequestOptions({
      headers: this.headers,
      body: rawData
    })

    return this.http.delete(elasticserver,reqOptions)
      .map( res => { return res.json();})
      .catch(  (error) => {
          if (error.status === 401) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
       })
  }
  public getVerb(basictoken:string, elasticserver:string):any {
    this.headers.set("Authorization",basictoken);
    return this.http.get(elasticserver,{headers:this.headers})
      .map( res => { return res.json();})
      .catch(  (error) => {
          if (error.status === 401) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
       })
  }
  public getVerbUnsafe(elasticserver:string):any {
    return this.http.get(elasticserver)
      .map( res => { return res.json();})
      .catch(  (error) => {
          if (error.status === 401) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
       })
  }

}

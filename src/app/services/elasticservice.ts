import { Injectable }  from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ElasticService {
  public headers:Headers;

  constructor (private http: Http) { this.headers = new Headers(); }
  authenticateService(basictoken, elasticserver) {
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
  authenticateServiceUnsafe(elasticserver) {
    return this.http.get(elasticserver)
      .map( res => { return res.json();})
      .catch(  (error) => {
          if (error.status === 401) {
          return Observable.throw(error);
        }
        return Observable.throw(error);
       })
  }
  postVerb(basictoken, elasticserver, rawData) {

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
  postVerbUnsafe(elasticserver, rawData) {
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
  putVerb(basictoken, elasticserver, rawData) {

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
  putVerbUnsafe(elasticserver, rawData) {
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
  deleteVerb(basictoken, elasticserver, rawData) {

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
  deleteVerbUnsafe(elasticserver, rawData) {
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


  getVerb() {
    // return this.http.post('https://jwt-diegomary.rhcloud.com/api/authenticate',
    // JSON.stringify({username:'Diego Burlando',password:'password' }), {headers:this.headers})
    // .map((res:Response) => res.json());
  }


}

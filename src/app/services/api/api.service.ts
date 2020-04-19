import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL: string = "http://localhost:3000/";
  constructor(public http: HttpClient) { }

  /**
	 * read method
	 * @param {any} path
	 * @returns
	 * @memberOf ApiService
	 */

  get(endpoint: string): Observable<any> {
    let seq = this.http
      .get(this.API_URL + endpoint)
      .pipe(share());
    seq.subscribe(
      data => {
        console.log("*** get : " + endpoint);
        console.log(data);
      },
    );
    return seq;
  }

  post(endpoint: string, body: any): Observable<any> {
    let seq = this.http
      .post(this.API_URL + endpoint, body)
      .pipe(share());
    seq.subscribe(
      data => {
        console.log("*** post : " + endpoint);
        console.log(data);
      }
    );
    return seq;
  }

  put(endpoint: string, body: any): Observable<any> {
    let seq = this.http
      .put(this.API_URL + endpoint, body)
      .pipe(share());
    seq.subscribe(
      data => {
        console.log("*** put : " + endpoint);
        console.log(data);
      }
    );
    return seq;
  }

  patch(endpoint: string, body: any): Observable<any> {
    let seq = this.http
      .put(this.API_URL + endpoint, body)
      .pipe(share());
    seq.subscribe(
      data => {
        console.log("*** patch : " + endpoint);
        console.log(data);
      }
    );
    return seq;
  }

  delete(endpoint: string): Observable<any> {
    let seq = this.http
      .delete(this.API_URL + endpoint)
      .pipe(share());
    seq.subscribe(
      data => {
        console.log("*** delete : " + endpoint);
        console.log(data);
      }
    );
    return seq;
  }


	// /**
	//  * post method
	//  * @param {string} path
	//  * @param {*} body
	//  * @returns
	//  * @memberOf ApiService
	//  */
  // public post(path: string, body: any) {
  //   let endpoint = this.API_URL + path;
  //   return this.http.post(endpoint, body);
  // }


	// /**
	//  * delete method
	//  * @param {string} path
	//  * @returns
	//  * @memberOf ApiService
	//  */
  // public delete(path: string) {
  //   let endpoint = this.API_URL + path;
  //   return this.http.delete(endpoint);
  // }

	// /**
	//  * update method
	//  * @param {string} path 
	//  * @param {*} body
	//  * @returns
	//  * @memberOf ApiService
	//  */
  // public update(path: string, body: any) {
  //   let endpoint = this.API_URL + path;
  //   return this.http.put(endpoint, body);
  // }
}

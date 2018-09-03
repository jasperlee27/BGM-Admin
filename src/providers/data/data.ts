import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { GlobalAuthProvider } from '../global-auth/global-auth';

const serverHealthURL = 'http://178.128.50.224:3000';
const loginUrl = 'http://178.128.50.224:3000/login/';


@Injectable()
export class DataProvider {

  constructor(public http: HttpClient, private auth: GlobalAuthProvider) {
    console.log('Hello DataProvider Provider');
  }
  //get server health for guest view
  getServerHealth(): Observable<any> {
    return this.http.get(serverHealthURL);
  }
  
  //login WITHOUT 2FA
  postLogin(username, password): Observable<any> {
    const httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    var requestBody = new HttpParams().set("username", username).set("password", password);
    return this.http.post(loginUrl, requestBody, httpHeader);
  }
}
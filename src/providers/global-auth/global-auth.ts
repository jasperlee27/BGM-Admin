import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalAuthProvider {
  private username: String;
  private sessionToken: String;
  private accId: String;
  private twoFAstatus: Number;

  constructor(public http: HttpClient) {
    console.log('Hello GlobalAuthProvider Provider');
  }

  setUsername(username: String){
    this.username=username;
  }
  
  getUsername(){
    return this.username;
  }

  setAccId(accId){
    this.accId= accId;
  }

  getAccId(){
    return this.accId;
  }

  setSessionToken(sessionToken){
    this.sessionToken=sessionToken;
  }

  getSessionToken(){
    return this.sessionToken;
  }

  destroySessionToken(){
    this.sessionToken='';
  }

  set2FAStatus(twoFAstatus: Number){
    this.twoFAstatus= twoFAstatus;
  }

  get2FAStatus(){
    return this.twoFAstatus;
  }

}

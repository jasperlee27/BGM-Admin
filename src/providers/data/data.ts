import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { GlobalAuthProvider } from '../global-auth/global-auth';

//Login
const serverHealthURL = 'http://178.128.50.224:3000';
const loginUrl = 'http://178.128.50.224:3000/login/';

//Stake & Profits
const todayStakeURL = 'http://178.128.50.224:3000/admin/getStake';
const todayProfitURL = 'http://178.128.50.224:3000/admin/getProfit';

//For Game 1 APIs
const createGame1URL = 'http://178.128.50.224:3000/game1/create';
const game1WinnerListURL = 'http://178.128.50.224:3000/game1/getPotentialWinners';
const chooseGame1WinnerURL = 'http://178.128.50.224:3000/game1/chooseWinner';

//For Game 3 APIs
const game3PriceURL = 'http://178.128.50.224:3000/game3/setExitPrice';

//For Topup APIs
const adminTopUpsURL = 'http://178.128.50.224:3000/admin/getPastWithDepTransactions';
const appDepositURL = 'http://178.128.50.224:3000/admin/updatedeposittransactions';
const appWithdrawURL = 'http://178.128.50.224:3000/admin/updatewithdrawtransactions';

@Injectable()
export class DataProvider {

  constructor(public http: HttpClient, private auth: GlobalAuthProvider) {
    console.log('Hello DataProvider Provider');
  }
  //get server health for guest view
  getServerHealth(): Observable<any> {
    return this.http.get(serverHealthURL);
  }

  //Stake& Profits
  getTodayStake(): Observable<any> {
    return this.http.get(todayStakeURL);
  }

  getTodayProfit(): Observable<any> {
    return this.http.get(todayProfitURL);
  }

  //login WITHOUT 2FA
  postLogin(username, password): Observable<any> {
    const httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    var requestBody = new HttpParams().set("username", username).set("password", password);
    return this.http.post(loginUrl, requestBody, httpHeader);
  }

  //create new game for game 1
  postCreateGame1(accid, type, totalAmount): Observable<any> {
    const httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    var requestBody = new HttpParams().set("accid", accid).set("type", type).set("totalAmount", totalAmount);
    return this.http.post(createGame1URL, requestBody, httpHeader);
  }

  //get potential winenrs list to choose from
  postPotentialWinnersList(accid, type): Observable<any> {
    const httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    var requestBody = new HttpParams().set("accid", accid).set("type", type);
    return this.http.post(game1WinnerListURL, requestBody, httpHeader);
  }

  postChooseGame1Winner(accid, gameId, username): Observable<any> {
    const httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    var requestBody = new HttpParams().set("accid", accid).set("gameId", gameId).set("username", username);
    return this.http.post(chooseGame1WinnerURL, requestBody, httpHeader);
  }

  //set ending price for game 3
  postGame3Price(accid, exitPrice): Observable<any> {
    const httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    var requestBody = new HttpParams().set("accid", accid).set("exitPrice", exitPrice);
    return this.http.post(game3PriceURL, requestBody, httpHeader);
  }

  postOutstandingTopups(username, token, amount, type): Observable<any> {
    var sessionToken = this.auth.getSessionToken();
    var accId = this.auth.getAccId().toString();
    // var accId = "555";
    // console.log("session token posted " + sessionToken)
    const httpHeader = { headers: new HttpHeaders({ "Content-Type'": "application/x-www-form-urlencoded" }) };

    var requestBody = new HttpParams().set("username", username).set("token", token).set("transType", type).set("amount", amount).set("accid", accId);
    return this.http.post(adminTopUpsURL, requestBody, httpHeader);
  }

  postApproveDeposit(adminUser, password, transID): Observable<any> {
    var sessionToken = this.auth.getSessionToken();
    var accId = this.auth.getAccId().toString();

    // console.log("session token posted " + sessionToken)
    const httpHeader = { headers: new HttpHeaders({ "Content-Type'": "application/x-www-form-urlencoded" }) };

    var requestBody = new HttpParams().set("adminUser", adminUser).set("password", password).set("accid", accId).set("transID", transID);
    return this.http.post(appDepositURL, requestBody, httpHeader);
  }

  postApproveWithdraw(adminUser, password, transID): Observable<any> {
    var sessionToken = this.auth.getSessionToken();
    var accId = this.auth.getAccId().toString();

    // console.log("session token posted " + sessionToken)
    const httpHeader = { headers: new HttpHeaders({ "Content-Type'": "application/x-www-form-urlencoded" }) };

    var requestBody = new HttpParams().set("adminUser", adminUser).set("password", password).set("accid", accId).set("transID", transID);
    return this.http.post(appWithdrawURL, requestBody, httpHeader);
  }
}
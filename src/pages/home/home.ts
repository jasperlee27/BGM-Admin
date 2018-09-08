import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { GlobalAuthProvider } from '../../providers/global-auth/global-auth';
import { DataProvider } from '../../providers/data/data';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  viewType = 'Profits';
  profitsArray: Array<any>;
  stakesArray: Array<any>;
  todayProfits: number;
  todayStakes: number;
  //to do OnRefresh
  constructor(public navCtrl: NavController, private auth: GlobalAuthProvider, private dataProvider: DataProvider, public alertCtrl: AlertController) {

  }
  ionViewWillEnter() {
    this.loadData();
  }


  toggleSegment($event) {
    console.log("Chosen this tab " + $event.value)
  }

  loadData() {

    this.profitsArray = new Array<any>();
    this.stakesArray = new Array<any>();
    this.todayStakes = 0;
    this.todayProfits = 0;

    //Load Profits
    this.dataProvider.getTodayProfit().subscribe(data => {
      console.log("what is data length " + data.length);
      //make sure not empty
      if (data.length !== 0) {
        console.log("received " + data[0]._id);
        for (var i = 0; i < data.length; i++) {
          this.todayProfits -= parseInt(data[i].profit);
          var user = {
            "username": data[i]._id,
            "profit": parseInt(data[i].profit),
          }
          //push array
          this.profitsArray.push(user);
        }
      }
    }, (err: HttpErrorResponse) => {
      console.log("Error logged " + err);

      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        let alert = this.alertCtrl.create({
          title: 'ERROR',
          subTitle: 'Server cannot be reached at this time. <br> Please try again later',
          buttons: ['OK']
        });

        alert.present();
        console.log("Server-side error occured.");
      }
    });


    //Load Stake
    this.dataProvider.getTodayStake().subscribe(data => {
      console.log("what is data length " + data.length);
      //make sure not empty
      if (data.length !== 0) {
        console.log("received " + data[0]._id);
        for (var i = 0; i < data.length; i++) {
          this.todayStakes += parseInt(data[i].stake);
          var user = {
            "username": data[i]._id,
            "stake": parseInt(data[i].stake),
          }
          //push array
          this.stakesArray.push(user);
        }
      }
    }, (err: HttpErrorResponse) => {
      console.log("Error logged " + err);

      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        let alert = this.alertCtrl.create({
          title: 'ERROR',
          subTitle: 'Server cannot be reached at this time. <br> Please try again later',
          buttons: ['OK']
        });

        alert.present();
        console.log("Server-side error occured.");
      }
    });
  }

  logout() {
    this.auth.destroySessionToken();
    console.log("After destroying " + this.auth.getSessionToken());
    this.navCtrl.setRoot(LoginPage);
  }

  itemTapped($event, user, type) {
    if (type==='profits'){
      console.log("Clicked on: " + user.username + " w profit: " + user.profit);
    }

    else {
      console.log("Clicked on: " + user.username + " w stake: " + user.stake);
    }
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { GlobalAuthProvider } from '../../providers/global-auth/global-auth';

/**
 * Generated class for the TopUpsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-top-ups',
  templateUrl: 'top-ups.html',
})
export class TopUpsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, private auth: GlobalAuthProvider) {
  }
  ngOnInit() {
    this.getAllOutstanding();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopUpsPage');
  }

  getAllOutstanding() {
    this.dataProvider.postOutstandingTopups(this.auth.getAccId()).subscribe(data => {
      // receive successfully

      console.log("Acc id " + this.auth.getAccId());
      console.log("Received outstanding top ups here  " + JSON.stringify(data.data[0]));


      // for (var i = 0; i < data.data.length; i++) {
      //   //FOR loop iterate all and form objects//
      //   //--STORE TOKEN--
      //   // console.log("timestamp of first order " + data.orders[i].updated);
      //   //convert time stamp
      //   var indToken = data.data[i].token;
      //   // console.log("this is token " + indToken);
      //   //--STORE T/Amt--
      //   var indAmt = "[" + data.data[i].transType.substring(0, 1) + "] " + data.data[i].amount;
      //   // console.log("this is token " + indAmt);
      //   //--STORE Status--
      //   var indStatus = data.data[i].status;
      //   // console.log("this is token " + indStatus);
      //   // console.log("profit of first order " + data.orders[i].profit)
      //   var singleTrans = {
      //     "token": indToken.toUpperCase(),
      //     "amount": indAmt,
      //     "status": indStatus
      //   }
      //   //push array
      //   // this.outstandingTopups.push(singleTrans);
      //   // console.log("Display historical game" + this.historicalGames[i].time + " gameID = " + this.historicalGames[i].gameID + " profit = " + this.historicalGames[i].profit);
      //   // console.log("historical game name size "  + this.historicalGames.length);
      // }
    },
      err => {
        console.log("Error occured while getting past top ups");
        console.log(err);
      });
  }
}



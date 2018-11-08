import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { GlobalAuthProvider } from '../../providers/global-auth/global-auth';
import { DrawBtcWinnerPage } from '../draw-btc-winner/draw-btc-winner';
import { DrawEthWinnerPage } from '../draw-eth-winner/draw-eth-winner';

/**
 * Generated class for the JackpotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jackpot',
  templateUrl: 'jackpot.html',
})
export class JackpotPage {
  amountBTCtix;
  amountETHtix;
  currETHGameID;
  currBTCGameID;
  currBTCtix;
  totalBTCtix;
  currETHtix;
  totalETHtix;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, private auth: GlobalAuthProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JackpotPage');
  }

  ionViewWillEnter(){
    this.updateGameStatus();
  }


  updateGameStatus(){
    this.dataProvider.postJackpotStatus().subscribe(data => {
      if (data.status === 200) {
        //BTC updates
        this.currBTCGameID = data.data[1].gameName;
        this.currBTCtix = data.data[1].currentAmount;
        this.totalBTCtix = data.data[1].totalAmount;

        //ETH updates
        this.currETHGameID = data.data[0].gameName;
        this.currETHtix = data.data[0].currentAmount;
        this.totalETHtix = data.data[0].totalAmount;
      }
    },
      err => {
        console.log("Error occured while retrieving game 1 status");
        console.log(err);
      });
  }

  createGame(type: String) {
    console.log("creating game of type " + type);
    var amountToPost;

    if (type === 'BTC') {
      amountToPost = this.amountBTCtix;
    }

    else {
      amountToPost = this.amountETHtix;
    }


    this.dataProvider.postCreateGame1(this.auth.getAccId(), type, amountToPost).subscribe(data => {
      //parse response from server SUCCESS
      console.log("Game Created Successfully");
      let alert = this.alertCtrl.create({
        title: 'SUCCESS',
        subTitle: 'New ' + type + ' game created at: ' + data.gameName + " with " + amountToPost + ' tickets',
        buttons: ['OK']
      });
      alert.present();
      this,this.updateGameStatus();
    },
      err => {
        if (err.status === 0) {
          let alert = this.alertCtrl.create({
            title: 'ERROR',
            subTitle: 'Server cannot be reached at this time. <br> Please try again later',
            buttons: ['OK']
          });

          alert.present();
          console.log("Hit Error 0");
        }

        else {
          console.log("Error occured while creating new game");
        }

        console.log(err);
      });

  }

  chooseWinner(type: String) {
    console.log("choosing winner of type " + type);

    if (type==='BTC'){
      this.navCtrl.push(DrawBtcWinnerPage);
    }

    else if (type==='ETH'){
      this.navCtrl.push(DrawEthWinnerPage);
    }

    else{
      console.log("Type not specified, should not come here");
    }
  }
}

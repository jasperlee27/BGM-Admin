import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { GlobalAuthProvider } from '../../providers/global-auth/global-auth';

/**
 * Generated class for the DrawBtcWinnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-draw-btc-winner',
  templateUrl: 'draw-btc-winner.html',
})
export class DrawBtcWinnerPage {
  gameId;
  potentialWinners: Array<any>;
  selectedUser;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, private auth: GlobalAuthProvider, private alertCtrl: AlertController) {
    
  }

  //going to enter call post to retrieve list
  ionViewWillEnter(){
    this.potentialWinners = new Array<any>();
    this.dataProvider.postPotentialWinnersList(this.auth.getAccId(), 'BTC').subscribe(data => {
      //parse response from server SUCCESS
      console.log("Get potential winners successfully");

      for (var i = 0; i < data.data.length; i++) {
        var user = {
          "username": data.data[i]._id,
          "count": data.data[i].count,
        }
        //push array
        this.potentialWinners.push(user);
      }
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
          console.log("Error occured while getting potential winners list");
        }

        console.log(err);
      });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DrawBtcWinnerPage');
  }

  itemTapped($event, user){
    console.log(user.username);
    this.selectedUser= user.username;
  }
}

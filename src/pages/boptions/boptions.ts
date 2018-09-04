import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GlobalAuthProvider } from '../../providers/global-auth/global-auth';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the BoptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boptions',
  templateUrl: 'boptions.html',
})
export class BoptionsPage {
  endPrice;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, private auth: GlobalAuthProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoptionsPage');
  }


  setEndPrice(){
    console.log("Setting end price as " + this.endPrice);

    this.dataProvider.postGame3Price(this.auth.getAccId(), this.endPrice).subscribe(data => {
      //parse response from server 
      if (parseInt(data.status) === 200) {
        console.log("Set game price successful at: " + this.endPrice);
      }
      let alert = this.alertCtrl.create({
        title: 'SUCCESS',
        subTitle: 'Game price set at ' + this.endPrice,
        buttons: ['OK']
      });

      alert.present();
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
          console.log("Error occured while setting game price");
        }

        console.log(err);
      });
  }
  
}

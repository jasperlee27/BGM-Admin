import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { GlobalAuthProvider } from '../../providers/global-auth/global-auth';

/**
 * Generated class for the BankProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bank-profile',
  templateUrl: 'bank-profile.html',
})
export class BankProfilePage {

  bankType = "";
  bankDetails = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, private auth: GlobalAuthProvider, private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.getCurrDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankProfilePage');
  }

  getCurrDetails() {
    this.dataProvider.postCurrentBDetails(this.auth.getAccId()).subscribe(data => {
      //parse response from server 
      this.bankType = data.bankType;
      this.bankDetails = data.bankDetails;

    },
      err => {
        console.log(err);
      });
  }

  onSubmit(myForm) {
    // console.log("Submitting " + JSON.stringify(myForm.value));
    this.updateBDetails(myForm.value.bankType, myForm.value.bankNum);
  }

  updateBDetails(bType, bDetails) {
    this.dataProvider.postSetBDetails(this.auth.getAccId(), bType, bDetails).subscribe(data => {
      //parse response from server 
      this.bankType = data.bankType;
      this.bankDetails = data.bankDetails;
      let alert = this.alertCtrl.create({
        title: 'SUCCESS',
        subTitle: 'Bank Details Updated',
        buttons: ['OK']
      });
      alert.present();
    },
      err => {
        console.log(err);
      });
  }

}

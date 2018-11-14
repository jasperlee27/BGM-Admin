import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { GlobalAuthProvider } from '../../providers/global-auth/global-auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  enteredPassword;
  passwordType: string = 'password';
  passwordIcon: string = 'eye';
  usernameInput: string = 'admin';
  passwordInput: string = 'password';

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, private auth: GlobalAuthProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    var usernameToPost = this.usernameInput;

    if (usernameToPost != null) {
      this.auth.setUsername(usernameToPost.toLowerCase());
      console.log("before lower  case " + usernameToPost);
      usernameToPost = usernameToPost.toLowerCase();
      console.log("after lower case " + usernameToPost);
    }

    this.dataProvider.postLogin(usernameToPost, this.passwordInput).subscribe(data => {
      //parse response from server 
      if (parseInt(data.status) === 200) {
        this.auth.setAccId(data._id);
        console.log("Login with ID: " + this.auth.getAccId());
        this.auth.setSessionToken(data.token);
        console.log("Session token: " + this.auth.getSessionToken());
        this.auth.set2FAStatus(parseInt(data.require2FA));

        this.navCtrl.setRoot(HomePage);

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
          console.log("Error occured while logging in or not authorized");
        }

        console.log(err);
      });

    // this.navCtrl.setRoot(TabsPage);
    console.log("login function activated");
  }

  showHide(): any {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye';
  }

}

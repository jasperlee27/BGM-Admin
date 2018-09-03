import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { GlobalAuthProvider } from '../../providers/global-auth/global-auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private auth: GlobalAuthProvider) {

  }

  logout(){
    this.auth.destroySessionToken();
    console.log("After destroying " + this.auth.getSessionToken());
    this.navCtrl.setRoot(LoginPage);
  }
}

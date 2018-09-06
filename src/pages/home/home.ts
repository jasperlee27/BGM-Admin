import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { GlobalAuthProvider } from '../../providers/global-auth/global-auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  viewType='Stakes';

  constructor(public navCtrl: NavController, private auth: GlobalAuthProvider) {

  }

  toggleSegment($event){
    console.log("Chosen this tab " + $event.value)
  }

  logout(){
    this.auth.destroySessionToken();
    console.log("After destroying " + this.auth.getSessionToken());
    this.navCtrl.setRoot(LoginPage);
  }
}

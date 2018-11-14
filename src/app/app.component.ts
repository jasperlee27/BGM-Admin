import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { GlobalAuthProvider } from '../providers/global-auth/global-auth';
import { JackpotPage } from '../pages/jackpot/jackpot';
import { HashingPage } from '../pages/hashing/hashing';
import { BoptionsPage } from '../pages/boptions/boptions';
import { TopUpsPage } from '../pages/top-ups/top-ups';
import { BankProfilePage } from '../pages/bank-profile/bank-profile'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: GlobalAuthProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Jackpot', component: JackpotPage },
      { title: 'Hashing', component: HashingPage },
      { title: 'Options', component: BoptionsPage },
      { title: 'Top Ups', component: TopUpsPage },
      { title: 'Bank Details', component: BankProfilePage },
      { title: 'Logout', component: null }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component) {
      this.nav.setRoot(page.component);
    }
    else {
      this.auth.destroySessionToken();
      console.log("Logout called here " + this.auth.getSessionToken());
      // logout & redirect to login
      this.nav.setRoot(LoginPage);
    }
  }
}

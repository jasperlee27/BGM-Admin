import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { DataProvider } from '../providers/data/data';
import { GlobalAuthProvider } from '../providers/global-auth/global-auth';
import { JackpotPage } from '../pages/jackpot/jackpot';
import { HashingPage } from '../pages/hashing/hashing';
import { BoptionsPage } from '../pages/boptions/boptions';
import { DrawBtcWinnerPage } from '../pages/draw-btc-winner/draw-btc-winner';
import { DrawEthWinnerPage } from '../pages/draw-eth-winner/draw-eth-winner';
import { TopUpsPage } from '../pages/top-ups/top-ups';
import { BankProfilePage } from '../pages/bank-profile/bank-profile'

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    JackpotPage,
    DrawBtcWinnerPage,
    DrawEthWinnerPage,
    HashingPage,
    BoptionsPage,
    TopUpsPage,
    BankProfilePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    JackpotPage,
    DrawBtcWinnerPage,
    DrawEthWinnerPage,
    HashingPage,
    BoptionsPage,
    TopUpsPage,
    BankProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider,
    GlobalAuthProvider
  ]
})
export class AppModule { }

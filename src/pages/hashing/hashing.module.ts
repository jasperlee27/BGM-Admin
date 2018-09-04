import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HashingPage } from './hashing';

@NgModule({
  declarations: [
    HashingPage,
  ],
  imports: [
    IonicPageModule.forChild(HashingPage),
  ],
})
export class HashingPageModule {}

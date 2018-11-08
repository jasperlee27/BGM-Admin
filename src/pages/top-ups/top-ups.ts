import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { GlobalAuthProvider } from '../../providers/global-auth/global-auth';

/**
 * Generated class for the TopUpsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-top-ups',
  templateUrl: 'top-ups.html',
})
export class TopUpsPage {
  isDepositChecked = true;
  isWithdrawalChecked = true;
  allTopUps: Array<any>;
  selectedUser;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, private auth: GlobalAuthProvider, private alertCtrl: AlertController) {
  }

  ngOnInit() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopUpsPage');
  }

  onSubmit(myForm) {
    if (this.isDepositChecked && this.isWithdrawalChecked) {
      // console.log("Both types");
      this.getAllTransactions(myForm.value.username, myForm.value.token, myForm.value.amount, "");
    }

    else if (this.isDepositChecked) {
      this.getAllTransactions(myForm.value.username, myForm.value.token, myForm.value.amount, "Deposit");
    }

    else if (this.isWithdrawalChecked) {
      this.getAllTransactions(myForm.value.username, myForm.value.token, myForm.value.amount, "Withdrawal");
    }

    else {
      console.log("ERROR");
    }

  }

  getAllTransactions(username, token, amount, type) {
    this.allTopUps = new Array<any>();
    this.dataProvider.postOutstandingTopups(username.toLowerCase(), token.toUpperCase(), amount, type).subscribe(data => {
      // receive successfully

      console.log("Acc id " + this.auth.getAccId());
      console.log("Received outstanding top ups here  " + JSON.stringify(data.data[0]));

      for (var i = 0; i < data.data.length; i++) {

        var username = data.data[i].username;
        var token = data.data[i].token;
        var amount = data.data[i].amount;
        var type = data.data[i].transType.substring(0, 3);
        var fullType = data.data[i].transType;
        var transId = data.data[i]._id;
        var bankType = "";
        var bankNum = "";

        if (fullType.toUpperCase() === "WITHDRAWAL") {
          bankType = data.data[i].bankType;
          bankNum = data.data[i].bankNum;
        }

        else {
          ;
        }
        var singleTrans = {
          "username": username,
          "token": token,
          "amount": amount,
          "type": type,
          "transId": transId,
          "fullType": fullType,
          "bankType": bankType,
          "bankNum": bankNum

        }

        this.allTopUps.push(singleTrans);
      }
    },
      err => {
        console.log("Error occured while getting past top ups");
        console.log(err);
      });
  }

  itemTapped($event, trans) {
    console.log(trans.username);
    console.log("Trans ID " + trans.transId);
    this.processTransaction(trans.username, trans.amount, trans.fullType, trans.transId, trans.bankType, trans.bankNum);
  }



  processTransaction(userReq, amount, type, transId, bankType, bankNum) {

    type = type.toLowerCase();

    var messageToDisplay = "";
    if (type.toUpperCase() === "WITHDRAWAL"){
      messageToDisplay="Have you transferred amount of " + amount + " to Bank " + bankType + " | " + bankNum + " ?";
    }

    else {
      messageToDisplay = 'Enter authorizing username and password to confirm ' + type + ' for user ' + userReq + ' for amount ' + amount;
    }
    
    let alert = this.alertCtrl.create({
      title: 'AUTHORIZATION',
      message: messageToDisplay,
      inputs: [
        {
          name: 'Username',
          placeholder: 'Username'
        },
        {
          name: 'Password',
          placeholder: 'Password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data) => {
            console.log('Cancelled approval of ' + amount + ' to ' + userReq);
          }
        },
        {
          text: 'Submit',
          handler: (data) => {

            if (type === "deposit") {
              //process deposit
              this.dataProvider.postApproveDeposit(data.Username, data.Password, transId).subscribe(resReceived => {
                //receive successfully
                console.log("status " + data.status)
                console.log("Successfully approved transaction of " + amount + ' & user now has ' + parseFloat(resReceived.userAccountValue).toFixed(1) + ' OT');
                let alert = this.alertCtrl.create({
                  title: 'Success',
                  subTitle: 'User now has ' + parseFloat(resReceived.userAccountValue).toFixed(1) + ' OT',
                  buttons: ['OK']
                });
                alert.present();
                alert.onDidDismiss(() => {
                  this.allTopUps = new Array<any>();
                })
              },
                err => {
                  console.log("Error occured while approving deposit");
                  console.log(err);
                  let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Error occurred while approving deposit.<br>Please try again later.',
                    buttons: ['OK']
                  });
                  alert.present();
                });

            }

            //withdrawal
            else {
              this.dataProvider.postApproveWithdraw(data.Username, data.Password, transId).subscribe(resReceived => {
                //receive successfully
                console.log("status " + data.status)
                console.log("Successfully approved transaction of " + amount + '. Please check you have transferred to user.');
                let alert = this.alertCtrl.create({
                  title: 'Success',
                  subTitle: 'Please check that you have transferred to user.',
                  buttons: ['OK']
                });
                alert.present();
                alert.onDidDismiss(() => {
                  this.allTopUps = new Array<any>();
                })
              },
                err => {
                  console.log("Error occured while approving withdrawal");
                  console.log(err);
                  let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Error occurred while approving withdrawal.<br>Please try again later.',
                    buttons: ['OK']
                  });
                  alert.present();
                });
            }
          }
        }
      ]
    });

    alert.present();
  }

}


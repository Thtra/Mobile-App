import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  progress = 0;

  // constructor() {
  //   setInterval(() => {
  //     this.progress += .1;
  //   }, 1000)
  // }
  constructor(public actionSheetController: ActionSheetController, public alertController: AlertController) {setInterval(() => {
    this.progress += .1;
  }, 1000)}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Button Alert',
      subHeader: 'Oops!',
      message: 'The add food button as not been implemented yet!',
      buttons: ['OK'],
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Delete Food (Not Implemented Yet)',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Edit Calories (Not Implemented Yet)',
        icon: 'add',
        handler: () => {
          console.log('Share clicked');
        }
      }

      , {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
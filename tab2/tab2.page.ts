import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

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
  constructor(public actionSheetController: ActionSheetController) {setInterval(() => {
    this.progress += .1;
  }, 1000)}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Delete Food',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Edit Calories',
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
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';


import { CrudService } from './../service/crud.service';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page{

  progress = 0;



  foods: any;
  foodName: string;
  foodCalories: number;
  timestamp: string;
  
  // constructor() {
  //   setInterval(() => {
  //     this.progress += .1;
  //   }, 1000)
  // }

  constructor(
              private crudService: CrudService,
              public actionSheetController: ActionSheetController) {setInterval(() => {
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



  ionViewWillEnter(){
    this.crudService.read_Food().subscribe(data => {
      this.foods = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Calories: e.payload.doc.data()['Calories'],
        };
      })
      console.log(this.foods);
    });
  }


  CreateRecord(){
    let record = {};
    record['Name'] = this.foodName;
    record['Calories'] = this.foodCalories;
    this.crudService.create_newFood(record).then(resp =>{
      this.foodName ="";
      this.foodCalories = undefined;
      console.log(resp);
    })
    .catch(error => {
      console.log(error);
    });
  }

  RemoveRecord(rowID){
    this.crudService.delete_Food(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditCalories = record.Calories;
  }

  UpdateRecord(recordRow){
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Calories'] = recordRow.EditCalories;
    this.crudService.update_Food(recordRow.id,record);
    recordRow.isEdit = false;
  }

  
}
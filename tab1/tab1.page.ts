import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';


import { CrudService } from './../service/crud.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  progress = 0;



  foods: any;
  foodName: string;
  foodCalories: number;

  constructor(
    private crudService: CrudService,
    public actionSheetController: ActionSheetController) {setInterval(() => {
    this.progress += .1;
  }, 1000)}


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

}

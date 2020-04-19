import { Component, OnInit } from '@angular/core';

import { AngularFireAuth} from '@angular/fire/auth'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController, 
    public router: Router) { }



    username: string = ""
    password: string = ""
    newpassword: string = ""

    
  ngOnInit() {
  }

}

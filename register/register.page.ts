import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router'
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  
  username: string = ""
  password: string = ""
  cpassword: string = ""
  
  // dont know if i need this user statement
  // user = firebase.auth().currentUser;

  constructor(
              public afAuth: AngularFireAuth,
              public alert: AlertController, 
              public router: Router) {}
  ngOnInit() {
  }


  
  async login(){
    const {username, password} = this
    try {
        const res = await this.afAuth.signInWithEmailAndPassword(username + '@gmail.com', password)
        this.showAlert("Success!","You're logged in!")
        this.router.navigate(['/tabs'])
    } catch(err) {
      console.dir(err)
      if(err.code === 'auth/user-notfound') {
        console.log("User not found")
      }
    }

  }


  async register(){
    const { username, password, cpassword } = this
    if(password !== cpassword) {
      this.showAlert("Error!", "Passwords don't match")
      return console.error("Passwords don't match")
    }

    try{
      const res = await this.afAuth.createUserWithEmailAndPassword(username + '@gmail.com', password)
      console.log(res)
      this.showAlert("Success!","You're registered!")
      this.router.navigate(['/tabs'])
    } catch(error){
      console.dir(error)
      this.showAlert("Error", error.message)
    }


  }

  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })

    await alert.present()
  }


  async logout(){
    try{
    const log = await this.afAuth.signOut();
    this.router.navigate(['/register'])
    this.showAlert("Success!","You're now logged off!")
    } catch(error){
      console.dir(error)
      this.showAlert("Error", error.message)
    }
    
  }

  async resetPassword(){
    const {username} = this
    try{
      const res = await this.afAuth.sendPasswordResetEmail(username + '@gmail.com')
      this.showAlert("Password Reset", "Check your email to change your password!")
    }catch(error){
      console.dir(error)
      this.showAlert("Error", error.message)
    }

}
  // # I think we need an if / else to do "if user logged in recently" "else make them reauthenticate"



  //  async changePassword(){
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //      const {password} = this
  //    try{
  //      const res = await this.afAuth.password
  //    }catch(error){
  //      console.dir(error)
  //      this.showAlert("Error", error.message)
  //    }
  //     } else {
  //       // No user is signed in.
  //     }
  //   });
    
     
  //  }

}











// import { Component, OnInit } from '@angular/core';
// import { AngularFireAuth} from '@angular/fire/auth'
// import { auth } from 'firebase/app'
// import { AlertController } from '@ionic/angular'
// import { getMaxListeners } from 'cluster';
// @Component({
//   selector: 'app-register',
//   templateUrl: './register.page.html',
//   styleUrls: ['./register.page.scss'],
// })
// export class RegisterPage implements OnInit {

//   user={
//     email: '',
//     password: '',
//     cpassword: ''
//   }

//   username: string = ""
//   password: string = ""
//   cpassword: string = ""

//   constructor(
//               public afAuth: AngularFireAuth,
//               public alert: AlertController ) { }

//   ngOnInit() {
//   }

//   async register(){
//  //   const { username, password, cpassword } = this
//     if(this.user.password !== this.user.cpassword) {
//       this.showAlert("Error!", "Passwords don't match")
//       return console.error("Passwords don't match")
//     }

//     try{
//       const res = await this.afAuth.createUserWithEmailAndPassword(this.user.email + '@gmail.com', this.user.password)
//       console.log(res)
//       this.showAlert("Success!","You're registered!")
//     } catch(error){
//       console.dir(error)
//       this.showAlert("Error", error.message)
//     }


//   }

//   async showAlert(header: string, message: string){
//     const alert = await this.alert.create({
//       header,
//       message,
//       buttons: ["Ok"]
//     })

//     await alert.present()
//   }
// }

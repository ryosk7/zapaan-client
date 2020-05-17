import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private afAuth: AngularFireAuth,
    public ngZone: NgZone,
    public router: Router,
  ) { }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['home']);
        })
    }).catch((error) => {
      window.alert(error)
    })
  }

  // FIXME: 今はいらないけど、今後いるかも
  // logoutUser() {
  //   return new Promise((resolve, reject) => {
  //     if (this.afAuth.currentUser) {
  //       this.afAuth.signOut()
  //         .then(() => {
  //           console.log("LOG Out");
  //           resolve();
  //         }).catch((error) => {
  //           reject();
  //         });
  //     }
  //   })
  // }

  userDetails() {
    return this.afAuth.user
  }
}

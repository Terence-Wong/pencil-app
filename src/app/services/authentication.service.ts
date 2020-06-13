import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { User } from "./user";
import { UserService } from "./user.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;
  user: any;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private userdb: UserService
    ) { 
       /* Saving user data in localstorage when 
      logged in and setting up null when logged out */
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  get userUID(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null ? user.uid : null;
  }

  get data(): string {
    return this.userData.html;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then(result => {
      console.log("auth token should be ready by now");
      this.SetUserData(this.user).then(() => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      });
    });
  }  

  // Auth logic to run auth providers
  AuthLogin(provider) {
    //
    return auth().signInWithPopup(provider)
    .then((result) => {
      this.user = result.user;
    }).catch((error) => {
      window.alert(error)
    })
  }
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.collection('users').doc(`${user.uid}`);
    console.log("setUser called");
    //create/load user data 
    return userRef.ref.get().then(userCloud => {
      console.log("This is me trying to get the user");
      if (!userCloud.exists){
        console.log("user doesnt exist yet");
        this.userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          html: ""
        }
        userRef.set(this.userData, {
          merge: true
        })
      }else{
        console.log("user exists! here it is");
        let data = userCloud.data();
        console.log(data);
        this.userData = {
          uid: data.uid,
          email: data.email,
          displayName: data.displayName,
          photoURL: data.photoURL,
          emailVerified: data.emailVerified,
          html: data.html
        }
      }
    }).catch(err => {
      console.log("error getting the user");
    });
  
  }
  Save(data: string){
    const userRef: AngularFirestoreDocument<any> = this.afs.collection('users').doc(`${this.userData.uid}`);
    console.log("saved data:");
    console.log(data);
    userRef.update({
      html: data
    });
  }
  // Sign out
  SignOutSave(data: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.collection('users').doc(`${this.userData.uid}`);
    console.log("saved data:");
    console.log(data);
    userRef.update({
      html: data
    });

    return auth().signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigate(['login']);
      })
      localStorage.removeItem('user');
    })
  }
  
  SignOut() {
    return auth().signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigate(['login']);
      })
      localStorage.removeItem('user');
    })
  }
}

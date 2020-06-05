import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUsers(){
    return this.firestore.collection('users').snapshotChanges();
  }
  createUser(user: User){
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('users')
        .add(user)
        .then(res => {}, err => reject(err))
    });
  }
  updateUser(user: User){
    //return this.firestore.collection('users').doc('users/' + user.uid).update(user);
    this.firestore.doc('users/' + user.uid).update(user);
  }
  //probably wont be used for this demo
  deleteUser(user: User){
    this.firestore.doc('users/' + user.uid).delete();
  }
}

/**
 * 
 * eg create
 * 
 * this.UserService.createUser(user.data).then(res => { console.log("USER CREATED!")});
 * 
 */
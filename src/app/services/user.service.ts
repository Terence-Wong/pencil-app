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
    return this.firestore.collection('users').add(user);
  }
  updateUser(user: User){
    delete user.uid;
    this.firestore.doc('users/' + user.uid).update(user);
  }
  //probably wont be used for this demo
  deleteUser(user: User){
    this.firestore.doc('users/' + user.uid).delete();
  }
}

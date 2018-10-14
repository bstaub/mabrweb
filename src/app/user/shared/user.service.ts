import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;

  constructor(public  afs: AngularFirestore,
              private afAuth: AngularFireAuth,
  ) {
    // this.users = this.afs.collection('users').valueChanges();
    this.usersCollection = this.afs.collection('users', ref => ref.orderBy('email', 'asc'));

    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );

  }

  getUsers() {
    // return this.users;
    this.usersCollection = this.afs.collection('users');
    return this.usersCollection.valueChanges();
  }

  getUser(id: string) {
    this.userDoc = this.afs.doc<User>(`users/${id}`);
    return this.userDoc.valueChanges();
  }

  getCurrentUser() {
    // https://firebase.google.com/docs/auth/web/manage-users
    // return firebase.auth().currentUser;
    const user = firebase.auth().currentUser;
    if (user) {  // User signed in
      return user;
    } else { // no user is signed in
      return 0;
    }

  }

  get authenticated(): boolean {
    return this.afAuth.authState !== null;
  }

  getCurrentUserId(): string {
    return firebase.auth().currentUser.uid;
    // this.myForm.patchValue({'userId': this.userId});
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
  get currentUserId(): any {
    return this.authenticated ? this.afAuth.auth.currentUser.uid : null;
  }

  addUser(user: User) {
    return this.usersCollection.add(user);  // need return for async logout call in register process!
  }

  setUser(user: User) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    return this.userDoc.set(user, {merge: true});
  }

  updateUser(user: User) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.update(user);

  }

  deleteUser(user: User) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.delete();
  }


  /*
  setUserMerge(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`);
    const data: User = {
      downloadUrl: 'xxx',
      area: 'luzernXXX'
    };
    return userRef.set(data, {merge: true});
  }
  */

}

import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {User} from '../user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;

  constructor( public  afs: AngularFirestore,
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
    return this.users;
  }

  getUser(id) {
    this.userDoc = this.afs.doc(`users/${id}`);
    return this.userDoc.valueChanges();
  }

  addUser(user: User) {
    return this.usersCollection.add(user);  // need return for async logout call in register process!
  }

  setUser(user: User) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    return this.userDoc.set(user, {merge: true});
  }

  setUserMerge(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`);
    const data: User = {
      downloadUrl: 'xxx',
      area: 'luzernXXX'
    };
    return userRef.set(data, {merge: true});
  }

  deleteUser(user: User) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.delete();
  }

  updateUser(user: User) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.update(user);

  }

  // LocalStorage Functions start
  setUserToLocalStorage(userFromDatabase) {
    localStorage.setItem('user', JSON.stringify(userFromDatabase));
  }

  destroyUserLocalStorage() {
    localStorage.removeItem('user');
  }

  getProfileFromLocalStorage() {
    return JSON.parse(localStorage.getItem('user')) || [];
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

  // Test, geht irgendwie noch nicht sauber!
  loginStatus(): any {
    // return 123;
    return this.authenticated ? true : 0;
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

}

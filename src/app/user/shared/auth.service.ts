import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';

import { UserService } from './user.service';
import { NotificationService } from '../../shared/notification.service';

import * as firebase from 'firebase/app';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  user$: Observable<any>;  // change to Interface User(import), and make observable with user$  (cms project)

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private userService: UserService,
    private notifier: NotificationService
  ) {
    // Get Current Auth User
    /*
    this.user = afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );

    this.user$ = afAuth.authState.pipe(map(user => {
      if (user) {
        // debugger;
        return this.afs.doc(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);  // Angular6 without Observable.of, just of with import {of}
      }
    }));
    */

  }

  isAuthenticated() {
    const state = new Subject<boolean>();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        state.next(true);
        // console.log('yes user: ', user);
      } else {
        state.next(false);
      }
    });
    return state.asObservable();
  }

  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  /*
  getAuthUser() {
    return this.userDetails;
  }
  */

  /*
  isLoggedIn() {
    if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }
  */

  // 1. Register
  createUserInFirebaseAuthListEmailVerified(email, password, username) {
    console.log('vor createUserInFirebaseAuthList->' + email + ' / ' + password);

    const actionCodeSettings = {
      url: 'http://localhost:4200/login',
      handleCodeInApp: true
    };

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userData => {
        console.log(userData);
        userData.user.sendEmailVerification(actionCodeSettings);

        const message = `Eine Verification EMail wurde an ${email} geschickt. Bitte prüfen Sie Ihr Posteingang und bestätigen Sie die Registrationsprüfung.`;
        this.notifier.display('success', message);

        const user: User = {
          id: userData.user.uid,
          username: username,
          email: email,
          anonymous: userData.user.isAnonymous,
          roles: {
            authuser: true,
            admin: false
          },
          registrationDate: new Date(),
        };
        this.userService.setUserToLocalStorage(user);
        this.userService.setUser(user)
          .then(() => {
            this.afAuth.auth.signOut();  // erst wenn der Benutzer erfasst wird aus Firebase ausloggen!
          })
          .catch(err => console.log(err));
      })
      .catch(error => {
        console.log(error);
        this.notifier.display('error', error.message);
      });
  }

  // 2. Login
  loginWithUserPassword(email, password) {
    console.log('vor auth.EmailAuthProvider.credential->' + email + ' / ' + password);
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }


  // 3. Reset PW
  resetPassword(email) {

    const actionCodeSettings = {
      url: 'http://localhost:4200/login',
      // This must be true.
      handleCodeInApp: true
    };

    this.afAuth.auth.sendPasswordResetEmail(email, actionCodeSettings)
      .then(data => {
        console.log('Passwort Reset Mail send Successful');
        console.log(data);
        this.notifier.display('success', 'Das Passwort Reset Mail wurde erfolgreich verschickt');

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);


      }).catch(
      error => {
        console.log(error);
        this.notifier.display('error', error.message);
      });
  }

  // 4. Logout
  logout() {
    this.afAuth.auth.signOut()
      .then((res) => this.router.navigate(['login']));
  }
}

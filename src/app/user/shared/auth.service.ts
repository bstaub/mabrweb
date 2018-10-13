import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';

import { UserService } from './user.service';
import { NotificationService } from '../../shared/notification.service';

import * as firebase from 'firebase/app';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private userService: UserService,
    private notifier: NotificationService
  ) {
    this.user$ = afAuth.authState
      .pipe(
        switchMap((auth) => {
        if (auth) {
          // debugger;
          return this.afs.doc(`users/${auth.uid}`).valueChanges()
            .pipe(
              map( user => {
               return {
                 ...user,
                 uid: auth.uid,
                 emailVerified: auth.emailVerified
               };
              }),
              // tap( x => console.log(x))
            );
        } else {
          return of(null);
        }
    }));
  }

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
          this.router.navigate(['/user-login-register-slide']);
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
      .then((res) => this.router.navigate(['/user-login-register-slide']));
  }
}

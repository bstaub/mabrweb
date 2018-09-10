import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../user/auth.service';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  name: string;
  uid: string;
  email: string;

  constructor(private _firebaseAuth: AngularFireAuth, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {

    this._firebaseAuth.auth.onAuthStateChanged(userData => {
      // we are logged in
      console.log('ngOnInit000', userData);

      // debugger;
      if (userData && userData.emailVerified) {
        // debugger;

        const user = this.userService.getProfileFromLocalStorage();
        // debugger;
        this.name = user.username;
        this.email = user.email;
        this.uid = user.id;

        console.log(user);
        console.log(this.uid);

        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }

}

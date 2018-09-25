import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../user/shared/auth.service';
import {UserService} from '../user/shared/user.service';
import {SettingsService} from '../shared/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  // isLoggedIn: boolean = false;
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;
  showAdmin: boolean;
  name: string;
  uid: string;
  email: string;

  constructor(private afAuth: AngularFireAuth,
              private authService: AuthService,
              private userService: UserService,
              private settingsService: SettingsService
  ) {
  }

  ngOnInit() {

    /*
    this.afAuth.auth.onAuthStateChanged(userData => {
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
    */

    this.authService.getAuth().subscribe(auth => {
      if (auth && auth.emailVerified) {
        const user = this.userService.getProfileFromLocalStorage();
        this.name = user.username;
        this.email = user.email;
        this.uid = user.id;


        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this.settingsService.getSettings().allowRegistration;
    this.showAdmin = this.settingsService.getSettings().allowAdministration;

  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }

}

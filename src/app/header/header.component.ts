import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../user/shared/auth.service';
import { UserService } from '../user/shared/user.service';
import { SettingsService } from '../shared/settings.service';
import { LocalStorageService } from '../shared/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    ul {
      margin-bottom: 0;
    }

    li.submenu {
      padding: 20px;
    }

    .shopping li {
      list-style-type: none;
    }

    .submenu {
      position: relative;
    }

    .submenu #shopping-cart {
      display: none;
    }

    .submenu:hover #shopping-cart {
      display: block;
      position: absolute;
      right: -15px;
      top: 66px;
      z-index: 1;
      background-color: white;
      padding: 20px;
      min-height: 400px;
      min-width: 300px;
      border: 1px solid black;
    }

    .card {
      text-align: center;
      border: 1px solid #e1e1e1;
      background: white;
    }

    thead {
      border-bottom: 1px solid black;
    }

    .remove {
      background-color: red;
      border-radius: 50%;
      padding: 5px 10px;
      text-decoration: none;
      color: white;
      font-weight: bold;
    }


  `]
})
export class HeaderComponent implements OnInit {

  itemsForBasket: any;
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
              private settingsService: SettingsService,
              private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit() {
    this.getProductsFromLocalStorage();
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


  getProductsFromLocalStorage() {
    this.itemsForBasket = this.localStorageService.getData('products');
  }

  removeItem(event) {
    // console.log(event.target.dataset.id);
    event.target.parentElement.parentElement.remove();
  }

}

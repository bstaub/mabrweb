import { Component, OnInit, AfterContentChecked, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../user/shared/auth.service';
import { UserService } from '../../user/shared/user.service';
import { SettingsService } from '../../shared/settings.service';
import { LocalStorageService } from '../../shared/local-storage.service';
import { Router } from '@angular/router';

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
      min-width: 400px;
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

    .burgerMenu {
      font-size: 30px;
      cursor: pointer;
      margin-right: 50px;
    }


  `]
})
export class HeaderComponent implements OnInit {

  @Output() offCanvasClicked = new EventEmitter();

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
              private localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(
      auth => {
        if (auth && auth.emailVerified) {
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
        } else {
          this.isLoggedIn = false;
        }
      }
    );
    this.showRegister = this.settingsService.getSettings().allowRegistration;
    this.showAdmin = this.settingsService.getSettings().allowAdministration;


    // delete only works on ngInit
    this.getProductsFromLocalStorage();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.localStorageService.destroyLocalStorage('products');
  }


  getProductsFromLocalStorage() {
    this.itemsForBasket = this.localStorageService.getData('products');
  }

  removeItem(event) {
    // console.log(event.target.dataset.id);
    event.target.parentElement.parentElement.remove();
  }

  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
  OpenMenuCanvas() {
    this.offCanvasClicked.emit();
  }

}

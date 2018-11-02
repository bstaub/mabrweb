import { Component, OnInit, AfterContentChecked, AfterContentInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../user/shared/auth.service';
import { UserService } from '../../user/shared/user.service';
import { SettingsService } from '../../shared/settings.service';
import { LocalStorageService } from '../../shared/local-storage.service';
import { Order } from '../../models/order.model';
import { OrderFlyoutService } from '../shared/order-flyout-service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() offCanvasClicked = new EventEmitter();

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;
  showAdmin: boolean;
  name: string;
  uid: string;
  email: string;
  authServiceSubscription: Subscription;

  constructor(private afAuth: AngularFireAuth,
              private authService: AuthService,
              private userService: UserService,
              private settingsService: SettingsService,
              private localStorageService: LocalStorageService,
              private orderFlyoutService: OrderFlyoutService,
  ) {
  }

  ngOnInit() {
    this.authServiceSubscription = this.authService.user$.subscribe(
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
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.localStorageService.destroyLocalStorage('products');
    this.orderFlyoutService.refreshOrderFlyout(this.localStorageService.getData('products'), new Order());
  }

  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
  OpenMenuCanvas() {
    this.offCanvasClicked.emit();
  }

  ngOnDestroy() {
    this.authServiceSubscription.unsubscribe();
  }

}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../user/shared/auth.service';
import { Order } from '../../../models/order.model';
import { LocalStorageService } from '../../../shared/local-storage.service';
import { OrderFlyoutService } from '../../shared/order-flyout-service';
import { AdminGuard } from '../../../user/guards/admin.guard';

@Component({
  selector: 'app-off-canvas',
  templateUrl: './off-canvas.component.html',
  styleUrls: ['./off-canvas.component.scss']
})
export class OffCanvasComponent implements OnInit, OnChanges {

  isLoggedIn: boolean;
  isAdmin = false;
  loggedInUser: string;
  @Input() changeCanvasState;  // get open click state from navbar
  @Output() closeNavState = new EventEmitter();

  constructor(private authService: AuthService,
              private localStorageService: LocalStorageService,
              private orderFlyoutService: OrderFlyoutService,
  ) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(
      auth => {
        if (auth && auth.emailVerified) {
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
          this.isAdmin = auth.roles.admin;
        } else {
          this.isLoggedIn = false;
        }
      }
    );
  }

  ngOnChanges() {
    if (this.changeCanvasState === true) {
      this.openNav();
    }
  }

  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  closeNav() {
    this.closeNavState.emit();
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }

  logout() {
    this.closeNavState.emit();
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
    this.authService.logout();
    this.isLoggedIn = false;
    this.localStorageService.destroyLocalStorage('products');
    this.orderFlyoutService.refreshOrderFlyout(this.localStorageService.getData('products'), new Order());
  }

}

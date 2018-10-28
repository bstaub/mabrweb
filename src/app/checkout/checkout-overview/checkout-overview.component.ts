import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order.model';
import { Subscription } from 'rxjs';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { UserService } from '../../user/shared/user.service';
import { LocalStorageService } from '../../shared/local-storage.service';
import { AuthService } from '../../user/shared/auth.service';

@Component({
  selector: 'app-checkout-overview',
  templateUrl: './checkout-overview.component.html',
  styleUrls: ['./checkout-overview.component.scss']
})
export class CheckoutOverviewComponent implements OnInit {
  user: any;
  orderData: any;
  orderId: string;
  order: Order;
  closingOrderId: string;
  nextShopOrderId: number;
  authSubscription: Subscription;
  nextOrderIdSubscription: Subscription;
  orderSubscription: Subscription;


  constructor(private orderFirestoreService: OrderFirestoreService,
              private userService: UserService,
              private router: Router,
              private localStorageService: LocalStorageService,
              private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.authSubscription = this.authService.user$.subscribe((user) => {
      if (user && user.emailVerified) {
        this.user = user;
        this.getOrderData(user.id);
      } else {
        this.user = '0';
        this.getOrderData(this.localStorageService.getData('anonymusOrderId').orderId);
      }
    });
  }

  orderNow() {
    this.order = new Order();
    this.order.key = this.orderFirestoreService.getOrderId();
    this.order.shopOrderId = this.nextShopOrderId;
    this.order.orderDate = new Date();
    this.order.status = 'done';
    this.order.totalValue = this.orderData.totalValue;
    this.order.userId = this.user.id;
    this.order.customerBillingAddress = this.orderData.customerBillingAddress;
    this.order.customerShippingAddress = this.orderData.customerShippingAddress;
    this.order.shipqingEqualsBillingAddress = this.orderData.shipqingEqualsBillingAddress;
    this.order.shippingMethod = this.orderData.shippingMethod;
    this.order.anonymusOrder = !(this.user === 0);
    this.orderFirestoreService.updateOrder(this.order);
    this.closingOrderId = this.orderFirestoreService.completeUserOrder(this.order);
    this.orderFirestoreService.completeProductsPerOrder(this.closingOrderId, this.localStorageService.getData('products'));

    if (this.user !== '0') {
      this.orderFirestoreService.resetUserOrder(this.order);
      this.orderFirestoreService.clearScart(this.localStorageService.getData('products'));
    } else {
      this.orderFirestoreService.clearScart(this.localStorageService.getData('products'));
      this.orderFirestoreService.deleteOrderAnonymus(this.order.key);
      this.localStorageService.destroyLocalStorage('anonymusOrderId');
    }


    this.router.navigate(['/checkout/thx'], {queryParams: {shopOrderId: this.nextShopOrderId}});
  }

  getOrderData(userId) {
    this.orderSubscription = this.orderFirestoreService.getUserOrder(userId).subscribe((res) => {
      this.orderData = res;
      this.setOrderData();
    });

    this.nextOrderIdSubscription = this.orderFirestoreService.getLatestOrder().subscribe((res) => {
      this.nextShopOrderId = res[0].shopOrderId + 1;
    });

  }

  setOrderData() {
    // todo stuff
  }


  goBack() {
    this.router.navigate(['/checkout/paymentdata']);
  }

}

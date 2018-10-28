import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { Router } from '@angular/router';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { UserService } from '../../user/shared/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from '../../shared/local-storage.service';
import { AuthService } from '../../user/shared/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styles: [`
  `]
})
export class CheckoutPaymentComponent implements OnInit, OnDestroy {

  PaymentForm: FormGroup;
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

    this.initPaymentFormGroup();
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

  onSubmit() {
    this.order = new Order();
    this.order.key = this.orderFirestoreService.getOrderId();
    this.order.paymentMethod = this.PaymentForm.value.paymentMethod;
    this.orderFirestoreService.updateOrder(this.order);
    this.router.navigate(['/checkout/overview'], {queryParams: {shopOrderId: this.nextShopOrderId}});
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


  initPaymentFormGroup() {
    this.PaymentForm = new FormGroup({
      paymentMethod: new FormControl()
    });
  }

  setOrderData() {
    this.PaymentForm.patchValue({
      paymentMethod: this.orderData.paymentMethod
    });
  }

  goBack() {
    this.router.navigate(['/checkout/shipmentdata']);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.nextOrderIdSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();
  }

}


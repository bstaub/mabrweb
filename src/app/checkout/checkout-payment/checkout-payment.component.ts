import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { Router } from '@angular/router';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { UserService } from '../../user/shared/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from '../../shared/local-storage.service';


@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styles: [``]
})
export class CheckoutPaymentComponent implements OnInit {

  PaymentForm: FormGroup;
  user: any;
  orderData: any;
  orderId: string;
  order: Order;
  closingOrderId: string;


  constructor(private orderFirestoreService: OrderFirestoreService,
              private userService: UserService,
              private router: Router,
              private localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.user = this.userService.getCurrentUser();
      this.getOrderData();

    }, 1000);


    this.initPaymentFormGroup();
  }

  onSubmit() {
    this.order = new Order();
    this.order.key = this.orderFirestoreService.getOrderId();
    this.order.shopOrderId = this.orderFirestoreService.generateShopOrderId();
    this.order.orderDate = new Date();
    this.order.status = 'done';
    this.order.totalValue = this.orderData.totalValue;
    this.order.userId = this.user.uid;
    this.order.customerBillingAddress = this.orderData.customerBillingAddress;
    this.order.customerShippingAddress = this.orderData.customerShippingAddress;
    this.order.shipqingEqualsBillingAddress = this.orderData.shipqingEqualsBillingAddress;
    this.order.shippingMethod = this.orderData.shippingMethod;
    this.order.paymentMethod = this.PaymentForm.value.paymentMethod;
    this.order.anonymusOrder = !this.user;
    this.orderFirestoreService.updateOrder(this.order);

    this.closingOrderId = this.orderFirestoreService.completeUserOrder(this.order);
    this.orderFirestoreService.completeProductsPerOrder(this.closingOrderId, this.localStorageService.getData('products'));

    if (this.user) {
      this.orderFirestoreService.resetUserOrder(this.order);
      this.orderFirestoreService.clearScart(this.localStorageService.getData('products'));
    } else {
      this.orderFirestoreService.deleteOrderAnonymus(this.order.key);
      this.orderFirestoreService.clearScart(this.localStorageService.getData('products'));
      this.localStorageService.destroyLocalStorage('anonymusOrderId');
    }


    this.router.navigate(['/checkout/thx']);
  }


  getOrderData() {
    this.orderFirestoreService.getUserOrder(this.orderFirestoreService.getOrderId()).subscribe((res) => {
      this.orderData = res;
    });
  }

  initPaymentFormGroup() {
    this.PaymentForm = new FormGroup({
      paymentMethod: new FormControl()

    });

    setTimeout(() => {

      if (this.orderData) {
        this.setOrderData();
      }
    }, 1300);

  }

  setOrderData() {
    this.PaymentForm.patchValue({
      paymentMethod: this.orderData.paymentMethod

    });

  }
}


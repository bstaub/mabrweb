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
    console.log(this.PaymentForm.value);
    this.order = new Order();
    this.order.key = this.user.uid;
    this.order.orderDate = new Date();
    this.order.status = 'done';
    this.order.paymentdMethod = this.PaymentForm.value.paymentmethod;
    this.orderFirestoreService.updateOrder(this.order);
    this.closingOrderId = this.orderFirestoreService.closeUserOrder(this.order);
    this.orderFirestoreService.closeProductsPerOrder(this.closingOrderId, this.user.uid, this.localStorageService.getData('products'));
    this.router.navigate(['/checkout/thx']);

  }


  getOrderData() {
    this.orderFirestoreService.getUserOrder(this.user.uid).subscribe((res) => {
      this.orderData = res;
    });
  }

  initPaymentFormGroup() {
    this.PaymentForm = new FormGroup({
      paymentmethod: new FormControl()

    });

  }
}


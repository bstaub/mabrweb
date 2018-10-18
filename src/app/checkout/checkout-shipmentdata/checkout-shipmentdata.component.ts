import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../user/shared/user.service';
import { Router } from '@angular/router';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { Order } from '../../models/order.model';



@Component({
  selector: 'app-checkout-shipmentdata',
  templateUrl: './checkout-shipmentdata.component.html',
  styles: [``]
})
export class CheckoutShipmentdataComponent implements OnInit {
  ShipmentForm: FormGroup;
  user: any;
  orderData: any;
  orderId: string;
  order: Order;


  constructor(private orderFirestoreService: OrderFirestoreService,
              private userService: UserService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.user = this.userService.getCurrentUser();
      this.getOrderData();

    }, 1000);


    this.initShipmentFormGroup();
  }

  onSubmit() {
    this.order = new Order();
    this.order.key = this.orderFirestoreService.getOrderId();
    this.order.shippingMethod = this.ShipmentForm.value.shippingMethod;
    this.orderFirestoreService.updateOrder(this.order);
    this.router.navigate(['/checkout/paymentdata']);
  }

  getOrderData() {
    this.orderFirestoreService.getUserOrder(this.orderFirestoreService.getOrderId()).subscribe((res) => {
      this.orderData = res;
    });
  }

  initShipmentFormGroup() {
    this.ShipmentForm = new FormGroup({
      shippingMethod: new FormControl()

    });

    setTimeout(() => {

      if (this.orderData) {
        this.setOrderData();
      }
    }, 1300);


  }

  setOrderData() {
    this.ShipmentForm.patchValue({
      shippingMethod: this.orderData.shippingMethod

    });

  }

}

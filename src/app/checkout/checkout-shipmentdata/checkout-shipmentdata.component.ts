import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../user/shared/user.service';
import { Router } from '@angular/router';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { Order } from '../../models/order.model';
import { LocalStorageService } from '../../shared/local-storage.service';


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
              private localStorageService: LocalStorageService,
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
    this.order.key = this.orderId;
    this.order.shippingMethod = this.ShipmentForm.value.shippingmethod;
    this.orderFirestoreService.updateOrder(this.order);
    this.router.navigate(['/checkout/paymentdata']);
  }

  getOrderData() {
    if (this.user) {
      this.orderId = this.user.uid;
    } else {
      this.orderId = this.localStorageService.getData('anonymusOrderId').orderId;
    }
    this.orderFirestoreService.getUserOrder(this.orderId).subscribe((res) => {
      this.orderData = res;
    });
  }

  initShipmentFormGroup() {
    this.ShipmentForm = new FormGroup({
      shippingmethod: new FormControl()

    });


  }

}

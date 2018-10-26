import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../user/shared/user.service';
import { Router } from '@angular/router';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { Order } from '../../models/order.model';
import { AuthService } from '../../user/shared/auth.service';
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
              private authService: AuthService,
              private localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this.initShipmentFormGroup();
    this.authService.user$.subscribe((user) => {
      if (user && user.emailVerified) {
        this.getOrderData(user.id);
      } else {
        this.getOrderData(this.localStorageService.getData('anonymusOrderId').orderId);
      }
    });
  }

  onSubmit() {
    this.order = new Order();
    this.order.key = this.orderFirestoreService.getOrderId();
    this.order.shippingMethod = this.ShipmentForm.value.shippingMethod;
    this.orderFirestoreService.updateOrder(this.order);
    this.router.navigate(['/checkout/paymentdata']);
  }

  getOrderData(userId) {
    this.orderFirestoreService.getUserOrder(userId).subscribe((res) => {
      this.orderData = res;
      this.setOrderData();
    });
  }

  initShipmentFormGroup() {
    this.ShipmentForm = new FormGroup({
      shippingMethod: new FormControl()

    });
  }

  setOrderData() {
    this.ShipmentForm.patchValue({
      shippingMethod: this.orderData.shippingMethod
    });

  }

  goBack() {
    this.router.navigate(['/checkout/customerdata']);
  }



}

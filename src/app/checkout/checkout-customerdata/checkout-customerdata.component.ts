import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { UserService } from '../../user/shared/user.service';
import { Order } from '../../models/order.model';
import { CustomerAddress } from '../../models/customerAddress.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout-enterdata',
  templateUrl: './checkout-customerdata.component.html',
  styles: [`
    input.ng-touched.ng-invalid {
      border: 1px solid red;
    }
  `]
})
export class CheckoutCustomerdataComponent implements OnInit {
  CustomerAddressForm: FormGroup;
  user: any;
  orderData: any;
  orderId: string;
  order: Order;
  customerBillingAddress: CustomerAddress;
  customerShippingAddress: CustomerAddress;
  shipqingEqualsBillingAddress = true;

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


    this.initCustomerAddressFormGroup();

  }

  getOrderData() {
    this.orderFirestoreService.getUserOrder(this.orderFirestoreService.getOrderId()).subscribe((res) => {
      this.orderData = res;
    });
  }

  onSubmit() {

    this.order = new Order();
    this.order.key = this.orderFirestoreService.getOrderId();
    this.customerBillingAddress = new CustomerAddress();
    this.customerBillingAddress.firstname = this.CustomerAddressForm.value.customerBillingAddress.firstname_b;
    this.customerBillingAddress.lastname = this.CustomerAddressForm.value.customerBillingAddress.lastname_b;
    this.customerBillingAddress.address = this.CustomerAddressForm.value.customerBillingAddress.address_b;
    this.customerBillingAddress.zip = this.CustomerAddressForm.value.customerBillingAddress.zip_b;
    this.customerBillingAddress.city = this.CustomerAddressForm.value.customerBillingAddress.city_b;
    this.customerBillingAddress.country = this.CustomerAddressForm.value.customerBillingAddress.country_b;
    this.customerBillingAddress.phone = this.CustomerAddressForm.value.customerBillingAddress.phone_b;
    this.customerBillingAddress.mail = this.CustomerAddressForm.value.customerBillingAddress.mail_b;
    this.order.customerBillingAddress = this.customerBillingAddress;

    this.order.shipqingEqualsBillingAddress = this.shipqingEqualsBillingAddress;

    if (!this.shipqingEqualsBillingAddress) {
      this.customerShippingAddress = new CustomerAddress();
      this.customerShippingAddress.firstname = this.CustomerAddressForm.value.customerShippingAddress.firstname_s;
      this.customerShippingAddress.lastname = this.CustomerAddressForm.value.customerShippingAddress.lastname_s;
      this.customerShippingAddress.address = this.CustomerAddressForm.value.customerShippingAddress.address_s;
      this.customerShippingAddress.zip = this.CustomerAddressForm.value.customerShippingAddress.zip_s;
      this.customerShippingAddress.city = this.CustomerAddressForm.value.customerShippingAddress.city_s;
      this.customerBillingAddress.country = this.CustomerAddressForm.value.customerShippingAddress.country_s;
      this.customerShippingAddress.phone = this.CustomerAddressForm.value.customerShippingAddress.phone_s;
      this.customerShippingAddress.mail = this.CustomerAddressForm.value.customerShippingAddress.mail_s;
    } else {
      this.customerShippingAddress = this.customerBillingAddress;
    }

    this.order.customerShippingAddress = this.customerShippingAddress;

    this.orderFirestoreService.updateOrder(this.order);
    this.router.navigate(['/checkout/shipmentdata']);

  }


  initCustomerAddressFormGroup() {

    this.CustomerAddressForm = new FormGroup({
      customerBillingAddress: new FormGroup({
        firstname_b: new FormControl(null, Validators.required),
        lastname_b: new FormControl(null, Validators.required),
        address_b: new FormControl(null, Validators.required),
        zip_b: new FormControl(null, Validators.required),
        city_b: new FormControl(null, Validators.required),
        country_b: new FormControl(null, Validators.required),
        mail_b: new FormControl(null, [
          Validators.required,
          Validators.email
        ]),
        phone_b: new FormControl(null)
      }),

      shipqingEqualsBillingAddress: new FormControl(this.shipqingEqualsBillingAddress),
      customerShippingAddress: new FormGroup({
        firstname_s: new FormControl(null),
        lastname_s: new FormControl(null),
        address_s: new FormControl(null),
        zip_s: new FormControl(null),
        city_s: new FormControl(null),
        country_s: new FormControl(null),
        mail_s: new FormControl(null, [
          Validators.email
        ]),
        phone_s: new FormControl(null)
      })


    });


    setTimeout(() => {

      if (this.orderData) {
        this.setOrderData();
      }
    }, 1300);

  }

  setOrderData() {

    this.shipqingEqualsBillingAddress = this.orderData.shipqingEqualsBillingAddress;

    this.CustomerAddressForm.patchValue({
      customerBillingAddress: {
        firstname_b: this.orderData.customerBillingAddress.firstname,
        lastname_b: this.orderData.customerBillingAddress.lastname,
        address_b: this.orderData.customerBillingAddress.address,
        zip_b: this.orderData.customerBillingAddress.zip,
        city_b: this.orderData.customerBillingAddress.city,
        country_b: this.orderData.customerBillingAddress.country,
        phone_b: this.orderData.customerBillingAddress.phone
      },

      customerShippingAddress: {
        firstname_s: this.orderData.customerShippingAddress.firstname,
        lastname_s: this.orderData.customerShippingAddress.lastname,
        address_s: this.orderData.customerShippingAddress.address,
        zip_s: this.orderData.customerShippingAddress.zip,
        city_s: this.orderData.customerShippingAddress.city,
        country_s: this.orderData.customerShippingAddress.country,
        phone_s: this.orderData.customerShippingAddress.phone
      },
    });

  }


}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() {
  }

  ngOnInit() {
    this.initCustomerAddressFormGroup();

  }

  onSubmit() {
    console.log(this.CustomerAddressForm);
  }


  private initCustomerAddressFormGroup() {

    this.CustomerAddressForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lasttname: new FormControl(null, Validators.required),
      addresss: new FormControl(null, Validators.required),
      zip: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      mail: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl(null)
    });
  }
}

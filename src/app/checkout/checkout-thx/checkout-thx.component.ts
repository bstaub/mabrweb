import { Component, OnInit } from '@angular/core';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { UserService } from '../../user/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-thx',
  templateUrl: './checkout-thx.component.html',
  styles: []
})
export class CheckoutThxComponent implements OnInit {

  constructor(private orderFirestoreService: OrderFirestoreService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onBackToShopping() {
    this.router.navigate(['/produkte']);
  }

}

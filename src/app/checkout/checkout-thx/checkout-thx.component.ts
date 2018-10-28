import { Component, OnInit } from '@angular/core';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { UserService } from '../../user/shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-thx',
  templateUrl: './checkout-thx.component.html',
  styles: []
})
export class CheckoutThxComponent implements OnInit {
  shopOrderId: string;


  constructor(private orderFirestoreService: OrderFirestoreService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.shopOrderId = queryParams.get('shopOrderId');
      console.log(queryParams.get('shopOrderId'));
    });

  }

  onBackToShopping() {
    this.router.navigate(['/produkte']);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-thx',
  templateUrl: './checkout-thx.component.html',
  styles: []
})
export class CheckoutThxComponent implements OnInit {
  shopOrderId: string;


  constructor(private router: Router,
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

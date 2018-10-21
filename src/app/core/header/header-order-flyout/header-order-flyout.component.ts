import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../shared/local-storage.service';
import { OrderFlyoutService } from '../../shared/order-flyout-service';
import { ProductPerOrderLocalStorage } from '../../../models/productPerOrderLocalStorage.model';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-header-order-flyout',
  templateUrl: './header-order-flyout.component.html',
  styles: [`

    ul {
      margin-bottom: 0;
    }

    li.submenu {
      padding: 20px;
    }

    .shopping li {
      list-style-type: none;
    }

    .submenu {
      position: relative;
    }

    .submenu #shopping-cart {
      display: none;
    }

    .submenu:hover #shopping-cart {
      display: block;
      position: absolute;
      right: -15px;
      top: 66px;
      z-index: 1;
      background-color: white;
      padding: 20px;
      min-height: 400px;
      min-width: 400px;
      border: 1px solid black;
    }

    .remove {
      background-color: red;
      border-radius: 50%;
      padding: 5px 10px;
      text-decoration: none;
      color: white;
      font-weight: bold;
    }
    .bubble {
      display: inline-block;
      padding: 4px 7px 4px 7px;
      font-size: 12px;
      font-weight: bold;
      line-height: 1;
      background: green;
      border-radius: 10px;
    }
    
  `]
})
export class HeaderOrderFlyoutComponent implements OnInit {
  productsPerOrderLocalStorage: ProductPerOrderLocalStorage[];
  order: Order;

  constructor(
    private localStorageService: LocalStorageService,
    private orderFlyoutService: OrderFlyoutService
  ) {
  }

  ngOnInit() {
    this.orderFlyoutService.currentProductsPerOrderLocalStorage.subscribe(
      (data: ProductPerOrderLocalStorage[]) => this.productsPerOrderLocalStorage = data
    );

    this.orderFlyoutService.currentOrder.subscribe(
      (data: Order) => this.order = data
    );
  }



}

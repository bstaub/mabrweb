import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../shared/local-storage.service';
import { OrderFlyoutService } from '../../shared/order-flyout-service';
import { ProductPerOrderLocalStorage } from '../../../models/productPerOrderLocalStorage.model';
import { Order } from '../../../models/order.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header-order-flyout',
  templateUrl: './header-order-flyout.component.html',
  styleUrls: ['./header-order-flyout.component.scss']
})
export class HeaderOrderFlyoutComponent implements OnInit, OnDestroy {
  productsPerOrderLocalStorage: ProductPerOrderLocalStorage[];
  order: Order;
  visibleStatus = true;
  productsSubscription: Subscription;
  orderSubscription: Subscription;


  constructor(
    private localStorageService: LocalStorageService,
    private orderFlyoutService: OrderFlyoutService,

  ) {
  }

  ngOnInit() {
    this.productsSubscription = this.orderFlyoutService.currentProductsPerOrderLocalStorage.subscribe(
      (data: ProductPerOrderLocalStorage[]) => this.productsPerOrderLocalStorage = data
    );


    this.orderSubscription = this.orderFlyoutService.currentOrder.subscribe(
      (data: Order) => this.order = data
    );

  }

  closeFlyout() {
    this.visibleStatus = false;
    setTimeout(() => {
      this.visibleStatus = true;
    }, 100);
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();
  }


}

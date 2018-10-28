import { EventEmitter, Injectable } from '@angular/core';
import { ProductPerOrderLocalStorage } from '../../models/productPerOrderLocalStorage.model';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderFlyoutService {
  currentProductsPerOrderLocalStorage = new EventEmitter<ProductPerOrderLocalStorage[]>();
  currentOrder = new EventEmitter<Order>();

  constructor() {
  }


  refreshOrderFlyout(productsPerOrderLocalStorage: ProductPerOrderLocalStorage[], order: Order) {
    this.currentProductsPerOrderLocalStorage.emit(productsPerOrderLocalStorage);
    this.currentOrder.emit(order);
  }
}

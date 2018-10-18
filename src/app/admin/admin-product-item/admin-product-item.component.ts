import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductPerOrder } from '../../models/productPerOrder.model';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';

@Component({
  selector: 'app-admin-product-item',
  templateUrl: './admin-product-item.component.html',
  styleUrls: ['./admin-product-item.component.css']
})
export class AdminProductItemComponent implements OnInit {

  @Input() product: Product;
  @Input() count: number;

  productPerOrder: ProductPerOrder;

  constructor(private productService: ProductFirestoreService,
              private orderFirestoreService: OrderFirestoreService,
  ) {
  }

  ngOnInit() {
  }

  updateActive(isActive: boolean) {
    this.productService.updateProduct(this.product.key, {active: isActive});
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.key);
  }

  editProduct() {

  }

  updateProduct() {

  }

  // addToBasket(product) {
  //   this.productPerOrder = {
  //     productId: product.key,
  //     qty: product.itemcount
  //   };
  //   this.orderFirestoreService.addProductToOrder(this.productPerOrder);
  //   alert(product.name + ' wurde dem Warenkorb hinzugefügt. ');
  // }

}

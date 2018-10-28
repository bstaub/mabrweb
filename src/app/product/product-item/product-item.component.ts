import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductFirestoreService } from '../shared/product-firestore.service';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { ProductPerOrder } from '../../models/productPerOrder.model';
import { UserService } from '../../user/shared/user.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  @Input() count: number;

  productPerOrder: ProductPerOrder;

  constructor(private productService: ProductFirestoreService, private orderFirestoreService: OrderFirestoreService,
              private userService: UserService
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

  updateProduct(event, product) {

  }

  addToBasket(product) {
    this.orderFirestoreService.addProductToOrder(product);
    alert(product.name + ' wurde dem Warenkorb hinzugefügt. ');
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../product.model';
import {ProductFirestoreService} from '../shared/product-firestore.service';
import {OrderFirestoreService} from '../../order/shared/order-firestore.service';
import {ProductsPerOrder} from '../../order/productsPerOrder.model';
import {UserService} from '../../user/shared/user.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  @Input() count: number;

  productperOrder: ProductsPerOrder;

  constructor(private productService: ProductFirestoreService, private orderServcie: OrderFirestoreService,
              private userService: UserService
              ) { }

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
    console.log('start addToBasket');
    console.log(product);

    this.productperOrder = {
      productId: product.key,
      userId: this.userService.getCurrentUserId(),
      qty: product.itemcount
    };

    console.log(this.productperOrder);

    this.orderServcie.addProductToOrderAnonymus(this.productperOrder);
    // this.productService.setbasket(product);
    alert(product.name + ' wurde dem Warenkorb hinzugefügt. ');
  }


}

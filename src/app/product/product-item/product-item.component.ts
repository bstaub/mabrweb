import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../product.model';
import {ProductFirestoreService} from '../shared/product-firestore.service';
import {OrderFirestoreService} from '../../order/shared/order-firestore.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  @Input() count: number;

  constructor(private productService: ProductFirestoreService, private orderServcie: OrderFirestoreService) { }

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

  addtoBasket(product) {
    console.log(product);
    this.orderServcie.addProductToOrder(product);
    // this.productService.setbasket(product);
    alert(product.name + ' wurde dem Warenkorb hinzugefügt. ');
  }


}

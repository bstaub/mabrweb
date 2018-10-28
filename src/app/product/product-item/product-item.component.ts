import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductFirestoreService } from '../shared/product-firestore.service';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { AlertifyService } from '../../shared/alertify.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  @Input() count: number;

  constructor(private productService: ProductFirestoreService,
              private orderFirestoreService: OrderFirestoreService,
              private alertifyService: AlertifyService,
  ) {
  }

  ngOnInit() {
  }

  addToBasket(product) {
    this.orderFirestoreService.addProductToOrder(product);
    this.alertifyService.success(product.name + ' wurde dem Warenkorb hinzugefügt.');
  }
}

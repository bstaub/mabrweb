import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  @Input() count: number;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  updateActive(isActive: boolean) {
    this.productService.updateProduct(this.product.key, {active: isActive});
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.key);
  }

  addtoBasket(product) {
    this.productService.setbasket(product);
    alert(product.name + ' wurde dem Warenkorb hinzugefügt. ');
  }

}

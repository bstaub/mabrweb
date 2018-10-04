import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductFirestoreService } from '../shared/product-firestore.service';
import { Observable } from 'rxjs';
import { ProductPerOrder } from '../../order/productPerOrder.model';
import { UserService } from '../../user/shared/user.service';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';

@Component({
  selector: 'app-detail-list',
  templateUrl: './product-detail.component.html',
  styles: []
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;
  @Input() count: number;

  private productId: string;
  public selectedProduct: Observable<Product>;
  user: any;

  productPerOrder: ProductPerOrder;

  constructor(private activatedRoute: ActivatedRoute,
              private productFirestoreService: ProductFirestoreService,
              private userService: UserService,
              private orderFirestoreService: OrderFirestoreService) {
  }

  ngOnInit() {
    console.log('start detail');
    this.user = this.userService.getCurrentUser();
    this.activatedRoute.params.subscribe(
      params => {
        this.productId = params['id'];  // (+) +params['id'] would converts string 'id' to a number
        this.selectedProduct = this.productFirestoreService.getProduct(this.productId).valueChanges();
      }
    );

  }

  addToBasket(product) {
    product.key = this.productId;
    this.orderFirestoreService.addProductToOrder(product);
    alert(product.name + ' wurde dem Warenkorb hinzugefügt. ');
  }


}

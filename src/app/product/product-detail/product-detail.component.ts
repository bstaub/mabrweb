import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductFirestoreService } from '../shared/product-firestore.service';
import { Observable } from 'rxjs';
import { UserService } from '../../user/shared/user.service';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { AlertifyService } from '../../shared/alertify.service';

@Component({
  selector: 'app-detail-list',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;
  @Input() count: number;

  private productId: string;
  public selectedProduct$: Observable<Product>;
  user: any;

  constructor(private activatedRoute: ActivatedRoute,
              private productFirestoreService: ProductFirestoreService,
              private userService: UserService,
              private orderFirestoreService: OrderFirestoreService,
              private alertifyService: AlertifyService,
  ) {
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.activatedRoute.params.subscribe(
      params => {
        this.productId = params['id'];  // (+) +params['id'] would converts string 'id' to a number
        this.selectedProduct$ = this.productFirestoreService.getProduct(this.productId).valueChanges();
      }
    );

  }

  addToBasket(product) {
    product.key = this.productId;
    this.orderFirestoreService.addProductToOrder(product);
    this.alertifyService.success(product.name + ' wurde dem Warenkorb hinzugefügt.');
  }


}

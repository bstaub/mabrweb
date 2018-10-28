import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../user/shared/auth.service';
import { UserService } from '../../user/shared/user.service';
import { User } from '../../models/user';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  uid: string;
  productsDiscounts$: Observable<Product[]>;
  productsNew$: Observable<Product[]>;
  productsBestRated$:  Observable<Product[]>;

  constructor(private authService: AuthService,
              private userService: UserService,
              private productService: ProductFirestoreService,
  ) {
  }

  ngOnInit() {
    this.productsDiscounts$ = this.productService.getDiscountProductsWithLimit(3);
    this.productsNew$ = this.productService.getNewProductsWithLimit(3);
    this.productsBestRated$ = this.productService.getBestRatedProductsWithLimit(3);
  }
}

import { Component, OnInit, AfterContentChecked } from '@angular/core';
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
export class HomeComponent implements OnInit, AfterContentChecked {

  user: User;
  uid: string;
  currentUser: any;
  productsDiscounts$: Observable<Product[]>;
  productsNew$: Observable<Product[]>;
  productsBestRated$:  Observable<Product[]>;
  rabattFactorDiscount: number = 0.8;
  rabattFactorNew: number = 0.9;
  rabattFactorBestRate: number = 0.7;

  constructor(private authService: AuthService,
              private userService: UserService,
              private productService: ProductFirestoreService,
  ) {
  }

  ngOnInit() {


    this.productsDiscounts$ = this.productService.getDiscountProductsWithLimit(3);
    this.productsNew$ = this.productService.getNewProductsWithLimit(3);
    this.productsBestRated$ = this.productService.getBestRatedProductsWithLimit(3);


    // this.authService.isAuthenticated().subscribe(auth => console.log(auth));
    // this.authService.getAuth().subscribe(auth2 => console.log(auth2));
    // console.log(this.userService.getCurrentUser());
    // this.uid = this.userService.getCurrentUserId();
    // this.getUser();
  }

  ngAfterContentChecked() {
    // if ((this.userService.getCurrentUser()) !== 0) {
    // this.currentUser = this.userService.getCurrentUser();
    // console.log('constentChecked first: ', this.currentUser);
    // this.userService.getUser(this.currentUser.uid).pipe(first()).subscribe( currentUserTable => console.log(currentUserTable) );
    // this.userService.getUser(this.currentUser.uid).pipe(take(1)).subscribe( currentUserTable => console.log(currentUserTable) );
    // this.userService.getUser(this.currentUser.uid).subscribe( currentUserTable => console.log(currentUserTable) );

    // }
  }

  getUser() {
    // this.localStorageUser = this.userService.getProfileFromLocalStorage();
    return this.userService.getUser(this.currentUser.uid)
      .subscribe(data => {
        this.user = data;
        console.log(this.user);
      });
  }

}

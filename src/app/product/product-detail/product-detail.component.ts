import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../product.model';
import {ActivatedRoute} from '@angular/router';
import {ProductFirestoreService} from '../shared/product-firestore.service';
import {Observable} from 'rxjs';
import {AngularFirestoreDocument} from '@angular/fire/firestore';
import {ProductPerOrder} from '../../order/productPerOrder.model';
import {UserService} from '../../user/shared/user.service';
import {OrderService} from '../../order/order.service';
import {OrderFirestoreService} from '../../order/shared/order-firestore.service';

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



  updateActive(isActive: boolean) {
    // this.productService.updateProduct(this.product.key, {active: isActive});
  }

  deleteProduct() {
    // this.productService.deleteProduct(this.product.key);
  }


  addToBasket(product) {
    console.log('start addToBasket');
    console.log(product);
    console.log(product);

    this.productPerOrder = {
      productId: this.productId,
      qty: product.itemcount
    };

    this.orderFirestoreService.addProductToOrder(this.productPerOrder);




    console.log(this.productPerOrder);


    // this.productService.setbasket(product);
    alert(product.name + ' wurde dem Warenkorb hinzugefügt. ');
  }


}

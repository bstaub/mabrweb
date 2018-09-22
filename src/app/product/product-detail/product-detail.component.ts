import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../product.model';
import {ActivatedRoute} from '@angular/router';
import {ProductFirestoreService} from '../shared/product-firestore.service';
import {Observable} from 'rxjs';
import {AngularFirestoreDocument} from '@angular/fire/firestore';
import {ProductsPerOrder} from '../../order/productsPerOrder.model';
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


  productPerOrder: ProductsPerOrder;

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
      productId: product.key,
      userId: '0',
      qty: product.itemcount
    };



    if (this.user) {
      // newProductperOrder.userId = this.user.uid;
      // this.orderFirestoreService.addProductToOrder(newProductperOrder);
      // console.log('onAddProductControl - user Ok');
    } else {
      this.productPerOrder.userId = '0';
      this.orderFirestoreService.addProductToOrderAnonymus(this.productPerOrder);
      console.log('onAddProductControl - No user');
    }



    console.log(this.productPerOrder);

    // this.orderService.addProductToOrderAnonymus(this.productPerOrder);
    // this.productService.setbasket(product);
    alert(product.name + ' wurde dem Warenkorb hinzugefügt. ');
  }


}

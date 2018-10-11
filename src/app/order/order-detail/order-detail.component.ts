import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderFirestoreService } from '../shared/order-firestore.service';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';
import { UserService } from '../../user/shared/user.service';
import { LocalStorageService } from '../../shared/local-storage.service';
import { Order } from '../../models/order.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../user/shared/auth.service';
import { NotificationService } from '../../shared/notification.service';
import { ProductPerOrderLocalStorage } from '../../models/productPerOrderLocalStorage.model';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styles: []
})
export class OrderDetailComponent implements OnInit {

  productPerOrderLocalStorage: ProductPerOrderLocalStorage[];
  orderId: string;
  user: any;
  userId: string;
  order: any;
  totalValue: number;


  constructor(
    private activatedRoute: ActivatedRoute,
    private orderFirestoreService: OrderFirestoreService,
    private productFireStoreService: ProductFirestoreService,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private notifier: NotificationService
  ) {


  }


  ngOnInit() {

    setTimeout(() => {
      this.user = this.userService.getCurrentUser();

      this.getProducts();
    }, 1000);


  }


  getProducts() {

    if (this.user) {
      this.orderFirestoreService.getUserOrder(this.user.uid).subscribe((res) => {
        this.order = res[0];
      });
    }

    this.productPerOrderLocalStorage = this.localStorageService.getData('products');
    this.calculateTotalSum();


  }


  onOrder() {
    const order = new Order();
    order.shopOrderId = 'done-123-001';
    order.orderDate = new Date();
    order.status = 'done';
    order.totalValue = this.order.totalValue;
    order.userId = this.user.uid;
    this.orderId = this.orderFirestoreService.closeUserOrder(order);
    console.log(this.orderId);
    this.orderFirestoreService.closeProductsPerOrder(this.orderId, this.user.uid, this.productPerOrderLocalStorage);
    this.onDeleteScart();

  }

  onEnterOrderData() {
    if (this.user) {
      this.router.navigate(['/checkout']);
    } else {
      alert('Under Construction - Bitte loggen Sie sich ein...');
    }
  }

  onDeleteScart() {
    this.orderFirestoreService.clearScart(this.productPerOrderLocalStorage);
    this.productPerOrderLocalStorage = [];
    this.router.navigate(['/bestellung']);
    this.calculateTotalSum();
  }

  onDeletItem(productId: string) {

    this.productPerOrderLocalStorage.forEach((product, index, sourceArray) => {
      if (product.productId === productId) {
        sourceArray.splice(index, 1);
      }

    });
    this.orderFirestoreService.deleteProductFromOrder(productId);
    this.calculateTotalSum();

  }

  onDecreaseQty(productPerOrderLocalStorage: ProductPerOrderLocalStorage) {
    productPerOrderLocalStorage.qty = productPerOrderLocalStorage.qty === 1 ? 1 : productPerOrderLocalStorage.qty - 1;
    this.orderFirestoreService.updateProductQty(productPerOrderLocalStorage);
    this.calculateTotalSum();
  }

  onIncreaseQty(productPerOrderLocalStorage: ProductPerOrderLocalStorage) {
    productPerOrderLocalStorage.qty += 1;
    this.orderFirestoreService.updateProductQty(productPerOrderLocalStorage);
    this.calculateTotalSum();
  }

  onChangeQty(productPerOrderLocalStorage: ProductPerOrderLocalStorage) {
    productPerOrderLocalStorage.qty = Number(productPerOrderLocalStorage.qty);
    this.orderFirestoreService.updateProductQty(productPerOrderLocalStorage);
    this.calculateTotalSum();
  }

  calculateTotalSum() {
    let lineValue;
    let totalValue = 0;
    this.productPerOrderLocalStorage.forEach((product) => {
      lineValue = product.qty * product.price;
      lineValue.toFixed(2);
      totalValue += lineValue;
    });
    this.totalValue = totalValue;
  }


  onLoginWithOrder(form: NgForm) {

    this.authService.loginWithUserPassword(form.value.email, form.value.password)
      .then(userData => {

        if (userData && userData.user.emailVerified) {
          this.notifier.display('success', 'Login erfolgreich');

          setTimeout(() => {


            this.orderFirestoreService.creatNewUserOrder(userData.user.uid);
            this.orderFirestoreService.saveProductsInFS(userData.user.uid, this.productPerOrderLocalStorage);


            this.router.navigateByUrl('/bestellung');

          }, 2000);
        }

      })
      .catch(err => {
        console.log('error bs: ' + err);
      });


  }


}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderFirestoreService } from '../shared/order-firestore.service';
import { ProductFirestoreService } from '../../product/shared/product-firestore.service';
import { UserService } from '../../user/shared/user.service';
import { LocalStorageService } from '../../shared/local-storage.service';
import { ProductPerOrderLocalStorage } from '../../models/productPerOrderLocalStorage.model';
import { AuthService } from '../../user/shared/auth.service';
import { SettingsService } from '../../shared/settings.service';
import { OrderFlyoutService } from '../../core/shared/order-flyout-service';
import { Subscription } from 'rxjs-compat/Subscription';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styles: []
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  productPerOrderLocalStorage: ProductPerOrderLocalStorage[];
  orderId: string;
  user: any;
  userId: string;
  order: any;
  totalValue: number;
  authSubscription: Subscription;
  productsSubscription: Subscription;
  p = 1;



  constructor(
    private activatedRoute: ActivatedRoute,
    private orderFirestoreService: OrderFirestoreService,
    private productFireStoreService: ProductFirestoreService,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private settingsService: SettingsService,
    private orderFlyoutService: OrderFlyoutService,

  ) {


  }

  ngOnInit() {
    this.authSubscription = this.authService.user$.subscribe((user) => {
      if (user && user.emailVerified) {
        this.user = user;
        this.getProducts(user.id);
      } else {
        this.getProducts(this.localStorageService.getData('anonymusOrderId').orderId);
      }
    });



    this.productsSubscription = this.orderFlyoutService.currentProductsPerOrderLocalStorage.subscribe(
      (data: ProductPerOrderLocalStorage[]) => this.productPerOrderLocalStorage = data
    );


  }

  getProducts(orderId) {
    this.orderFirestoreService.getUserOrder(orderId).subscribe((res) => {
      this.order = res;
      this.orderFlyoutService.refreshOrderFlyout(this.localStorageService.getData('products'), this.order);
    });

  }


  onEnterOrderData() {
    if (this.user) {
      this.router.navigate(['/checkout/customerdata']);
    } else {
      this.router.navigate(['/checkout-login']);
    }
  }

  onDeleteScart() {
    this.orderFirestoreService.clearScart(this.productPerOrderLocalStorage);
    this.productPerOrderLocalStorage = [];
    this.router.navigate(['/bestellung']);
    this.orderFirestoreService.calcOrderTotalValue();
  }

  onDeletItem(productId: string) {
    this.productPerOrderLocalStorage.forEach((product, index, sourceArray) => {
      if (product.productId === productId) {
        sourceArray.splice(index, 1);
      }
    });
    this.orderFirestoreService.deleteProductFromOrder(productId);
    this.orderFirestoreService.calcOrderTotalValue();
  }

  onDecreaseQty(productPerOrderLocalStorage: ProductPerOrderLocalStorage) {
    productPerOrderLocalStorage.qty = productPerOrderLocalStorage.qty === 1 ? 1 : productPerOrderLocalStorage.qty - 1;
    this.orderFirestoreService.updateProductQty(productPerOrderLocalStorage);
    this.orderFirestoreService.calcOrderTotalValue();
  }

  onIncreaseQty(productPerOrderLocalStorage: ProductPerOrderLocalStorage) {
    productPerOrderLocalStorage.qty += 1;
    this.orderFirestoreService.updateProductQty(productPerOrderLocalStorage);
    this.orderFirestoreService.calcOrderTotalValue();
  }

  onChangeQty(productPerOrderLocalStorage: ProductPerOrderLocalStorage) {
    productPerOrderLocalStorage.qty = Number(productPerOrderLocalStorage.qty);
    this.orderFirestoreService.updateProductQty(productPerOrderLocalStorage);
    this.orderFirestoreService.calcOrderTotalValue();
  }

  get itemsPerPage() {
    return this.settingsService.getSettings().itemsPerPage;
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
  }


}

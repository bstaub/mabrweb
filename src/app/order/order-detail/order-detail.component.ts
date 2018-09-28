import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../order.service';
import {OrderFirestoreService} from '../shared/order-firestore.service';
import {Observable} from 'rxjs';
import {ProductFirestoreService} from '../../product/shared/product-firestore.service';
import {UserService} from '../../user/shared/user.service';
import {LocalStorageService} from '../../shared/local-storage.service';
import {Order} from '../order.model';



@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styles: []
})
export class OrderDetailComponent implements OnInit {

  orderId: string;
  orderData: Order[];
  products: any[];
  user: any;
  userId: string;
  productStore: any[];
  order: Observable<any>;


  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private orderFirestoreService: OrderFirestoreService,
    private productFireStoreService: ProductFirestoreService,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {


  }


  ngOnInit() {

    setTimeout(() => {
      this.user = this.userService.getCurrentUser();

      this.getProducts();
    }, 1000)


  }



  getProducts(){
    let productsArray = [];

    if (this.user) {
      console.log('getProd - User OK'+ this.user.uid);
      this.order = this.orderFirestoreService.getUserOrder(this.user.uid);


      this.orderFirestoreService.getUserOrder(this.user.uid).subscribe((res) =>{
        this.orderData = res;
      })

      console.log(this.orderData);
      console.log(this.order);

      this.orderFirestoreService.getProductsPerOrder(this.orderId).ref.get().then(function (res) {

        res.forEach(doc => {
          let newProduct = doc.data();
          newProduct.id = doc.id;
          if (newProduct.productId) {
            newProduct.productId.get()
              .then(res => {
                newProduct.productData = res.data()
                if (newProduct.productData) {
                  productsArray.push(newProduct)
                }
              })
              .catch(err => console.error(err));
          };
        })
      })
        .catch(err => console.error(err));

      this.productStore = productsArray;
      console.log(this.order);

      //this.productsOrderCollection = this.afs.doc(`productsPerOrder/${key}`).collection('products');
    } else {


      console.log('getProd - noUser');
      this.productStore = this.localStorageService.getData('products');
      console.log(this.productStore);
    }


  }

  onDelete() {
    this.router.navigate(['/bestellung']);

    if (this.user) {
      this.orderFirestoreService.deleteOrder(this.orderId);
      this.orderFirestoreService.deleteProductsPerOrder(this.orderId);
    } else {
      this.orderFirestoreService.deleteOrderAnonymus(this.orderId);
      this.orderFirestoreService.deleteProductsPerOrderAnonymus(this.orderId, this.products);
    }
  }


  onEdit() {
    this.router.navigate(['/bestellung', this.orderId, 'bearbeiten']);
  }

  onAuthorize() {
    this.router.navigate(['/bestellung', this.orderId, 'bearbeiten']);
  }






  /* exOnNgInit
     this.activatedRoute.params.subscribe(
       params => {
         this.orderId = params['id'];



         this.products = [];
         let productsArray = [];

         if (this.user) {
           this.userId = this.user.uid;
           //console.log('orderDetails - user Ok');
         } else {
           this.userId = '0';
           //console.log('orderDetails - No user');
         }

         this.selectedOrder = this.orderFirestoreService.getOrderDoc(params['id'], this.userId).valueChanges();
         this.orderFirestoreService.getProductsPerOrder(this.orderId, this.userId).ref.get().then(function (res) {

           res.forEach(doc => {
             let newProduct = doc.data();
             newProduct.id = doc.id;
             if (newProduct.productId) {
               newProduct.productId.get()
                 .then(res => {
                   newProduct.productData = res.data()
                   if (newProduct.productData) {
                     productsArray.push(newProduct)
                   }
                 })
                 .catch(err => console.error(err));
             };
           })
         })
           .catch(err => console.error(err));

         this.products = productsArray;


       }
     );

   */


}

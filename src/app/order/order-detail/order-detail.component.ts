import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../order.service';
import {OrderFirestoreService} from '../shared/order-firestore.service';
import {Observable} from 'rxjs';
import {ProductFirestoreService} from '../../product/shared/product-firestore.service';
import {UserService} from '../../user/shared/user.service';
import {LocalStorageService} from '../../shared/local-storage.service';
import {Order} from '../order.model';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../user/shared/auth.service';
import {ProductPerOrder} from '../productPerOrder.model';



@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styles: []
})
export class OrderDetailComponent implements OnInit {

  productStore: any[];
  orderId: string;
  orderData: Order[];
  user: any;
  userId: string;
  //order: Observable<any>;
  order: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private orderFirestoreService: OrderFirestoreService,
    private productFireStoreService: ProductFirestoreService,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private authService: AuthService
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

      // this.localStorageService.destroyUserLocalStorage('products');
      //this.order = this.orderFirestoreService.getUserOrder(this.user.uid);


      this.orderFirestoreService.getUserOrder(this.user.uid).subscribe((res) =>{
        this.order = res[0];
        /*
        this.orderFirestoreService.getProductsPerOrder(this.order.key).ref.get().then( (res) =>{

          res.forEach(doc => {
            let newProduct = doc.data();
            newProduct.id = doc.id;
            if (newProduct.productId) {
              newProduct.productId.get()
                .then(res => {
                  newProduct.productData = res.data()
                  if (newProduct.productData) {
                    productsArray.push(newProduct)

                    let productStore = [];
                    productStore = this.localStorageService.getData('products');
                    productStore.push({
                      productId:newProduct.id,
                      qty:newProduct.qty,
                      description:newProduct.productData.name
                    });
                    this.localStorageService.setData('products',productStore);

                  }
                })
            };
          })

        })
          .catch(err => console.error(err));
  */
      })


      this.productStore = this.localStorageService.getData('products');
      console.log(this.productStore);


      //this.productsOrderCollection = this.afs.doc(`productsPerOrder/${key}`).collection('products');
    } else {


      // console.log('getProd - noUser');
      this.productStore = this.localStorageService.getData('products');
      //console.log(this.productStore);
    }


  }

  onDelete() {
    this.orderFirestoreService.clearScart();
    this.productStore = [];

    this.router.navigate(['/bestellung']);


  }


  onSubmit(form: NgForm) {
    let productsArray = [];

    this.authService.loginWithUserPassword(form.value.email, form.value.password)
      .then( userData => {

        if (userData && userData.user.emailVerified) {

          setTimeout(() => {

            const order = new Order();
            order.shopOrderId = 'ShopID XXX-123';
            order.orderDate = new Date();
            order.status = 'pending';
            order.totalValue = 100;
            order.userId = userData.user.uid;

            //this.orderFirestoreService.deleteUserOrder(userData.user.uid)
            this.orderId = this.orderFirestoreService.addUserOrder(order);
            console.log(this.orderId);
            console.log(this.productStore);
            console.log(this.user);
            this.productStore.forEach((product) => {
              const newProductPerOrder = new ProductPerOrder();
              newProductPerOrder.productId = product.productId;
              newProductPerOrder.qty = product.qty;
              newProductPerOrder.userId = userData.user.uid;
              console.log(newProductPerOrder);

              this.orderFirestoreService.addProductToOrderUser(newProductPerOrder);

            });

            this.localStorageService.destroyUserLocalStorage('products');
            this.orderFirestoreService.getProductsPerOrder(this.orderId).ref.get().then( (res) =>{

              res.forEach(doc => {
                let newProduct = doc.data();
                newProduct.id = doc.id;
                if (newProduct.productId) {
                  newProduct.productId.get()
                    .then(res => {
                      newProduct.productData = res.data()
                      if (newProduct.productData) {
                        productsArray.push(newProduct)

                        let productStore = [];
                        productStore = this.localStorageService.getData('products');
                        productStore.push({
                          productId:newProduct.id,
                          qty:newProduct.qty,
                          description:newProduct.productData.name
                        });
                        this.localStorageService.setData('products',productStore);

                      }
                    })
                };
              })

            })
              .catch(err => console.error(err));

            this.productStore = this.localStorageService.getData('products');
            console.log(this.productStore);
            this.router.navigateByUrl('/bestellung');

          }, 2000);
        }

      })
      .catch( err => {
        console.log('error bs: ' + err);
      });


  }








}

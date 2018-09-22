import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../order.service';
import {OrderFirestoreService} from '../shared/order-firestore.service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductFirestoreService} from '../../product/shared/product-firestore.service';
import {ProductPerOrder} from '../productPerOrder.model';
import * as firebase from 'firebase';
import {UserService} from '../../user/shared/user.service';



@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styles: []
})
export class OrderDetailComponent implements OnInit {
  addProductForm: FormGroup;
  selectedOrder: Observable<any>;
  order: Observable<any>;
  orderId: string;
  products: any[];
  allProducts: any;
  selectedProduct: string;
  user: any;
  userId: string;
  productAmount: number;


  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private orderFirestoreService: OrderFirestoreService,
    private productFireStoreService: ProductFirestoreService,
    private router: Router,
    private userService: UserService) {}




  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.productAmount = 0;
    this.selectedProduct = '';


    this.getAllProducts();

    this.activatedRoute.params.subscribe(
      params => {
        this.orderId = params['id'];



        this.products = [];
        let productsArray = [];

        if (this.user) {
          this.userId = this.user.uid;
          console.log('orderDetails - user Ok');
        } else {
          this.userId = '0';
          console.log('orderDetails - No user');
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


    this.addProductForm = new FormGroup({
      'products': new FormControl('', Validators.required),


    });



  }

  getAllProducts () {

    this.allProducts = this.productFireStoreService.getProducts();

  }

  onAddProductControl() {

    let newProductperOrder = new ProductPerOrder();
    newProductperOrder.productId = this.selectedProduct;
    newProductperOrder.qty = this.productAmount;

    this.orderFirestoreService.addProductToOrder(newProductperOrder);

    this.selectedProduct = '';
    this.productAmount = 0;
    this.router.navigate(['/bestellung', this.orderId]);

  }


  onDelete() {
    this.router.navigate(['/bestellung']);

    if (this.user) {
      this.orderFirestoreService.deleteOrder(this.orderId);
      this.orderFirestoreService.deleteProductsPerOrder(this.orderId);
    } else {
      this.orderFirestoreService.deleteOrderAnonymus(this.orderId);
      this.orderFirestoreService.deleteProductsPerOrderAnonymus(this.orderId);
    }
  }


  onEdit() {
    this.router.navigate(['/bestellung', this.orderId, 'bearbeiten']);
  }

  onAuthorize() {
    this.router.navigate(['/bestellung', this.orderId, 'bearbeiten']);
  }

  onSubmitOrder() {

  }




}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../order.service';
import {OrderFirestoreService} from '../shared/order-firestore.service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductFirestoreService} from '../../product/shared/product-firestore.service';
import {ProductsPerOrder} from '../productsPerOrder.model';



@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styles: []
})
export class OrderDetailComponent implements OnInit {
  addProductForm: FormGroup;
  selectedOrder: Observable<any>;
  order: Observable<any>;
  private orderId: string;
  products: any[];
  allProducts: any;
  selectedProduct: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private orderFirestoreService: OrderFirestoreService,
    private productFireStoreService: ProductFirestoreService,
    private router: Router) {}




  ngOnInit() {

    this.getAllProducts();

    this.activatedRoute.params.subscribe(
      params => {
        this.orderId = params['id'];
        // this.selectedOrder = this.orderService.getOrder(params['id']).valueChanges();
        // this.order = this.orderService.getProductsPerOrder(params['id']).valueChanges();

        this.selectedOrder = this.orderFirestoreService.getOrder(params['id']).valueChanges();

        this.products = [];
        let productsArray = [];

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

  onAddProductControl(amount:number) {


    let newProductperOrder = new ProductsPerOrder();
    newProductperOrder.orderId = this.orderId;
    newProductperOrder.productId = this.selectedProduct;
    newProductperOrder.qty = amount;


    this.orderFirestoreService.addProductToOrder(newProductperOrder);
    this.router.navigate(['/bestellung',this.orderId]);

  }


  onDelete() {
    this.router.navigate(['/bestellung']);
    // this.orderService.deleteOrder(this.orderId);
    this.orderFirestoreService.deleteOrder(this.orderId);
  }


  onEdit() {
    this.router.navigate(['/bestellung', this.orderId, 'bearbeiten']);
  }

  onAuthorize() {

  }

  onSubmitOrder() {

  }




}

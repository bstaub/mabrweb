import {Component, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {OrderFirestoreService} from '../shared/order-firestore.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../order.model';
import {UserService} from '../../user/shared/user.service';
import {ProductPerOrder} from '../productPerOrder.model';



@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styles: []
})
export class OrderEditComponent implements OnInit {

  orderArray: Order[];
  order: any;
  private userId: string;
  user: any;
  allUsers: any;
  selectedUser: string;
  products: any[];


  constructor(private orderService: OrderService,
              private orderFirestoreService: OrderFirestoreService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {



  }


  onAuthorize() {

    const order = new Order();
    order.shopOrderId = this.orderArray[0].shopOrderId;
    order.orderDate = this.orderArray[0].orderDate;
    order.status = this.orderArray[0].status;
    order.totalValue = 100;
    order.userId = this.selectedUser;
    //this.orderFirestoreService.deleteOrderAnonymus(this.orderArray[0].key);
    //this.orderFirestoreService.deleteProductsPerOrderAnonymus(this.orderArray[0].key, this.products);
    //this.orderFirestoreService.addUserOrder(order);

    this.products.forEach((product) => {
      const newProductPerOrder = new ProductPerOrder();
      newProductPerOrder.productId = product.id;
      newProductPerOrder.qty = product.qty;
      newProductPerOrder.orderId = this.selectedUser;
      console.log(newProductPerOrder);

      //this.orderFirestoreService.addProductToOrderUser(newProductPerOrder);

    });


  }


  onCancel() {
    this.onNavigateBack();
  }

  onNavigateBack() {
    this.router.navigate(['/bestellung']);
  }


  ngOnInit() {



    this.user = this.userService.getCurrentUser();
    this.getAllUsers();



    const productsArray = [];




    this.activatedRoute.params.subscribe(
      params => {
        if (params.hasOwnProperty('id')) {

          this.orderFirestoreService.getProductsPerOrder(this.userId).ref.get().then(function (res) {

            res.forEach(doc => {
              const newProduct = doc.data();
              newProduct.id = doc.id;
              if (newProduct.productId) {
                newProduct.productId.get()
                  .then(ressource => {
                    newProduct.productData = ressource.data();
                    if (newProduct.productData) {
                      productsArray.push(newProduct);
                    }
                  })
                  .catch(err => console.error(err));
              }
            });
          })
            .catch(err => console.error(err));

          this.products = productsArray;



        }

      }
    );








  }


  getAllUsers () {

    this.allUsers = this.userService.getUsers();

  }


}

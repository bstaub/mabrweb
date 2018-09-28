import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {Order} from '../order.model';
import {ProductPerOrder} from '../productPerOrder.model';
import * as firebase from 'firebase';
import {UserService} from '../../user/shared/user.service';
import {LocalStorageService} from '../../shared/local-storage.service';



@Injectable({
  providedIn: 'root'
})
export class OrderFirestoreService {

  orders: Observable<Order[]>;
  products: Observable<any[]>

  orderPerUser: AngularFirestoreCollection<Order>;
  orderCollection: AngularFirestoreCollection<Order>;
  orderCollection_completed: AngularFirestoreCollection<Order>;


  productsOrderCollection: AngularFirestoreCollection<any>;
  productsPerOrderDocument: AngularFirestoreDocument<any>;

  orderDoc: AngularFirestoreDocument<Order>;
  order: Order;
  user: any;





  constructor(public afs: AngularFirestore,
              private userService: UserService,
              private localStorageService: LocalStorageService) {

    this.orderCollection = this.afs.collection('orders');
    this.orderCollection_completed = this.afs.collection('orders_completed');



    this.user = this.userService.getCurrentUser();

    this.orders = this.orderCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const key = a.payload.doc.id;
        return { key, ...data };
      }))

    );



    this.user = this.userService.getCurrentUser();
  }


  // Anzeige der Produktdaten
  getUserOrder(userId) {
    this.orderPerUser = this.afs.collection('orders', ref => ref.where('userId', '==', userId ));
    this.orders = this.orderPerUser.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const key = a.payload.doc.id;
        return { key, ...data };
      }))
    );
    return this.orders;
  }





  // Produkte per Order holen
  getProductsPerOrder(oderKey) {
    this.productsOrderCollection = this.afs.doc(`productsPerOrder/${oderKey}`).collection('products');
    return  this.productsOrderCollection;
  }

  // Bestellung abschliessen
  closeUserOrder(order: Order) {

    const data = JSON.parse(JSON.stringify(order));
    const ref =  this.afs.createId();

    this.orderCollection_completed.doc(ref).set(data).then(function (docRef) {
      //console.log(ref);
    })

    return ref;
  }

  // Zuweisung automatisch generierter Key bei Abschluss
  closeProductsPerOrder(orderId: string, userId: string, products: Array<any>){
    products.forEach((product) => {
      const productPerOrder = new ProductPerOrder();
      productPerOrder.productId = product.productId;
      productPerOrder.qty = product.qty;
      productPerOrder.orderId = orderId;

      this.afs.doc(`productsPerOrder_completed/${orderId}`).collection('products').doc(productPerOrder.productId).set({
        orderId: this.afs.collection('orders').doc(orderId).ref,
        productId: this.afs.collection('products').doc(productPerOrder.productId).ref,
        qty: +productPerOrder.qty
      }).then(function() {
         console.log('Document successfully archieved!');
      }).catch(function(error) {
         console.error('Error archiving document: ', error);
      });

    });
  }


  // Initial Order erstellen
  creatNewUserOrder(userId: string) {
    const order = new Order();
    order.shopOrderId = 'ShopID XXX-123';
    order.orderDate = new Date();
    order.status = 'pending';
    order.totalValue = 0;
    order.userId = userId;

    const data = JSON.parse(JSON.stringify(order));
    //const ref =  this.afs.createId();

    this.orderCollection.doc(userId).set(data).then(function (docRef) {
      //console.log(ref);
    })

  }

  //Warenkorb in Firestore speichern (userId als Key wenn Status pending )
  saveProducts(userId: string, products: Array<any>){

   products.forEach((product) => {
      const productPerOrder = new ProductPerOrder();
      productPerOrder.productId = product.productId;
      productPerOrder.qty = product.qty;
      productPerOrder.orderId = userId;

     this.afs.doc(`productsPerOrder/${productPerOrder.orderId}`).collection('products').doc(productPerOrder.productId).set({
       userId: this.afs.collection('orders').doc(productPerOrder.orderId).ref,
       productId: this.afs.collection('products').doc(productPerOrder.productId).ref,
       qty: +productPerOrder.qty
     }).then(function() {
       // console.log('Document successfully added!');
     }).catch(function(error) {
       // console.error('Error adding document: ', error);
     });

    });
  }



  //Warenkorb von Firestore in LocalStorage speichern
  loadProducts(userId: string){


    const productsArray = [];

    this.localStorageService.destroyUserLocalStorage('products')
    this.getProductsPerOrder(userId).ref.get().then( (res) => {
      res.forEach(doc => {
        const newProduct = doc.data();
        console.log(newProduct);
        newProduct.id = doc.id;
        if (newProduct.productId) {
          newProduct.productId.get()
            .then(ressource => {
              newProduct.productData = ressource.data();
              if (newProduct.productData) {

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
            .catch(err => console.error(err));
        }
      });
    })
      .catch(err => console.error(err));




    }



  // 1.) Einstieg von Produktseite
  addProductToOrder(productPerOrder: ProductPerOrder) {

    this.user = this.userService.getCurrentUser();

    if (this.user) {

      //productPerOrder.userId = this.user.uid;
      //this.addProductToOrderUser(productPerOrder);
      // console.log('onAddProductControl - user Ok');


      let productStore = [];
      productStore = this.localStorageService.getData('products');
      // console.log(productStore);
      productStore.push({
        productId:productPerOrder.productId,
        qty:productPerOrder.qty,
        description:productPerOrder.description
      });

      this.localStorageService.setData('products',productStore);
      // console.log('onAddProductControl - No user');


    } else {

      let productStore = [];
      productStore = this.localStorageService.getData('products');
      // console.log(productStore);
      productStore.push({
        productId:productPerOrder.productId,
        qty:productPerOrder.qty,
        description:productPerOrder.description
      });

      this.localStorageService.setData('products',productStore);
      // console.log('onAddProductControl - No user');
    }



  }

  //


   // Warenkorb löschen
  clearScart(products: any[]){
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.deleteProductsPerOrder(this.user.uid, products);
    }
    this.localStorageService.destroyUserLocalStorage('products');
  }

  // Warenkorb Firestore löschen (vor speichern)
  clearScartStorage(products: any[]){
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.deleteProductsPerOrder(this.user.uid, products);
    }
  }


  deleteOrder(key: string) {
    this.orderDoc = this.afs.doc(`orders/${key}`);
    this.orderDoc.delete();
  }





  deleteProductsPerOrder(userId: string, products: any[]) {
    products.forEach((product) => {
      this.productsPerOrderDocument = this.afs.doc(`productsPerOrder/${userId}`).collection('products').doc(product.productId);
      this.productsPerOrderDocument.delete().then(function() {
        console.log('Document successfully deleted!');
      }).catch(function(error) {
        console.error('Error removing temp document: ', error);
      });

    });
  }



}

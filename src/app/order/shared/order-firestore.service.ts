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
  orderCollection: AngularFirestoreCollection<Order>;
  orderDocument: AngularFirestoreDocument<Order>;
  orderCollection_temp: AngularFirestoreCollection<Order>;
  orderCollectionPerUser: AngularFirestoreCollection<Order>;
  productsOrderCollection: AngularFirestoreCollection<any>;
  productsPerOrderDocument: AngularFirestoreDocument<any>;
  orders: Observable<Order[]>;
  orders_temp: Observable<Order[]>;
  orderDoc: AngularFirestoreDocument<Order>;
  order: Order;
  user: any;
  orderData: Order[];





  constructor(public afs: AngularFirestore,
              private userService: UserService,
              private localStorageService: LocalStorageService) {

    this.orderCollection = this.afs.collection('orders');
    this.orderCollection_temp = this.afs.collection('orders_temp');



    this.orders = this.orderCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const key = a.payload.doc.id;
        return { key, ...data };
      }))

    );



    this.orders_temp = this.orderCollection_temp.snapshotChanges().pipe(
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
    console.log('filter ' +userId);
    this.orderCollectionPerUser = this.afs.collection('orders', ref => ref.where('userId', '==', userId ));
    this.orders = this.orderCollectionPerUser.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const key = a.payload.doc.id;
        return { key, ...data };
      }))
    );
    return this.orders;
  }




  getOrderData() {

    this.orders = this.orderCollectionPerUser.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const key = a.payload.doc.id;
        return { key, ...data };
      }))
    );


  }

  getOrderDocAnonymusData() {
    const orderArray = [];
    let order = null;
    this.afs.collection('orders_temp', ref => ref.where('userId', '==', '0' )).ref.get().then(function (res) {
      res.forEach(doc => {
        order = doc.data() as Order;
        order.key = doc.id;
        orderArray.push(order);
      });
    });


    return orderArray;

  }


  getOrderDoc(key, userId) {
    if (userId === '0') {
      this.orderDoc = this.afs.doc(`orders_temp/${key}`);
    } else {
      this.orderDoc = this.afs.doc(`orders/${key}`);
    }

    return this.orderDoc;
  }




  // Produkte per Order holen
  getProductsPerOrder(oderKey) {
    this.productsOrderCollection = this.afs.doc(`productsPerOrder/${oderKey}`).collection('products');
    return  this.productsOrderCollection;
  }


  addUserOrder(order: Order) {

    const data = JSON.parse(JSON.stringify(order));
    this.orderCollection.add(data);
  }




  // 1.) Einstieg von Produktseite
  addProductToOrder(productPerOrder: ProductPerOrder) {

    this.user = this.userService.getCurrentUser();

    if (this.user) {
      productPerOrder.userId = this.user.uid;
      this.addProductToOrderUser(productPerOrder);
      console.log('onAddProductControl - user Ok');
    } else {

      let productStore = [];
      productStore = this.localStorageService.getData('products');
      console.log(productStore);
      productStore.push({
        productId:productPerOrder.productId,
        qty:productPerOrder.qty,
        description:productPerOrder.description
      });

      this.localStorageService.setData('products',productStore);
      console.log('onAddProductControl - No user');
    }



  }


  addProductToOrderUser(productPerOrder: ProductPerOrder) {

    const db = firebase.firestore();

    // https://medium.com/@scarygami/cloud-firestore-quicktip-documentsnapshot-vs-querysnapshot-70aef6d57ab3

    const orderCollection_temp =   this.afs.collection('orders');

    let order;

    this.afs.collection('orders', ref => ref.where('userId', '==', productPerOrder.userId )).ref.get().then (function (doc) {

      if (doc.empty) {
        console.log('new order');
        order = new Order();
        order.shopOrderId = 'test';
        order.orderDate = new Date();
        order.status = 'pending';
        order.totalValue = 0;
        order.userId = productPerOrder.userId;
        console.log(order);

        const data = JSON.parse(JSON.stringify(order));
        orderCollection_temp.add(data).then(function (orderDocRef) {
          db.collection('productsPerOrder').doc(orderDocRef.id).collection('products').doc(productPerOrder.productId).set({
            orderId: db.doc('orders/' + orderDocRef.id),
            productId: db.doc('products/' + productPerOrder.productId),
            qty: productPerOrder.qty

          });
        });


      } else {
        console.log('order exist');
        doc.forEach(function (documentSnapshot) {
          const data = documentSnapshot.data();
          const orderKey  = documentSnapshot.id;
          console.log(data);
          console.log(orderKey);
          db.doc(`productsPerOrder/${orderKey}`).collection('products').doc(productPerOrder.productId).set({
            orderId: db.collection('orders').doc(orderKey),
            productId: db.collection('products').doc(productPerOrder.productId),
            qty: +productPerOrder.qty
          });
        });

      }
    });

  }



  deleteOrder(key: string) {
    this.orderDoc = this.afs.doc(`orders/${key}`);
    this.orderDoc.delete();
  }

  deleteAnonymusOrder(key: string) {
    this.orderDoc = this.afs.doc(`orders_temp/${key}`);
    this.orderDoc.delete();
  }


  deleteOrderAnonymus(key: string) {
    this.orderDoc = this.afs.doc(`orders_temp/${key}`);
    this.orderDoc.delete();
  }

  deleteProductsPerOrder(key: string) {
    this.productsPerOrderDocument = this.afs.doc(`productsPerOrder/${key}`);
    this.productsPerOrderDocument.delete();
  }

  deleteProductsPerOrderAnonymus(key: string, products: any[]) {
    console.log(products);
    products.forEach((product) => {
      console.log(product.id);

      this.productsPerOrderDocument = this.afs.doc(`productsPerOrder_temp/${key}`).collection('products').doc(product.id);
      console.log(`productsPerOrder_temp/${key}`);
      this.productsPerOrderDocument.delete().then(function() {
        console.log('Document temp successfully deleted!');
      }).catch(function(error) {
        console.error('Error removing temp document: ', error);
      });



    });


  }



  updateOrder(order: Order) {
    this.orderDoc = this.afs.doc(`orders/${order.key}`);
    this.orderDoc.update(order);

  }

  authorizeOrder(orderKey, order: Order) {
    this.orderDoc = this.afs.doc(`orders/${orderKey}`);
    this.orderDoc.update(order);

  }










  // ???

  addProductToOrderAnonymus(productPerOrder: ProductPerOrder) {

    console.log('addProductToOrderAnonymus');
    const db = firebase.firestore();


    const orderCollection_temp =   this.afs.collection('orders_temp');
    let order;

    this.afs.collection('orders_temp', ref => ref.where('userId', '==', '0' )).ref.get().then (function (doc) {

      if (doc.empty) {
        console.log('new order');
        order = new Order();
        order.shopOrderId = 'test';
        order.orderDate = new Date();
        order.status = 'pending';
        order.totalValue = 0;
        order.userId = '0';
        console.log(order);

        const data = JSON.parse(JSON.stringify(order));
        orderCollection_temp.add(data).then(function (orderDocRef) {
          db.collection('productsPerOrder_temp').doc(orderDocRef.id).collection('products').doc(productPerOrder.productId).set({
            orderId: db.doc('orders/' + orderDocRef.id),
            productId: db.doc('products/' + productPerOrder.productId),
            qty: productPerOrder.qty

          });
        });


      } else {
        console.log('order exist');
        doc.forEach(function (documentSnapshot) {
          const orderKey  = documentSnapshot.id;
          db.doc(`productsPerOrder_temp/${orderKey}`).collection('products').doc(productPerOrder.productId).set({
            orderId: db.collection('orders').doc(orderKey),
            productId: db.collection('products').doc(productPerOrder.productId),
            qty: +productPerOrder.qty
          });
        });

      }
    });
  }




}

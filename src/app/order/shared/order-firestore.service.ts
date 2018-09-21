import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {Order} from '../order.model';
import {ProductsPerOrder} from '../productsPerOrder.model';
import {Product} from '../../product/product.model';
import * as firebase from 'firebase';


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
  order_temp: any;




  constructor(public afs: AngularFirestore) {
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
  }



  getUserOrder(userId) {

    this.orderCollectionPerUser = this.afs.collection('orders', ref => ref.where('userId','==', userId ))
    this.getOrderData();
    return this.orders;
  }

  getAnonymusOrder() {

    this.orderCollectionPerUser = this.afs.collection('orders_temp', ref => ref.where('userId','==', '0' ));
    this.getOrderData();
    return this.orders;
  }


  getOrderData(){
    this.orders = this.orderCollectionPerUser.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const key = a.payload.doc.id;
        return { key, ...data };
      }))
    );
  }


  getOrderDoc(key, userId) {
    if (userId == '0') {
      this.orderDoc = this.afs.doc(`orders_temp/${key}`);
    } else {
      this.orderDoc = this.afs.doc(`orders/${key}`);
    }

    return this.orderDoc;
  }


  getOrderDocAnonymusByFilter(){
    this.orderCollection = this.afs.collection('orders_temp',ref => ref.where('userId','==', '0' ));
    return this.orderCollection;
  }

  getOrderDocAnonymus(key) {
    this.orderDoc = this.afs.doc(`orders_temp/${key}`);
    return this.orderDoc;
  }



  getProductsPerOrder(key, userId) {

    if (userId == '0') {
      this.productsOrderCollection = this.afs.doc(`productsPerOrder_temp/${key}`).collection('products');
    } else {
      this.productsOrderCollection = this.afs.doc(`productsPerOrder/${key}`).collection('products');
    }
    return  this.productsOrderCollection;
  }


  addOrder(order: Order) {

    var data = JSON.parse(JSON.stringify(order));
    this.orderCollection.add(data);
  }

  addOrderAnonymus(order: Order, productPerOrder: ProductsPerOrder) {
    const db = firebase.firestore();
    var data = JSON.parse(JSON.stringify(order));
    this.orderCollection_temp.add(data).then(function (orderDocRef) {
      db.collection('productsPerOrder_temp').doc(orderDocRef.id).collection('products').doc(productPerOrder.productId).set({
        orderId: db.doc('orders/' + orderDocRef.id),
        productId: db.doc('products/' + productPerOrder.productId),
        qty: productPerOrder.qty

      });
    })


  }



  addProductToOrder(productPerOrder: ProductsPerOrder) {

    const db = firebase.firestore();

    //https://medium.com/@scarygami/cloud-firestore-quicktip-documentsnapshot-vs-querysnapshot-70aef6d57ab3

    var orderCollection_temp =   this.afs.collection('orders');

    var order;

    this.afs.collection('orders', ref => ref.where('userId','==', productPerOrder.userId )).ref.get().then (function (doc) {

      if (doc.empty) {
        console.log('new order');
        order = new Order();
        order.shopOrderId = 'test';
        order.orderDate = new Date();
        order.status = 'pending';
        order.totalValue = 0;
        order.userId = productPerOrder.userId;
        console.log(order);

        var data = JSON.parse(JSON.stringify(order));
        orderCollection_temp.add(data).then(function (orderDocRef) {
          db.collection('productsPerOrder').doc(orderDocRef.id).collection('products').doc(productPerOrder.productId).set({
            orderId: db.doc('orders/' + orderDocRef.id),
            productId: db.doc('products/' + productPerOrder.productId),
            qty: productPerOrder.qty

          });
        })


      } else {
        console.log('order exist');
        doc.forEach(function (documentSnapshot) {
          var data = documentSnapshot.data();
          var orderKey  = documentSnapshot.id;
          console.log(data);
          console.log(orderKey);
          db.doc(`productsPerOrder/${orderKey}`).collection('products').doc(productPerOrder.productId).set({
            orderId: db.collection('orders').doc(orderKey),
            productId: db.collection('products').doc(productPerOrder.productId),
            qty: +productPerOrder.qty
          });
        })

      }
    })

  }

  addProductToOrderAnonymus(productPerOrder: ProductsPerOrder) {

    const db = firebase.firestore();


    var orderCollection_temp =   this.afs.collection('orders_temp');
    var order;

    this.afs.collection('orders_temp', ref => ref.where('userId','==', '0' )).ref.get().then (function (doc) {

      if (doc.empty) {
        console.log('new order');
        order = new Order();
        order.shopOrderId = 'test';
        order.orderDate = new Date();
        order.status = 'pending';
        order.totalValue = 0;
        order.userId = '0';
        console.log(order);

        var data = JSON.parse(JSON.stringify(order));
        orderCollection_temp.add(data).then(function (orderDocRef) {
          db.collection('productsPerOrder_temp').doc(orderDocRef.id).collection('products').doc(productPerOrder.productId).set({
            orderId: db.doc('orders/' + orderDocRef.id),
            productId: db.doc('products/' + productPerOrder.productId),
            qty: productPerOrder.qty

          });
        })


      } else {
        console.log('order exist');
        doc.forEach(function (documentSnapshot) {
          var data = documentSnapshot.data();
          var orderKey  = documentSnapshot.id;
          console.log(data);
          console.log(orderKey);
          db.doc(`productsPerOrder_temp/${orderKey}`).collection('products').doc(productPerOrder.productId).set({
            orderId: db.collection('orders').doc(orderKey),
            productId: db.collection('products').doc(productPerOrder.productId),
            qty: +productPerOrder.qty
          });
        })

      }
    })
  }

  deleteOrder(key: string) {
    this.orderDoc = this.afs.doc(`orders/${key}`);
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

  deleteProductsPerOrderAnonymus(key: string) {
    console.log()
    this.productsPerOrderDocument = this.afs.doc(`productsPerOrder_temp/${key}`);
    console.log(`productsPerOrder_temp/${key}`);
    this.productsPerOrderDocument.delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });

  }



  updateOrder(orderKey, order: Order) {
    this.orderDoc = this.afs.doc(`orders/${orderKey}`);
    this.orderDoc.update(order);

  }

  authorizeOrder(orderKey, order: Order) {
    this.orderDoc = this.afs.doc(`orders/${orderKey}`);
    this.orderDoc.update(order);

  }



}

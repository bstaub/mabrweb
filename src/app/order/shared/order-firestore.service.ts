import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {Order} from '../order.model';
import {ProductsPerOrder} from '../productsPerOrder.model';


@Injectable({
  providedIn: 'root'
})
export class OrderFirestoreService {
  orderCollection: AngularFirestoreCollection<Order>;
  orderCollectionPerUser: AngularFirestoreCollection<Order>;
  productsOrderCollection: AngularFirestoreCollection<any>;
  productsPerOrderDocument: AngularFirestoreDocument<any>;
  orders: Observable<Order[]>;
  orderDoc: AngularFirestoreDocument<Order>;
  order: Order;



  constructor(public afs: AngularFirestore) {
    this.orderCollection = this.afs.collection('orders');






    this.orders = this.orderCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const key = a.payload.doc.id;
        return { key, ...data };
      }))
    );
  }



  getUserOrders(userId) {

    this.orderCollectionPerUser = this.afs.collection('orders', ref => ref.where('userId','==', userId ))
    this.getOrderData();
    return this.orders;
  }

  getAnonymusOrders() {

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


  getOrder(key) {
    this.orderDoc = this.afs.doc(`orders/${key}`);
    return this.orderDoc;
  }

  getOrderAnonymus(key) {
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
    this.orderCollection.add(order);
  }

  addProductToOrder(productPerOrder: ProductsPerOrder) {
    this.afs.doc(`productsPerOrder/${productPerOrder.orderId}`).collection('products').doc(productPerOrder.productId).set({
      orderId: this.afs.collection('orders').doc(productPerOrder.orderId).ref,
      productId: this.afs.collection('products').doc(productPerOrder.productId).ref,
      qty: +productPerOrder.qty

    });
  }

  addProductToOrderAnonymus(productPerOrder: ProductsPerOrder) {
    console.log('addProductsToOrderAnonymus: ' + productPerOrder.orderId);
    console.log('addProductsToOrderAnonymus - Product: ' + productPerOrder.productId);

    this.afs.doc(`productsPerOrder_temp/${productPerOrder.orderId}`).collection('products').doc(productPerOrder.productId).set({
      orderId: this.afs.collection('orders').doc(productPerOrder.orderId).ref,
      productId: this.afs.collection('products').doc(productPerOrder.productId).ref,
      qty: +productPerOrder.qty
    });
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



}

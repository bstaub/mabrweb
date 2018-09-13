import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {Order} from './order.model';
import {ProductsPerOrder} from './productsPerOrder.model';


@Injectable({
  providedIn: 'root'
})
export class OrderFirestoreService {
  orderCollection: AngularFirestoreCollection<Order>;
  productsOrderCollection: AngularFirestoreCollection<any>;
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



  getOrders() {
    return this.orders;
  }

  getOrder(key) {
    this.orderDoc = this.afs.doc(`orders/${key}`);
    return this.orderDoc;
  }



  getProductsPerOrder(key) {
    this.productsOrderCollection = this.afs.doc(`productsPerOrder/${key}`).collection('products');
    return  this.productsOrderCollection;
  }

  addOrder(order: Order) {
    this.orderCollection.add(order);
  }

  addProductToOrder(key, productPerOrder: ProductsPerOrder) {
    this.afs.doc(`productsPerOrder/${key}`).collection('products').add(productPerOrder);
  }

  deleteOrder(key: string) {
    this.orderDoc = this.afs.doc(`orders/${key}`);
    this.orderDoc.delete();
  }

  updateOrder(orderKey, order: Order) {
    this.orderDoc = this.afs.doc(`orders/${orderKey}`);
    this.orderDoc.update(order);

  }



}

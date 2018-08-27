import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {Order} from './order.model';


@Injectable({
  providedIn: 'root'
})
export class OrderFirestoreService {
  orderCollection: AngularFirestoreCollection<Order>;
  orders: Observable<Order[]>;
  orderDoc: AngularFirestoreDocument<Order>;

  constructor(public afs: AngularFirestore) {
    this.orderCollection = this.afs.collection('orders', ref => ref.orderBy('orderDate', 'desc'));


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

  addItem(order: Order) {
    this.orderCollection.add(order);
  }

  deleteItem(order: Order) {
    this.orderDoc = this.afs.doc(`items/${order.key}`);
    this.orderDoc.delete();
  }

  updateItem(order: Order) {
    this.orderDoc = this.afs.doc(`items/${order.key}`);
    this.orderDoc.update(order);

  }

}

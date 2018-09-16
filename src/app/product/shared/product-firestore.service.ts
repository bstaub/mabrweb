import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {Product} from '../product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductFirestoreService {
  productCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;

  constructor(public afs: AngularFirestore) {
    // https://firebase.google.com/docs/firestore/query-data/query-cursors#use_a_document_snapshot_to_define_the_query_cursor
    // https://stackoverflow.com/questions/46821757/can-i-query-a-cloud-firestore-collection-with-a-where-equals-clause-and-an-order
    // https://www.youtube.com/watch?v=Ofux_4c94FI
    // https://www.youtube.com/watch?v=VBEzqahgKmw
    // https://console.cloud.google.com -> App Engine -> Quotas

    // this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc').startAt('M'));
    // this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc').limit(4));
    this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc'));
    // this.productCollection = this.afs.collection('products', ref => ref.where('price', '>', 505).limit(10));

    // COMPOUND QUERIES, create Index manual, see Indexe in Firebase
    // this.productCollection = this.afs.collection('products', ref => ref
       // .orderBy('name', 'asc')
       // .orderBy('description', 'asc'));
    // COMPOUND QUERIES,
    // this.productCollection = this.afs.collection('products', ref => ref
        // .where('price', '>', 505).limit(10)
        // .where('name', '==', 'Ipad Air'));


    this.products = this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const key = a.payload.doc.id;
        return { key, ...data };
      }))
    );
  }



  getProducts() {
    return this.products;
  }

  getProduct(key) {
    this.productDoc = this.afs.doc(`products/${key}`);
    return this.productDoc;
  }

  addProduct(product: Product) {
    // this.productCollection.add(product);
    this.productCollection.add(product);
  }

  deleteProduct(key: string) {
    this.productDoc = this.afs.doc(`products/${key}`);
    this.productDoc.delete();
  }

  setProduct(product: Product) {
    this.productDoc = this.afs.doc(`products/${product.key}`);
    return this.productDoc.set(product, {merge: true});
  }

  /*
  updateProduct(product: Product) {
    this.productDoc = this.afs.doc(`products/${product.key}`);
    this.productDoc.update(product);
  }
  */

  updateProduct(productKey, product: Product) {
    this.productDoc = this.afs.doc(`products/${productKey}`);
    this.productDoc.update(product);
  }

  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getCategory(productCategory: Product) {
    console.log(this.afs.doc(`products/${productCategory}`));
    // this.afs.doc(`products/${productCategory}`);
    // this.productDoc = this.afs.doc(`products/${productCategory}`);
    // return this.productDoc;
  }


}

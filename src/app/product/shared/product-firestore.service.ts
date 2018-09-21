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
  filteredProducts: any[];

  constructor(public afs: AngularFirestore) {

    // const pushkey = this.afs.createId();
    this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc'));

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

  getProduct(key: string) {
    this.productDoc = this.afs.doc(`products/${key}`);
    return this.productDoc;
  }

  addProduct(product: Product) {
    // this.productCollection.add(product);
    this.productCollection.add(product).then( (docRef) => {
      // console.log('Product written with ID: ', docRef.id);
      const NewProductKey: Product = {
        key: docRef.id,
      };
      this.setProduct(NewProductKey);
    }) .catch(function(error) {
      console.error('Error adding document: ', error);
    });
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

  getPushKey() {
    return this.afs.createId();  // https://stackoverrun.com/de/q/12841034  (internal pushkey from firestore)
  }

  getCategory(productCategory: Product) {
    const productsArrayFiltered = [];

    // getting data from productCategory
    this.afs.collection('products').ref.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
          const newProduct = doc.data();
          // newProduct.id = doc.id;
          if (newProduct.productCategory && newProduct.productCategory === productCategory ) {
            productsArrayFiltered.push(newProduct);
          } else {
            // do nothing
            // productsArrayFiltered.push(newProduct);
          }
      });
    });

    this.filteredProducts = productsArrayFiltered;
    return this.filteredProducts;

  }


  deleteAll() {

  }
}

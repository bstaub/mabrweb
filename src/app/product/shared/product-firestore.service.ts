import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, Query } from 'angularfire2/firestore';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Product } from '../../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductFirestoreService {
  productCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productsDiscount$: Observable<Product[]>;
  productsNew$: Observable<Product[]>;
  productsBestRated$: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;
  filteredProducts: any[];

  // RxJS BehaviorSubject start
  private messageSource = new BehaviorSubject(0); // initial 0 value, i check this value later
  currentMessage = this.messageSource.asObservable();
  // RxJS BehaviorSubject end


  constructor(public afs: AngularFirestore) {

    // const pushkey = this.afs.createId();
    this.sortProductsByNameAsc();  // Initial sorting List

  }

  // RxJS BehaviorSubject start
  changeMessage(message) {
    this.messageSource.next(message);
  }
  // RxJS BehaviorSubject end

  getData() {
    this.products = this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const key = a.payload.doc.id;
        return {key, ...data};
      }))
    );
  }

  // https://stackoverflow.com/questions/48751908/filtering-firestore-observable-against-javascript-object-values
  /*
  loadData() {
    this.productCollection = this.afs.collection<any>('products', ref => ref.orderBy('name', 'asc'));
    return this.productCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          // data.id = id;

          return { id, data };
        });
      })
    );
  }
  */

  /*
  getAllSearch(searchTerm: string) {
    this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc'));
    this.products = this.productCollection.snapshotChanges().pipe(
      map(val => val.filter( fil => fil.payload.doc.name === searchTerm) ),
      // f.payload.doc.data.name
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const key = a.payload.doc.id;
        return {key, ...data};
      }))
    );
  }
  */

  getDataToSearch(): Observable<Product[]> {
    this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc'));
    return this.products = this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const key = a.payload.doc.id;
        return {key, ...data};
      }))
    );
  }

  getDataToSearch2(terms: Observable<any>): Observable<any> {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term))
    );
  }

  searchEntries(term) {
    this.productCollection = this.afs.collection('products', ref => ref.where('name', '==', term).limit(10));
    return this.products = this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const key = a.payload.doc.id;
        return {key, ...data};
      }))
    );
  }

  getDiscountProductsWithLimit(limit: number) {
    this.productCollection = this.afs.collection('products', ref => ref.where('discount', '==', true).limit(limit));
    return this.productsDiscount$ = this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const key = a.payload.doc.id;
        return {key, ...data};
      }))
    );
  }


  getNewProductsWithLimit(limit: number) {
    this.productCollection = this.afs.collection('products', ref => ref.where('newProduct', '==', true).limit(limit));
    return this.productsNew$ = this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const key = a.payload.doc.id;
        return {key, ...data};
      }))
    );
  }

  getBestRatedProductsWithLimit(limit: number) {
    this.productCollection = this.afs.collection('products', ref => ref.where('bestRated', '==', true).limit(limit));

    return this.productsBestRated$ = this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const key = a.payload.doc.id;
        return {key, ...data};
      }))
    );
  }


  sortProductsByNameAsc() {
    this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc'));
    this.getData();
  }

  sortProductsByNameDesc() {
    this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'desc'));
    this.getData();
  }

  sortProductsByPriceAsc() {
    this.productCollection = this.afs.collection('products', ref => ref.orderBy('price', 'asc'));
    this.getData();
  }

  sortProductsByPriceDesc() {
    this.productCollection = this.afs.collection('products', ref => ref.orderBy('price', 'desc'));
    this.getData();
  }

  sortProductsByCreatedDateAsc() { // Test Fail
    this.productCollection = this.afs.collection('products', ref => ref.where('createdDate', '>', '0'));
    this.getData();
  }

  sortProductsByCreatedDateDesc() {  // Test Fail
    // Do 01 Jan 2037 00:00:00 UTC  --> 2114380800
    // https://www.unixtimeconverter.io/2114380800
    this.productCollection = this.afs.collection('products', ref => ref.where('createdDate', '<', 'toDay'));
    this.getData();
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
    this.productCollection.add(product).then((docRef) => {
      // console.log('Product written with ID: ', docRef.id);
      const NewProductKey: Product = {
        key: docRef.id,
      };
      this.setProduct(NewProductKey);
    }).catch(function (error) {
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

  updateProduct(productKey, product: Product, image?: string, category?: string) {  // image?, category? ist optional und für Admin Edit Only
    if (image) {
      product.image = image;
    }
    if (category) {
      product.productCategory = category;
    }
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
        if (newProduct.productCategory && newProduct.productCategory === productCategory) {
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

}

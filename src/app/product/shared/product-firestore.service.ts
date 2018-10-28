import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
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

  // Service Event zum Suggest start
  searchCloseClicked = new EventEmitter<boolean>();
  // Service Event zum Suggest end

  // RxJS BehaviorSubject start
  changeMessage(message) {
    this.messageSource.next(message);
  }
  // RxJS BehaviorSubject end

  constructor(public afs: AngularFirestore) {
    // const pushkey = this.afs.createId();
    this.sortProductsByNameAsc();  // Initial sorting List
  }

  getProductDataWithKey() {
    return this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const key = a.payload.doc.id;
        return {key, ...data};
      }))
    );
  }

  getDataToSearch(): Observable<Product[]> {
    this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc'));
    // return this.products = this.productCollection.snapshotChanges().pipe(  // Fehler weil this.produkts überschrieben nach Fulltext Search wurde!!!
    return this.productCollection.snapshotChanges().pipe(
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

  filterProductsByCategoryAndField(category: string, field: string) {
    if ((category !== undefined && category !== '/') && field !== undefined) {
      if (field === 'a-z') {
        this.productCollection = this.afs.collection('products', ref => ref.where('productCategory', '==', category).orderBy('name', 'asc'));
      } else if (field === 'z-a') {
        this.productCollection = this.afs.collection('products', ref => ref.where('productCategory', '==', category).orderBy('name', 'desc'));
      } else if (field === 'low-high') {
        this.productCollection = this.afs.collection('products', ref => ref.where('productCategory', '==', category).orderBy('price', 'asc'));
      } else if (field === 'high-low') {
        this.productCollection = this.afs.collection('products', ref => ref.where('productCategory', '==', category).orderBy('price', 'desc'));
      } else {
        console.log('not defined sort option1: ', field);
      }
    } else if (category !== undefined && field === undefined) {
      if (category !== '/') {
        // console.log('aktuelle Kategorie gewählt: ', category);
        this.productCollection = this.afs.collection('products', ref => ref.where('productCategory', '==', category).orderBy('name', 'asc'));
      } else {
        // console.log('alle Kategorien gewählt');
        this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc'));
      }
    } else if ((category === undefined || category === '/') && field !== undefined) {
      if (field === 'a-z') {
        this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc'));
      } else if (field === 'z-a') {
        this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'desc'));
      } else if (field === 'low-high') {
        this.productCollection = this.afs.collection('products', ref => ref.orderBy('price', 'asc'));
      } else if (field === 'high-low') {
        this.productCollection = this.afs.collection('products', ref => ref.orderBy('price', 'desc'));
      } else {
        console.log('not defined sort option2: ', field);
      }
    } else if (category === '/' && field === undefined) {
      this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc'));
    } else {
      console.log('not defined option filter');
    }
    return this.getProductDataWithKey();
  }

  sortProductsByNameAsc() {
    this.productCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc'));
    this.products = this.getProductDataWithKey();
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

  getPushKey() {
    return this.afs.createId();  // https://stackoverrun.com/de/q/12841034  (internal pushkey from firestore)
  }

  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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

  /*
  updateProduct(product: Product) {
    this.productDoc = this.afs.doc(`products/${product.key}`);
    this.productDoc.update(product);
  }
  */
}

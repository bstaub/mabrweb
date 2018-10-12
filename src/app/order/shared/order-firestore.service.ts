import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { ProductPerOrder } from '../../models/productPerOrder.model';
import { ProductPerOrderLocalStorage } from '../../models/productPerOrderLocalStorage.model';
import { UserService } from '../../user/shared/user.service';
import { LocalStorageService } from '../../shared/local-storage.service';
import { CustomerAddress } from '../../models/customerAddress.model';


@Injectable({
  providedIn: 'root'
})
export class OrderFirestoreService {

  orders: Observable<Order[]>;
  products: Observable<any[]>;

  orderPerUser: AngularFirestoreCollection<Order>;
  orderCollection: AngularFirestoreCollection<Order>;
  orderCollection_completed: AngularFirestoreCollection<Order>;


  productsOrderCollection: AngularFirestoreCollection<any>;
  productsPerOrderDocument: AngularFirestoreDocument<any>;

  orderDoc: AngularFirestoreDocument<Order>;
  order: Order;
  productPerOrder: ProductPerOrder;
  customerAddress: CustomerAddress;
  user: any;
  totalValue: number;


  productsPerOrderLocalStorage: ProductPerOrderLocalStorage[];
  productsPerOrderLocalStorageNew: ProductPerOrderLocalStorage[];
  productsPerOrderLocalStorageUpdate: ProductPerOrderLocalStorage[];


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
        return {key, ...data};
      }))
    );


    this.user = this.userService.getCurrentUser();
  }


  // Anzeige der Produktdaten
  getUserOrder(userId) {

    // todo: how to avoid this?
    if (!userId) {
      userId = '0';
    }
    console.log(userId);
    this.orderPerUser = this.afs.collection('orders', ref => ref.where('userId', '==', userId));
    this.orders = this.orderPerUser.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const key = a.payload.doc.id;
        return {key, ...data};
      }))
    );
    return this.orders;
  }


  // Produkte per Order holen
  getProductsPerOrder(oderKey) {
    this.productsOrderCollection = this.afs.doc(`productsPerOrder/${oderKey}`).collection('products');
    return this.productsOrderCollection;
  }

  // Bestellung abschliessen
  completeUserOrder(order: Order) {
    const ref = this.afs.createId();
    this.orderCollection_completed.doc(ref).set(JSON.parse(JSON.stringify(order)));
    return ref;
  }

  // Zuweisung automatisch generierter Key bei Abschluss
  completeProductsPerOrder(orderId: string, userId: string, products: Array<any>) {
    products.forEach((product) => {
      this.productPerOrder = new ProductPerOrder();
      this.productPerOrder.productId = product.productId;
      this.productPerOrder.qty = product.qty;
      this.productPerOrder.orderId = orderId;

      this.afs.doc(`productsPerOrder_completed/${orderId}`).collection('products').doc(this.productPerOrder.productId).set({
        orderId: this.afs.collection('orders').doc(orderId).ref,
        productId: this.afs.collection('products').doc(this.productPerOrder.productId).ref,
        qty: +this.productPerOrder.qty
      }).catch(function (error) {
        console.error('Error archiving document: ', error);
      });

    });
  }


  // Initial Order erstellen

  creatNewUserOrder(userId: string) {
    this.orderCollection.doc(userId).ref.get()
      .then((docSnapshot) => {
        if (!docSnapshot.exists) {
          this.customerAddress = new CustomerAddress();
          this.order = new Order();
          this.order.shopOrderId = 'ShopID XXX-123';
          this.order.orderDate = new Date();
          this.order.status = 'pending';
          this.order.shippingMethod = 'normal';
          this.order.paymentMethod = 'invoice';
          this.order.totalValue = 0;
          this.order.userId = userId;
          this.order.customerAddress = this.customerAddress;
          this.orderCollection.doc(userId).set(JSON.parse(JSON.stringify(this.order)));
        }
      });
  }

  // Warenkorb in Firestore speichern (userId als Key wenn Status pending )


  saveProductsInFS(userId: string, products: Array<ProductPerOrderLocalStorage>) {
    let lineValue = 0;
    let totalValue = 0;

    products.forEach((product) => {
      const productPerOrder = new ProductPerOrder();
      productPerOrder.productId = product.productId;
      productPerOrder.qty = product.qty;
      productPerOrder.orderId = userId;

      lineValue = product.qty * product.price;
      lineValue.toFixed(2);
      totalValue += lineValue;


      this.afs.doc(`productsPerOrder/${productPerOrder.orderId}`).collection('products').doc(productPerOrder.productId).set({
        userId: this.afs.collection('orders').doc(productPerOrder.orderId).ref,
        productId: this.afs.collection('products').doc(productPerOrder.productId).ref,
        qty: +productPerOrder.qty
      }).then(function () {
        console.log('Document successfully added!');


      }).catch(function (error) {
        console.error('Error adding document: ', error);
      });

    });

    this.order = new Order();
    this.order.key = this.user.uid;
    this.order.totalValue = totalValue;
    this.updateOrder(this.order);

  }

  deleteProductsInFS(userId: string, productsPerOrderLocalStorage: ProductPerOrderLocalStorage[]) {
    productsPerOrderLocalStorage.forEach((productPerOrderLocalStorage) => {
      this.deleteProductInFS(userId, productPerOrderLocalStorage.productId);
    });
  }

  deleteProductInFS(userId: string, productIdToDelete: string) {

    this.productsPerOrderDocument = this.afs.doc(`productsPerOrder/${userId}`).collection('products').doc(productIdToDelete);
    this.productsPerOrderDocument.delete().then(function () {
      console.log('Document successfully deleted!');
    }).catch(function (error) {
      console.error('Error removing temp document: ', error);
    });


  }


  // Warenkorb von Firestore in LocalStorage speichern
  loadProducts(userId: string) {

    this.localStorageService.destroyLocalStorage('products');
    this.getProductsPerOrder(userId).ref.get().then((res) => {
      res.forEach(doc => {
        const newProduct = doc.data();
        newProduct.id = doc.id;
        if (newProduct.productId) {
          newProduct.productId.get()
            .then(ressource => {
              newProduct.productData = ressource.data();
              if (newProduct.productData) {
                const productStore = this.localStorageService.getData('products');
                productStore.push({
                  productId: newProduct.id,
                  qty: Number(newProduct.qty),
                  name: newProduct.productData.name,
                  description: newProduct.productData.description,
                  price: newProduct.productData.price,
                  image: newProduct.productData.image
                });
                this.localStorageService.setData('products', productStore);
              }
            })
            .catch(err => console.error(err));
        }
      });
    })
      .catch(err => console.error(err));


  }


  // Artikel hinzufügen von Produktseite
  addProductToOrder(product: Product) {
    this.productsPerOrderLocalStorage = this.localStorageService.getData('products');
    this.productsPerOrderLocalStorage.push({
      productId: product.key,
      qty: Number(product.itemcount),
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image
    });

    this.localStorageService.setData('products', this.productsPerOrderLocalStorage);

    this.user = this.userService.getCurrentUser();

    if (this.user) {
      this.saveProductsInFS(this.user.uid, this.productsPerOrderLocalStorage);
    }
  }

  updateProductQty(productPerOrderLocalStorage: ProductPerOrderLocalStorage) {
    this.productsPerOrderLocalStorage = this.localStorageService.getData('products');
    this.productsPerOrderLocalStorageNew = this.productsPerOrderLocalStorage.filter(product => product.productId !== productPerOrderLocalStorage.productId);
    this.productsPerOrderLocalStorageUpdate = this.productsPerOrderLocalStorage.filter(product => product.productId === productPerOrderLocalStorage.productId);
    this.productsPerOrderLocalStorageNew.push({
      productId: productPerOrderLocalStorage.productId,
      qty: Number(productPerOrderLocalStorage.qty),
      name: productPerOrderLocalStorage.name,
      description: productPerOrderLocalStorage.description,
      price: productPerOrderLocalStorage.price,
      image: productPerOrderLocalStorage.image
    });

    this.localStorageService.destroyLocalStorage('products');
    this.localStorageService.setData('products', this.productsPerOrderLocalStorageNew);
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.saveProductsInFS(this.user.uid, this.productsPerOrderLocalStorageNew);
    }

  }


  // einzelner Artikel aus Warenkorb löschen
  deleteProductFromOrder(productIdToDelete: string) {
    this.productsPerOrderLocalStorage = this.localStorageService.getData('products');
    this.productsPerOrderLocalStorageNew = this.productsPerOrderLocalStorage.filter(product => product.productId !== productIdToDelete);
    this.localStorageService.destroyLocalStorage('products');
    this.localStorageService.setData('products', this.productsPerOrderLocalStorageNew);
    if (this.user) {
      this.deleteProductInFS(this.user.uid, productIdToDelete);
    }
  }


  // Warenkorb löschen
  clearScart(productsPerOrderLocalStorage: ProductPerOrderLocalStorage[]) {
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.deleteProductsInFS(this.user.uid, productsPerOrderLocalStorage);
    }
    this.localStorageService.destroyLocalStorage('products');
  }


  updateOrder(order: Order) {
    this.orderDoc = this.afs.doc(`orders/${order.key}`);
    this.orderDoc.update(JSON.parse(JSON.stringify(order))).then(function () {
      console.log('order successfully updated!');
    }).catch(function (error) {
      console.error('error updating document: ', error);
    });
  }

  resetUserOrder(order: Order) {
    this.orderDoc = this.afs.doc(`orders/${order.key}`);
    this.order = new Order();
    this.orderDoc.update(JSON.parse(JSON.stringify(this.order))).then(function () {
    }).catch(function (error) {
      console.error('error updating document: ', error);
    });
  }


  deleteOrder(orderId: string) {
    this.orderDoc = this.afs.doc(`orders/${orderId}`);
    this.orderDoc.delete();
  }

  // todo:
  generateShopOrderId(): string {
    return 'XXX-001';

  }


}

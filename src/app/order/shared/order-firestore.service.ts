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
import { OrderFlyoutService } from '../../core/shared/order-flyout-service';


@Injectable({
  providedIn: 'root'
})
export class OrderFirestoreService {

  orders: any;
  userOrder: Observable<Order[]>;
  userOrderDoc: Observable<Order>;
  products: Observable<Product[]>;

  orderPerUser: AngularFirestoreDocument<Order>;
  orderCollection: AngularFirestoreCollection<Order>;
  orderCollectionAnonymus: AngularFirestoreCollection<Order>;
  orderCollectionVar: AngularFirestoreCollection<Order>;

  orderCollection_completed: AngularFirestoreCollection<Order>;
  orderCollection_completedAnonymus: AngularFirestoreCollection<Order>;
  orderCollection_completed_sorted: AngularFirestoreCollection<Order>;

  productsOrderCollection: AngularFirestoreCollection<any>;
  productsPerOrderDocument: AngularFirestoreDocument<any>;

  orderDoc: AngularFirestoreDocument<Order>;
  order: Order;
  productPerOrder: ProductPerOrder;
  product: Product;
  customerAddress: CustomerAddress;
  user: any;
  totalValue: number;
  orderId: string;


  productsPerOrderLocalStorage: ProductPerOrderLocalStorage[];
  productsPerOrderLocalStorageNew: ProductPerOrderLocalStorage[];
  productsPerOrderLocalStorageUpdate: ProductPerOrderLocalStorage[];


  constructor(public afs: AngularFirestore,
              private userService: UserService,
              private localStorageService: LocalStorageService,
              private orderFlyoutService: OrderFlyoutService,
  ) {

    this.orderCollection = this.afs.collection('orders');
    this.orderCollectionAnonymus = this.afs.collection('orders_anonymus');
    this.orderCollection_completed = this.afs.collection('orders_completed');
    this.orderCollection_completedAnonymus = this.afs.collection('orders_completed_anonymus');


    this.user = this.userService.getCurrentUser();

    this.userOrder = this.orderCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const key = a.payload.doc.id;
        return {key, ...data};
      }))
    );
    this.user = this.userService.getCurrentUser();
  }


  getUserOrder(userId) {

    // todo
    if (!userId) {
      userId = '0';
    }

    this.user = this.userService.getCurrentUser();
    if (this.user) {
      console.log('user');
      this.orderPerUser = this.afs.collection('orders').doc(userId);
    } else {
      console.log('no_user');
      this.orderPerUser = this.afs.collection('orders_anonymus').doc(userId);
    }
    this.userOrderDoc = this.orderPerUser.snapshotChanges().pipe(
      map(res => {
        const data = res.payload.data() as Order;
        const key = res.payload.id;
        return {key, ...data};
      }));
    return this.userOrderDoc;
  }

  getLatestOrder() {
    this.orderCollection_completed_sorted = this.afs.collection('orders_completed', ref => ref.orderBy('shopOrderId', 'desc').limit(1));
    // return this.products = this.productCollection.snapshotChanges().pipe(  // Fehler weil this.produkts überschrieben nach Fulltext Search wurde!!!
    this.orders = this.orderCollection_completed_sorted.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const key = a.payload.doc.id;
        return {key, ...data};
      }))
    );

    return this.orders;

  }


  getProductsPerOrder(oderKey) {
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.productsOrderCollection = this.afs.doc(`productsPerOrder/${oderKey}`).collection('products');
    } else {
      this.productsOrderCollection = this.afs.doc(`productsPerOrder_anonymus/${oderKey}`).collection('products');
    }
    return this.productsOrderCollection;
  }


  loadOrderAfterLogin(userId: string) {
    this.orderCollection.doc(userId).ref.get()
      .then((docSnapshot) => {
        if (!docSnapshot.exists) {
          this.creatNewUserOrder(userId);
          this.saveProductsInFS(userId, this.localStorageService.getData('products'));
        } else {
          this.loadProductsToLocalStorage(userId);
        }
      });
  }

  creatNewUserOrder(userId: string) {
    this.order = this.createEmptyOrder();
    this.order.userId = userId;
    this.orderCollection.doc(userId).set(JSON.parse(JSON.stringify(this.order)));
  }

  createNewUserOrderAnonymus() {
    const anonymusOrderId = this.afs.createId();
    this.localStorageService.setData('anonymusOrderId', {orderId: anonymusOrderId});
    this.order = this.createEmptyOrder();
    this.order.userId = 'anonymus';
    this.orderCollectionAnonymus.doc(anonymusOrderId).set(JSON.parse(JSON.stringify(this.order)));
    return anonymusOrderId;
  }

  userOrderAnonymusExist() {
    return this.localStorageService.getData('anonymusOrderId').orderId;
  }

  createEmptyOrder() {
    this.customerAddress = new CustomerAddress();
    this.order = new Order();
    this.order.shopOrderId = 0;
    this.order.orderDate = new Date();
    this.order.status = 'pending';
    this.order.shippingMethod = 'normal';
    this.order.paymentMethod = 'invoice';
    this.order.totalValue = 0;
    this.order.customerBillingAddress = this.customerAddress;
    this.order.customerShippingAddress = this.customerAddress;
    this.order.shipqingEqualsBillingAddress = true;
    return this.order;
  }

  saveProductsInFS(orderId: string, products: Array<ProductPerOrderLocalStorage>) {
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.productsOrderCollection = this.afs.doc(`productsPerOrder/${orderId}`).collection('products');
      this.orderCollectionVar = this.orderCollection;
    } else {
      this.productsOrderCollection = this.afs.doc(`productsPerOrder_anonymus/${orderId}`).collection('products');
      this.orderCollectionVar = this.orderCollectionAnonymus;
    }

    products.forEach((product) => {
      const productPerOrder = new ProductPerOrder();
      productPerOrder.productId = product.productId;
      productPerOrder.qty = product.qty;
      productPerOrder.orderId = orderId;

      this.productsOrderCollection.doc(productPerOrder.productId).set({
        // userId: this.orderCollectionVar.doc(productPerOrder.orderId).ref,
        productId: this.afs.collection('products').doc(productPerOrder.productId).ref,
        qty: +productPerOrder.qty
      }).catch(function (error) {
        console.error('Error adding document: ', error);
      });

    });

    this.calcOrderTotalValue();
  }

  calcOrderTotalValue() {
    let lineValue = 0;
    let totalValue = 0;
    this.productsPerOrderLocalStorage = this.localStorageService.getData('products');
    this.productsPerOrderLocalStorage.forEach((product) => {
      lineValue = product.qty * product.price * product.discountFactor;
      lineValue.toFixed(2);
      totalValue += lineValue;
    });
    this.totalValue = totalValue;

    this.order = new Order();
    this.order.key = this.getOrderId();
    this.order.totalValue = totalValue;
    this.updateOrder(this.order);
  }

  deleteProductsInFS(userId: string, productsPerOrderLocalStorage: ProductPerOrderLocalStorage[]) {
    productsPerOrderLocalStorage.forEach((productPerOrderLocalStorage) => {
      this.deleteProductInFS(userId, productPerOrderLocalStorage.productId);
    });
  }

  deleteProductInFS(userId: string, productIdToDelete: string) {
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.productsPerOrderDocument = this.afs.doc(`productsPerOrder/${userId}`).collection('products').doc(productIdToDelete);
    } else {
      this.productsPerOrderDocument = this.afs.doc(`productsPerOrder_anonymus/${userId}`).collection('products').doc(productIdToDelete);
    }
    this.productsPerOrderDocument.delete()
      .catch(function (error) {
        console.error('Error removing temp document: ', error);
      });
  }

  loadProductsToLocalStorage(orderId: string) {
    this.getProductsPerOrder(orderId).ref.get()
      .then((res) => {
        res.forEach(doc => {
          const newProduct = doc.data();
          newProduct.id = doc.id;
          if (newProduct.productId) {
            newProduct.productId.get()
              .then(ressource => {
                newProduct.productData = ressource.data();
                if (newProduct.productData) {
                  this.productsPerOrderLocalStorage = this.localStorageService.getData('products');

                  this.product = new Product();
                  this.product.key = newProduct.id;
                  this.product.name = newProduct.productData.name;
                  this.product.description = newProduct.productData.description;
                  this.product.price = newProduct.productData.price;
                  this.product.itemcount = Number(newProduct.qty);
                  this.product.image = newProduct.productData.image;
                  this.product.discount = newProduct.productData.discount;

                  if (this.productExistInScart(this.product)) {
                    this.productsPerOrderLocalStorage = this.localStorageService.getData('products');
                    this.productsPerOrderLocalStorageUpdate = this.productsPerOrderLocalStorage.filter(productExist => productExist.productId === this.product.key);
                    this.productsPerOrderLocalStorageUpdate[0].qty += Number(this.product.itemcount);
                    this.updateProductQty(this.productsPerOrderLocalStorageUpdate[0]);
                  } else {
                    this.pushProductToLocalStorage(this.product);
                  }
                  this.localStorageService.setData('products', this.productsPerOrderLocalStorage);
                  this.orderFlyoutService.refreshOrderFlyout(this.productsPerOrderLocalStorage, this.order);
                  this.saveProductsInFS(orderId, this.productsPerOrderLocalStorage);
                  this.calcOrderTotalValue();
                }
              })
              .catch(err => console.error(err));
          }
        });
      })
      .catch(err => console.error(err));
  }

  addProductToOrder(product: Product) {
    if (this.productExistInScart(product)) {
      this.productsPerOrderLocalStorage = this.localStorageService.getData('products');
      this.productsPerOrderLocalStorageUpdate = this.productsPerOrderLocalStorage.filter(productExist => productExist.productId === product.key);
      this.productsPerOrderLocalStorageUpdate[0].qty += Number(product.itemcount);
      this.updateProductQty(this.productsPerOrderLocalStorageUpdate[0]);
    } else {
      this.pushProductToLocalStorage(product);
    }
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.orderId = this.user.uid;
    } else {
      if (!this.userOrderAnonymusExist()) {
        this.createNewUserOrderAnonymus();
      }
      this.orderId = this.localStorageService.getData('anonymusOrderId').orderId;
    }
    this.saveProductsInFS(this.orderId, this.productsPerOrderLocalStorage);
  }

  pushProductToLocalStorage(product: Product) {
    this.productsPerOrderLocalStorage = this.localStorageService.getData('products');
    this.productsPerOrderLocalStorage.push({
      productId: product.key,
      qty: Number(product.itemcount),
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      discountFactor: product.discountFactor ? product.discountFactor : 1
    });
    this.localStorageService.setData('products', this.productsPerOrderLocalStorage);
    this.orderFlyoutService.refreshOrderFlyout(this.productsPerOrderLocalStorage, this.order);
  }

  productExistInScart(product: Product) {
    this.productsPerOrderLocalStorage = this.localStorageService.getData('products');
    this.productsPerOrderLocalStorageNew = this.productsPerOrderLocalStorage.filter(productExist => productExist.productId === product.key);
    return !!this.productsPerOrderLocalStorageNew[0];
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
      image: productPerOrderLocalStorage.image,
      discountFactor: productPerOrderLocalStorage.discountFactor
    });

    this.localStorageService.destroyLocalStorage('products');
    this.localStorageService.setData('products', this.productsPerOrderLocalStorageNew);
    this.orderFlyoutService.refreshOrderFlyout(this.productsPerOrderLocalStorageNew, this.order);
    this.saveProductsInFS(this.getOrderId(), this.productsPerOrderLocalStorageNew);
  }

  deleteProductFromOrder(productIdToDelete: string) {
    this.productsPerOrderLocalStorage = this.localStorageService.getData('products');
    this.productsPerOrderLocalStorageNew = this.productsPerOrderLocalStorage.filter(product => product.productId !== productIdToDelete);
    this.localStorageService.destroyLocalStorage('products');
    this.localStorageService.setData('products', this.productsPerOrderLocalStorageNew);
    this.orderFlyoutService.refreshOrderFlyout(this.productsPerOrderLocalStorageNew, this.order);
    this.deleteProductInFS(this.getOrderId(), productIdToDelete);
  }

  clearScart(productsPerOrderLocalStorage: ProductPerOrderLocalStorage[]) {
    this.deleteProductsInFS(this.getOrderId(), productsPerOrderLocalStorage);
    this.localStorageService.destroyLocalStorage('products');
    this.productsPerOrderLocalStorage = this.localStorageService.getData('products');
    this.calcOrderTotalValue();
    this.orderFlyoutService.refreshOrderFlyout(this.productsPerOrderLocalStorage, this.order);
  }

  updateOrder(order: Order) {
    this.user = this.userService.getCurrentUser();

    if (this.user) {
      this.orderDoc = this.afs.doc(`orders/${order.key}`);
    } else {
      this.orderDoc = this.afs.doc(`orders_anonymus/${order.key}`);
    }

    this.orderDoc.update(JSON.parse(JSON.stringify(order)))
      .catch(function (error) {
        console.error('error updating document: ', error);
      });
    this.orderFlyoutService.refreshOrderFlyout(this.productsPerOrderLocalStorage, this.order);
  }

  resetUserOrder(order: Order) {
    this.orderDoc = this.afs.doc(`orders/${order.key}`);
    this.order = new Order();
    this.order.totalValue = 0;
    this.orderDoc.update(JSON.parse(JSON.stringify(this.order))).then(function () {
    }).catch(function (error) {
      console.error('error updating document: ', error);
    });
  }

  deleteOrderAnonymusComplete(orderId) {
    this.deleteOrderAnonymus(orderId);
    this.deleteProductsInFSAnonymus(orderId);

  }

  deleteOrderAnonymus(orderId: string) {
    this.orderDoc = this.afs.doc(`orders_anonymus/${orderId}`);
    this.orderDoc.delete()
      .catch(function (error) {
        console.error('Error removing anonymus order: ', error);
      });
  }

  deleteProductsInFSAnonymus(userId: string) {
    this.afs.doc(`productsPerOrder_anonymus/${userId}`).collection('products').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const key = a.payload.doc.id;
        return {key, ...data};
      }))).subscribe(res => {
      res.forEach(product => {
        this.afs.doc(`productsPerOrder_anonymus/${userId}`).collection('products').doc(product.key).delete();
      });
    });


  }

  completeUserOrder(order: Order) {
    const ref = this.afs.createId();
    this.orderCollection_completed.doc(ref).set(JSON.parse(JSON.stringify(order)));
    return ref;
  }

  completeProductsPerOrder(orderId: string, products: Array<any>) {
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

  getOrderId() {
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      return this.user.uid;
    } else {
      return this.localStorageService.getData('anonymusOrderId').orderId;
    }
  }

  getOrderIdWithUserId(userId: string) {
    this.user = this.userService.getCurrentUser();
    if (userId !== '0') {
      return this.user.uid;
    } else {
      return this.localStorageService.getData('anonymusOrderId').orderId;
    }
  }

  getAnonymusOrderId() {
    return this.localStorageService.getData('anonymusOrderId').orderId;
  }
}

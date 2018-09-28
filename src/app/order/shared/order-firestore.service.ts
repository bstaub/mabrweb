import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {Order} from '../order.model';
import {ProductPerOrder} from '../productPerOrder.model';
import * as firebase from 'firebase';
import {UserService} from '../../user/shared/user.service';
import {LocalStorageService} from '../../shared/local-storage.service';



@Injectable({
  providedIn: 'root'
})
export class OrderFirestoreService {

  orders: Observable<Order[]>;
  products: Observable<any[]>

  orderPerUser: AngularFirestoreCollection<Order>;
  orderCollection: AngularFirestoreCollection<Order>;


  productsOrderCollection: AngularFirestoreCollection<any>;
  productsPerOrderDocument: AngularFirestoreDocument<any>;

  orderDoc: AngularFirestoreDocument<Order>;
  order: Order;
  user: any;





  constructor(public afs: AngularFirestore,
              private userService: UserService,
              private localStorageService: LocalStorageService) {

    this.orderCollection = this.afs.collection('orders');



    this.user = this.userService.getCurrentUser();

    this.orders = this.orderCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const key = a.payload.doc.id;
        return { key, ...data };
      }))

    );



    this.user = this.userService.getCurrentUser();
  }


  // Anzeige der Produktdaten
  getUserOrder(userId) {
    this.orderPerUser = this.afs.collection('orders', ref => ref.where('userId', '==', userId ));
    this.orders = this.orderPerUser.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const key = a.payload.doc.id;
        return { key, ...data };
      }))
    );
    return this.orders;
  }





  // Produkte per Order holen
  getProductsPerOrder(oderKey) {
    this.productsOrderCollection = this.afs.doc(`productsPerOrder/${oderKey}`).collection('products');
    return  this.productsOrderCollection;
  }

  // Bestellung hinzufügen
  addUserOrder(order: Order) {
    const data = JSON.parse(JSON.stringify(order));
    const ref =  this.afs.createId();

    this.orderCollection.doc(ref).set(data).then(function (docRef) {
      console.log(ref);
    })

    return ref;

  }

  // Initial Order erstellen
  creatNewUserOrder(userId: string) {
    const order = new Order();
    order.shopOrderId = 'ShopID XXX-123';
    order.orderDate = new Date();
    order.status = 'pending';
    order.totalValue = 100;
    order.userId = userId;

    const data = JSON.parse(JSON.stringify(order));
    //const ref =  this.afs.createId();

    this.orderCollection.doc(userId).set(data).then(function (docRef) {
      //console.log(ref);
    })

  }

  //Warenkorb in Firestore speichern
  saveProducts(userId: string, products: Array<any>){

   products.forEach((product) => {
      const newProductPerOrder = new ProductPerOrder();
      newProductPerOrder.productId = product.productId;
      newProductPerOrder.qty = product.qty;
      newProductPerOrder.userId = userId;
      console.log(newProductPerOrder);

      this.addProductToOrderUser(newProductPerOrder);

    });


  }

  //Warenkorb von Firestore in LocalStorage speichern
  loadProducts(userId: string){


    const productsArray = [];


    this.getProductsPerOrder(userId).ref.get().then( (res) => {
      res.forEach(doc => {
        const newProduct = doc.data();
        console.log(newProduct);
        newProduct.id = doc.id;
        if (newProduct.productId) {
          newProduct.productId.get()
            .then(ressource => {
              newProduct.productData = ressource.data();
              if (newProduct.productData) {
                //productsArray.push(newProduct);

                let productStore = [];
                productStore = this.localStorageService.getData('products');
                productStore.push({
                  productId:newProduct.id,
                  qty:newProduct.qty,
                  description:newProduct.productData.name
                });
                this.localStorageService.setData('products',productStore);



              }
            })
            .catch(err => console.error(err));
        }
      });
    })
      .catch(err => console.error(err));




    }



  // 1.) Einstieg von Produktseite
  addProductToOrder(productPerOrder: ProductPerOrder) {

    this.user = this.userService.getCurrentUser();

    if (this.user) {

      //productPerOrder.userId = this.user.uid;
      //this.addProductToOrderUser(productPerOrder);
      // console.log('onAddProductControl - user Ok');


      let productStore = [];
      productStore = this.localStorageService.getData('products');
      // console.log(productStore);
      productStore.push({
        productId:productPerOrder.productId,
        qty:productPerOrder.qty,
        description:productPerOrder.description
      });

      this.localStorageService.setData('products',productStore);
      // console.log('onAddProductControl - No user');


    } else {

      let productStore = [];
      productStore = this.localStorageService.getData('products');
      // console.log(productStore);
      productStore.push({
        productId:productPerOrder.productId,
        qty:productPerOrder.qty,
        description:productPerOrder.description
      });

      this.localStorageService.setData('products',productStore);
      // console.log('onAddProductControl - No user');
    }



  }


  addProductToOrderUser(productPerOrder: ProductPerOrder) {

    const db = firebase.firestore();

    // https://medium.com/@scarygami/cloud-firestore-quicktip-documentsnapshot-vs-querysnapshot-70aef6d57ab3

    const orderCollection_temp =   this.afs.collection('orders');

    let order;

    this.afs.collection('orders', ref => ref.where('userId', '==', productPerOrder.userId )).ref.get().then (function (doc) {

      if (doc.empty) {
        console.log('new order');
        order = new Order();
        order.shopOrderId = 'test';
        order.orderDate = new Date();
        order.status = 'pending';
        order.totalValue = 0;
        order.userId = productPerOrder.userId;
        console.log(order);

        const data = JSON.parse(JSON.stringify(order));
        orderCollection_temp.add(data).then(function (orderDocRef) {
          db.collection('productsPerOrder').doc(orderDocRef.id).collection('products').doc(productPerOrder.productId).set({
            orderId: db.doc('orders/' + orderDocRef.id),
            productId: db.doc('products/' + productPerOrder.productId),
            qty: productPerOrder.qty

          });
        });


      } else {
        console.log('order exist');
        doc.forEach(function (documentSnapshot) {
          const data = documentSnapshot.data();
          const orderKey  = documentSnapshot.id;
          console.log(data);
          console.log(orderKey);
          db.doc(`productsPerOrder/${orderKey}`).collection('products').doc(productPerOrder.productId).set({
            orderId: db.collection('orders').doc(orderKey),
            productId: db.collection('products').doc(productPerOrder.productId),
            qty: +productPerOrder.qty
          });
        });

      }
    });

  }

   // Warenkorb löschen
  clearScart(products: any[]){
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.deleteProductsPerOrder(this.user.uid, products);
    }
    this.localStorageService.destroyUserLocalStorage('products');
  }

  // Warenkorb Firestore löschen (vor speichern)
  clearScartStorage(products: any[]){
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.deleteProductsPerOrder(this.user.uid, products);
    }
  }


  deleteOrder(key: string) {
    this.orderDoc = this.afs.doc(`orders/${key}`);
    this.orderDoc.delete();
  }

  deleteAnonymusOrder(key: string) {
    this.orderDoc = this.afs.doc(`orders_temp/${key}`);
    this.orderDoc.delete();
  }


  deleteOrderAnonymus(key: string) {
    this.orderDoc = this.afs.doc(`orders_temp/${key}`);
    this.orderDoc.delete();
  }



  deleteProductsPerOrder(userId: string, products: any[]) {
    products.forEach((product) => {
      this.productsPerOrderDocument = this.afs.doc(`productsPerOrder/${userId}`).collection('products').doc(product.productId);
      this.productsPerOrderDocument.delete().then(function() {
        console.log('Document successfully deleted!');
      }).catch(function(error) {
        console.error('Error removing temp document: ', error);
      });

    });
  }


  updateOrder(order: Order) {
    this.orderDoc = this.afs.doc(`orders/${order.key}`);
    this.orderDoc.update(order);

  }





}

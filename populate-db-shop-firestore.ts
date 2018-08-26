import 'core-js/es6/reflect';
import 'core-js/es7/reflect';


import { database, initializeApp, firestore } from 'firebase';
import { environment } from './src/environments/environment';
import { dbData } from './db-data';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';
import {getCollection} from '@angular/cli/utilities/schematics';
import * as firebase from 'firebase';



console.log('WARNING VERY IMPORTANT - PLEASE READ THIS\n\n\n');
console.log('WARNING Please set your own firebase config on src/environmnents/firebase.config.ts');
console.log('Otherwise you will get permissions errors, because the populate-db script is trying to write to my database instead of yours. ');
console.log('Any issues please contact me, Thanks, Vasco\n\n\n');

initializeApp(environment.firebase);


const db = firebase.firestore();







const productsCollection = db.collection('products');
const ordersCollection = db.collection('orders');




const productKeys = [];
const orderKeys = [];



dbData.products.forEach(product => {




  productsCollection.add({
    name: product.name,
    description: product.description,
    price: product.price,
    picture: product.picture,
    createdDate: product.createdDate
  }).then(function (docRef) {
      console.log('Product written with ID: ', docRef.id);
      productKeys.push( docRef.id);




  }) .catch(function(error) {
    console.error('Error adding document: ', error);
  });
 


});



dbData.orders.forEach(order => {


  ordersCollection.add({
    shopOrderId: order.shopOrderId,
    userId: order.userId,
    orderDate: order.orderDate,
    status: order.status,
    totalValue: order.totalValue
  }).then(function (docRef) {
    console.log('Order written with ID: ', docRef.id);
    orderKeys.push( docRef.id);



  }) .catch(function(error) {
    console.error('Error adding document: ', error);
  });



});


setTimeout(function () {


  orderKeys.forEach((orderKey) => {

    productKeys.forEach((productKey) => {

      db.collection('productsPerOrder').add({
        orderId: db.doc('orders/' + orderKey),
        productId: db.doc('products/' + productKey),
        qty: Math.floor(Math.random() * 10) + 1

      });


    });

  });



}, 5000)







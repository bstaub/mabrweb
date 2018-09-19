import 'core-js/es6/reflect';
import 'core-js/es7/reflect';


import {initializeApp} from 'firebase';
import {environment} from './src/environments/environment';
import {dbData} from './db-data';
import * as firebase from 'firebase';


console.log('WARNING VERY IMPORTANT - PLEASE READ THIS\n\n\n');
console.log('WARNING Please set your own firebase config on src/environmnents/firebase.config.ts');
console.log('Otherwise you will get permissions errors, because the populate-db script is trying to write to my database instead of yours. ');
console.log('Any issues please contact me, Thanks, Vasco\n\n\n');

initializeApp(environment.firebase);


const db = firebase.firestore();


const productsCollection = db.collection('products');
const categoriesCollection = db.collection('categories');
const ordersCollection = db.collection('orders');
const ordersCollection_temp = db.collection('orders_temp');


const productKeys = [];
const orderKeys = [];
const orderKeys_temp = [];


dbData.products.forEach(product => {


  productsCollection.add({
    name: product.name,
    description: product.description,
    price: product.price,
    picture: product.picture,
    image: product.image,
    productCategory: product.productCategory,
    createdDate: product.createdDate
  }).then(function (docRef) {
    console.log('Product written with ID: ', docRef.id);
    productKeys.push(docRef.id);


  }).catch(function (error) {
    console.error('Error adding document: ', error);
  });


});

dbData.categories.forEach(category => {


  categoriesCollection.add({
    id: category.id,
    name: category.name,
    description: category.description
  }).then(function (docRef) {
    console.log('Category written with ID: ', docRef.id);

  }).catch(function (error) {
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
    orderKeys.push(docRef.id);


  }).catch(function (error) {
    console.error('Error adding document: ', error);
  });


});


dbData.orders_temp.forEach(order => {


  ordersCollection_temp.add({
    shopOrderId: order.shopOrderId,
    userId: order.userId,
    orderDate: order.orderDate,
    status: order.status,
    totalValue: order.totalValue
  }).then(function (docRef) {
    console.log('Order_temp written with ID: ', docRef.id);
    orderKeys_temp.push(docRef.id);


  }).catch(function (error) {
    console.error('Error adding document: ', error);
  });


});


setTimeout(function () {


  orderKeys.forEach((orderKey) => {

    productKeys.forEach((productKey) => {

      db.collection('productsPerOrder').doc(orderKey).collection('products').doc(productKey).set({
        orderId: db.doc('orders/' + orderKey),
        productId: db.doc('products/' + productKey),
        qty: Math.floor(Math.random() * 10) + 1

      });

    });

  });


}, 5000);


setTimeout(function () {


  orderKeys_temp.forEach((orderKey) => {

    productKeys.forEach((productKey) => {

      db.collection('productsPerOrder_temp').doc(orderKey).collection('products').doc(productKey).set({
        orderId: db.doc('orders/' + orderKey),
        productId: db.doc('products/' + productKey),
        qty: Math.floor(Math.random() * 10) + 1

      });

    });

  });


}, 5000);




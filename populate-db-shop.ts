import 'core-js/es6/reflect';
import 'core-js/es7/reflect';


import { database, initializeApp } from 'firebase';
import { environment } from './src/environments/environment';
import { dbData } from './db-data';



console.log('WARNING VERY IMPORTANT - PLEASE READ THIS\n\n\n');
console.log('WARNING Please set your own firebase config on src/environmnents/firebase.config.ts');
console.log('Otherwise you will get permissions errors, because the populate-db script is trying to write to my database instead of yours. ');
console.log('Any issues please contact me, Thanks, Vasco\n\n\n');


initializeApp(environment.firebase);


const productsRef = database().ref('products');
const ordersRef = database().ref('orders');
// const ordersTempRef = database().ref('orders-temp');
// const usersRef = database().ref('users');



const productKeys = [];
const orderKeys = [];
// const orderTempKeys = [];

dbData.products.forEach(product => {


  console.log('adding product', product.name);

  productKeys.push( productsRef.push({
    name: product.name,
    description: product.description,
    price: product.price,
    picture: product.picture,
    createdDate: product.createdDate
  }).key);


});

dbData.orders.forEach(order => {


  console.log('adding order', order.shopOrderId);

  orderKeys.push(ordersRef.push({
    shopOrderId: order.shopOrderId,
    userId: order.userId,
    orderDate: order.orderDate,
    status: order.status,
    totalValue: order.totalValue
  }).key);


});



orderKeys.forEach((orderKey) => {
  const productsPerOrder = database().ref('productsPerOrder').child(orderKey);
  console.log(orderKey);

  productKeys.forEach((productKey) => {
    console.log(`adding product ${productKey} to order ${orderKey}`);
    const productsPerOrderAssociation = productsPerOrder.child(productKey);
    productsPerOrderAssociation.set(Math.floor(Math.random() * 10) + 1);

  });


});



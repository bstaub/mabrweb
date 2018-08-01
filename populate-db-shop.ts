import 'core-js/es6/reflect';
import 'core-js/es7/reflect';


import { database, initializeApp } from 'firebase';
import { environment } from './src/environments/environment';
import { dbData } from './db-data';
import {forEach} from '@angular/router/src/utils/collection';


console.log('WARNING VERY IMPORTANT - PLEASE READ THIS\n\n\n');
console.log('WARNING Please set your own firebase config on src/environmnents/firebase.config.ts');
console.log('Otherwise you will get permissions errors, because the populate-db script is trying to write to my database instead of yours. ');
console.log('Any issues please contact me, Thanks, Vasco\n\n\n');


initializeApp(environment.firebase);


// const coursesRef = database().ref('courses');
// const lessonsRef = database().ref('lessons');
const productsRef = database().ref('products');
const ordersRef = database().ref('orders');
const association = database().ref('productsPerOrder');
// const usersRef = database().ref('users');


/*
dbData.courses.forEach(course => {

  console.log('adding course', course.url);

  const courseRef = coursesRef.push({
    url: course.url,
    description: course.description,
    iconUrl: course.iconUrl,
    courseListIcon: course.courseListIcon,
    longDescription: course.longDescription
  });

  const lessonKeysPerCourse = [];

  course.lessons.forEach((lesson: any) => {

    console.log('adding lesson ', lesson.url);

    lessonKeysPerCourse.push(lessonsRef.push({
      description: lesson.description,
      duration: lesson.duration,
      url: lesson.url,
      tags: lesson.tags,
      videoUrl: lesson.videoUrl || null,
      longDescription: lesson.longDescription,
      courseId: courseRef.key
    }).key);

  });


  const association = database().ref('lessonsPerCourse');

  const lessonsPerCourse = association.child(courseRef.key);

  lessonKeysPerCourse.forEach(lessonKey => {
    console.log('adding lesson to course ');

    const lessonCourseAssociation = lessonsPerCourse.child(lessonKey);

    lessonCourseAssociation.set(true);
  });


});
*/

const productKeys = [];
const orderKeys = [];

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
    productsPerOrderAssociation.set('1');

  });


});


/*
dbData.orders.forEach(order => {

  console.log('adding order', order.name);

  const orderRef = ordersRef.push({
    userId: order.userId,
    date: order.date,
    status: order.status,
    totalValue: order.totalValue
  });


});

dbData.users.forEach(user => {

  console.log('adding user', user.name);

  const userRef = usersRef.push({
    lastName: user.name,
    firstName: user.description,
    email: user.price,
    natel: user.picture,
    location: user.createdDate,
    zip: user.createdDate,
    country: user.createdDate,
    role: user.createdDate,
    status: user.createdDate,
    createdDate: user.createdDate,
    lastLoginDate: user.createdDate,
    validated: user.createdDate
  });


});
*/


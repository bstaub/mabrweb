import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dbListPath = '/products';

  coursesRef: AngularFireList<Product> = null;
  courseRef: AngularFireObject<Product> = null;


  constructor(private db: AngularFireDatabase) { }


  getCourseObject(key): AngularFireObject<Product> {
    const dbObjectPath = '/products/' + key;
    return this.courseRef = this.db.object<Product>(dbObjectPath);
  }

  createCourseObject(newKey, newCourse) {
    const courseRef = this.db.object('products/' + newKey);
    courseRef.set({description: newCourse})
      .then(
        () => console.log('Object Create done'),
        console.error
      );
  }

  updateCourseObject(key, newCourse) {
    const courseRef = this.db.object('products/' + key);
    courseRef.update({description: newCourse})
      .then(
        () => console.log('Object Update done'),
        console.error
      );
  }

  removeCourseObject(key) {
    const courseRef = this.db.object('products/' + key);
    courseRef.remove()
      .then(
        () => console.log('Object Remove done'),
        console.error
      );
  }


  getProductList(): AngularFireList<Product> {
    return this.coursesRef = this.db.list<Product>(this.dbListPath);

  }


  pushCourse(newValue) {
    const coursesRef = this.db.list('products');
    coursesRef.push({description: newValue})
      .then(
        () => console.log('List Push done'),
        console.error
      );
  }

  removeCourse(toRemoveCourse) {
    const coursesRef = this.db.list('products');
    coursesRef.remove(toRemoveCourse)
      .then(
        () => console.log('List Remove done'),
        console.error
      );

  }

  updateCourse(toUpdateCourse, newValue, newValueLong ) {
    const coursesRef = this.db.list('products');
    coursesRef.update(toUpdateCourse, {description: newValue, longDescription: newValueLong })
      .then(
        () => console.log('List Update done'),
        console.error
      );

  }


  getCourseListQuery(): AngularFireList<Product> {
    const coursesRef = this.db.list<Product>(this.dbListPath,
      ref => ref.orderByChild('url')
    );

    return coursesRef;
  }


  private handleError(error) {
    console.log(error);
  }


}

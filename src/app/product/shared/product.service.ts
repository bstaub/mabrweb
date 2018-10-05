import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dbListPath = '/products';
  private basket = [];

  productsRef: AngularFireList<Product> = null;


  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbListPath);
  }


  createProduct(product: Product): void {
    this.productsRef.push(product);
  }

  getProductList(): AngularFireList<Product> {
    // return this.productsRef = this.db.list<Product>(this.dbListPath);
    return this.productsRef = this.productsRef;
  }

  updateProduct(key: string, value: any): void {
    this.productsRef
      .update(key, value)
      .then(() => this.handleLog('Update successful'))
      .catch(error => this.handleError(error));
  }

  deleteProduct(key: string): void {
    this.productsRef
      .remove(key)
      .then(() => this.handleLog('Delete successful'))
      .catch(error => this.handleError(error));
  }

  deleteAll(): void {
    this.productsRef.remove()
      .then(() => this.handleLog('deleteAll successful'))
      .catch(error => this.handleError(error));
  }

  getProductListByName(): AngularFireList<Product> {
    const productsRef = this.db.list<Product>(this.dbListPath,
      ref => ref.orderByChild('name')
    );
    return productsRef;
  }

  setbasket(item): void {
    this.basket.push(item);
  }

  getbasket(): string[] {
    // this.basketObj = { basket: this.basket, count: 3 };
    // return this.basketObj;
    return this.basket;
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = this.addZero(date.getHours());
    const minutes = date.getMinutes();

    return `${day}/${month}/${year} ${hour}:${minutes}`;
  }

  addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  private handleError(error) {
    console.error(error);
  }

  private handleLog(msg) {
    console.log(msg);
  }

}

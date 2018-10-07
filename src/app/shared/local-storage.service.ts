import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }


  // LocalStorage Functions start
  static setData(key: string, data: Object) {
    localStorage.setItem(key, JSON.stringify(data));
  }


  static getData(key: string) {

    return JSON.parse(localStorage.getItem(key)) || [];
  }

  static destroyLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  // LocalStorage Function end
}

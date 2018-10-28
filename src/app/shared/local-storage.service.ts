import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  setData(key: string, data: Object) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: string) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  destroyLocalStorage(key: string) {
    localStorage.removeItem(key);
  }
}

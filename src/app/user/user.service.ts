import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  STORE_KEY = 'localStorageUserKey';

  private dbListPath = '/users';

  usersRef: AngularFireList<User> = null;


  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbListPath);
  }


  createUser(user: User): void {
    this.usersRef.push(user);
  }

  getUserList(): AngularFireList<User> {
    // return this.usersRef = this.db.list<User>(this.dbListPath);
    return this.usersRef = this.usersRef;
  }

  updateUser(key: string, value: any): void {
    this.usersRef
      .update(key, value)
      .then(() => this.handleLog('Update successful'))
      .catch(error => this.handleError(error));
  }

  deleteUser(key: string): void {
    this.usersRef
      .remove(key)
      .then(() => this.handleLog('Delete successful'))
      .catch(error => this.handleError(error));
  }

  deleteAll(): void {
    this.usersRef.remove()
      .then(() => this.handleLog('deleteAll successful'))
      .catch(error => this.handleError(error));
  }

  getItemFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this.STORE_KEY)) || [];
  }

  setItemToLocalStorage(items) {
    localStorage.setItem(this.STORE_KEY, JSON.stringify(items));
  }

  removeKeyFromLocalStorage() {
    localStorage.removeItem(this.STORE_KEY);
  }

  private handleError(error) {
    console.error(error);
  }

  private handleLog(msg) {
    console.log(msg);
  }

}

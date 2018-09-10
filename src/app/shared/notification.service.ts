import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // i will use subject as event emmitter, see video youtube subject rxjs
  // any component can send success or error messages
  private sub = new Subject<any>();
  public emmitter = this.sub.asObservable();  // this has to be subscribed in the central notification compenent

  display(type, message) {
    this.sub.next({type, message});
  }
}

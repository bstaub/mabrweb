import { AuthService } from '../shared/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class AuthuserGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // return this.userService.getUser(firebase.auth().currentUser.uid).pipe(
    return this.authService.user$.pipe(
      take(1),
      map(user => user.roles.authuser ? true : false),
      tap(isAuthuser => {
        if (!isAuthuser) {
          console.error('Access denied - Registrated (Authuser) only allowed');
        }
      })
    );

  }

}

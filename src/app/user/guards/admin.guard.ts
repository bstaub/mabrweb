import { AuthService } from '../shared/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // return this.userService.getUser(firebase.auth().currentUser.uid).pipe(
    return this.authService.user$.pipe(
      take(1),
      map(user => user.roles.admin ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          console.error('Access denied - Admin only allowed');
        }
      })
    );

  }

}

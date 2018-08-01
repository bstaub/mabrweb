import {Routes} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {UserRegisterComponent} from './user-register/user-register.component';


export const USER_ROUTES: Routes = [
  {path: 'list', component: UserListComponent},
  {path: 'detail', component: UserDetailComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'register', component: UserRegisterComponent},
];
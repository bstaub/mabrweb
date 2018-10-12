import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserLoginRegisterComponent } from './user-login-register/user-login-register.component';
import { UserLoginRegisterSlideComponent } from './user-login-register-slide/user-login-register-slide.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserLoginComponent,
    UserDetailComponent,
    UserRegisterComponent,
    UserLoginRegisterComponent,
    UserLoginRegisterSlideComponent,
    ResetPasswordComponent,
    ProfileComponent,
  ],
  imports: [
    SharedModule,
  ],
})
export class UserModule { }

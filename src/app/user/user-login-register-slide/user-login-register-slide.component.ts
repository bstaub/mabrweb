import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';

@Component({
  selector: 'app-user-login-register-slide',
  templateUrl: './user-login-register-slide.component.html',
  styleUrls: ['./user-login-register-slide.component.scss']
})
export class UserLoginRegisterSlideComponent implements OnInit {

  status: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private notifier: NotificationService,
              private orderFirestoreService: OrderFirestoreService,
  ) {
  }

  ngOnInit() {
  }

  clickToggle() {
    this.status = !this.status;
  }

  onSubmitLogin(form: NgForm) {
    this.authService.loginWithUserPassword(form.value.email, form.value.password)
      .then(userData => {

        if (userData && userData.user.emailVerified) {
          this.notifier.display('success', 'Login erfolgreich');

          setTimeout(() => {

            this.orderFirestoreService.creatNewUserOrder(userData.user.uid);
            this.orderFirestoreService.loadProducts(userData.user.uid);
            this.router.navigateByUrl('');  // geht zur Homepage!
            // this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.notifier.display('error', 'Loginfehler: Sie müssen zuerst die Email Adresse verifizieren');
        }

      })
      .catch(err => {
        console.log('error bs: ' + err);
        this.notifier.display('error', err.message);
      });
  }


  onSubmitRegister(form: NgForm) {
    console.log('register!');
    console.log(form.value.email);
    console.log(form.value.password);
    console.log(form.value.fullname);
    this.authService.createUserInFirebaseAuthListEmailVerified(form.value.email, form.value.password, form.value.fullname);
  }


}

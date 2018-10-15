import { AfterContentChecked, Component, OnChanges, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { OrderFirestoreService } from '../../order/shared/order-firestore.service';
import { QueryParamsHandling } from '@angular/router/src/config';
import { SettingsService } from '../../shared/settings.service';

@Component({
  selector: 'app-user-login-register-slide',
  templateUrl: './user-login-register-slide.component.html',
  styleUrls: ['./user-login-register-slide.component.scss']
})
export class UserLoginRegisterSlideComponent implements OnInit, OnChanges, AfterContentChecked {

  status: boolean = false;
  queryParams: Params;

  constructor(private authService: AuthService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private notifier: NotificationService,
              private orderFirestoreService: OrderFirestoreService,
              private settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    // this.settingsService.changeSettings({orderRegister: false});
    // this.settingsService.changeSettings({orderLogin: true});

    this.queryParams = this.activeRoute.snapshot.queryParams;
    if (this.queryParams.register === '1') {
      this.clickToggle();
    }
    if (this.queryParams.orderstep === '1' && this.queryParams.register === '1') {
      this.settingsService.changeSettings({orderRegister: true});
    } else if (this.queryParams.orderstep === '1' && this.queryParams.login === '1') {
      this.settingsService.changeSettings({orderLogin: true});
    } else {
      this.settingsService.changeSettings({orderRegister: false});
      this.settingsService.changeSettings({orderLogin: false});
    }

  }

  ngOnChanges() {

  }

  ngAfterContentChecked() {

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

            if (this.settingsService.getSettings().orderLogin) {
              // this.settingsService.changeSettings({orderLogin: false});
              this.router.navigateByUrl('checkout/login');
            } else {
              this.router.navigateByUrl('');  // Default Login geht zur Homepage!
            }


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
      this.authService.createUserInFirebaseAuthListEmailVerified(form.value.email, form.value.password, form.value.fullname);
  }


}

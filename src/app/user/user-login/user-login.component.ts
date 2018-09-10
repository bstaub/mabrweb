import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {NotificationService} from '../../shared/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styles: []
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private notifier: NotificationService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authService.loginWithUserPassword(form.value.email, form.value.password)
      .then( userData => {

        if (userData && userData.user.emailVerified) {
          this.notifier.display('success', 'Login erfolgreich');

          setTimeout(() => {
            // https://stackoverflow.com/questions/45025334/how-to-use-router-navigatebyurl-and-router-navigate-in-angular
            this.router.navigateByUrl('');  // geht zur Homepage!
            // this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.notifier.display('error', 'Loginfehler: Sie müssen zuerst die Email Adresse verifizieren');
        }

      })
      .catch( err => {
        console.log('error bs: ' + err);
        this.notifier.display('error', err.message);
      });
  }

}

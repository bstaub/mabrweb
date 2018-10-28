import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styles: [`
    .error-red {
      color: red;
    }
  `]
})
export class UserRegisterComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authService.createUserInFirebaseAuthListEmailVerified(form.value.email, form.value.password, form.value.fullname);
  }

}

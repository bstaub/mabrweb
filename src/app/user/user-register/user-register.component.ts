import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../user.model';
import {UserService} from '../user.service';


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

  user: User = new User();

  // userdata: User = {
  //   username: 'bstaub',
  //   email: 'bruno.staub@gmail.com',
  //   password: 'YourPass',
  //   roles: {
  //     registered: true,
  //     admin: false
  //   }
  // };

  // list: any[];


  constructor(private userService: UserService) {
  }

  ngOnInit() {

    // this.list = [
    //   {
    //     id: 1,
    //     title: 'registered',
    //     checked: true,  // wird nicht korrekt angezeigt, warum?
    //   },
    //   {
    //     id: 2,
    //     title: 'admin',
    //     checked: false,
    //   },
    // ];

  }


  save() {
    this.userService.createUser(this.user);
    this.user = new User();
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    console.log(form.value);
    this.save();
  }

}

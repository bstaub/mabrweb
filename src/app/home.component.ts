import {Component, OnInit} from '@angular/core';
import {AuthService} from './user/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit{
  loginstatus: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(auth => console.log(auth));
    this.authService.getAuth().subscribe(auth2 => console.log(auth2));

  }

}

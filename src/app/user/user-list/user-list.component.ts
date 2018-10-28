import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs';
import { SettingsService } from '../../shared/settings.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users$: Observable<any[]>;
  p = 1;

  constructor(private userService: UserService,
              private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users$ = this.userService.getUsers();
  }

  get itemsPerPage() {
    return this.settingsService.getSettings().itemsPerPage;
  }
}

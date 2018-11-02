import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';
import { StorageService } from '../../shared/storage.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService,
              private userService: UserService,
              private storageService: StorageService,
  ) {
  }

  uid: string;
  imageUrl: string;
  currentUser: any;
  user: User;


  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.uid = this.userService.getCurrentUserId();
    this.getUser();
  }

  getUser() {
    return this.userService.getUser(this.uid)
      .subscribe(data => {
        this.user = data;
      });
  }

  onFileSelection($event) {
    this.storageService.uploadProfileBild($event)
      .then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

        uploadSnapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          this.imageUrl = downloadURL;
          const data: User = {
            id: this.uid,
            downloadUrl: downloadURL,
          };
          this.userService.setUser(data);

        });

      });

  }
}

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {UserService} from '../shared/user.service';
import {StorageService} from '../../shared/storage.service';
import {User} from '../user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService, private storageService: StorageService) { }

  uid;
  user;
  user2;
  imageUrl;
  localStorageUser;

  ngOnInit() {
    this.uid = this.userService.getCurrentUserId();
    // this.user = this.authService.getAuthUser();
    this.getUser();
  }

  getUser() {
    // console.log(this.user.uid);
    this.localStorageUser = this.userService.getProfileFromLocalStorage();
    return this.userService.getUser(this.uid)
    // return this.userService.getUser(this.user.uid)
      .subscribe( data => {
        console.log('singleUser: ', data);
        this.user2 = data;
      });
  }

  onFileSelection($event) {
    this.storageService.upload($event)
      .then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

        uploadSnapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          this.imageUrl = downloadURL;
          const data: User = {
            // id: this.user.uid,
            id: this.uid,
            downloadUrl: downloadURL,
          };
          this.userService.setUser(data);

        });

    });

  }
}

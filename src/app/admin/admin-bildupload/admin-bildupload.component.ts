import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'app-admin-bildupload',
  templateUrl: './admin-bildupload.component.html',
  styleUrls: ['./admin-bildupload.component.scss']
})
export class AdminBilduploadComponent implements OnInit {
  image: any;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

  onFileSelection($event) {
    this.storageService.upload($event)
      .then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

        uploadSnapshot.ref.getDownloadURL().then((downloadURL) => {
          this.image = downloadURL;

        });

      });
  }

}

import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  ref;
  task;
  imageobj;

  constructor(private afStorage: AngularFireStorage) {

  }

  // https://blog.angular.io/file-uploads-come-to-angularfire-6842352b3b47
  upload(event) {
    // this.afStorage.upload('/upload/to/this-path', event.target.files[0]);

    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref(randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    return this.task = this.ref.put(event.files[0]);  // ng prime p-fileUpload

  }

  uploadProfileBild(event) {

    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref(randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    return this.task = this.ref.put(event.target.files[0]);  // normal upload file selector

  }

}

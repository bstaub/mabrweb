import { NgModule } from '@angular/core';
import { CheckboxModule, DropdownModule, FileUploadModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RatingModule } from 'primeng/rating';


@NgModule({
  declarations: [],

  imports: [
    BrowserAnimationsModule,
    DropdownModule,
    CheckboxModule,
    FileUploadModule,
    RatingModule,
  ],

  exports: [
    BrowserAnimationsModule,
    DropdownModule,
    CheckboxModule,
    FileUploadModule,
    RatingModule,
  ]

})
export class NgPrimeModule {
}

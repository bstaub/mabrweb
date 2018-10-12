import { NgModule } from '@angular/core';
import { CheckboxModule, DropdownModule, FileUploadModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [],

  imports: [
    BrowserAnimationsModule,
    DropdownModule,
    CheckboxModule,
    FileUploadModule,
  ],

  exports: [
    BrowserAnimationsModule,
    DropdownModule,
    CheckboxModule,
    FileUploadModule,
  ]

})
export class NgPrimeModule {
}

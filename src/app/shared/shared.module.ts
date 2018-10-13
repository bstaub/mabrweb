import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CheckboxModule, DropdownModule, EditorModule, FileUploadModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgPrimeModule } from './ng-prime.module';
import { ArraySortPipe } from './pipe/array-sort.pipe';
import { ArraySortDescPipe } from './pipe/array-sort-desc.pipe';


// todo: SortPip, Md2HtmlPipe, NotificationService?? hier auslagern

@NgModule({
  declarations: [
    ArraySortPipe,
    ArraySortDescPipe,
  ],

  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    DropdownModule,
    CheckboxModule,
    FileUploadModule,
    NgPrimeModule,
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    DropdownModule,
    CheckboxModule,
    FileUploadModule,
    NgPrimeModule,
    ArraySortPipe,
    ArraySortDescPipe,
  ]

})
export class SharedModule {
}

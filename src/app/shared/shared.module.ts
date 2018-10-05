import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


// todo: SortPip, Md2HtmlPipe, NotificationService?? hier auslagern

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
  ],

  exports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    AngularFontAwesomeModule,
  ]

})
export class SharedModule {
}

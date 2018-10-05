import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// todo: SortPip, Md2HtmlPipe, NotificationService?? hier auslagern

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
  ],

  exports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
  ]

})
export class SharedModule {
}

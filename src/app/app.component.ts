import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mabrweb-Webshop';
  OffCanvasClickedCheck: boolean = false;


  OffCanvasClicked() {
    this.OffCanvasClickedCheck = true;
  }

  CloseNavState() {
    this.OffCanvasClickedCheck = false;
  }

}



import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-off-canvas',
  templateUrl: './off-canvas.component.html',
  styleUrls: ['./off-canvas.component.scss']
})
export class OffCanvasComponent implements OnInit, OnChanges {

  @Input() changeCanvasState;  // get open click state from navbar
  @Output() closeNavState = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.changeCanvasState === true) {
      this.openNav();
    }
  }

  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  closeNav() {
    this.closeNavState.emit();
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }

}

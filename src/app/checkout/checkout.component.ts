import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  currCheckoutStep: any = 1;
  checkoutSteps = [{id: '1', description: 'Adressdaten'}, {id: '2', description: 'Versandart'}, {id: '3', description: 'Zahlart'}, {id: '4', description: 'Übersicht'}, {id: '5', description: 'Abschluss'}];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {

    /*

    NavigationEnd
  this.router.events
    .subscribe(event => {
      if (event instanceof RoutesRecognized) {
        const route = event.state.root.children[0].children[0];
        if (route) {
         this.currCheckoutStep = route.data.checkoutStep || '';
        }

      }
    });
*/

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute.firstChild;
          // console.log(route);
          let child = route;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
              route = child;
            } else {
              child = null;
            }
          }
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
       //  console.log(data);
        this.currCheckoutStep = data.checkoutStep;
      });


  }


}

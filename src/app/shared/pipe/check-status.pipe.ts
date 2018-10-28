import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkStatus',
  // pure: false
})
export class CheckStatusPipe implements PipeTransform {

  transform(array: Array<any>): Array<string> {

    if ( !array) { return array; }

    return array.filter(item => {
      return item.active === true;
    });
  }

}

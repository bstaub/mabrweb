import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraySortDesc'
})
export class ArraySortDescPipe implements PipeTransform {

  transform(array: Array<any>, field: string = 'name'): Array<string> {

    if ( !array || !field ) { return array; }

    array.sort((a: any, b: any) => {
      if (a[field] > b[field]) {
        return -1;
      } else if (a[field] < b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}

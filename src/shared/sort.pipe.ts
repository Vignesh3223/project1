import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: Array<string>, args: any[]): any {
    const sortField = args[0];
    const sortDirection = args[1];
    let multiplier = 1;
    if (sortDirection === 'desc') {
      multiplier = -1;
    }
    return value;
  }
}

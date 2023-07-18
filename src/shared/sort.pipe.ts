import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
   //sorting tasks based on date
  transform(value: Array<any>, args: any[]): any {
    const sortField = args[0];
    const sortDirection = args[1];
    let multiplier = 1;
    if (sortDirection === 'desc') {
      multiplier = -1;
    }
    return value.sort((a, b) => {
      const dateA = new Date(a[sortField]);
      const dateB = new Date(b[sortField]);
      return (dateA.getTime() - dateB.getTime()) * multiplier;
    });
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  //filtering tasks based on profession
  transform(tasks: any[], selectedProfession: string): any[] {
    if (!selectedProfession) {
      return tasks;
    }
    return tasks.filter(work => work.assignto === selectedProfession);
  }
}

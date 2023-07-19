import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterstatus'
})
export class FilterstatusPipe implements PipeTransform {

  transform(tasks: any[], selectedStatus: string): any[] {
    if (!selectedStatus) {
      return tasks;
    }
    return tasks.filter(work => work.status === selectedStatus);
  }

}

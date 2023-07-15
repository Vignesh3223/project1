import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/models/products';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  url: string = '';
  taskurl = "http://localhost:3000/tasks";

  constructor(private http: HttpClient, private messageService: MessageService) {
    this.url = this.taskurl + '/';
  }

  showUpdate() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Quantity updated successfully' });
  }

  createTask(assignment: Task) {
    this.http.post<Task>(this.taskurl, assignment).subscribe((data) => {
      console.log(data);
    });
  }

  getTaskItems() {
    return this.http.get<Task[]>(this.taskurl);
  }

  updateTask(assignment: Task) {
    let updateurl = this.taskurl + '/' + assignment.id
    this.http.put<Task[]>(updateurl, assignment).subscribe(() => {
      this.showUpdate();
    })
  }

  removeTask(work: any) {
    return this.http.delete(this.url + work.id);
  }

}

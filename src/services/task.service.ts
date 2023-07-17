import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/models/products';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  url: string = '';
  taskurl = "http://localhost:3000/tasks";

  constructor(private http: HttpClient) {
    this.url = this.taskurl + '/';
  }

  getTaskItems() {
    return this.http.get<Task[]>(this.taskurl);
  }

  updateTask(assignment: Task) {
    let updateurl = this.taskurl + '/' + assignment.id
    this.http.put<Task[]>(updateurl, assignment).subscribe(() => {
    })
  }

  removeTask(work: any) {
    return this.http.delete(this.url + work.id);
  }

}

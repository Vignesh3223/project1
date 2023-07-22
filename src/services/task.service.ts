import { Injectable } from '@angular/core';
//HTTPClient
import { HttpClient } from '@angular/common/http';
//Task Interface
import { Task } from 'src/models/products';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  //task url
  url: string = '';
  taskurl = "http://localhost:3000/tasks";

  constructor(private http: HttpClient) {
    this.url = this.taskurl + '/';
  }

  //function to fetch tasks from json
  getTaskItems() {
    return this.http.get<Task[]>(this.taskurl);
  }

  //function to update task items
  updateTask(assignment: Task) {
    let updateurl = this.taskurl + '/' + assignment.id;
    this.http.put<Task[]>(updateurl, assignment).subscribe(() => {
    })
  }

  //function to remove tasks from json
  removeTask(work: any) {
    return this.http.delete(this.url + work.id);
  }
}

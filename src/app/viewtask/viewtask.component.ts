import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Task } from 'src/models/products';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  tasks: any[] = [];

  userlist: any[] = [];

  auth: boolean = false;

  constructor(
    private taskService: TaskService,
    private authService: UserService,
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) { }

  showEdit() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task updated successfully' });
  }

  deleteTask() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task removed successfully' });
  }

  statusUpdate() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Status updated successfully' });
  }

  progress(work: Task) {
    work.status = 'in progress';
    this.statusUpdate();
    this.taskService.updateTask(work);
  }

  complete(work: Task) {
    work.status = 'completed';
    this.delete(work);
    this.statusUpdate();
    this.taskService.updateTask(work);
    setTimeout(() => { this.router.navigate(['/viewtask']); }, 1000);

  }

  delete(deleteWork: Task) {
    this.taskService.removeTask(deleteWork).subscribe(
      () => console.log(deleteWork.id));
    this.deleteTask();
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.taskService.getTaskItems().subscribe(
      (response) => {
        this.tasks = response;
      });

    this.authService.getActiveUser().subscribe(
      (res) => {
        this.userlist = res;
      });

  }
  
  hasMatchingAssignment(): boolean {
    for (const work of this.tasks) {
      for (const user of this.userlist) {
        if (user.profession === 'Admin' || user.profession === work.assignto) {
          return true;
        }
      }
    }
    return false;
  }

}

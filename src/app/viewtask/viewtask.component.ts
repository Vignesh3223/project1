import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  AssignmentForm: FormGroup | any;
  topic: FormControl | any;
  content: FormControl | any;
  duedate: FormControl | any;
  assignto: FormControl | any;

  submitted = false;

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

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task edited successfully' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all the details' });
  }

  progress(work: Task) {
    work.status = 'in progress';
    this.statusUpdate();
    this.taskService.updateTask(work);
  }

  complete(work: Task) {
    work.status = 'completed';
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

    this.topic = new FormControl('', [Validators.required]);
    this.content = new FormControl('', [Validators.required]);
    this.duedate = new FormControl('', [Validators.required]);
    this.assignto = new FormControl('');

    this.AssignmentForm = new FormGroup({
      topic: this.topic,
      content: this.content,
      duedate: this.duedate,
      assignto: this.assignto
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

  edit() {
    this.submitted = true;
    if (this.AssignmentForm.invalid) {
      this.showError();
    }
    else {
      this.taskService.updateTask(this.AssignmentForm.value);
      this.showSuccess();
      this.AssignmentForm.reset();
    }
  }

}

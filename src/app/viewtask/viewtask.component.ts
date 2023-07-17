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

  taskForm: FormGroup | any;
  topic: FormControl | any;
  content: FormControl | any;
  duedate: FormControl | any;
  assignto: FormControl | any;

  status: string | any;

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

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task updated successfully' });
  }

  deleteTask() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task removed successfully' });
  }

  statusUpdate() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Status updated successfully' });
  }

  showEdit() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task edited successfully' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all the details' });
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

    this.taskForm = new FormGroup({
      topic: this.topic,
      content: this.content,
      duedate: this.duedate,
      assignto: this.assignto
    });
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

  updateId: number = 0
  edit(work: Task) {
    this.updateId = work.id;
    this.topic.setValue(work.topic);
    this.content.setValue(work.content);
    this.duedate.setValue(work.duedate);
    this.assignto.setValue(work.assignto);
    this.status(work.status);
  }

  savechanges() {
    const workurl = this.taskService.taskurl + '/' + this.updateId;
    this.http.put<Task[]>(workurl, this.taskForm.value).subscribe(
      () => {
        console.log(this.taskForm.value);
        this.showEdit();
        this.ngOnInit()
      }
    )
  }

  searchText = '';

  sortParam: any;
  sortDirection: any;
  optionSelected: any;

  //function for sorting purpose
  onOptionsSelected(event: any) {
    console.log(event.target.value);
    this.optionSelected = event.target.value;
    if (this.optionSelected === 'n-f') {
      (this.sortParam = 'duedate'), (this.sortDirection = 'asc');
    }
    else if (this.optionSelected === 'f-n') {
      (this.sortParam = 'duedate'), (this.sortDirection = 'desc');
    }
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

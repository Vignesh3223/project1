import { Component, OnInit } from '@angular/core';
//Form attributes
import { FormControl, FormGroup, Validators } from '@angular/forms';
//TaskService from Service
import { TaskService } from 'src/services/task.service';
//UserService from Service
import { UserService } from 'src/services/user.service';
//HTTPClient Module
import { HttpClient } from '@angular/common/http';
//primeNG Message Service
import { MessageService } from 'primeng/api';
//router
import { Router } from '@angular/router';
//Task Interface
import { Task } from 'src/models/products';
//sweetalert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})

export class ViewtaskComponent implements OnInit {

  //Form name
  taskForm: FormGroup | any;
  //Form fields
  topic: FormControl | any;
  content: FormControl | any;
  duedate: FormControl | any;
  assignto: FormControl | any;
  status: FormControl | any;

  submitted = false;

  tasks: any[] = [];

  userlist: any[] = [];

  auth: boolean = false;

  selectedProfession: string | any;

  searchText = '';

  selectedStatus: string | any;

  constructor(
    private taskService: TaskService,
    private authService: UserService,
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) { }

  //primeNG toast for task update
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task updated successfully' });
  }

  //primeNG toast for task delete
  deleteMessage() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task removed successfully' });
  }

  //primeNG toast for status update
  statusUpdate() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Status updated successfully' });
  }

  //primeNG toast for task edit
  showEdit() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task edited successfully' });
  }

  //primeNG toast for form error
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

    //Form Validations
    this.topic = new FormControl('', [Validators.required]);
    this.content = new FormControl('', [Validators.required]);
    this.duedate = new FormControl('', [Validators.required]);
    this.assignto = new FormControl('');
    this.status = new FormControl({ value: '', disabled: true });

    this.taskForm = new FormGroup({
      topic: this.topic,
      content: this.content,
      duedate: this.duedate,
      assignto: this.assignto,
      status: this.status,
    });
  }

  //Function to change status as progress
  progress(work: Task) {
    work.status = 'in progress';
    this.statusUpdate();
    this.taskService.updateTask(work);
  }

  //Function to change status as completed
  complete(work: Task) {
    work.status = 'completed';
    this.statusUpdate();
    this.taskService.updateTask(work);
    setTimeout(() => { this.router.navigate(['/viewtask']); }, 1000);
  }

  //Function to delete task
  deleteTask(deleteWork: Task) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to remove this task",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.removeTask(deleteWork).subscribe(
          () => console.log(deleteWork.id));
        setTimeout(() => { this.ngOnInit(); }, 1000);
        this.deleteMessage();
        console.log('in delete');
      }
    })
  }

  //Function to edit task
  updateId: number = 0
  edit(work: Task) {
    this.updateId = work.id;
    this.topic.setValue(work.topic);
    this.content.setValue(work.content);
    this.duedate.setValue(work.duedate);
    this.assignto.setValue(work.assignto);
    this.status.setValue(work.status);
  }

  //Function to update task
  savechanges() {
    console.log(this.taskForm.value);
    this.taskForm.value.status = '';
    const workurl = this.taskService.taskurl + '/' + this.updateId;
    this.http.put<Task[]>(workurl, this.taskForm.value).subscribe(
      () => {
        console.log(this.taskForm.value);
        this.showEdit();
        this.ngOnInit();
      }
    )
  }

  sortParam: any;
  sortDirection: any;
  optionSelected: any;

  //function to sort tasks
  onOptionsSelected(event: any) {
    console.log(event.target.value);
    this.optionSelected = event.target.value;
    this.sortParam = 'duedate';
    this.sortDirection = 'asc';
    if (this.optionSelected === 'f-n') {
      (this.sortParam = 'duedate'), (this.sortDirection = 'desc');
    }
  }

  //function to check matching professions
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

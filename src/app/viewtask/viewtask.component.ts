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

  // editMode = false;

  // editForm: FormGroup | any;

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


  // loadTasks(): void {
  //   this.taskService.getTaskItems().subscribe((data: Task[]) => {
  //     this.tasks = data;
  //   });
  // }

  // initializeForm(): void {
  //   this.editForm = ({
  //     id: [null],
  //     topic: ['', Validators.required],
  //     content: ['', Validators.required],
  //     duedate: ['', Validators.required],
  //     assignto: ['', Validators.required]
  //   });
  // }

  // edit(work: Task): void {
  //   this.editMode = true;
  //   this.editForm.patchValue({
  //     id: work.id,
  //     topic: work.topic,
  //     content: work.content,
  //     duedate: work.duedate,
  //     assignto: work.assignto
  //   });
  // }

  // saveChanges(): void {
  //   const editedTask: Task = this.editForm.value;
  //   const index = this.tasks.findIndex(task => task.id === editedTask.id);
  //   if (index !== -1) {
  //     this.tasks[index] = editedTask;
  //     this.http.put('', this.tasks).subscribe(() => {
  //       console.log('Task updated successfully');
  //       this.editMode = false;
  //     }, (error: any) => {
  //       console.error('Error updating task:', error);
  //     });
  //   }
  // }

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

    // this.loadTasks();
    // this.initializeForm();
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

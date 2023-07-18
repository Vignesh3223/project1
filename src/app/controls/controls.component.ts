import { Component, OnInit } from '@angular/core';
//Form attributes
import { FormControl, FormGroup, Validators } from '@angular/forms';
//HTTPClient Module
import { HttpClient } from '@angular/common/http';
//TaskService from Service
import { TaskService } from 'src/services/task.service';
//Task Interface
import { Task } from 'src/models/products';
//primeNG Message Service
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  //Form name
  AssignmentForm: FormGroup | any;
  //Form fields
  topic: FormControl | any;
  content: FormControl | any;
  duedate: FormControl | any;
  assignto: FormControl | any;

  status: string | any;

  submitted = false;

  constructor(
    private taskService: TaskService,
    private http: HttpClient,
    private messageService: MessageService) { }

  tasks = this.taskService.taskurl;

  ngOnInit(): void {
    this.topic = new FormControl('', [Validators.required]);
    this.content = new FormControl('', [Validators.required]);
    this.duedate = new FormControl('', [Validators.required]);
    this.assignto = new FormControl('');

    this.AssignmentForm = new FormGroup({
      topic: this.topic,
      content: this.content,
      duedate: this.duedate,
      assignto: this.assignto,
    });
  }

  //primeNG toast for task assign success
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task assigned successfully' });
  }

  //primeNG toast for form error
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all the details' });
  }

  //function on form submit
  onSubmit() {
    this.submitted = true;
    //form invalid
    if (this.AssignmentForm.invalid) {
      this.showError();
    }
    //posting the data into json if form is valid
    else {
      const status: Task = { ...this.AssignmentForm.value, status: '' };
      console.log(this.AssignmentForm);
      this.http.post<Task[]>(this.tasks, status)
        .subscribe((res) => {
          console.log(res);
          this.showSuccess();
          this.AssignmentForm.reset();
        });
    }
  }
}

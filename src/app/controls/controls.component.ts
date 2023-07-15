import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/services/task.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  AssignmentForm: FormGroup | any;
  topic: FormControl | any;
  content: FormControl | any;
  duedate: FormControl | any;
  assignto: FormControl | any;

  submitted = false;

  constructor(
    private taskService: TaskService,
    private messageService: MessageService) { }

  ngOnInit(): void {
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

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task assigned successfully' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all the details' });
  }

  onSubmit() {
    this.submitted = true;
    if (this.AssignmentForm.invalid) {
      this.showError();
    }
    else {
      this.taskService.createTask(this.AssignmentForm.value);
      this.showSuccess();
      this.AssignmentForm.reset();
    }
  }
}

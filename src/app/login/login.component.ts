import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { UserService } from 'src/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = environment.userurl;

  LoginForm: FormGroup | any;
  useremail: FormControl | any;
  password: FormControl | any;

  submitted = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.userService.validateAuth(false);
    this.useremail = new FormControl('',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]);
    this.password = new FormControl('',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(14),
        Validators.pattern('[A-Za-z0-9]*')
      ]);
    this.LoginForm = new FormGroup({
      useremail: this.useremail,
      password: this.password
    })
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Success' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all the details' });
  }

  showUserError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User not found' });
  }

  onSubmit() {
    this.submitted = true;
    if (this.LoginForm.invalid) {
      this.showError();
    }
    else {
      this.http.get<any>(this.user).subscribe((res) => {
        const user = res.find((a: any) => {
          return (
            a.useremail === this.LoginForm.value.useremail &&
            a.password === this.LoginForm.value.password
          );
        });
        if (user) {
          user.logged = true
          this.http.put<any>(user, this.user).subscribe();
          this.showSuccess();
          this.LoginForm.reset();
          setTimeout(() => { this.router.navigate(['']) }, 2000);
          this.userService.validateAuth(true);
        }
        else {
          this.showUserError();
          this.userService.validateAuth(false);
        }
      })
    }
  }
}

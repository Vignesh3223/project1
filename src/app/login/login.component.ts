import { Component, OnInit } from '@angular/core';
//HTTPClient Module
import { HttpClient } from '@angular/common/http';
//user environment
import { environment } from 'src/environment/environment';
//UserService from Service
import { UserService } from 'src/services/user.service';
//Form attributes
import { FormGroup, FormControl, Validators } from '@angular/forms';
//primeNG Message Service
import { MessageService } from 'primeng/api';
//router
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //password hide property
  hide = true;

  //userurl
  userapi = environment.userurl;

  //Form name
  LoginForm: FormGroup | any;
  //Form fields
  useremail: FormControl | any;
  password: FormControl | any;

  //logged property 
  logged: boolean | any;

  submitted = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    //Form Validations
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

  //primeNG toast for successful login
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Success' });
  }

  //primeNG toast for form error
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all the details' });
  }

  //primeNG toast for user error
  showUserError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User not found' });
  }

  //function on form submit
  onSubmit() {
    this.submitted = true;
    //Form invalid
    if (this.LoginForm.invalid) {
      this.showError();
    }
    else {
      //fetch user data from json and match the result
      this.http.get<any>(this.userapi).subscribe((res) => {
        const user = res.find((a: any) => {
          return (
            a.useremail === this.LoginForm.value.useremail &&
            a.password === this.LoginForm.value.password
          );
        });
        //valid user
        if (user) {
          user.logged = true;
          this.http.put<any>(`${this.userapi}/${user.id}`, user).subscribe();
          this.showSuccess();
          this.LoginForm.reset();
          setTimeout(() => { this.router.navigate(['']) }, 2000);
          this.userService.validateAuth(true);
        }
        //invalid user
        else {
          this.showUserError();
          this.userService.validateAuth(false);
        }
      })
    }
  }
}

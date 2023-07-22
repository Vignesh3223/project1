import { Component, OnInit } from '@angular/core';
//HTTPClient Module
import { HttpClient } from '@angular/common/http';
//user environment
import { environment } from 'src/environment/environment';
//Form attributes
import { FormGroup, FormControl, Validators } from '@angular/forms';
//primeNG Message Service
import { MessageService } from 'primeng/api';
//router
import { Router } from '@angular/router';
//User Interface
import { User } from 'src/models/products';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  //userurl
  userapi = environment.userurl;

  //Form name
  SignUpForm: FormGroup | any;
  //Form fields
  firstname: FormControl | any;
  lastname: FormControl | any;
  useremail: FormControl | any;
  password: FormControl | any;
  confirmpassword: FormControl | any;
  profession: FormControl | any;
  city: FormControl | any;
  state: FormControl | any;
  pincode: FormControl | any;

  //logged property
  logged: boolean | any;

  submitted = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    //Form Validations
    this.firstname = new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
        Validators.pattern('[A-Za-z ]*')
      ]);
    this.lastname = new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
        Validators.pattern('[A-Za-z ]*')
      ]);
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
    this.confirmpassword = new FormControl('', [Validators.required]);
    this.profession = new FormControl('', [Validators.required]);
    this.city = new FormControl('', [Validators.required]);
    this.state = new FormControl('', [Validators.required]);
    this.pincode = new FormControl('',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('[0-9]*')
      ]);
    this.SignUpForm = new FormGroup({
      firstname: this.firstname,
      lastname: this.lastname,
      useremail: this.useremail,
      password: this.password,
      confirmpassword: this.confirmpassword,
      profession: this.profession,
      city: this.city,
      state: this.state,
      pincode: this.pincode,
    });
  }

  //primeNG toast for successful signup
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Signed Up Successfully' });
  }

  //primeNG toast for form error
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all the details' });
  }

  //function on submit
  onSubmit() {
    this.submitted = true;
    //Form invalid
    if (this.SignUpForm.invalid) {
      this.showError();
    }
    //From valid post the date into json
    else {
      const user: User = { ...this.SignUpForm.value, logged: false };
      console.log(this.SignUpForm);
      this.http.post<User[]>(this.userapi, user)
        .subscribe((res) => {
          console.log(res);
          this.showSuccess();
          this.SignUpForm.reset();
          setTimeout(() => { this.router.navigate(['/login']); }, 2000);
        });
    }
  }
}

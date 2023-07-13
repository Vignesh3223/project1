import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = environment.userurl;

  SignUpForm: FormGroup | any;
  firstname: FormControl | any;
  lastname: FormControl | any;
  useremail: FormControl | any;
  password: FormControl | any;
  confirmpassword: FormControl | any;
  profession: FormControl | any;
  city: FormControl | any;
  state: FormControl | any;
  pincode: FormControl | any;

  submitted = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
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
    this.profession = new FormControl('',
      [
        Validators.required,
        Validators.pattern('[A-Za-z ]*')
      ]);
    this.city = new FormControl('', [Validators.required]);
    this.state = new FormControl('');
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
      pincode: this.pincode
    });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Signed Up Successfully' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all the details' });
  }

  onSubmit() {
    this.submitted = true;
    if (this.SignUpForm.invalid) {
      this.showError();
    }
    else {
      this.http.post<any>(this.user, this.SignUpForm.value)
        .subscribe((res) => {
          console.log(res);
          this.showSuccess();
          this.SignUpForm.reset();
          setTimeout(() => { this.router.navigate(['/login']); }, 2000)
        });
    }
  }
}

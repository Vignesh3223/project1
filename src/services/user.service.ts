import { Injectable } from '@angular/core';
//Subject
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { User } from 'src/models/products';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  add(arg0: { severity: string; summary: string; detail: string; }) {
    throw new Error('Method not implemented.');
  }

  user = environment.userurl;

  public authSubject = new Subject<boolean>();

  //User validate function
  validateAuth(data: boolean) {
    this.authSubject.next(data);
  }

  value?: boolean;
  getAuthStatus() {
    this.authSubject.subscribe(
      data => {
        console.log('inside user service: ' + data);
        this.value = data;
        console.log('inside user service 11: ' + this.value);
      }
    );
    return this.value;
  }

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get<User[]>(this.user);
  }

  getActiveUser() {
    return this.http.get<User[]>(this.user + '/?logged_like=true')
  }

}
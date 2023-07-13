import { Injectable } from '@angular/core';
//Subject
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  add(arg0: { severity: string; summary: string; detail: string; }) {
    throw new Error('Method not implemented.');
  }

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

  constructor() { }

}
import { Injectable } from '@angular/core';
//HTTPClient
import { HttpClient } from '@angular/common/http';
//Subject
import { Subject } from 'rxjs';
//user environment
import { environment } from 'src/environment/environment';
//User Interface
import { User } from 'src/models/products';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //userurl
  user = environment.userurl;

  public authSubject = new Subject<boolean>();

  //function to check Authentication
  validateAuth(data: boolean) {
    this.authSubject.next(data);
  }

  value?: boolean;

  // //function to get Authentication status
  getAuthStatus() {
    return this.authSubject.asObservable();
  }

  constructor(private http: HttpClient) { }

  //function to fetch all the users from json
  getUser() {
    return this.http.get<User[]>(this.user);
  }

  //function to fetch the current user logged in
  getActiveUser() {
    return this.http.get<User[]>(this.user + '/?logged_like=true');
  }
}

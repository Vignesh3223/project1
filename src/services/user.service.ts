import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { User } from 'src/models/products';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = environment.userurl;

  public authSubject = new Subject<boolean>();

  validateAuth(data: boolean) {
    this.authSubject.next(data);
  }

  value?: boolean;

  getAuthStatus() {
    return this.authSubject.asObservable();
  }

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get<User[]>(this.user);
  }

  getActiveUser() {
    return this.http.get<User[]>(this.user + '/?logged_like=true');
  }
}

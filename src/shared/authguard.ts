import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
//UserService from service
import { UserService } from "src/services/user.service";

@Injectable({
    providedIn: 'root',
  })
  export class AuthGuard implements CanActivate {
    isAuthenticated: boolean = false;
    constructor(private authService: UserService, private router: Router) {}
  
    canActivate():
   
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      var isAuth = this.authService.authSubject.subscribe((data) => {
        console.log('next subscribed value: ' + data);
        this.isAuthenticated = data;
      });
  
      //checking of authentication
      if (this.isAuthenticated == false) {
        console.log('inside false ' + this.isAuthenticated);
        this.router.navigate(['/login']);
        return false;
      } else {
        console.log('next subscribed value:t3etg ' + this.isAuthenticated);
        return true;
      }
    }
  }
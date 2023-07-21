import { Component, OnInit } from '@angular/core';
//UserService from Service
import { UserService } from 'src/services/user.service';
//CartService from Service
import { CartService } from 'src/services/cart.service';
//HTTPClient Module
import { HttpClient } from '@angular/common/http';
//user environment
import { environment } from 'src/environment/environment';
//primeNG Message Service
import { MessageService } from 'primeng/api';
//router
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //userurl
  userapi = environment.userurl;

  userlist: any[] = [];

  //boat logo
  logo = "/assets/images/logo.png";

  auth: boolean = false;

  //cartcount

  cartcount: number = 0;

  constructor(
    private http: HttpClient,
    private authService: UserService,
    private cartService: CartService,
    private messageService: MessageService,
    private router: Router) { }

  //primeNG toast for logout
  showLogout() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Signed Out Successfully' });
  }

  ngOnInit() {
    this.authService.authSubject.subscribe(
      data => {
        this.auth = data;
      });

    this.authService.getActiveUser().subscribe(
      (res) => {
        this.userlist = res;
      });

      this.getcartCount();
  }

  getcartCount(){
    this.cartService.getCartItems().subscribe(
      res => {
      this.cartcount = res.length;
      // this.ngOnInit();
    });
  }

  //logout function
  logout() {
    this.http.get<any>(`${this.userapi}?logged_like=true`).subscribe((res) => {
      const activeUser = res.find((a: any) => a.logged === true);
      if (activeUser) {
        activeUser.logged = false;
        this.http.put<any>(`${this.userapi}/${activeUser.id}`, activeUser).subscribe(() => {
          this.showLogout();
          setTimeout(() => { this.router.navigate(['']); }, 1000);
          this.authService.validateAuth(false);
        });
      }
    });
  }
}

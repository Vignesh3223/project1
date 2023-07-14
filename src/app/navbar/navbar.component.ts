import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userlist: any[] = [];

  logo = "/assets/images/logo.png";

  auth: boolean = false;
  constructor(
    private authService: UserService,
    private messageService: MessageService,
    private router: Router,) { }

  showLogoutMessage() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Signed Out Successfully' });
  }


  ngOnInit() {
    this.authService.authSubject.subscribe(
      data => {
        this.auth = data;
        console.log("logged in")
      });

    this.authService.getActiveUser().subscribe(
      (res) => {
        this.userlist = res
      });
  }

  logout() {
    this.showLogoutMessage();
    setTimeout(() => { this.router.navigate(['/login']) }, 2000);
  }
}

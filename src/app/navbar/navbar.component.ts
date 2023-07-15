import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userapi = environment.userurl;

  userlist: any[] = [];

  logo = "/assets/images/logo.png";

  auth: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: UserService,
    private messageService: MessageService,
    private router: Router) { }


  showLogout() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Signed Out Successfully' });
  }

  ngOnInit() {
    this.authService.authSubject.subscribe(
      data => {
        this.auth = data;
        console.log("logged in");
        this.ngOnInit();
      });

    this.authService.getActiveUser().subscribe(
      (res) => {
        this.userlist = res;
      });
  }

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

import { Component,OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit{
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit() {
      this.items = [
          { label: 'Home', icon: 'pi pi-fw pi-home' },
          { label: 'Products', icon: 'pi pi-fw pi-images' },
          { label: 'Controls', icon: 'pi pi-fw pi-cog' },
      ];

      this.activeItem = this.items[0];
  }

  onActiveItemChange(event: MenuItem) {
      this.activeItem = event;
  }

}

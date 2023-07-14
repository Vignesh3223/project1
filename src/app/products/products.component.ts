import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private proService: ProductService) { }

  prodslist: any[] = [];

  ngOnInit() {
    this.proService.getProducts().subscribe(
      (res) => this.prodslist = res);
  }
}

import { Component, OnInit } from '@angular/core';
//ProductService from Service
import { ProductService } from 'src/services/product.service';
//CartService from Service
import { CartService } from 'src/services/cart.service';
//Cart Interface
import { Cart } from 'src/models/products';
//primeNG Message Service
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private proService: ProductService,
    private cartService: CartService,
    private messageService: MessageService
  ) { }

  prodslist: any[] = [];

  //primeNG toast for adding product
  showAddMessage() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully' });
  }

  carts: Cart = {
    id: 0,
    title: '',
    image: '',
    price: 0,
    total: 0,
    quantity: 1
  }
  quantity: number = 1;

  //function to add products to cart
  addtoCart(item: any) {
    this.carts.id = item.id;
    this.carts.title = item.title;
    this.carts.image = item.image;
    this.carts.quantity = this.quantity;
    this.carts.price = item.price;
    this.carts.total = item.totalprice;
    this.cartService.addToCart(this.carts);
    this.showAddMessage();
  }

  ngOnInit() {
    this.proService.getProducts().subscribe(
      (res) => this.prodslist = res);
  }
}

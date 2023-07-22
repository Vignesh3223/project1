import { Injectable } from '@angular/core';
//HTTPClient
import { HttpClient } from '@angular/common/http';
//Cart Interface
import { Cart } from 'src/models/products';
//Message Service for toast
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  //cart url
  url: string = '';
  carturl = 'http://localhost:3000/carts';

  constructor(private http: HttpClient, private messageService: MessageService) {
    this.url = this.carturl + '/';
  }

  //primeng toast
  showUpdate() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Quantity updated successfully' });
  }

  //function to add products to cart
  addToCart(product: Cart) {
    this.http.post<Cart>(this.carturl, product).subscribe((data) => {
      console.log(data);
    });
  }

  //function to fetch cart items
  getCartItems() {
    return this.http.get<Cart[]>(this.carturl);
  }

  //function to update cart
  updateCart(product: Cart) {
    let updateurl = this.carturl + '/' + product.id;
    this.http.put<Cart[]>(updateurl, product).subscribe(() => {
      this.showUpdate();
    })
  }

  //function to delete items from cart
  removeItemFromCart(item: any) {
    return this.http.delete(this.url + item.id);
  }
}

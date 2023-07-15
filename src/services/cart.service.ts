import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Cart } from 'src/models/products';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  url: string = '';
  carturl = 'http://localhost:3000/carts';

  constructor(private http: HttpClient, private messageService: MessageService) {
    this.url = this.carturl + '/';
  }

  showUpdate() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Quantity updated successfully' });
  }
  
  addToCart(product: Cart) {
    this.http.post<Cart>(this.carturl, product).subscribe((data) => {
      console.log(data);
    });
  }

  getCartItems() {
    return this.http.get<Cart[]>(this.carturl);
  }

  updateCart(product: Cart) {
    let updateurl = this.carturl + '/' + product.id
    this.http.put<Cart[]>(updateurl, product).subscribe(() => {
      this.showUpdate();
    })
  }

  removeItemFromCart(item: any) {
    return this.http.delete(this.url + item.id);
  }

  public countSubject = new Subject<number>();
  getCount() {
    return this.getCartItems().subscribe((res) => {
      this.countSubject.next(res.length);
      console.log(this.countSubject + 'inside sub');
    });
  }
}
